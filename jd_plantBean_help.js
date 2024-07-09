/*
33 3,16 * * * jd_plantBean_help.js
*/
const $ = new Env('种豆得豆内部互助');
//Tue Jul 09 2024 13:08:38 GMT+0800 (中国标准时间)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let _0x233a3f = true,
  _0x4cabc4 = [],
  _0xbd4f2a = "",
  _0x5f0e7d,
  _0x35bb1f = [],
  _0x37544f = [],
  _0x34fee9 = [];
_0x35bb1f = [
'qj27hlitp6mgcyqbob6wwx7tj43h7wlwy7o5jii',
  'afjmnwak3un3yht2nki7sshoe4',
  'nkvdrkoit5o65u6cqxfqokj5jowdql73wx7b6ua',
  'bknudbr7e4sqxmsp532nxr25bbxmrwgs6mgds2q',
  'ds3ya4fnmkg56gqcbgnblg7poe3h7wlwy7o5jii',
  'e7lhibzb3zek3d6p3d5ogub42tx2rqi723ifufy',
];
const _0x57df0f = require("fs"),
  _0x1f2753 = require("./function/dylans"),
  _0x4e1305 = "https://api.m.jd.com/client.action",
  _0x16fb84 = process.env.BEAN_DELAY ? process.env.BEAN_DELAY * 1 : 2000;
let _0xc12e0b = new Date().getHours(),
  _0x53ea98 = true;
