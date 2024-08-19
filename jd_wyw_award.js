/*
1 6 29 2 * jd_wyw_award.js
*/

const $ = new Env('玩一玩兑换');
const _0x192cf8 = $.isNode() ? require("./jdCookie.js") : "",
  _0x5bfd7e = require("./function/dylans"),
  _0x1e873a = require("./function/dylib.js"),
  _0x3ee169 = process.env.WYW_DBNUM ? process.env.WYW_DBNUM : "10";
let _0x3da8bb = [],
  _0x2d0f60 = "",
  _0x3d812d = 0,
  _0x7ff5fa = {};
if (process.env.DY_PROXY) try {
  require("https-proxy-agent");
  _0x7ff5fa = require("./function/proxy.js");
  $.dget = _0x7ff5fa.intoRequest($.get.bind($));
  $.dpost = _0x7ff5fa.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
const _0x45a55d = process.env.wywdh_concNum ? process.env.wywdh_concNum : "5";
if ($.isNode()) {
  Object.keys(_0x192cf8).forEach(_0x6dcae7 => {
    _0x3da8bb.push(_0x192cf8[_0x6dcae7]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x3da8bb = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x590d20 => _0x590d20.cookie)].filter(_0x548745 => !!_0x548745);
$.helpId = [];
$.fullId = [];
let _0x1de787 = process.env.WYW_DHID || "",
  _0x57141f = [];
!(async () => {
  if (!_0x3da8bb[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前版本：20240810");
  console.log("问题建议：https://t.me/dylan_jdpro");
  console.log("定时建议整点前8秒");
  console.log("WYW_DHID='xxx' 指定兑换ID 多个&分割");
  console.log("wywdh_concNum='2' 并发量，默认5");
  console.log("\n奖品列表：");
  _0x2d0f60 = _0x3da8bb[0];
  $.UserName = decodeURIComponent(_0x2d0f60.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2d0f60.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  _0x4be99a();
  await _0x1f5fa3(_0x2d0f60, 1, $.UserName, $.UA, "wanyiwan_exchange_page");
  _0x1de787 == "" && (console.log("\n请设置兑换ID"), process.exit());
  _0x1de787.split("&").forEach(_0x292bd6 => {
    let _0x215e80 = $.moreExchanges.find(_0x284ce3 => _0x284ce3.assignmentId == _0x292bd6);
    _0x215e80 !== undefined && _0x57141f.push(_0x215e80);
  });
  _0x57141f.length === 0 && (console.log("没有匹配到兑换目标，请检查设置的ID是否正确！"), process.exit());
  let _0xde197c = await _0x1e873a.getZd("h");
  if (_0xde197c > 30000) _0xde197c = 0;
  await $.wait(_0xde197c);
  console.log("\n兑换详情:");
  console.log($.time("yyyy/MM/dd HH:mm:ss:S"));
  await _0x16d47a(_0x45a55d, _0x3da8bb, _0x42c4ad);
  async function _0x42c4ad(_0x2af10a, _0x425a70, _0x91ae9d, _0x57d26e) {
    for (let _0x404ce2 of _0x57141f) {
      await _0x1f5fa3(_0x2af10a, _0x425a70, _0x91ae9d, _0x57d26e, "wanyiwan_exchange", _0x404ce2.assignmentId, _0x404ce2.rewardType, _0x404ce2.rewardName);
    }
  }
  console.log($.time("yyyy/MM/dd HH:mm:ss:S"));
})().catch(_0x5a6a04 => {
  return $.logErr(_0x5a6a04);
}).finally(() => {
  return $.done();
});
async function _0x25d4d2() {
  for (let _0x2c7a6f = 0; _0x2c7a6f < _0x3da8bb.length; _0x2c7a6f++) {
    _0x2d0f60 = _0x3da8bb[_0x2c7a6f];
    if (_0x2d0f60) {
      $.UserName = decodeURIComponent(_0x2d0f60.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2d0f60.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2c7a6f + 1;
      console.log("\n-------开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "------\n");
      _0x4be99a();
      $.nonum = false;
      $.fullId.length != 0 && ($.helpId = $.helpId.filter(_0x21181b => !$.fullId.includes(_0x21181b)), $.fullId = []);
      for (let _0xd5368c of $.helpId) {
        $.itemId = _0xd5368c;
        console.log("去助力 --> " + $.itemId);
        await _0x1f5fa3("wanyiwan_assist");
        if ($.nonum) break;
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      }
      if ($.outFlag) break;
    }
  }
}
async function _0x1e41cb() {
  try {
    await _0x1f5fa3("wanyiwan_exchange", ua, ck, "2HoJxYHuTLQgsHiVFpBceGT8oPAB", "3");
  } catch (_0x225947) {
    console.log(_0x225947);
  }
}
async function _0x1f5fa3(_0x23b157, _0x5770c8, _0x369435, _0x3c8074, _0x17a1e4, ..._0x4c8ca8) {
  if ($.outFlag || $.isban) {
    return;
  }
  let _0x343783 = "",
    _0x3e84da,
    _0x330290,
    _0x547683 = "post",
    _0x4e4267 = "https://api.m.jd.com/client.action",
    _0x5d404e = "signed_wh5";
  switch (_0x17a1e4) {
    case "wanyiwan_sign":
      _0x343783 = {
        "version": 1
      }, _0x3e84da = "d12dd", _0x330290 = "wanyiwan_sign";
      break;
    case "wanyiwan_exchange_page":
      _0x343783 = {
        "version": 3
      }, _0x330290 = "wanyiwan_exchange_page";
      break;
    case "apTaskList":
      _0x4e4267 = "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22Fl1LmxG_f0poD7w1ycZqnw%22%7D&t=1715170975269&appid=activities_platform&client=android&clientVersion=6.24.0&loginType=2&loginWQBiz=wegame&h5st=null&build=22779&screen=393*873&networkType=wifi&eufv=1&cthr=1", _0x547683 = "get";
      break;
    case "wanyiwan_exchange":
      _0x343783 = {
        "assignmentId": _0x4c8ca8[0],
        "type": _0x4c8ca8[1],
        "version": 3
      }, _0x330290 = "wanyiwan_exchange";
      break;
    case "wanyiwan_withdraw":
      _0x343783 = {
        "assignmentId": $.assignmentId,
        "type": $.type,
        "version": 1
      }, _0x330290 = "wanyiwan_withdraw";
      break;
    case "endTask":
      _0x343783 = {
        "itemId": $.itemId,
        "taskType": $.taskType,
        "assignmentId": $.encryptAssignmentId,
        "actionType": 0,
        "version": 1
      }, _0x3e84da = "89db2", _0x330290 = "wanyiwan_do_task";
      break;
    case "award":
      _0x343783 = {
        "taskType": $.taskType,
        "assignmentId": $.encryptAssignmentId,
        "version": 1
      }, _0x330290 = "wanyiwan_task_receive_award";
      break;
    case "wanyiwan_assist":
      _0x343783 = {
        "inviteCode": $.itemId,
        "version": 1
      }, _0x3e84da = "ba505", _0x330290 = "wanyiwan_assist";
      break;
    case "turnHappyHome":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ"
      }, _0x5d404e = "activities_platform", _0x330290 = "turnHappyHome";
      break;
    case "turnHappyDouble":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ",
        "turnNum": parseInt(_0x3ee169)
      }, _0x3e84da = "614f1", _0x5d404e = "activities_platform", _0x330290 = "turnHappyDouble";
      break;
    case "turnHappyReceive":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ"
      }, _0x3e84da = "25fac", _0x5d404e = "activities_platform", _0x330290 = "turnHappyReceive";
      break;
    case "superRedBagHome":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "linkId": "aE-1vg6_no2csxgXFuv3Kg"
      }, _0x3e84da = "5be1b", _0x5d404e = "activity_platform_se", _0x330290 = "superRedBagHome";
      break;
    case "superRedBagDraw":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "linkId": "aE-1vg6_no2csxgXFuv3Kg"
      }, _0x3e84da = "89cfe", _0x5d404e = "activity_platform_se", _0x330290 = "superRedBagDraw";
      break;
    case "apCashWithDraw":
      _0x4e4267 = "https://api.m.jd.com/api", _0x343783 = {
        "businessSource": "NONE",
        "base": {
          "id": _0x4c8ca8[0].id,
          "business": "crazyPlay",
          "poolBaseId": _0x4c8ca8[0].poolBaseId,
          "prizeGroupId": _0x4c8ca8[0].prizeGroupId,
          "prizeBaseId": _0x4c8ca8[0].prizeBaseId,
          "prizeType": 4,
          "activityId": "1999"
        },
        "linkId": "8u9Bktjo92LocBHib9PoHQ",
        "channel": "1"
      }, _0x3e84da = "73bca", _0x5d404e = "activities_platform", _0x330290 = "apCashWithDraw";
      break;
    case "superRedBagList":
      _0x4e4267 = "http://api.m.jd.com/api", _0x343783 = {
        "pageNum": 1,
        "pageSize": 20,
        "linkId": "8u9Bktjo92LocBHib9PoHQ",
        "associateLinkId": "",
        "business": "crazyPlay"
      }, _0x3e84da = "f2b1d", _0x5d404e = "activities_platform", _0x330290 = "superRedBagList";
      break;
    default:
      console.log("错误" + _0x17a1e4);
  }
  if (_0x3e84da) {
    let _0x257023 = {
      "appId": _0x3e84da,
      "functionId": _0x330290,
      "body": _0x343783,
      "appid": _0x5d404e,
      "clientVersion": $.UA.split(";")[2],
      "client": "ios",
      "user": $.UserName,
      "t": Date.now(),
      "ua": $.UA
    };
    _0x343783 = await _0x5bfd7e.getbody(_0x257023);
    if (!_0x343783) return;
  } else _0x343783 && (_0x343783 = "functionId=" + _0x330290 + "&body=" + encodeURIComponent(JSON.stringify(_0x343783)) + "&t=" + Date.now() + "&appid=" + _0x5d404e + "&client=ios&" + _0x3c8074.split(";")[2] + "&cthr=1&networkType=wifi");
  let _0x21a4cb = _0x3df357(_0x4e4267, _0x343783, _0x3c8074, _0x23b157);
  return new Promise(async _0x36c6b2 => {
    $["d" + _0x547683](_0x21a4cb, async (_0x3bc608, _0x534710, _0x345abc) => {
      try {
        if (_0x3bc608) {
          if (_0x534710 && typeof _0x534710.statusCode != "undefined") {
            if (_0x534710.statusCode == 493) {
              if (_0x3d812d < 6) {
                _0x3d812d++;
                await _0x1f5fa3(_0x17a1e4);
                return;
              }
              console.log("ip可能被限制，过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x3bc608, _0x3bc608));
        } else {
          if (_0x345abc.includes("doctype") && _0x3d812d < 6) {
            _0x3d812d++;
            await _0x1f5fa3(_0x17a1e4);
            return;
          }
          _0x3d812d = 0;
          _0x2feaa1(_0x17a1e4, _0x345abc, _0x369435, _0x5770c8, _0x4c8ca8[2]);
        }
      } catch (_0x2a8e13) {
        console.log(_0x2a8e13, _0x534710);
      } finally {
        _0x36c6b2();
      }
    });
  });
}
function _0x475d0a(_0x1baa7f) {
  let _0xec13ab = "";
  switch (type) {
    case [_0xec13ab]:
      const _0x108f15 = {
        "ed": ed
      };
      _0xf1f6le = _0x108f15;
      break;
    case [_0xec13ab]:
      const _0x1648c9 = {
        "bd": bd
      };
      _0xf1f6lc = _0x1648c9;
      break;
    case [_0xec13ab]:
      const _0x389e63 = {
        "ed": ed
      };
      _0xf1f6lf = _0x389e63;
      break;
    case [_0xec13ab]:
      const _0x3be6f1 = {
        "ed": ed
      };
      _0xf1f6lg = _0x3be6f1;
      break;
    case [_0xec13ab]:
      const _0x5b4ff5 = {
        "ed": ed
      };
      _0xf1f6lv = _0x5b4ff5;
      break;
  }
}
async function _0x2feaa1(_0x3b5d7a, _0x4586fc, _0x32ffcc, _0x1a663e, _0x5103ce) {
  let _0x3973e1 = "";
  try {
    _0x3973e1 = JSON.parse(_0x4586fc);
  } catch (_0x474a32) {
    console.log(_0x3b5d7a + " 执行任务异常");
  }
  try {
    switch (_0x3b5d7a) {
      case "award":
        _0x3973e1.code == 0 ? _0x3973e1.data.bizCode == 0 ? console.log("任务完成，获得" + _0x3973e1.data.result.rewardCount + "奖票 🎫") : console.log(_0x3973e1.data.bizMsg) : console.log(_0x3973e1.message);
        break;
      case "wanyiwan_withdraw":
      case "wanyiwan_exchange":
        if (_0x3973e1.code == 0) _0x3973e1.data.bizCode == 0 ? console.log("[" + _0x1a663e + "-" + _0x32ffcc + "-" + _0x5103ce + "] 兑换成功！") : console.log("[" + _0x1a663e + "-" + _0x32ffcc + "-" + _0x5103ce + "] " + _0x3973e1.data.bizMsg);else {
          console.log("[" + _0x1a663e + "-" + _0x32ffcc + "-" + _0x5103ce + "] " + _0x3973e1.message);
        }
        break;
      case "wanyiwan_exchange_page":
        _0x3973e1.code == 0 ? _0x3973e1.data.bizCode == 0 ? ($.isLogin = _0x3973e1.data.result.isLogin || false, $.moreExchanges = _0x3973e1.data.result.moreExchanges, $.score = _0x3973e1.data.result.score, ($.index == 1 && console.log("可兑换列表："), _0x3973e1.data.result.moreExchanges.forEach(_0x3cc448 => {
          console.log("" + _0x3cc448.rewardName + (_0x3cc448.hasStock ? "(有库存)" : "(无库存)") + "|需" + _0x3cc448.exchangeScore + "奖票|兑换ID=> " + _0x3cc448.assignmentId);
        }))) : console.log(_0x3973e1.data.bizMsg) : console.log(_0x3973e1.message);
        break;
      case "wanyiwan_assist":
        if (_0x3973e1.code == 0) {
          if (_0x3973e1.data.bizCode == 0) console.log("✔️ 助力成功"), $.nonum = true;else {
            if (_0x3973e1.data.bizMsg.includes("太多人") || _0x3973e1.data.bizMsg.includes("重复")) console.log("❌", _0x3973e1.data.bizMsg), $.nonum = true;else _0x3973e1.data.bizMsg.includes("已经完成") ? (console.log("❌", _0x3973e1.data.bizMsg), $.fullId.push($.itemId)) : console.log("❌", _0x3973e1.data.bizMsg);
          }
        } else console.log(_0x3973e1.message);
        break;
      case "wanyiwan_home":
        if (_0x3973e1.code == 0) {
          if (_0x3973e1.data.bizCode == 0) {
            _0x3973e1.data.result.popWindows.length != 0 && console.log("获得新手奖励：", _0x3973e1.data.result.popWindows[0].getScore, "奖票 🎫");
            console.log("当前奖票总量：" + _0x3973e1.data.result.score + " 🎫");
            $.isLogin = _0x3973e1.data?.["result"]?.["isLogin"];
            $.taskList = _0x3973e1.data?.["result"]?.["taskBoard"] || [];
            $.signstatus = _0x3973e1.data?.["result"]?.["signBoard"]?.["status"] || 0;
          } else console.log(_0x3973e1.data.bizMsg);
        } else console.log(_0x3973e1.message);
        break;
      case "superRedBagList":
        _0x3973e1.success ? $.bagList = _0x3973e1.data.items || [] : console.log(_0x3973e1.errMsg);
        break;
      case "apCashWithDraw":
        if (_0x3973e1.code == 0) {
          if (_0x3973e1.data.message.indexOf("待发放") > -1) console.log(_0x3973e1.data.message), $.txfail = true;else {
            if (_0x3973e1.data.message.includes("上限")) console.log(_0x3973e1.data.message), $.txfail = false;else _0x3973e1.data.message.includes("提现中") ? (console.log("提现成功"), $.txfail = false) : console.log(_0x3973e1.data.message);
          }
        } else {
          console.log(_0x3973e1.errMsg);
        }
        break;
      case "superRedBagHome":
        _0x3973e1.success ? ($.sceneStatus = _0x3973e1.data.sceneStatus, $.nextLeftTime = _0x3973e1.data.nextLeftTime) : console.log(_0x3973e1.errMsg);
        break;
      case "superRedBagDraw":
        if (_0x3973e1.success) {
          $.shakeLeftTime = _0x3973e1.data.shakeLeftTime;
          const {
            prizeDrawVo = ""
          } = _0x3973e1.data;
          if (prizeDrawVo) {
            switch (prizeDrawVo.prizeType) {
              case 24:
                console.log("获得：" + prizeDrawVo.amount + "票奖 🎫"), $.sucdraw++;
                break;
              case 1:
                console.log("获得:" + prizeDrawVo.prizeConfigName);
                break;
              case 4:
                console.log("获得:" + prizeDrawVo.amount + "现金💰️"), $.cashList.push({
                  "id": prizeDrawVo.id,
                  "poolBaseId": 41486,
                  "prizeGroupId": prizeDrawVo.prizeGroupId,
                  "prizeBaseId": prizeDrawVo.prizeBaseId,
                  "prizeType": prizeDrawVo.prizeType,
                  "amount": prizeDrawVo.amount
                });
                break;
              case 3:
                console.log("获得:" + prizeDrawVo.amount + "京豆🥔");
                break;
              case 2:
                console.log("获得:" + prizeDrawVo.amount + "红包🧧");
                break;
              default:
                console.log(JSON.stringify(prizeDrawVo));
                break;
            }
          } else console.log(_0x4586fc);
        } else console.log(_0x3973e1.errMsg);
        break;
      case "startTask":
      case "turnHappyReceive":
      case "endTask":
        break;
      default:
        console.log(_0x3b5d7a + " -> " + _0x4586fc);
    }
    if (typeof _0x3973e1 == "object") {
      if (_0x3973e1.errorMessage) {
        _0x3973e1.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
      }
    }
  } catch (_0x33e8ce) {
    console.log(_0x3b5d7a + " " + _0x33e8ce);
  }
}
function _0x3df357(_0x6fa053, _0x270e59, _0x2b1a30, _0x200f1d) {
  let _0x5ac1bf = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Origin": "https://pro.m.jd.com",
    "Referer": "https://pro.m.jd.com/",
    "Cookie": _0x200f1d,
    "User-Agent": _0x2b1a30
  };
  return {
    "url": _0x6fa053,
    "headers": _0x5ac1bf,
    "timeout": 30000,
    ...(_0x270e59 ? {
      "body": _0x270e59
    } : {})
  };
}
async function _0x4be99a() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x4122d8(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x4122d8(_0x4e3dd5) {
  _0x4e3dd5 = _0x4e3dd5 || 32;
  let _0x47bb0d = "abcdef0123456789",
    _0x2f528b = _0x47bb0d.length,
    _0x491da5 = "";
  for (i = 0; i < _0x4e3dd5; i++) {
    _0x491da5 += _0x47bb0d.charAt(Math.floor(Math.random() * _0x2f528b));
  }
  return _0x491da5;
}
function _0x827b29(_0x56531b) {
  if (typeof _0x56531b == "string") {
    try {
      return JSON.parse(_0x56531b);
    } catch (_0x2b6cd6) {
      return console.log(_0x2b6cd6), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function _0x88b17c() {
  if (!$.joinVenderId) return;
  return new Promise(async _0x631aa9 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x18c28b = {
      "venderId": "" + $.joinVenderId + "",
      "shopId": "" + $.joinVenderId + "",
      "bindByVerifyCodeFlag": 1,
      "registerExtend": {},
      "writeChildFlag": 0,
      "channel": 406
    };
    $.shopactivityId == "" && delete _0x18c28b.activityId;
    let _0xc12c87 = {
      "appId": "27004",
      "fn": "bindWithVender",
      "body": _0x18c28b,
      "apid": "shopmember_m_jd_com",
      "ver": "9.2.0",
      "cl": "H5",
      "user": $.UserName,
      "code": 0,
      "ua": $.UA
    };
    _0x18c28b = await dyy.getbody(_0xc12c87);
    const _0x4bd1f4 = {
      "url": "https://api.m.jd.com/client.action?" + _0x18c28b + "&uuid=88888",
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": _0x2d0f60,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": $.UA
      },
      "timeout": 30000
    };
    $.dget(_0x4bd1f4, async (_0x2240f8, _0x143955, _0x409b8a) => {
      try {
        _0x409b8a = _0x409b8a && _0x409b8a.match(/jsonp_.*?\((.*?)\);/) && _0x409b8a.match(/jsonp_.*?\((.*?)\);/)[1] || _0x409b8a;
        let _0x10d620 = $.toObj(_0x409b8a, _0x409b8a);
        if (_0x10d620 && typeof _0x10d620 == "object") {
          if (_0x10d620 && _0x10d620.success === true) {
            console.log("    " + _0x10d620.message);
            $.errorJoinShop = _0x10d620.message;
            if (_0x10d620.result && _0x10d620.result.giftInfo) for (let _0x29356c of _0x10d620.result.giftInfo.giftList) {
              console.log("\u5165\u4F1A\u83B7\u5F97:" + _0x29356c.discountString + _0x29356c.prizeName + _0x29356c.secondLineDesc);
            }
          } else _0x10d620 && typeof _0x10d620 == "object" && _0x10d620.message ? ($.errorJoinShop = _0x10d620.message, console.log("" + (_0x10d620.message || ""))) : console.log(_0x409b8a);
        } else console.log(_0x409b8a);
      } catch (_0x5359c7) {
        $.logErr(_0x5359c7, _0x143955);
      } finally {
        _0x631aa9();
      }
    });
  });
}
async function _0x8a838() {
  return new Promise(async _0x38f6b2 => {
    let _0x445b89 = {
        "venderId": $.joinVenderId,
        "payUpShop": true,
        "queryVersion": "10.5.2",
        "appid": "ef79a",
        "needSecurity": true,
        "bizId": "shop_view_app",
        "channel": 406
      },
      _0x44e8ac = {
        "appId": "ef79a",
        "fn": "getShopOpenCardInfo",
        "body": _0x445b89,
        "apid": "jd_shop_member",
        "ver": "9.2.0",
        "cl": "H5",
        "user": $.UserName,
        "code": 0,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      };
    _0x445b89 = await dyy.getbody(_0x44e8ac);
    const _0x353773 = {
      "url": "https://api.m.jd.com/client.action?" + _0x445b89 + "&uuid=88888",
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": _0x2d0f60,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      },
      "timeout": 60000
    };
    $.get(_0x353773, async (_0x9be591, _0xe351c3, _0x5c5e4c) => {
      try {
        _0x5c5e4c = _0x5c5e4c && _0x5c5e4c.match(/jsonp_.*?\((.*?)\);/) && _0x5c5e4c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x5c5e4c;
        let _0x449161 = $.toObj(_0x5c5e4c, _0x5c5e4c);
        if (_0x449161 && typeof _0x449161 == "object") _0x449161 && _0x449161.success == true && (console.log("去加入 -> " + (_0x449161.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x449161.result[0].interestsRuleList && _0x449161.result[0].interestsRuleList[0] && _0x449161.result[0].interestsRuleList[0].interestsInfo && _0x449161.result[0].interestsRuleList[0].interestsInfo.activityId || "");else {
          console.log(_0x5c5e4c);
        }
      } catch (_0x5dcee2) {
        $.logErr(_0x5dcee2, _0xe351c3);
      } finally {
        _0x38f6b2();
      }
    });
  });
}
function _0x58eec2(_0x455ef6, _0x46692d) {
  return Math.floor(Math.random() * (_0x46692d - _0x455ef6)) + _0x455ef6;
}
function _0x59176b(_0x3d7c2c = +new Date()) {
  var _0x4f9d47 = new Date(_0x3d7c2c + 8 * 3600 * 1000);
  return _0x4f9d47.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
async function _0x16d47a(_0x51d0c8 = 3, _0x5570a5, _0x469b62, ..._0x42b9d0) {
  const _0x8da66c = _0x5570a5.slice();
  let _0x1bc2dd = 0,
    _0x309223 = 0;
  async function _0x50413b(_0x4d97a2, _0x2365eb) {
    const _0x40454d = _0x1e873a.getUA("", _0x4d97a2),
      _0x449a02 = _0x4d97a2 ? decodeURIComponent(_0x4d97a2.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4d97a2.match(/pt_pin=([^; ]+)(?=;?)/)[1]) : "";
    await _0x469b62(_0x4d97a2, _0x2365eb, _0x449a02, _0x40454d, ..._0x42b9d0);
    _0x1bc2dd--;
    _0x26c7ca();
  }
  async function _0x26c7ca() {
    while (_0x1bc2dd < _0x51d0c8 && _0x8da66c.length > 0) {
      const _0x515dd0 = _0x8da66c.shift();
      _0x1bc2dd++;
      _0x309223++;
      _0x50413b(_0x515dd0, _0x309223);
    }
  }
  const _0x28f450 = Math.min(_0x8da66c.length, _0x51d0c8),
    _0x47cb68 = [];
  for (let _0x51767f = 0; _0x51767f < _0x28f450; _0x51767f++) {
    const _0x46eb85 = _0x8da66c.shift();
    _0x1bc2dd++;
    _0x309223++;
    _0x47cb68.push(_0x50413b(_0x46eb85, _0x309223));
  }
  await Promise.all(_0x47cb68);
  await new Promise(_0x3c914c => {
    const _0x16fc2a = setInterval(() => {
      _0x1bc2dd === 0 && _0x8da66c.length === 0 && (clearInterval(_0x16fc2a), _0x3c914c());
    }, 100);
  });
}
function _0x45a495() {
  return new Promise(_0xa965ba => {
    const _0x270b1c = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x2d0f60,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x270b1c, (_0x30e6fc, _0x10e026, _0x2aeaa7) => {
      try {
        if (_0x2aeaa7) {
          _0x2aeaa7 = JSON.parse(_0x2aeaa7);
          if (_0x2aeaa7.islogin === "1") {} else _0x2aeaa7.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0xd291c3) {
        console.log(_0xd291c3);
      } finally {
        _0xa965ba();
      }
    });
  });
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
      return "POST" === e && (s = this.post), new Promise((r, i) => {
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
      if (this.getdata(t)) try {
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
      if (!this.isNode()) return {};
      this.fs = this.fs || require("fs");
      this.path = this.path || require("path");
      var t = this.path.resolve(this.dataFile),
        e = this.path.resolve(process.cwd(), this.dataFile),
        s = this.fs.existsSync(t),
        r = !s && this.fs.existsSync(e);
      if (!s && !r) return {};
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
      for (const t of e.replace(/\[(\d+)\]/g, ".$1").split(".")) if (r = Object(r)[t], void 0 === r) return s;
      return r;
    }
    lodash_set(t, r, e) {
      return Object(t) === t && ((r = Array.isArray(r) ? r : r.toString().match(/[^.[\]]+/g) || []).slice(0, -1).reduce((t, e, s) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(r[s + 1]) >> 0 == +r[s + 1] ? [] : {}, t)[r[r.length - 1]] = e), t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        var [, s, r] = /^@(.*?)\.(.*?)$/.exec(t);
        if (s = s ? this.getval(s) : "") try {
          const t = JSON.parse(s);
          e = t ? this.lodash_get(t, r, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
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
      } else s = this.setval(t, e);
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
          return this.data = this.loaddata(), this.data[t];
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
          return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0;
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
          })), $httpClient.get(t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          })), $task.fetch(t).then(t => {
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
          this.initGotEnv(t), this.prms = this.got(t).on("redirect", (t, e) => {
            try {
              var s;
              t.headers["set-cookie"] && ((s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString()) && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar);
            } catch (t) {
              this.logErr(t);
            }
          }), Promise.race([this.prms, this.tmout()]).then(t => {
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
          })), $httpClient[e](t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          t.method = e, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          })), $task.fetch(t).then(t => {
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
          this.prms = this.got[e](s, r), Promise.race([this.prms, this.tmout()]).then(t => {
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
                    if (i.startsWith("http")) t = i;else if (i.startsWith("data:")) {
                      const [r] = i.split(";"),
                        [, a] = i.split(",");
                      e = a;
                      s = r.replace("data:", "");
                    } else e = i, s = (t => {
                      var e,
                        s = {
                          JVBERi0: "application/pdf",
                          R0lGODdh: "image/gif",
                          R0lGODlh: "image/gif",
                          iVBORw0KGgo: "image/png",
                          "/9j/": "image/jpg"
                        };
                      for (e in s) if (0 === t.indexOf(e)) return s[e];
                      return null;
                    })(i);
                    Object.assign(o, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": a ?? s
                    });
                  }
                  return Object.assign(o, {
                    "auto-dismiss": r["auto-dismiss"],
                    sound: r.sound
                  }), o;
                case "Loon":
                  {
                    const e = {};
                    (s = r.openUrl || r.url || r["open-url"] || t) && Object.assign(e, {
                      openUrl: s
                    });
                    var n = r.mediaUrl || r["media-url"];
                    return (n = i?.startsWith("http") ? i : n) && Object.assign(e, {
                      mediaUrl: n
                    }), console.log(JSON.stringify(e)), e;
                  }
                case "Quantumult X":
                  {
                    const a = {};
                    (o = r["open-url"] || r.url || r.openUrl || t) && Object.assign(a, {
                      "open-url": o
                    });
                    n = r["media-url"] || r.mediaUrl;
                    return (n = i?.startsWith("http") ? i : n) && Object.assign(a, {
                      "media-url": n
                    }), (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(a, {
                      "update-pasteboard": s
                    }), console.log(JSON.stringify(a)), a;
                  }
                case "Node.js":
                  return;
              }
            default:
              return;
          }
        };
      if (!this.isMute) switch (this.getEnv()) {
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