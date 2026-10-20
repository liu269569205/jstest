/*
 * 草原云阅读任务
 *
 * 环境变量：
 *   CYY_ACCOUNT       手机号#密码#备注，多账号使用换行或 & 分隔
 *   OCR_SERVER        滑块识别服务，默认 http://ocr.xiameng.fun
 *   CYY_READ_SECONDS  每篇阅读秒数，最低且默认 60 秒
 *   CYY_MAX_READ      每号本次最多阅读篇数，0 表示完成全部未读任务
 *   CYY_READ_ENABLE   阅读任务开关，1 开启（默认），0 关闭
 *   CYY_SIGNIN_ENABLE H5 签到开关，1 开启（默认），0 关闭
 *   CYY_SIGNIN_ACTIVITY_ID 签到活动 ID，默认使用当前抓包确认的 10609026
 *   CYY_INVITE_ENABLE 自动绑定邀请开关，1 开启（默认），0 关闭
 *   CYY_INVITE_CODE   上级好友邀请码，默认使用成功邀请抓包确认的 2939478
 *   CYY_ACTIVITY_ID   阅读活动 ID，默认从草原云广告位动态发现
 *   CYY_SLIDE_WIDTH   H5 滑轨宽度，默认 296
 *   CYY_CACHE_FILE    登录态和设备缓存路径，默认使用脚本目录下的 .caoyuanyun_cache.json
 */
'use strict';

const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 可直接在此填写测试账号；环境变量 CYY_ACCOUNT/cyy 优先级更高。
const DEFAULT_CYY_ACCOUNT = '';
const ACCOUNT_TEXT = String(process.env.CYY_ACCOUNT || process.env.cyy || DEFAULT_CYY_ACCOUNT).trim();
const OCR_SERVER = normalizeServer(process.env.OCR_SERVER || process.env.ocrurl || 'http://ocr.xiameng.fun');
const READ_SECONDS = Math.max(60, Number.parseInt(process.env.CYY_READ_SECONDS || '60', 10) || 60);
const MAX_READ = Math.max(0, Number.parseInt(process.env.CYY_MAX_READ || '0', 10) || 0);
const READ_ENABLED = String(process.env.CYY_READ_ENABLE || '1') !== '0';
const SIGNIN_ENABLED = String(process.env.CYY_SIGNIN_ENABLE || '1') !== '0';
const SIGNIN_ACTIVITY_ID = Math.max(1, Number.parseInt(process.env.CYY_SIGNIN_ACTIVITY_ID || '10609026', 10) || 10609026);
const INVITE_ENABLED = String(process.env.CYY_INVITE_ENABLE || '1') !== '0';
const INVITE_CODE = String(process.env.CYY_INVITE_CODE || '2939478').trim();
const ACTIVITY_OVERRIDE = String(process.env.CYY_ACTIVITY_ID || '').trim();
const SLIDE_WIDTH = Math.max(200, Number.parseFloat(process.env.CYY_SLIDE_WIDTH || '296') || 296);

const APP_BASE = 'https://cyy.nmgcyy.com.cn';
const H5_BASE = 'https://ya.iyunxh.com';
const STATIC_H5_BASE = 'https://static2-ya.iyunxh.com';
const H5_ORIGIN = 'https://nmgrb.y-h5.iyunxh.com';
const APPID = 'nmgrb';
const DEFAULT_TENANT_ID = 2433;
const CACHE_SCHEMA_VERSION = 2;
const CACHE_FILE = path.resolve(process.env.CYY_CACHE_FILE || path.join(__dirname, '.caoyuanyun_cache.json'));
const ARTICLE_AUTHORIZATION = '8706b839ffeecb65ae8095ee9fd73f66';
const CAPTCHA_AES_KEY = '7Pf0cfZPHy1L7PS2PfCfP8r2BGi461LG';
const CAPTCHA_AES_IV = '8RsVKSCH8mQ4l7cu';
const NATIVE_UA = 'okhttp/3.12.13';
const H5_UA = 'Mozilla/5.0 (Linux; Android 12; PJJ110 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/101.0.4951.61 Mobile Safari/537.36 TMAppName/caoyuanyun tm_language/zh-cn';
const ARTICLE_UA = H5_UA + ' AgentWeb/4.1.3 UCBrowser/11.6.4.950 AgentWeb/4.1.3 cyy_caoyuan';

function log(message) {
    console.log(message);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeServer(value) {
    const text = String(value || '').trim().replace(/\/+$/, '');
    if (!text) return '';
    return /^https?:\/\//i.test(text) ? text : 'http://' + text;
}

function md5(value) {
    return crypto.createHash('md5').update(String(value)).digest('hex');
}

function randomString(length, alphabet) {
    const chars = alphabet || 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) result += chars[crypto.randomInt(0, chars.length)];
    return result;
}

function randomHex(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/** 使用账号哈希作为缓存键，避免在 JSON 顶层和日志中暴露完整手机号。 */
function accountCacheKey(account) {
    return 'account_' + crypto.createHash('sha256').update(String(account || '').trim().toLowerCase()).digest('hex').slice(0, 32);
}

function aesCbcEncrypt(plainText, key, iv, algorithm) {
    const cipher = crypto.createCipheriv(algorithm || 'aes-128-cbc', Buffer.from(key), Buffer.from(iv));
    return Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]).toString('base64');
}

function aesCbcDecrypt(cipherText, key, iv, algorithm) {
    const decipher = crypto.createDecipheriv(algorithm || 'aes-128-cbc', Buffer.from(key), Buffer.from(iv));
    return Buffer.concat([decipher.update(Buffer.from(String(cipherText), 'base64')), decipher.final()]).toString('utf8');
}