$.isNode() && process.env.PLANTNOHELP && process.env.PLANTNOHELP == "true" && _0xc12e0b > 9 && (_0x53ea98 = false, console.log("现在是9点后时段，不启用互助...."));
$.reqnum = 1;
!(async () => {
  await _0xe540f9();
  if (!_0x4cabc4[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x2967c3 = 0; _0x2967c3 < _0x4cabc4.length; _0x2967c3++) {
    if (_0x4cabc4[_0x2967c3]) {
      _0xbd4f2a = _0x4cabc4[_0x2967c3];
      $.UserName = decodeURIComponent(_0xbd4f2a.match(/pt_pin=([^; ]+)(?=;?)/) && _0xbd4f2a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2967c3 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = require("./USER_AGENTS").UARAM();
      console.log("\n----------------开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "-----------------\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x5f0e7d.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x1faa1d();
      if (_0x35bb1f.length == 0) {
        $.log("没有助力码,先执行种豆得豆任务在跑助力");
        return;
      }
      await _0x5ba7c1();
      await $.wait(1000);
    }
  }
})().catch(_0x2e7bc7 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2e7bc7 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x5ba7c1() {
  let _0x7acf4c = 0;
  for (let _0x1f7c09 of _0x35bb1f) {
    if (_0x7acf4c >= 3) break;
    console.log("\n开始助力好友: " + _0x1f7c09);
    if (!_0x1f7c09) continue;
    if (_0x1f7c09 === $.myPlantUuid) {
      console.log("\n跳过自己的plantUuid\n");
      continue;
    }
    await _0x27a39c(_0x1f7c09);
    if ($.helpResult && $.helpResult.code === "0") {
      if ($.helpResult.data?.["helpShareRes"]) {
        if ($.helpResult.data.helpShareRes.state === "1") console.log("助力成功"), console.log("" + $.helpResult.data.helpShareRes.promptText), _0x7acf4c++;else {
          if ($.helpResult.data.helpShareRes.state === "2") {
            console.log("今日助力机会已耗尽，不能再帮助好友助力了");
            break;
          } else {
            if ($.helpResult.data.helpShareRes.state === "3") {
              console.log("该好友今日已满9人助力,明天再来为Ta助力吧");
              _0x34fee9.push(_0x1f7c09);
            } else $.helpResult.data.helpShareRes.state === "4" ? (console.log("" + $.helpResult.data.helpShareRes.promptText), _0x7acf4c++) : console.log("助力其他情况：" + JSON.stringify($.helpResult.data.helpShareRes));
          }
        }
      } else {
        if ($.helpResult.errorCode) {
          console.log(JSON.stringify($.helpResult));
          break;
        }
      }
    } else console.log("助力失败: " + JSON.stringify($.helpResult));
    await $.wait(2000);
  }
}
function _0x43916f() {
  $.log("\n" + message + "\n");
  _0x233a3f = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : _0x233a3f;
  (!_0x233a3f || _0x233a3f === "false") && $.msg($.name, subTitle, message);
}
async function _0x6ecb7f() {
  $.shareSupportList = await _0x2c1bc0("plantShareSupportList", {
    "roundId": ""
  });
  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
        data: _0x2dc753
      } = $.shareSupportList,
      _0x17283d = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
      _0x3f9d12 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let _0x5515ef = [];
    _0x2dc753.map(_0x4c7796 => {
      _0x17283d <= _0x4c7796.createTime && _0x4c7796.createTime < _0x3f9d12 && _0x5515ef.push(_0x4c7796);
    });
    message += "【助力您的好友】共" + _0x5515ef.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}
async function _0x27a39c(_0x364b64) {
  const _0x54d1ea = {
    "plantUuid": _0x364b64
  };
  $.helpResult = await _0x2714cf("plantBeanIndex", _0x54d1ea);
}
function _0x5b8d24() {
  return new Promise(async _0xc3a96b => {
    $.get({
      "url": "https://cdn.jsdelivr.net/gh/6dylan6/updateTeam@main/shareCodes/plant_bean.json",
      "timeout": 20000
    }, (_0x531d67, _0x4458cb, _0x1d8dfe) => {
      try {
        if (_0x531d67) {} else _0x1d8dfe && (_0x1d8dfe = JSON.parse(_0x1d8dfe));
      } catch (_0x4524f2) {
        $.logErr(_0x4524f2, _0x4458cb);
      } finally {
        _0xc3a96b(_0x1d8dfe);
      }
    });
    await $.wait(15000);
    _0xc3a96b();
  });
}
function _0x1faa1d() {
  return new Promise(async _0x208824 => {
    if ($.shareCodesArr.length != 0) {
      if (_0x35bb1f[$.index - 1]) _0x35bb1f = $.shareCodesArr[$.index - 1].split("@");else {
        const _0x491797 = $.index > _0x37544f.length ? _0x37544f.length - 1 : $.index - 1;
        _0x35bb1f = _0x37544f[_0x491797].split("@");
      }
    }
    _0x35bb1f = _0x35bb1f.filter(_0x27d2ae => _0x34fee9.indexOf(_0x27d2ae) == -1 && !!_0x27d2ae);
    console.log("您提供了" + _0x35bb1f.length + "个助力码\n");
    console.log("将要助力的好友" + JSON.stringify(_0x35bb1f));
    _0x208824();
  });
}
function _0xe540f9() {
  return new Promise(_0x49a6f8 => {
    console.log("开始获取配置文件...\n");
    _0x5f0e7d = $.isNode() ? require("./sendNotify") : "";
    const _0x1f9bc1 = $.isNode() ? require("./jdCookie.js") : "";
    if (process.env.DY_PROXY) {
      const _0x3bb832 = require("./function/proxy.js");
      $.get = _0x3bb832.intoRequest($.get.bind($));
      $.post = _0x3bb832.intoRequest($.post.bind($));
    }
    $.shareCodesArr = [];
    if ($.isNode()) {
      if (process.env.BEANCODES) _0x35bb1f = process.env.BEANCODES.split("&");else process.env.PLANT_BEAN_SHARECODES && (process.env.PLANT_BEAN_SHARECODES.indexOf("\n") > -1 ? _0x37544f = process.env.PLANT_BEAN_SHARECODES.split("\n") : _0x37544f = process.env.PLANT_BEAN_SHARECODES.split("&"));
    }
    if ($.isNode()) {
      Object.keys(_0x1f9bc1).forEach(_0x56fb8e => {
        _0x1f9bc1[_0x56fb8e] && _0x4cabc4.push(_0x1f9bc1[_0x56fb8e]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else _0x4cabc4 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonFormat($.getdata("CookiesJD") || "[]").map(_0x22d29e => _0x22d29e.cookie)].filter(_0x27ebb2 => !!_0x27ebb2);
    if ($.isNode()) Object.keys(_0x37544f).forEach(_0x400565 => {
      _0x37544f[_0x400565] && $.shareCodesArr.push(_0x37544f[_0x400565]);
    });else {
      if ($.getdata("jd_fruit_inviter")) $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x3a663b => !!_0x3a663b);
      console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
    }
    let _0x2863e1 = _0x57df0f.existsSync("./bean_helpcode");
    if (process.env.PLANT_BEAN_SHARECODES) $.log("使用日志搜集的助力码\n");else {
      if (process.env.BEANCODES) $.log("使用变量指定的助力码\n");else {
        if (_0x37544f.length == 0 && _0x2863e1) {
          $.log("使用本地缓存的助力码\n");
          _0x35bb1f = _0x57df0f.readFileSync("./bean_helpcode", "utf-8");
          _0x35bb1f = JSON.parse(_0x35bb1f);
        } else $.log("没有检测到任何助力码！！！\n");
      }
    }
    _0x49a6f8();
  });
}
function _0x2c1bc0(_0x54a088, _0x745d5e = {}) {
  if (!_0x745d5e.version) {
    _0x745d5e.version = "9.2.4.2";
  }
  return _0x745d5e.monitor_source = "plant_app_plant_index", _0x745d5e.monitor_refer = "", new Promise(async _0x5b48e4 => {
    await $.wait(2000);
    const _0x28a0eb = {
      "url": _0x4e1305 + "?functionId=" + _0x54a088 + "&body=" + escape(JSON.stringify(_0x745d5e)) + "&appid=ld",
      "headers": {
        "Cookie": _0xbd4f2a,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 20000
    };
    $.get(_0x28a0eb, (_0x59771e, _0x2f84a2, _0x42e2e0) => {
      try {
        _0x59771e ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(_0x59771e)) : _0x42e2e0 = JSON.parse(_0x42e2e0);
      } catch (_0x411a7e) {
        $.logErr(_0x411a7e, _0x2f84a2);
      } finally {
        _0x5b48e4(_0x42e2e0);
      }
    });
  });
}
function _0x31c899() {
  return new Promise(_0x490439 => {
    const _0x5ca0ba = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0xbd4f2a,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x5ca0ba, (_0x5c0ff9, _0x48748, _0x161daa) => {
      try {
        if (_0x161daa) {
          _0x161daa = JSON.parse(_0x161daa);
          if (_0x161daa.islogin === "1") {} else _0x161daa.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x107bce) {
        console.log(_0x107bce);
      } finally {
        _0x490439();
      }
    });
  });
}
async function _0x2714cf(_0x2b3420, _0x409041 = {}, _0x32678c = 0) {
  if ($.reqnum % 5 == 0) {
    console.log("\n等待" + _0x16fb84 / 1000 + "秒......\n");
    _0x32678c = _0x16fb84;
  }
  $.reqnum++;
  _0x409041.version = "9.2.4.3";
  _0x409041.monitor_source = "plant_m_plant_index";
  let _0x44c1b3 = {
      "appId": "d246a",
      "functionId": "plantBeanIndex",
      "body": _0x409041,
      "appid": "signed_wh5",
      "clientVersion": $.UA.split(";")[2],
      "client": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    _0x4e8b65 = await _0x1f2753.getbody(_0x44c1b3),
    _0x3f937e = _0x4e1305 + "?" + _0x4e8b65;
  return await $.wait(_0x32678c), new Promise(async _0x56ad29 => {
    $.get(_0x578728(_0x3f937e), (_0x49a121, _0x419cf4, _0x23d77f) => {
      try {
        if (_0x49a121) console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log("function_id:" + _0x2b3420), $.logErr(_0x49a121);else _0x23d77f.indexOf("data") > -1 ? _0x23d77f = JSON.parse(_0x23d77f) : (_0x23d77f = JSON.parse(_0x23d77f), console.log(_0x23d77f.errorMessage));
      } catch (_0x119398) {
        $.logErr(_0x119398, _0x419cf4);
      } finally {
        _0x56ad29(_0x23d77f);
      }
    });
  });
}
function _0x578728(_0x57b791) {
  return {
    "url": _0x57b791,
    "headers": {
      "Cookie": _0xbd4f2a,
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Referer": "https://plantearth.m.jd.com/plantBean/index",
      "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 20000
  };
}
function _0x3bc293(_0x34d39f, _0x45e3cd) {
  const _0x5204bd = new RegExp("(^|&)" + _0x45e3cd + "=([^&]*)(&|$)", "i"),
    _0x56bffa = _0x34d39f.match(_0x5204bd);
  if (_0x56bffa != null) return unescape(_0x56bffa[2]);
  return null;
}
function _0x4b637a() {
  getstr = function (_0x152d1d) {
    let _0x3b0c6e = "",
      _0x3804b6 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let _0x6a232 = 0; _0x6a232 < _0x152d1d; _0x6a232++) {
      let _0x5534f5 = Math.round(Math.random() * (_0x3804b6.length - 1));
      _0x3b0c6e += _0x3804b6.substring(_0x5534f5, _0x5534f5 + 1);
    }
    return _0x3b0c6e;
  };
  let _0x5cb4f6 = Buffer.from(getstr(16), "utf8").toString("base64"),
    _0x1b3f07 = getstr(48);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": Date.now(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x5cb4f6,
      "od": _0x1b3f07,
      "ov": "Ctq=",
      "ud": _0x5cb4f6
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36";
}
function _0x1a6d3b(_0x3e1cca) {
  if (typeof _0x3e1cca == "string") try {
    return JSON.parse(_0x3e1cca);
  } catch (_0xf5de40) {
    return console.log(_0xf5de40), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t));else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body);
        });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}