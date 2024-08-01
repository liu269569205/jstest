const axios = require("axios")
var moment = require("moment")
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
//var slog = require('single-line-log').stdout;
let queryBody = {
    "type": 2,
    "redBalanceFlag": 0,
    "page": 1,
    "tenantCode": "jgm",
    "bizModelCode": "6",
    "bizModeClientType": "M",
    "externalLoginType": "1"
}
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
		cookie = cookiesArr[i];
		let pin = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
		//let pin =cookie.split(";")[1]
		console.log("当前账号:"+pin)
		query(cookie)
	}
  }
async function query(cookie) {
    let page = 1
    let req = ""
    const config = {
        headers: {
            "Cookie": cookie,
            "Origin": "https://wqs.jd.com",
            "Referer": "https://wqs.jd.com"
        }
    };

    let url = getUrl(queryBody)
    //console.log("请求地址:" + url)
    let res = await axios.get(url, config)
    let data = res.data
    //console.log(JSON.stringify(res.data))
    let count = data.result.count;
    let maxSize = Math.ceil(count / 50);
    console.log("开始查询当前账号本年累计红包...")
    console.log("截至当前时间一共有:" + count + "个历史红包"+ maxSize + "页数据待处理")//
    let redTotal = 0;
    let fruit=0
    let expire=0
    let frultTime="水果时间:\n"
    for (let i = 1; i <= maxSize; i++) {
        queryBody["page"] = i
        //console.log("正在查询第:" + i + "页的50条红包数据")
        //slog("当前累计红包:" + redTotal.toFixed(2) + "元\n")
        //slog("当前过期红包:" + expire.toFixed(2) + "元\n")
        //sleep(5000)
        let res = await axios.get(getUrl(queryBody), config)
        let redList = res.data.result.redList;
        for (let j = 0; j < redList.length; j++) {
            let obj =redList[j]
            let discount = Number(obj.discount)
            let balance = Number(obj.balance)
            if (discount>=12 && discount<=13){
                fruit++
                let ftime = moment(new Date(obj.beginTime)).format("yyyy-MM-DD HH:mm:ss")
                frultTime+=ftime+"\n"
            }
            //已使用的
            if (obj.hbState==3){
                redTotal = redTotal + discount;
            }
            //已过期的
            if (obj.hbState==4){
                expire = expire + balance;
                //console.log(JSON.stringify(obj))
            }

            if (i == maxSize - 1 && j == redList.length - 1) {
                let time = redList[j].beginTime;
                let firstRedTime = moment(new Date(time)).format("yyyy-MM-DD HH:mm:ss")
                console.log("今年第一个红包获取的时间是:" + firstRedTime)
            }
        }
        //sleep(1000)
        //console.log("休息1秒")
    }
    let total =Number(redTotal+expire)
    console.log("本年累计获得红包:" + total.toFixed(2)+ "元")
    console.log("本年累计使用红包:" + redTotal.toFixed(2) + "元")
    console.log("本年累计过期红包:" + expire.toFixed(2) + "元")
    console.log("本年累计种植水果:" + fruit + "次")
    console.log(frultTime)
}

function getUrl(queryBody) {
    let url = "https://api.m.jd.com/api?functionId=redPacket&appid=jd-cphdeveloper-m&body=" + encodeURI(JSON.stringify(queryBody)) + "&loginType=2&client=m&sceneval=2&g_login_type=1&g_ty=ajax&appCode=ms0ca95114"
    return url
}

/*
休眠函数sleep
调用 await sleep(1500)
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}