function parseAccounts(raw) {
    return String(raw || '').split(/[\r\n&]+/).map(line => {
        const parts = line.trim().split('#');
        const phone = String(parts.shift() || '').trim();
        const password = String(parts.shift() || '').trim();
        const remark = String(parts.join('#') || phone).trim();
        return { phone, password, remark };
    }).filter(account => account.phone && account.password);
}

function loadCache() {
    try {
        const parsed = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
        if (!parsed || typeof parsed !== 'object') return { version: CACHE_SCHEMA_VERSION, accounts: {} };
        if (Number(parsed.version) === CACHE_SCHEMA_VERSION && parsed.accounts && typeof parsed.accounts === 'object') {
            return parsed;
        }

        // 兼容旧版以手机号为顶层键的缓存，迁移时保留原 Token 和设备，不触发重新登录。
        const accounts = {};
        for (const [legacyAccount, value] of Object.entries(parsed)) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
            accounts[accountCacheKey(legacyAccount)] = value;
        }
        return { version: CACHE_SCHEMA_VERSION, accounts };
    } catch (error) {
        return { version: CACHE_SCHEMA_VERSION, accounts: {} };
    }
}

/** 先写同目录临时文件再替换，避免中断时留下半截 JSON。 */
function saveCache(cache) {
    const directory = path.dirname(CACHE_FILE);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = CACHE_FILE + '.tmp-' + process.pid + '-' + randomHex(6);
    try {
        fs.writeFileSync(temporary, JSON.stringify(cache, null, 2), { encoding: 'utf8', mode: 0o600 });
        fs.renameSync(temporary, CACHE_FILE);
    } finally {
        if (fs.existsSync(temporary)) fs.rmSync(temporary, { force: true });
    }
}

/** 统一网络请求：网络异常重试一次，HTTP 与业务状态交给调用层判断。 */
async function request(config, retries) {
    const left = retries == null ? 1 : retries;
    try {
        return await axios({ timeout: 30000, validateStatus: () => true, ...config });
    } catch (error) {
        if (left > 0) {
            await sleep(800);
            return request(config, left - 1);
        }
        throw error;
    }
}

/**
 * 草原云原生接口加密上下文。
 * 公式已用 HAR 登录样本逐字节复现：请求与响应使用同一 timestamp/random，但 key/iv 派生不同。
 */
class NativeCryptoContext {
    constructor() {
        this.timestamp = String(Date.now());
        this.random = randomString(16);
        this.headerKey = md5(Buffer.from(md5(this.timestamp) + this.random).toString('base64') + this.random);
    }

    headers() {
        return {
            tmencrypt: '1',
            tmtimestamp: this.timestamp,
            tmrandomnum: this.random,
            tmencryptkey: this.headerKey,
        };
    }

    httpsHeaders() {
        return {
            tmtimestampnew: this.timestamp,
            tmrandomnumnew: this.random,
            tmencryptkeynew: this.headerKey,
        };
    }

    encrypt(payload) {
        const key = md5(Buffer.from(this.timestamp).toString('base64') + md5(this.random)).slice(0, 16);
        const iv = md5(Buffer.from(this.random).toString('base64') + md5(this.timestamp)).slice(0, 16);
        return aesCbcEncrypt(JSON.stringify(payload || {}), key, iv);
    }

    decrypt(cipherText) {
        const key = md5(Buffer.from(this.timestamp).toString('base64') + md5(this.timestamp)).slice(0, 16);
        const iv = md5(this.random).slice(0, 16);
        const plain = aesCbcDecrypt(cipherText, key, iv);
        try {
            return JSON.parse(plain);
        } catch (error) {
            return plain;
        }
    }
}

/** 创建并持久化账号设备；已有设备只补字段，不更换既有设备标识。 */
function ensureDevice(cacheEntry, phone) {
    const current = cacheEntry.device && typeof cacheEntry.device === 'object' ? cacheEntry.device : {};
    cacheEntry.device = {
        deviceNum: current.deviceNum || randomHex(16),
        macNo: current.macNo || md5('cyy:' + phone + ':' + randomHex(16)).toUpperCase(),
        deviceToken: current.deviceToken || String(Date.now()) + String(crypto.randomInt(1000000, 10000000)),
        brand: current.brand || 'OPPO',
        model: current.model || 'PJJ110',
        androidVersion: current.androidVersion || '12',
        buildId: current.buildId || 'V417IR',
        appVersion: current.appVersion || '4.6.0',
        userAgent: current.userAgent || H5_UA,
        articleUserAgent: current.articleUserAgent || ARTICLE_UA,
        createdAt: current.createdAt || Date.now(),
    };
    return cacheEntry.device;
}

/** 原生接口调用器，负责请求加密、双版本动态头和响应解密。 */
async function nativeRequest(method, endpoint, payload, token) {
    const bodyContext = new NativeCryptoContext();
    const httpsContext = new NativeCryptoContext();
    const encrypted = bodyContext.encrypt(payload || {});
    const headers = {
        ...bodyContext.headers(),
        ...httpsContext.httpsHeaders(),
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': NATIVE_UA,
    };
    if (token) headers.token = token;

    const config = { method, url: APP_BASE + endpoint, headers };
    if (String(method).toUpperCase() === 'GET') {
        config.url += (endpoint.includes('?') ? '&' : '?') + 'tm_encrypt_data=' + encodeURIComponent(encrypted);
    } else {
        config.data = { tm_encrypt_data: encrypted };
    }
    const response = await request(config);
    let result = response.data || {};
    if (result && Number(result.tmencrypt) === 1 && typeof result.data === 'string') {
        result = { ...result, data: bodyContext.decrypt(result.data) };
    }
    return result;
}

function buildDevicePayload(memberCode, device) {
    return {
        member_code: memberCode,
        device_num: device.deviceNum,
        device_no: device.deviceNum,
        mac_no: device.macNo,
    };
}

