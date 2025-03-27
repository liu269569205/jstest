'use strict';
const got = require('got');
require('dotenv').config();

//当前所在的环境
let current_access={"access":"client_id=HqY0u_NaoZon&client_secret=_-wq99wQ3lEPttpSl-yJ12qm", "url":"http://192.168.168.81:5700"} //这里改成自己的 wsk 所在容器
//远程服务器环境
let remote_access={"access":"client_id=yBvP_K4HF1Sq&client_secret=5mz_pDdE0uAOGd-jKPNvZ4v8", "url":"http://192.168.168.21:5700"}  //这里改成 跑 任务 的cookie所在容器

const fs = require('fs');

const api = got.extend({prefixUrl: current_access.url,retry: { limit: 0 },});

const remote_api = got.extend({prefixUrl: remote_access.url,retry: { limit: 0 },});


//获取当前WSCK容器的token
async function getToken() {
    const body = await api({url: 'open/auth/token?'+current_access.access,headers: {"Content-Type": "application/x-www-form-urlencoded"}}).json();
    return body.data.token;
}

//获取远程-ql 容器的token
async function getRemoteToken() {
    const body = await remote_api({url: 'open/auth/token?'+remote_access.access,headers: { "Content-Type": "application/x-www-form-urlencoded"}}).json();
    return body.data.token;
}
//获取远程匹配pin的变量
module.exports.getRemoteEnvByPtPin = async (Ptpin) => {
    const envs = await this.getRemoteEnvs();
    for (let i = 0; i < envs.length; i++) {
        var tempptpin = decodeURIComponent(envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/) && envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if(tempptpin==Ptpin){
            // console.log("主容器的pin:"+JSON.stringify(envs[i]))
            return envs[i];
        }
    }
    return "";
};


//获取远程所有JD_COOKIE环境变量
module.exports.getRemoteEnvs = async () => {
    const token = await getRemoteToken();
    const body = await remote_api({
        url: 'open/envs',
        searchParams: {
            searchValue: 'JD_COOKIE',
            t: Date.now(),
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
        },
    }).json();
    return body.data;
};

//更新主要容器远程变量
module.exports.updateEnvRemote = async (cookie, eid, remarks) => {
    const token = await getRemoteToken();
    const body = await remote_api({
        method: 'put',
        url: 'open/envs',
        params: { t: Date.now() },
        json: {
            name: 'JD_COOKIE',
            value: cookie,
            id: eid,
            remarks,
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

module.exports.getEnvsCount = async () => {
    const data = await this.getEnvs();
    return data.length;
};

module.exports.addEnv = async (cookie, remarks) => {
    const token = await getToken();
    const body = await api({
        method: 'post',
        url: 'open/envs',
        params: { t: Date.now() },
        json: [{
            name: 'JD_COOKIE',
            value: cookie,
            remarks,
        }],
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

//获取本机变量
module.exports.getEnvs = async () => {
    const token = await getToken();
    const body = await api({
        url: 'open/envs',
        searchParams: {
            searchValue: 'JD_COOKIE',
            t: Date.now(),
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
        },
    }).json();
    return body.data;
};
module.exports.DisableCk = async (eid) => {
    const token = await getToken();
    const body = await api({
        method: 'put',
        url: 'open/envs/disable',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

//启用远程tooken
module.exports.EnableCk = async (eid) => {
    const token = await getRemoteToken();
    const body = await remote_api({
        method: 'put',
        url: 'open/envs/enable',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

module.exports.getstatus = async (eid) => {
    const envs = await this.getEnvs();
    for (let i = 0; i < envs.length; i++) {
        if(envs[i]._id==eid){
            return envs[i].status;
        }
    }
    return 99;
};

module.exports.getEnvById = async (eid) => {
    const envs = await this.getEnvs();
    for (let i = 0; i < envs.length; i++) {
        if(envs[i]._id==eid){
            return envs[i].value;
        }
    }
    return "";
};

module.exports.getEnvByPtPin = async (Ptpin) => {
    const envs = await this.getEnvs();
    for (let i = 0; i < envs.length; i++) {
        var tempptpin = decodeURIComponent(envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/) && envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if(tempptpin==Ptpin){
            return envs[i];
        }
    }
    return "";
};


module.exports.delEnv = async (eid) => {
    const token = await getToken();
    const body = await api({
        method: 'delete',
        url: 'open/envs',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

//搜脚本
module.exports.searchVaule = async (name) => {
    const token = await getRemoteToken();
    const body = await remote_api({
        method: 'get',
        url: 'open/crons',
        searchParams: {
            searchValue:name,
            t: Date.now()
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

//运行任务
module.exports.runCrons = async (id) => {
    const token = await getRemoteToken();
    const body = await remote_api({
        method: 'put',
        url: 'open/crons/run',
        params: { t: Date.now() },
        body: JSON.stringify([id]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json();
    return body;
};

//获取系统版本

module.exports.sysVersion = async () => {
    let Fileexists = fs.existsSync('/ql/data/config/auth.json');
    let sysVersion="";
    if (Fileexists) 
	sysVersion="系统版本是新版青龙(id)"
    else
	sysVersion="系统版本是旧版青龙(_id)"
    console.log(sysVersion)
    return sysVersion;
};