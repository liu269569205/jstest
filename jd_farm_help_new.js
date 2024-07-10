/*
新农场助力
33 3,9 * * * jd_farm_help_new.js
export NEWFRUITCODES = 'xxx&xxx' 可指定助力码助力，多个用&分割，不指定则自动搜集任务助力码
*/

const $ = new Env('新农场助力');
let bdy_0x317fe4 = [],
  bdy_0x4972b8 = [],
  bdy_0x25e3d3 = "",
  bdy_0x1e85f7,
  bdy_0xba8c2e = [],
  bdy_0x110156 = "",
  bdy_0x14ba56 = "",
  bdy_0x560b3d = "",
  bdy_0x1f572c = [],
  bdy_0x2e7194 = {},
  bdy_0xb855ab = false;
const bdy_0x106791 = require("fs"),
  bdy_0x186b41 = "https://api.m.jd.com/client.action",
  bdy_0xdba187 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
  bdy_0x55fc5f = require("./function/dylanv");
$.reqnum = 1;
!(async () => {
  await bdy_0x51c3e8();
  if (!bdy_0x4972b8[0]) {
    const _0x36f903 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x36f903);
    return;
  }
  $.log("\n当前版本：2024/4/29");
  $.log("问题建议：https://t.me/dylan_jdpro\n");
  $.log("\n环境变量：");
  $.log("export DY_PROXY='api_url' 开启api代理");
  $.log("export NEWNEWFRUITCODES = 'xxx&xxx' 可指定助力码助力，多个用&分割，不指定则自动搜集任务助力码");
  for (let _0x5326c2 = 0; _0x5326c2 < bdy_0x4972b8.length; _0x5326c2++) {
    if (bdy_0x4972b8[_0x5326c2]) {
      bdy_0x25e3d3 = bdy_0x4972b8[_0x5326c2];
      $.UserName = decodeURIComponent(bdy_0x25e3d3.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x25e3d3.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x5326c2 + 1;
      $.isLogin = true;
      $.nickName = "";
      await bdy_0x5898d3();
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        const _0x24474b = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x24474b);
        $.isNode() && (await bdy_0x1e85f7.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      bdy_0x14ba56 = "";
      bdy_0x560b3d = "";
      bdy_0x2e7194 = {};
      $.UA = require("./USER_AGENTS").UARAM();
      await bdy_0x3db035();
      if (bdy_0xba8c2e.length == 0) {
        $.log("没有助力码,请变量NEWFRUITCODES指定或执行农场任务自动收集助力码");
        return;
      }
      await bdy_0x1d5e2d();
      await $.wait(2000);
    }
  }
})().catch(_0x132327 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x132327 + "!", "");
}).finally(() => {
  $.done();
});
async function bdy_0x1d5e2d() {
  bdy_0x560b3d = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);
  try {
    await bdy_0x43adf0();
  } catch (_0xd8864d) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️");
    $.logErr(_0xd8864d);
  }
}
async function bdy_0x456fb8() {
  await bdy_0x37c062();
  await bdy_0x4700d4();
}
async function bdy_0x4700d4() {
  console.log("\n开始天天抽奖助力...");
  for (let _0x4ce23e of bdy_0xba8c2e) {
    if (_0x4ce23e === $.farmInfo.farmUserPro.shareCode) {
      console.log("跳过自己\n");
      continue;
    }
    await bdy_0x4eb814(_0x4ce23e);
    await $.wait(1000);
    if ($.lotteryMasterHelpRes.helpResult === undefined) {
      break;
    }
    if ($.lotteryMasterHelpRes.helpResult.code === "0") {
      console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "成功\n");
    } else {
      if ($.lotteryMasterHelpRes.helpResult.code === "11") {
        console.log("不要重复助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "\n");
      } else {
        if ($.lotteryMasterHelpRes.helpResult.code === "13") {
          console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "失败,助力次数耗尽\n");
          break;
        }
      }
    }
  }
}
async function bdy_0x43adf0() {
  console.log("\n开始助力好友...");
  let _0x4eb315 = "",
    _0x39027f = 0;
  for (let _0x27ea8a of bdy_0xba8c2e) {
    console.log("去助力: " + _0x27ea8a);
    if (!_0x27ea8a) {
      continue;
    }
    if (_0x39027f > 2) {
      break;
    }
    let _0x9d6e35 = await bdy_0x401926(_0x27ea8a);
    await $.wait(2000);
    if (_0x9d6e35.code === 0) {
      if (_0x9d6e35.data.bizCode === 0) {
        console.log("【助力结果】: 助力成功");
        _0x4eb315 += (_0x9d6e35.data.result.masterInfo.nickname || "匿名用户") + ",";
      } else {
        if (_0x9d6e35.data.bizCode === 5004) {
          console.log("【助力结果】: 助力失败，今天助力次数已耗尽");
          break;
        } else {
          if (_0x9d6e35.data.bizCode === 5003) {
            console.log("【助力结果】: 已经助力过TA了");
          } else {
            if (_0x9d6e35.data.bizCode === 5005) {
              console.log("【助力结果】: 对方已满助力");
              bdy_0x1f572c.push(_0x27ea8a);
            } else {
              if (_0x9d6e35.data.bizCode === 5002) {
                console.log("【助力结果】: 不能给自己助力");
              } else {
                _0x9d6e35.data.bizCode === -1001 ? (console.log("【助力失败】: " + _0x9d6e35.data.bizMsg), _0x39027f++) : console.log("助力其他情况：" + JSON.stringify(_0x9d6e35));
              }
            }
          }
        }
      }
    } else {
      console.log("助力失败::" + JSON.stringify(_0x9d6e35));
    }
  }
}
async function bdy_0x37c062() {
  await bdy_0xe3ce76();
  $.friendList ? (console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个"), await bdy_0x14de94(), $.friendList.inviteFriendCount > 0 ? $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await bdy_0x2b6c1a(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友")) : console.log("查询好友列表失败\n");
}
async function bdy_0x14de94() {
  for (let _0x21048d of bdy_0xba8c2e) {
    if (_0x21048d === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    if (bdy_0xba8c2e.findIndex(_0x21b35d => _0x21b35d === _0x21048d) >= 5) {
      break;
    }
    await bdy_0x250fa7(_0x21048d);
    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
      console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
    } else {
      $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
  }
}
async function bdy_0x4eb814() {
  const _0x1fe474 = {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 24,
    channel: 1
  };
  $.lotteryMasterHelpRes = await initForFarm(_0x1fe474);
}
async function bdy_0x250fa7() {
  const _0x484ff0 = {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 24,
    channel: 1
  };
  $.inviteFriendRes = await initForFarm(_0x484ff0);
}
async function bdy_0x562df6() {
  for (let _0xfff868 of Array(3)) {
    const _0x41922c = {
      sid: "",
      mpin: "",
      shareCode: arguments[0],
      babelChannel: "121",
      version: 24,
      channel: 1,
      lat: "0",
      lng: "0"
    };
    $.helpResult = await initForFarm(_0x41922c);
    if ($.helpResult.code == "0") {
      break;
    }
    await $.wait(2000);
  }
}
async function bdy_0x401926(_0x41a3aa, _0x5a166d = 1500) {
  $.reqnum % 5 == 0 && (console.log("\n等待" + bdy_0xdba187 / 1000 + "秒......\n"), _0x5a166d = bdy_0xdba187);
  $.reqnum++;
  const _0x20e5ef = {
    version: 1,
    inviteCode: _0x41a3aa,
    shareChannel: "",
    assistChannel: ""
  };
  let _0x2aa06f = {
      appId: "28981",
      fn: "farm_assist",
      body: _0x20e5ef,
      apid: "signed_wh5",
      ver: $.UA.split(";")[2],
      cl: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    },
    _0x122db0 = await bdy_0x55fc5f.getbody(_0x2aa06f);
  return new Promise(_0x3ca392 => {
    const _0x24ac12 = {
      cookie: bdy_0x25e3d3,
      origin: "https://h5.m.jd.com",
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x586517 = {
      url: "https://api.m.jd.com/client.action?functionId=farm_assist&" + _0x122db0,
      headers: _0x24ac12,
      timeout: 30000
    };
    setTimeout(() => {
      $.get(_0x586517, async (_0x41bd87, _0x1547fc, _0x5f2105) => {
        try {
          _0x41bd87 ? (console.log("farm_assist: 请求失败 ‼️‼️"), console.log(JSON.stringify(_0x41bd87))) : bdy_0xd47897(_0x5f2105) && (_0x5f2105 = JSON.parse(_0x5f2105));
        } catch (_0x417d79) {
          $.logErr(_0x417d79, _0x1547fc);
        } finally {
          _0x3ca392(_0x5f2105);
        }
      });
    }, _0x5a166d);
  });
}
async function bdy_0xe3ce76() {
  const _0x7b66cb = {
    version: 24,
    channel: 1
  };
  $.friendList = await bdy_0x21d5a0("friendListInitForFarm", _0x7b66cb);
}
async function bdy_0x2b6c1a() {
  $.awardInviteFriendRes = await bdy_0x21d5a0("awardInviteFriendForFarm");
}
async function bdy_0x9c6bdd() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + bdy_0xb855ab === "false";
  }
  $.ctrTemp ? ($.msg($.name, bdy_0x560b3d, bdy_0x14ba56, bdy_0x2e7194), $.isNode() && (bdy_0x110156 += bdy_0x560b3d + "\n" + bdy_0x14ba56 + ($.index !== bdy_0x4972b8.length ? "\n\n" : ""))) : $.log("\n" + bdy_0x14ba56 + "\n");
}
function bdy_0x5ad29c(_0x15efdf) {
  let _0x351e72;
  _0x15efdf ? _0x351e72 = new Date(_0x15efdf) : _0x351e72 = new Date();
  return _0x351e72.getFullYear() + "-" + (_0x351e72.getMonth() + 1 >= 10 ? _0x351e72.getMonth() + 1 : "0" + (_0x351e72.getMonth() + 1)) + "-" + (_0x351e72.getDate() >= 10 ? _0x351e72.getDate() : "0" + _0x351e72.getDate());
}
function bdy_0x3db035() {
  return new Promise(async _0x2c7c66 => {
    if ($.shareCodesArr.length != 0) {
      if (bdy_0xba8c2e[$.index - 1]) {
        bdy_0xba8c2e = $.shareCodesArr[$.index - 1].split("@");
      } else {
        const _0x3b0571 = $.index > bdy_0x317fe4.length ? bdy_0x317fe4.length - 1 : $.index - 1;
        bdy_0xba8c2e = bdy_0x317fe4[_0x3b0571].split("@");
      }
    }
    bdy_0xba8c2e = bdy_0xba8c2e.filter(_0x64068a => bdy_0x1f572c.indexOf(_0x64068a) == -1 && !!_0x64068a);
    console.log("您提供了" + bdy_0xba8c2e.length + "个农场助力码\n");
    console.log("将要助力的好友" + JSON.stringify(bdy_0xba8c2e));
    _0x2c7c66();
  });
}
function bdy_0x51c3e8() {
  return new Promise(_0x517b2a => {
    console.log("开始获取配置文件...\n");
    bdy_0x1e85f7 = $.isNode() ? require("./sendNotify") : "";
    const _0x1126bd = $.isNode() ? require("./jdCookie.js") : "";
    if (process.env.DY_PROXY) {
      const _0x21db16 = require("./function/proxy.js");
      $.get = _0x21db16.intoRequest($.get.bind($));
      $.post = _0x21db16.intoRequest($.post.bind($));
    }
    $.shareCodesArr = [];
    if ($.isNode()) {
      if (process.env.NEWFRUITCODES) {
        bdy_0xba8c2e = process.env.NEWFRUITCODES.split("&");
      } else {
        process.env.NEWFRUITSHARECODES && (process.env.NEWFRUITSHARECODES.indexOf("\n") > -1 ? bdy_0x317fe4 = process.env.NEWFRUITSHARECODES.split("\n") : bdy_0x317fe4 = process.env.NEWFRUITSHARECODES.split("&"));
      }
    }
    if ($.isNode()) {
      Object.keys(_0x1126bd).forEach(_0x54bf47 => {
        _0x1126bd[_0x54bf47] && bdy_0x4972b8.push(_0x1126bd[_0x54bf47]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      bdy_0x4972b8 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...bdy_0x2b463a($.getdata("CookiesJD") || "[]").map(_0x59cc6e => _0x59cc6e.cookie)].filter(_0xc02ddc => !!_0xc02ddc);
    }
    if ($.isNode()) {
      Object.keys(bdy_0x317fe4).forEach(_0x36eafe => {
        bdy_0x317fe4[_0x36eafe] && $.shareCodesArr.push(bdy_0x317fe4[_0x36eafe]);
      });
    } else {
      if ($.getdata("jd_fruit_inviter")) {
        $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x1f02fc => !!_0x1f02fc);
      }
      console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
    }
    let _0x128f4a = bdy_0x106791.existsSync("./fruit_helpcode_new");
    if (process.env.NEWFRUITSHARECODES) {
      $.log("使用日志搜集的助力码\n");
    } else {
      if (process.env.NEWFRUITCODES) {
        $.log("使用变量指定的助力码\n");
      } else {
        if (bdy_0x317fe4.length == 0 && _0x128f4a) {
          $.log("使用本地缓存的助力码\n");
          bdy_0xba8c2e = bdy_0x106791.readFileSync("./fruit_helpcode_new", "utf-8");
          try {
            bdy_0xba8c2e = JSON.parse(bdy_0xba8c2e);
          } catch {
            console.log("本地缓存的助力码格式有误，请检查！");
            console.log(bdy_0xba8c2e + bdy_0xba8c2e.length);
            bdy_0xba8c2e = [];
          }
        } else {
          $.log("没有检测到任何助力码！！！\n");
        }
      }
    }
    _0x517b2a();
  });
}
function bdy_0x5898d3() {
  return new Promise(_0x446cfa => {
    const _0x55a0f7 = {
      Cookie: bdy_0x25e3d3,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x503c8b = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x55a0f7,
      timeout: 10000
    };
    $.get(_0x503c8b, (_0x44af73, _0x37cfb3, _0x225fd0) => {
      try {
        if (_0x225fd0) {
          _0x225fd0 = JSON.parse(_0x225fd0);
          if (!(_0x225fd0.islogin === "1")) {
            _0x225fd0.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x140898) {
        console.log(_0x140898);
      } finally {
        _0x446cfa();
      }
    });
  });
}
function bdy_0x21d5a0(_0x496a8e, _0x986305 = {}, _0x52e4e4 = 1500) {
  $.reqnum % 5 == 0 && (console.log("\n等待" + bdy_0xdba187 / 1000 + "秒......\n"), _0x52e4e4 = bdy_0xdba187);
  $.reqnum++;
  return new Promise(_0x215ded => {
    setTimeout(() => {
      $.get(bdy_0x2bcbd5(_0x496a8e, _0x986305), (_0x28d864, _0x5380fb, _0x28d314) => {
        try {
          _0x28d864 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x28d864)), console.log("function_id:" + _0x496a8e), $.logErr(_0x28d864)) : bdy_0xd47897(_0x28d314) && (_0x28d314 = JSON.parse(_0x28d314));
        } catch (_0x1037de) {
          $.logErr(_0x1037de, _0x5380fb);
        } finally {
          _0x215ded(_0x28d314);
        }
      });
    }, _0x52e4e4);
  });
}
function bdy_0xd47897(_0xfb2993) {
  try {
    if (typeof JSON.parse(_0xfb2993) == "object") {
      return true;
    }
  } catch (_0x3a7c70) {
    console.log(_0x3a7c70);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function bdy_0x2bcbd5(_0x253bde, _0x17ab9f = {}) {
  const _0x63a25a = {
    Host: "api.m.jd.com",
    Accept: "*/*",
    Origin: "https://carry.m.jd.com",
    "Accept-Encoding": "gzip, deflate, br",
    "User-Agent": $.UA,
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    Referer: "https://carry.m.jd.com/",
    Cookie: bdy_0x25e3d3
  };
  return {
    url: bdy_0x186b41 + "?functionId=" + _0x253bde + "&body=" + encodeURIComponent(JSON.stringify(_0x17ab9f)) + "&appid=wh5",
    headers: _0x63a25a,
    timeout: 10000
  };
}
function bdy_0x2b463a(_0x11ac0a) {
  if (typeof _0x11ac0a == "string") {
    try {
      return JSON.parse(_0x11ac0a);
    } catch (_0x304aab) {
      console.log(_0x304aab);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(o, t) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((r, i) => {
        s.call(this, t, (t, e, s) => {
          t ? i(t) : r(e);
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
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
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
      return new Promise(r => {
        this.get({
          url: t
        }, (t, e, s) => r(s));
      });
    }
    runScript(a, o) {
      return new Promise(r => {
        let t = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        t = t && t.replace(/\n/g, "").trim();
        var e = (e = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout")) ? +e : 20,
          [s, i] = (e = o && o.timeout ? o.timeout : e, t.split("@"));
        this.post({
          url: `http://${i}/v1/scripting/evaluate`,
          body: {
            script_text: a,
            mock_type: "cron",
            timeout: e
          },
          headers: {
            "X-Key": s,
            Accept: "*/*"
          },
          timeout: e
        }, (t, e, s) => r(s));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      this.fs = this.fs || require("fs");
      this.path = this.path || require("path");
      var t = this.path.resolve(this.dataFile),
        e = this.path.resolve(process.cwd(), this.dataFile),
        s = this.fs.existsSync(t),
        r = !s && this.fs.existsSync(e);
      if (!s && !r) {
        return {};
      }
      r = s ? t : e;
      try {
        return JSON.parse(this.fs.readFileSync(r));
      } catch (t) {
        return {};
      }
    }
    writedata() {
      var t, e, s, r, i;
      this.isNode() && (this.fs = this.fs || require("fs"), this.path = this.path || require("path"), t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), r = !(s = this.fs.existsSync(t)) && this.fs.existsSync(e), i = JSON.stringify(this.data), !s && r ? this.fs.writeFileSync(e, i) : this.fs.writeFileSync(t, i));
    }
    lodash_get(t, e, s) {
      let r = t;
      for (const t of e.replace(/\[(\d+)\]/g, ".$1").split(".")) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, r, e) {
      Object(t) === t && ((r = Array.isArray(r) ? r : r.toString().match(/[^.[\]]+/g) || []).slice(0, -1).reduce((t, e, s) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(r[s + 1]) >> 0 == +r[s + 1] ? [] : {}, t)[r[r.length - 1]] = e);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        var [, s, r] = /^@(.*?)\.(.*?)$/.exec(t);
        if (s = s ? this.getval(s) : "") {
          try {
            const t = JSON.parse(s);
            e = t ? this.lodash_get(t, r, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        var [, r, i] = /^@(.*?)\.(.*?)$/.exec(e),
          a = this.getval(r),
          a = r ? "null" === a ? null : a || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, i, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          this.lodash_set(a = {}, i, t);
          s = this.setval(JSON.stringify(a), r);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got || require("got");
      this.cktough = this.cktough || require("tough-cookie");
      this.ckjar = this.ckjar || new this.cktough.CookieJar();
      t && (t.headers = t.headers || {}, t) && (t.headers = t.headers || {}, void 0 === t.headers.cookie) && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar);
    }
    tmout() {
      return new Promise((t, e) => {
        this.tmoutId = setTimeout(() => {
          this.prms.cancel();
          e({
            message: "timemout",
            response: ""
          });
        }, 50000);
      });
    }
    get(t, a = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t);
          this.prms = this.got(t).on("redirect", (t, e) => {
            try {
              var s;
              t.headers["set-cookie"] && ((s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString()) && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar);
            } catch (t) {
              this.logErr(t);
            }
          });
          Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    post(t, a = () => {}) {
      var e = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[e](t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          t.method = e;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t);
          var {
            url: s,
            ...r
          } = t;
          this.prms = this.got[e](s, r);
          Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    time(t, e = null) {
      var s,
        r = {
          "M+": (e = e ? new Date(e) : new Date()).getMonth() + 1,
          "d+": e.getDate(),
          "H+": e.getHours(),
          "m+": e.getMinutes(),
          "s+": e.getSeconds(),
          "q+": Math.floor((e.getMonth() + 3) / 3),
          S: e.getMilliseconds()
        };
      for (s in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), r) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[s] : ("00" + r[s]).substr(("" + r[s]).length)));
      return t;
    }
    queryStr(e) {
      let s = "";
      for (const r in e) {
        let t = e[r];
        null != t && "" !== t && ("object" == typeof t && (t = JSON.stringify(t)), s += `${r}=${t}&`);
      }
      return s = s.substring(0, s.length - 1);
    }
    msg(t = o, e = "", s = "", r = {}) {
      var i,
        a = r => {
          const {
            $open: t,
            $copy: e,
            $media: i,
            $mediaMime: a
          } = r;
          switch (typeof r) {
            case void 0:
              return r;
            case "string":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                default:
                  return {
                    url: r
                  };
                case "Loon":
                case "Shadowrocket":
                  return r;
                case "Quantumult X":
                  return {
                    "open-url": r
                  };
                case "Node.js":
                  return;
              }
            case "object":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                case "Shadowrocket":
                default:
                  var o = {},
                    s = r.openUrl || r.url || r["open-url"] || t;
                  if (s && Object.assign(o, {
                    action: "open-url",
                    url: s
                  }), (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(o, {
                    action: "clipboard",
                    text: s
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) {
                      t = i;
                    } else {
                      if (i.startsWith("data:")) {
                        const [r] = i.split(";"),
                          [, a] = i.split(",");
                        e = a;
                        s = r.replace("data:", "");
                      } else {
                        e = i;
                        s = (t => {
                          var e,
                            s = {
                              JVBERi0: "application/pdf",
                              R0lGODdh: "image/gif",
                              R0lGODlh: "image/gif",
                              iVBORw0KGgo: "image/png",
                              "/9j/": "image/jpg"
                            };
                          for (e in s) if (0 === t.indexOf(e)) {
                            return s[e];
                          }
                          return null;
                        })(i);
                      }
                    }
                    Object.assign(o, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": a ?? s
                    });
                  }
                  Object.assign(o, {
                    "auto-dismiss": r["auto-dismiss"],
                    sound: r.sound
                  });
                  return o;
                case "Loon":
                  {
                    const e = {};
                    (s = r.openUrl || r.url || r["open-url"] || t) && Object.assign(e, {
                      openUrl: s
                    });
                    var n = r.mediaUrl || r["media-url"];
                    (n = i?.startsWith("http") ? i : n) && Object.assign(e, {
                      mediaUrl: n
                    });
                    console.log(JSON.stringify(e));
                    return e;
                  }
                case "Quantumult X":
                  {
                    const a = {};
                    (o = r["open-url"] || r.url || r.openUrl || t) && Object.assign(a, {
                      "open-url": o
                    });
                    n = r["media-url"] || r.mediaUrl;
                    (n = i?.startsWith("http") ? i : n) && Object.assign(a, {
                      "media-url": n
                    });
                    (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(a, {
                      "update-pasteboard": s
                    });
                    console.log(JSON.stringify(a));
                    return a;
                  }
                case "Node.js":
                  return;
              }
            default:
              return;
          }
        };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(t, e, s, a(r));
            break;
          case "Quantumult X":
            $notify(t, e, s, a(r));
            break;
          case "Node.js":
        }
      }
      this.isMuteLog || ((i = ["", "==============📣系统通知📣=============="]).push(t), e && i.push(e), s && i.push(s), console.log(i.join("\n")), this.logs = this.logs.concat(i));
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.debug + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.info + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.warn + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.error + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    log(...t) {
      0 < t.length && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, void 0 !== t.message ? t.message : t);
      }
    }
    wait(e) {
      return new Promise(t => setTimeout(t, e));
    }
    done(t = {}) {
      var e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(o, t);
}