/** H5 的 URL 编码规则，与前端 urlencode 保持一致。 */
function h5UrlEncode(value) {
    return encodeURIComponent(String(value))
        .replace(/!/g, '%21').replace(/'/g, '%27')
        .replace(/\(/g, '%28').replace(/\)/g, '%29')
        .replace(/\*/g, '%2A').replace(/%20/g, '+').replace(/~/g, '%7E');
}

function getAasKey(appKey) {
    let even = '';
    let odd = '';
    [...String(appKey)].forEach((char, index) => {
        if (index % 2 === 0) even += char;
        else odd += char;
    });
    return md5(even + odd);
}

function signH5Init(payload, appKey) {
    const query = Object.keys(payload).sort().map(key => key + '=' + h5UrlEncode(payload[key])).join('&');
    return md5(query + '&appkey=' + appKey);
}

function maskPhone(phone) {
    return String(phone).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}

/** 单账号运行器：原生登录态、H5 登录态、滑块和任务数据完全隔离。 */
class GrasslandAccountRunner {
    constructor(account, sharedCache) {
        this.account = account;
        this.sharedCache = sharedCache;
        this.cacheKey = accountCacheKey(account.phone);
        this.cache = sharedCache.accounts[this.cacheKey] || {};
        this.deviceWasCached = Boolean(this.cache.device && this.cache.device.deviceNum && this.cache.device.macNo);
        this.device = ensureDevice(this.cache, account.phone);
        this.tenant = null;
        this.serverDeviceToken = '';
        this.nativeToken = '';
        this.member = null;
        this.h5Token = '';
        this.h5UserId = 0;
        this.activityId = 0;
        this.passInfo = null;
        this.referer = '';
        this.verifyToken = '';
        this.summary = {
            signin: SIGNIN_ENABLED ? '未执行' : '已关闭',
            signinReward: '',
            signinDays: 0,
            completed: 0,
            readDone: 0,
            total: 0,
            rewards: [],
            point: 0,
            h5Integral: null,
            h5Gold: null,
            readEnabled: READ_ENABLED,
            error: '',
        };
        this.persist();
    }

    persist() {
        this.sharedCache.version = CACHE_SCHEMA_VERSION;
        this.sharedCache.accounts[this.cacheKey] = this.cache;
        saveCache(this.sharedCache);
    }

    async passwordLogin() {
        const payload = {
            mobile: this.account.phone,
            state: 2,
            site_code: '00000000000000000000000000000000',
            code: '',
            password: this.account.password,
            channel_sources: 'Default',
            device_num: this.device.deviceNum,
            device_no: this.device.deviceNum,
            imei_no: '',
            mac_no: this.device.macNo,
        };
        const result = await nativeRequest('POST', '/member/login/memberLogin', payload, '');
        if (Number(result.code) !== 200 || !result.data || !result.data.token) {
            throw new Error('密码登录失败：' + (result.msg || JSON.stringify(result).slice(0, 300)));
        }
        this.nativeToken = String(result.data.token);
        this.member = result.data.member_info || {};
        this.cache.token = this.nativeToken;
        this.cache.memberCode = this.member.member_code || '';
        this.cache.member = this.member;
        this.cache.loginTime = Date.now();
        this.cache.nativeTokenUpdatedAt = Date.now();
        delete this.cache.h5Token;
        delete this.cache.h5ExpireTime;
        delete this.cache.h5UserId;
        this.persist();
        log('[' + this.account.remark + '] 密码登录成功');
    }

    async getMemberInfo() {
        if (!this.nativeToken || !this.cache.memberCode) return null;
        const result = await nativeRequest(
            'GET',
            '/member/Member/getMemberInfo',
            buildDevicePayload(this.cache.memberCode, this.device),
            this.nativeToken
        );
        return Number(result.code) === 200 && result.data && typeof result.data === 'object' ? result.data : null;
    }

    async ensureNativeSession() {
        this.nativeToken = String(this.cache.token || '');
        if (this.nativeToken && this.cache.memberCode) {
            const info = await this.getMemberInfo();
            if (info) {
                this.member = info;
                this.cache.member = info;
                this.cache.lastNativeValidationAt = Date.now();
                this.persist();
                log('[' + this.account.remark + '] 使用有效缓存 token');
                return;
            }
            log('[' + this.account.remark + '] 缓存 token 已失效，重新密码登录');
        }
        await this.passwordLogin();
        const info = await this.getMemberInfo();
        if (info) this.member = info;
    }

    /**
     * 调用邀请页面使用的明文 APP 接口。
     * 这些接口在 HAR 中没有 tmencrypt 请求体，不能复用原生登录接口的加密封装。
     */
    async inviteRequest(method, endpoint, payload) {
        const config = {
            method,
            url: APP_BASE + endpoint,
            headers: {
                token: this.nativeToken,
                'User-Agent': NATIVE_UA,
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        if (String(method).toUpperCase() === 'GET') {
            const params = new URLSearchParams();
            Object.entries(payload || {}).forEach(([key, value]) => params.append(key, String(value)));
            if ([...params.keys()].length) config.url += '?' + params.toString();
        } else {
            config.data = payload || {};
        }
        const response = await request(config);
        return response.data || {};
    }

    /**
     * 自动邀请严格复现成功 HAR：先查当前绑定，未绑定才提交 addInvite，随后触发任务检查并二次确认。
     * 已绑定其他上级时不覆盖；当前账号就是邀请码所属账号时不提交自邀。
     */
    async runInvite() {
        if (!INVITE_ENABLED) return;
        if (!/^\d+$/.test(INVITE_CODE)) {
            log('[' + this.account.remark + '] 邀请跳过：CYY_INVITE_CODE 必须为数字');
            return;
        }
        // 邀请 HAR 的请求体不含 member_code，并明确保留空 imei_no，必须逐字段对齐。
        const devicePayload = {
            device_num: this.device.deviceNum,
            device_no: this.device.deviceNum,
            imei_no: '',
            mac_no: this.device.macNo,
        };
        try {
            const configResult = await this.inviteRequest('GET', '/api/Invite/getConfigs', devicePayload);
            if (Number(configResult.code) !== 200) {
                log('[' + this.account.remark + '] 邀请活动配置查询失败：' +
                    (configResult.msg || JSON.stringify(configResult).slice(0, 200)));
                return;
            }

            const beforeResult = await this.inviteRequest('POST', '/api/Invite/getMyinviteInfo', devicePayload);
            if (Number(beforeResult.code) !== 200) {
                log('[' + this.account.remark + '] 邀请状态查询失败：' +
                    (beforeResult.msg || JSON.stringify(beforeResult).slice(0, 200)));
                return;
            }

            // 单位邀请码 10128 与好友邀请码不是同一字段；该请求仅用于对齐邀请页面初始化顺序。
            await this.inviteRequest('POST', '/api/Invite/getUnitInviteCode', {
                get_all: 1,
                ...devicePayload,
            });

            const currentMemberId = String(this.member.member_id || this.member.user_id || '');
            const boundCode = String(beforeResult.data && beforeResult.data.invitep_code || '').trim();
            if (currentMemberId === INVITE_CODE) {
                log('[' + this.account.remark + '] 邀请：当前账号就是邀请码 ' + INVITE_CODE + ' 的所属账号，跳过自邀');
                return;
            }
            if (boundCode) {
                if (boundCode === INVITE_CODE) {
                    log('[' + this.account.remark + '] 邀请：已绑定邀请码 ' + INVITE_CODE + '，无需重复提交');
                } else {
                    log('[' + this.account.remark + '] 邀请：已绑定其他邀请码 ' + boundCode + '，不覆盖为 ' + INVITE_CODE);
                }
                return;
            }

            const added = await this.inviteRequest('POST', '/api/Invite/addInvite', {
                invitep_code: INVITE_CODE,
                ...devicePayload,
            });
            if (Number(added.code) !== 200) {
                log('[' + this.account.remark + '] 自动邀请失败：' +
                    (added.msg || JSON.stringify(added).slice(0, 200)));
                return;
            }

            // 成功抓包在 addInvite 后调用该接口，让服务端检查并结算当前可完成任务。
            await this.inviteRequest('GET', '/tenma01yyzj_rgzro/Task/getHaveTask', {});
            let afterResult = {};
            let confirmedCode = '';
            for (let check = 1; check <= 2; check++) {
                await sleep(check === 1 ? 1000 : 1500);
                afterResult = await this.inviteRequest('POST', '/api/Invite/getMyinviteInfo', devicePayload);
                confirmedCode = String(afterResult.data && afterResult.data.invitep_code || '').trim();
                if (Number(afterResult.code) === 200 && confirmedCode === INVITE_CODE) break;
            }
            if (Number(afterResult.code) === 200 && confirmedCode === INVITE_CODE) {
                const activity = configResult.data && configResult.data.data || {};
                const rewardPoint = Number(activity.point || 0);
                log('[' + this.account.remark + '] 自动邀请成功：已绑定 ' + INVITE_CODE +
                    (rewardPoint > 0 ? '，邀请人奖励 ' + rewardPoint + ' 积分' : ''));
            } else {
                log('[' + this.account.remark + '] 邀请接口返回成功，但二次查询未确认绑定');
            }
        } catch (error) {
            log('[' + this.account.remark + '] 自动邀请异常：' + error.message);
        }
    }

    async getTenantConfig() {
        const response = await request({
            method: 'GET',
            url: STATIC_H5_BASE + '/api/aosbase/_auth_h5init/' + APPID + '.json',
        });
        const result = response.data || {};
        if (String(result.code) !== '0' || !result.data) throw new Error('获取 H5 租户配置失败');
        this.tenant = JSON.parse(Buffer.from(result.data, 'base64').toString('utf8'));
    }

    createH5Headers(accessToken, userId, deviceToken) {
        const appKey = this.tenant.appkey;
        const guid = randomString(32, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        const timestamp = String(Date.now());
        const signature = md5(APPID + guid + timestamp + getAasKey(appKey));
        const tenantId = this.tenant.t_id || DEFAULT_TENANT_ID;
        return {
            'Access-Token': accessToken || '',
            'Access-User-Id': String(userId || 0),
            'Access-T-Id': String(tenantId),
            'Access-T-Id-In': String(this.tenant.t_id_in || tenantId),
            'Access-Api-Unique-Token': '1',
            'Access-Wxclient-Type': 'wx_app',
            'Access-Api-Signature': [APPID, guid, timestamp, signature].join(';'),
            'Access-Api-Dt': deviceToken || this.serverDeviceToken,
            'User-Agent': this.device.userAgent || H5_UA,
            Origin: H5_ORIGIN,
            Referer: H5_ORIGIN + '/',
            Accept: '*/*',
            'Content-Type': 'application/json',
            'X-Requested-With': 'com.innermongoliadaily.activity',
        };
    }

    async getServerDeviceToken() {
        const tenantId = this.tenant.t_id || DEFAULT_TENANT_ID;
        const response = await request({
            method: 'GET',
            url: H5_BASE + '/api/aosbase/_auth_dt',
            headers: {
                'Access-T-Id': String(tenantId),
                'Access-T-Id-In': String(this.tenant.t_id_in || tenantId),
                'Access-Api-Unique-Token': '1',
                'Access-Api-Dt': this.device.deviceToken,
                'User-Agent': this.device.userAgent || H5_UA,
                Origin: H5_ORIGIN,
                Referer: H5_ORIGIN + '/',
                'X-Requested-With': 'com.innermongoliadaily.activity',
            },
        });
        const result = response.data || {};
        if (String(result.code) !== '0' || typeof result.data !== 'string' || result.data.length < 68) {
            throw new Error('获取 H5 设备令牌失败：' + (result.msg || JSON.stringify(result).slice(0, 200)));
        }
        this.serverDeviceToken = result.data.substr(32, 36);
    }

    async h5Request(method, endpoint, data, token, userId) {
        const config = {
            method,
            url: H5_BASE + endpoint,
            headers: this.createH5Headers(token == null ? this.h5Token : token, userId == null ? this.h5UserId : userId),
        };
        if (String(method).toUpperCase() === 'GET') {
            if (data && Object.keys(data).length) {
                const params = new URLSearchParams();
                Object.entries(data).forEach(([key, value]) => params.append(key, String(value)));
                config.url += (endpoint.includes('?') ? '&' : '?') + params.toString();
            }
        } else {
            config.data = data || {};
        }
        const response = await request(config);
        return response.data || {};
    }

    async initializeH5() {
        const memberId = Number(this.member.member_id || this.member.user_id || 0);
        const payload = {
            app_user_token: this.nativeToken,
            appid: APPID,
            noncestr: randomString(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
            phone: this.account.phone,
            portrait_url: this.member.head_pic || '/images/default/head.jpg',
            timestamp: Math.floor(Date.now() / 1000),
            user_id: memberId,
            user_name: this.member.member_name || this.member.member_nickname || maskPhone(this.account.phone),
            wx_openid: '',
            wx_unionid: '',
        };
        payload.signature = signH5Init(payload, this.tenant.appkey);
        const result = await this.h5Request('POST', '/api/aosbase/_auth_appuserinit', payload, '', 0);
        const accessToken = String(result.data && result.data.access_token || '');
        if (String(result.code) !== '0' || !accessToken) {
            throw new Error('H5 登录失败：' + (result.msg || JSON.stringify(result).slice(0, 300)));
        }
        this.h5Token = accessToken;
        this.h5UserId = Number(result.data.data && result.data.data.user_id || 0);
        this.cache.h5Token = this.h5Token;
        this.cache.h5UserId = this.h5UserId;
        this.cache.h5ExpireTime = Number(result.data.expire_time || 0);
        this.cache.h5TokenUpdatedAt = Date.now();
        this.persist();
        log('[' + this.account.remark + '] H5 阅读会话初始化成功');
    }

    async discoverActivity() {
        if (ACTIVITY_OVERRIDE) return Number(ACTIVITY_OVERRIDE);
        const params = new URLSearchParams({
            device_num: this.device.deviceNum,
            device_no: this.device.deviceNum,
            imei_no: '',
            mac_no: this.device.macNo,
        });
        const response = await request({
            method: 'GET',
            url: APP_BASE + '/member/adv/getAdvList?' + params.toString(),
            headers: { token: this.nativeToken, 'User-Agent': NATIVE_UA },
        });
        const result = response.data || {};
        const item = Array.isArray(result.data) && result.data.find(entry => /\/module-study\/home\/home/i.test(entry.url || ''));
        if (item && item.url) {
            const id = new URL(item.url).searchParams.get('id');
            if (id) return Number(id);
        }
        return 11106660;
    }

    async getPassList() {
        return this.h5Request('GET', '/api/aoslearnfoot/_optionp_list', { activity_id: this.activityId });
    }

    async ensureH5Session() {
        await this.getTenantConfig();
        await this.getServerDeviceToken();
        this.activityId = await this.discoverActivity();

        const cachedValid = this.cache.h5Token && this.cache.h5UserId &&
            Number(this.cache.h5ExpireTime || 0) > Math.floor(Date.now() / 1000) + 300;
        if (cachedValid) {
            this.h5Token = this.cache.h5Token;
            this.h5UserId = Number(this.cache.h5UserId);
            const checked = await this.getPassList();
            if (String(checked.code) === '0') {
                this.cache.lastH5ValidationAt = Date.now();
                this.persist();
                log('[' + this.account.remark + '] 使用有效缓存 H5 会话');
                return checked;
            }
        }
        await this.initializeH5();
        return this.getPassList();
    }

    /** 查询 H5 账户资产；签到金币与阅读积分都以服务端账户数据为准。 */
    async getH5UserInfo() {
        const result = await this.h5Request('GET', '/api/aosbase/user_info_i', {});
        return String(result.code) === '0' && result.data && typeof result.data === 'object' ? result.data : null;
    }

    /** 查询签到次数。抓包确认 day_remain 为当天已签到次数，0 未签、1 已签。 */
    async getSigninState() {
        const result = await this.h5Request('GET', '/api/aossignin/user_times', {
            activity_id: SIGNIN_ACTIVITY_ID,
        });
        if (String(result.code) !== '0' || !result.data || typeof result.data !== 'object') return null;
        return {
            allCount: Number(result.data.all_remain || 0),
            todayCount: Number(result.data.day_remain || 0),
        };
    }

    /** 将签到接口返回的多种奖励压成可读摘要。 */
    formatSigninReward(data) {
        const rewards = [];
        const integral = Number(data && data.integral || 0);
        const gold = Number(data && data.gold || 0);
        if (integral > 0) rewards.push('+' + integral + '积分');
        if (gold > 0) rewards.push('+' + gold + '金币');
        if (Array.isArray(data && data.coupons) && data.coupons.length) rewards.push(data.coupons.length + '张券');
        if (Array.isArray(data && data.lottery) && data.lottery.length) rewards.push(data.lottery.length + '次抽奖机会');
        return rewards.join('、') || '已领取';
    }

    /** 每日签到：只在未签到时提交，并通过二次状态查询确认服务端确实计数。 */
    async runSignin() {
        if (!SIGNIN_ENABLED) return;
        try {
            const before = await this.getSigninState();
            if (!before) {
                this.summary.signin = '状态查询失败';
                log('[' + this.account.remark + '] 签到状态查询失败，跳过提交');
                return;
            }
            this.summary.signinDays = before.allCount;
            if (before.todayCount > 0) {
                this.summary.signin = '今日已签到';
                log('[' + this.account.remark + '] 签到：今日已签到，累计 ' + before.allCount + ' 次');
                return;
            }

            const submitted = await this.h5Request('POST', '/api/aossignin/ac_sub', {
                id: SIGNIN_ACTIVITY_ID,
                afs_tokenid: '',
                collect_info: '',
                longitude: 0,
                latitude: 0,
            });
            if (String(submitted.code) !== '0' || !submitted.data || submitted.data.success !== true) {
                this.summary.signin = '失败';
                log('[' + this.account.remark + '] 签到失败：' + (submitted.msg || JSON.stringify(submitted).slice(0, 200)));
                return;
            }

            await sleep(500);
            const after = await this.getSigninState();
            if (!after || after.todayCount <= before.todayCount) {
                this.summary.signin = '提交后未确认';
                log('[' + this.account.remark + '] 签到接口已受理，但服务端次数未变化');
                return;
            }
            this.summary.signin = '成功';
            this.summary.signinDays = after.allCount;
            this.summary.signinReward = this.formatSigninReward(submitted.data);
            log('[' + this.account.remark + '] 签到成功：' + this.summary.signinReward + '，累计 ' + after.allCount + ' 次');
        } catch (error) {
            this.summary.signin = '异常';
            log('[' + this.account.remark + '] 签到异常：' + error.message);
        }
    }

    /** 刷新汇总资产，单项查询失败不覆盖已经完成的签到或阅读结果。 */
    async refreshSummaryBalances() {
        try {
            const member = await this.getMemberInfo();
            if (member) {
                this.member = member;
                this.cache.member = member;
                this.cache.lastNativeValidationAt = Date.now();
                this.summary.point = Number(member.point || 0);
                this.persist();
            }
        } catch (error) {
            log('[' + this.account.remark + '] APP 积分刷新失败：' + error.message);
        }
        try {
            const h5User = await this.getH5UserInfo();
            if (h5User) {
                this.summary.h5Integral = Number(h5User.integral || 0);
                this.summary.h5Gold = Number(h5User.gold || 0);
            }
        } catch (error) {
            log('[' + this.account.remark + '] H5 资产刷新失败：' + error.message);
        }
    }

    async prepareTaskContext(existingPassList) {
        const passList = existingPassList || await this.ensureH5Session();
        if (String(passList.code) !== '0' || !Array.isArray(passList.data) || !passList.data.length) {
            throw new Error('当前没有阅读任务场次：' + (passList.msg || '空列表'));
        }
        const now = Math.floor(Date.now() / 1000);
        this.passInfo = passList.data.find(item => Number(item.state) === 1 &&
            (!item.start_time || Number(item.start_time) <= now) && (!item.end_time || Number(item.end_time) >= now)) || passList.data[0];
        this.referer = H5_ORIGIN + '/module-study/pass-detail/pass-detail?pass_id=' +
            this.passInfo.id + '&activity_id=' + this.activityId;

        let rule = {};
        try {
            const detailResponse = await request({
                method: 'GET',
                url: STATIC_H5_BASE + '/api/static_3/aoslearnfoot/_ac_detail/' + this.activityId + '.json',
            });
            rule = JSON.parse(detailResponse.data && detailResponse.data.data && detailResponse.data.data.rule || '{}');
        } catch (error) {}
        this.readSeconds = Math.max(READ_SECONDS, Number(rule.time_limit || 0));
    }

    async getTasks() {
        const result = await this.h5Request('GET', '/api/aosbasemodule/_task_list', {
            offset: 0,
            count: 30,
            module_id: this.passInfo.m_id || 41603,
            activity_id: this.passInfo.id,
        });
        if (String(result.code) !== '0' || !Array.isArray(result.data)) {
            throw new Error('读取任务列表失败：' + (result.msg || JSON.stringify(result).slice(0, 200)));
        }
        return result.data;
    }

    /** 生成与 APP 一致的 100ms 单调滑动轨迹，最后一个点严格落在 OCR 坐标。 */
    buildSlideTrack(x) {
        const count = crypto.randomInt(11, 16);
        const track = [];
        let last = 0;
        for (let index = 1; index <= count; index++) {
            const progress = index / count;
            const eased = x * (1 - Math.pow(1 - progress, 2.2));
            const point = index === count ? x : Math.max(last, Math.min(x, Number(eased.toFixed(1))));
            track.push({ x: point, y: 0, time: 100 });
            last = point;
        }
        return track;
    }

    async solveSliderRemote(blockBuffer, backgroundBuffer) {
        let firstError;
        try {
            const response = await request({
                method: 'POST',
                url: OCR_SERVER + '/api.Slider_Move',
                data: {
                    MovePicture: blockBuffer.toString('base64'),
                    Background: backgroundBuffer.toString('base64'),
                },
            }, 0);
            const x = findSliderX(response.data);
            if (x != null) return x;
            firstError = new Error('api.Slider_Move 未返回坐标');
        } catch (error) {
            firstError = error;
        }

        try {
            const FormData = require('form-data');
            const form = new FormData();
            form.append('bg', backgroundBuffer, { filename: 'bg.jpg', contentType: 'image/jpeg' });
            form.append('slide', blockBuffer, { filename: 'slide.png', contentType: 'image/png' });
            const response = await request({
                method: 'POST',
                url: OCR_SERVER + '/slideComparison',
                headers: form.getHeaders(),
                data: form,
            }, 0);
            const x = findSliderX(response.data);
            if (x != null) return x;
            throw new Error('slideComparison 未返回坐标');
        } catch (error) {
            throw new Error('OCR 识别失败：' + (firstError ? firstError.message + '；' : '') + error.message);
        }
    }

    async passCaptcha() {
        let lastError;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const plain = {
                    once: randomString(10, 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'),
                    referer: this.referer,
                    timestamp: Math.floor(Date.now() / 1000),
                    type: '1',
                };
                const signature = h5UrlEncode(aesCbcEncrypt(
                    JSON.stringify(plain), CAPTCHA_AES_KEY, CAPTCHA_AES_IV, 'aes-256-cbc'
                ));
                const info = await this.h5Request('GET', '/api/basemodule/_captcha_get', { ...plain, signature });
                if (String(info.code) !== '0' || !info.data || !info.data.block || !info.data.background) {
                    throw new Error(info.msg || '获取滑块图片失败');
                }
                const [blockResponse, backgroundResponse] = await Promise.all([
                    request({ method: 'GET', url: info.data.block, responseType: 'arraybuffer' }),
                    request({ method: 'GET', url: info.data.background, responseType: 'arraybuffer' }),
                ]);
                const blockBuffer = Buffer.from(blockResponse.data);
                const backgroundBuffer = Buffer.from(backgroundResponse.data);
                const sourceWidth = getImageWidth(backgroundBuffer);
                const rawX = await this.solveSliderRemote(blockBuffer, backgroundBuffer);
                const x = Number((rawX * SLIDE_WIDTH / sourceWidth).toFixed(1));
                const track = this.buildSlideTrack(x);
                await sleep(track.length * 100 + crypto.randomInt(100, 401));

                const encryptedTrack = aesCbcEncrypt(
                    JSON.stringify({ x, width: SLIDE_WIDTH, track }),
                    CAPTCHA_AES_KEY,
                    CAPTCHA_AES_IV,
                    'aes-256-cbc'
                );
                const checked = await this.h5Request('POST', '/api/basemodule/_captcha_check', {
                    token: info.data.token,
                    data: encryptedTrack,
                    referer: this.referer,
                    type: '1',
                });
                if (String(checked.code) !== '0' || !checked.data || !checked.data.result || !checked.data.token) {
                    throw new Error(checked.msg || '滑块校验未通过');
                }
                const verified = await this.h5Request('POST', '/api/aosbasemodule/intelverifcode_check', {
                    validate: checked.data.token,
                    verif_type: 3,
                    afs_uuid: '',
                    source: 'yundian',
                });
                if (String(verified.code) !== '0' || !verified.data || !verified.data.tokenid) {
                    throw new Error(verified.msg || '安全验证 tokenid 获取失败');
                }
                this.verifyToken = verified.data.tokenid;
                log('[' + this.account.remark + '] 滑块验证成功 x=' + x + '（原图 ' + rawX + '/' + sourceWidth + '）');
                return;
            } catch (error) {
                lastError = error;
                log('[' + this.account.remark + '] 滑块第 ' + attempt + '/3 次失败：' + error.message);
                if (attempt < 3) await sleep(800);
            }
        }
        throw lastError || new Error('滑块验证失败');
    }

    extractContentId(task) {
        try {
            const rule = JSON.parse(task.rule || '{}');
            const text = String(rule.news_id || (rule.content_info && rule.content_info.id) || '');
            const matched = text.match(/ArticleDetail(\d+)/i);
            return matched ? Number(matched[1]) : 0;
        } catch (error) {
            return 0;
        }
    }

    async addArticlePoint(contentId) {
        const response = await request({
            method: 'POST',
            url: APP_BASE + '/fcpublic/memberpoint/editPoint',
            headers: {
                authorization: ARTICLE_AUTHORIZATION,
                token: this.nativeToken,
                'User-Agent': this.device.articleUserAgent || ARTICLE_UA,
                Origin: APP_BASE,
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: { from_component: 'fcinformation', article_id: String(contentId), type: 1, read_time: 0 },
        });
        const result = response.data || {};
        if (Number(result.code) === 200) log('[' + this.account.remark + '] 文章阅读积分已上报');
    }

    async completeArticleReading(contentId) {
        const response = await request({
            method: 'POST',
            url: APP_BASE + '/fcpublic/yundian/complateReading',
            headers: {
                'User-Agent': this.device.articleUserAgent || ARTICLE_UA,
                Origin: APP_BASE,
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                content_id: contentId,
                member_id: Number(this.member.member_id || this.member.user_id || 0),
            },
        });
        const result = response.data || {};
        return Number(result.code) === 200 && result.data && String(result.data.code) === '0';
    }

    async finishTask(recordId) {
        return this.h5Request('POST', '/api/aosbasemodule/task_done', {
            task_record_id: recordId,
            collect_info: '',
            afs_tokenid: this.verifyToken,
            device_token: this.device.deviceToken,
        });
    }

    async runOneTask(task, index, total) {
        const created = await this.h5Request('POST', '/api/aosbasemodule/task_create', { task_id: task.id });
        const recordId = Number(created.data && created.data.task_record_id || task.task_record_id || 0);
        if (String(created.code) !== '0' || !recordId) {
            log('[' + this.account.remark + '] 任务创建失败：' + (created.msg || task.title));
            return false;
        }
        const contentId = this.extractContentId(task);
        if (!contentId) {
            log('[' + this.account.remark + '] 无法提取文章 ID，跳过：' + task.title);
            return false;
        }

        log('[' + this.account.remark + '] 阅读 ' + index + '/' + total + '：' + task.title);
        await this.addArticlePoint(contentId);
        log('[' + this.account.remark + '] 等待 ' + this.readSeconds + ' 秒后领取奖励...');
        await sleep(this.readSeconds * 1000);
        const reported = await this.completeArticleReading(contentId);
        if (!reported) log('[' + this.account.remark + '] 阅读完成上报未确认，继续检查任务结算');
        await sleep(1000);

        let finished = await this.finishTask(recordId);
        if (String(finished.code) !== '0' && /验证|afs|tokenid/i.test(String(finished.msg || ''))) {
            log('[' + this.account.remark + '] 安全验证已失效，重新过滑块后重试结算');
            await this.passCaptcha();
            finished = await this.finishTask(recordId);
        }
        if (String(finished.code) !== '0') {
            log('[' + this.account.remark + '] 奖励领取失败：' + (finished.msg || JSON.stringify(finished).slice(0, 200)));
            return false;
        }
        const option = finished.data && finished.data.option || {};
        const reward = option.goods_title || option.title || '已领取';
        this.summary.rewards.push(reward);
        log('[' + this.account.remark + '] 奖励领取成功：' + reward);
        return true;
    }

    async run() {
        log('[' + this.account.remark + '] 设备：' +
            (this.deviceWasCached ? '使用缓存 ' : '首次生成并缓存 ') +
            this.device.brand + ' ' + this.device.model + ' Android ' + this.device.androidVersion);
        await this.ensureNativeSession();
        this.summary.point = Number(this.member.point || 0);
        const passList = await this.ensureH5Session();
        await this.runSignin();
        await this.runInvite();
        await this.refreshSummaryBalances();

        if (!READ_ENABLED) {
            log('[' + this.account.remark + '] 阅读任务已关闭，仅执行登录、签到和资产查询');
            return this.summary;
        }

        await this.prepareTaskContext(passList);
        const tasks = await this.getTasks();
        const undone = tasks.filter(task => Number(task.user_done) !== 1);
        this.summary.total = tasks.length;
        this.summary.readDone = tasks.length - undone.length;
        log('[' + this.account.remark + '] 今日任务 ' + (tasks.length - undone.length) + '/' + tasks.length +
            '，未完成 ' + undone.length + ' 篇，单篇等待 ' + this.readSeconds + ' 秒');
        if (!undone.length) {
            await this.refreshSummaryBalances();
            return this.summary;
        }

        await this.passCaptcha();
        const selected = MAX_READ > 0 ? undone.slice(0, MAX_READ) : undone;
        for (let index = 0; index < selected.length; index++) {
            if (await this.runOneTask(selected[index], index + 1, selected.length)) this.summary.completed++;
            if (index < selected.length - 1) await sleep(1000);
        }

        const afterTasks = await this.getTasks();
        const doneCount = afterTasks.filter(task => Number(task.user_done) === 1).length;
        this.summary.total = afterTasks.length;
        this.summary.readDone = doneCount;
        await this.refreshSummaryBalances();
        log('[' + this.account.remark + '] 服务端进度 ' + doneCount + '/' + afterTasks.length);
        return this.summary;
    }
}

function findSliderX(value, depth) {
    const level = depth || 0;
    if (level > 6 || value == null) return null;
    if (Array.isArray(value)) {
        if (value.length && Number.isFinite(Number(value[0]))) return Number(value[0]);
        for (const item of value) {
            const found = findSliderX(item, level + 1);
            if (found != null) return found;
        }
        return null;
    }
    if (typeof value === 'object') {
        for (const key of ['x', 'target_x']) {
            if (Number.isFinite(Number(value[key]))) return Number(value[key]);
        }
        if (Array.isArray(value.target) && Number.isFinite(Number(value.target[0]))) return Number(value.target[0]);
        for (const item of Object.values(value)) {
            const found = findSliderX(item, level + 1);
            if (found != null) return found;
        }
    }
    return null;
}

/** 读取 PNG/JPEG 原始宽度，用于把 OCR 像素坐标换算成页面滑轨坐标。 */
function getImageWidth(buffer) {
    if (buffer.length >= 24 && buffer.slice(1, 4).toString('ascii') === 'PNG') return buffer.readUInt32BE(16);
    if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buffer.length) {
            if (buffer[offset] !== 0xff) {
                offset++;
                continue;
            }
            const marker = buffer[offset + 1];
            if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
                return buffer.readUInt16BE(offset + 7);
            }
            if (marker === 0xd8 || marker === 0xd9) {
                offset += 2;
                continue;
            }
            const length = buffer.readUInt16BE(offset + 2);
            if (length < 2) break;
            offset += length + 2;
        }
    }
    throw new Error('无法识别滑块背景图宽度');
}

async function main() {
    const accounts = parseAccounts(ACCOUNT_TEXT);
    if (!accounts.length) {
        log('请设置 CYY_ACCOUNT，格式：手机号#密码#备注，多账号使用换行或 & 分隔');
        return;
    }
    const cache = loadCache();
    const summaries = [];
    log('草原云任务：共 ' + accounts.length + ' 个账号，签到=' + (SIGNIN_ENABLED ? '开' : '关') +
        '，阅读=' + (READ_ENABLED ? '开' : '关'));

    for (let index = 0; index < accounts.length; index++) {
        const account = accounts[index];
        log('\n======== ' + account.remark + ' ========');
        const runner = new GrasslandAccountRunner(account, cache);
        try {
            const summary = await runner.run();
            summaries.push({ account, ...summary });
        } catch (error) {
            log('[' + account.remark + '] 执行失败：' + error.message);
            summaries.push({ account, ...runner.summary, error: error.message });
        }
        if (index < accounts.length - 1) await sleep(3000);
    }

    log('\n======== 本次汇总 ========');
    for (const item of summaries) {
        const gold = Number.isFinite(item.h5Gold) ? item.h5Gold : '获取失败';
        log('当前账号：' + maskPhone(item.account.phone) + ' 金币：' + gold);
    }
}

main().catch(error => {
    log('草原云阅读异常：' + error.message);
    if (process.env.CYY_DEBUG === '1') log(error.stack);
    process.exitCode = 1;
});
