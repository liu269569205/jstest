/*
种豆得豆 脚本更新地址：jd_plantBean_help.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
40 4,17 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean_help.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "40 4,17 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean_help.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="40 4,17 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean_help.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean_help.js, cronexpr="40 4,17 * * *", timeout=3600, enable=true

*/
const $ = new Env('种豆得豆内部互助');
let ii1ill1I = true,
    liIIll1I = [],
    ll1IIliI = "",
    ilII11II = [],
    iiliI1lI,
    IIl1iIl,
    llI1IiI,
    li1IIIlI;

const IiII1ill = require("./function/jdCommon"),
      l11IIi1l = require("./function/h5st41.js"),
      Ii1Ii1ll = "https://api.m.jd.com/client.action";

let iIiiI1i = "",
    lIll1iI = null,
    ilil1Il = null,
    liIIIII = [],
    lliiilii = "",
    iiIl1li;
$.newShareCode = [
'qj27hlitp6mgcyqbob6wwx7tj43h7wlwy7o5jii',
  'afjmnwak3un3yht2nki7sshoe4',
  'nkvdrkoit5o65u6cqxfqokj5jowdql73wx7b6ua',
  'bknudbr7e4sqxmsp532nxr25bbxmrwgs6mgds2q',
  'ds3ya4fnmkg56gqcbgnblg7poe3h7wlwy7o5jii',
  'e7lhibzb3zek3d6p3d5ogub42tx2rqi723ifufy',
];
let iIl1liIl = false,
    i111I1ii = 0,
    i11liII = 0;
!(async () => {
  await Ii111iIi();

  if (!liIIll1I[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let IiIliil = 0; IiIliil < liIIll1I.length; IiIliil++) {
    if (liIIll1I[IiIliil]) {
      ll1IIliI = liIIll1I[IiIliil];
      $.UserName = decodeURIComponent(ll1IIliI.match(/pt_pin=([^; ]+)(?=;?)/) && ll1IIliI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IiIliil + 1;
      $.isLogin = true;
      $.nickName = "";
      $.hotFlag = false;
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await iiliI1lI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      llI1IiI = "";
      li1IIIlI = "";
      IIl1iIl = {};
      $.UA = IiII1ill.genUA($.UserName);
      await li1il11i();
      await $.wait(2 * 1000);
    }
  }

  $.isNode() && iIiiI1i && (await iiliI1lI.sendNotify("" + $.name, "" + iIiiI1i));
})().catch(liIIi1i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + liIIi1i + "!", "");
}).finally(() => {
  $.done();
});

async function li1il11i() {
  try {
    console.log("获取任务及基本信息");
    await li1Il11l();
    if (iIl1liIl) return;

    for (let ii1Iilll = 0; ii1Iilll < $.plantBeanIndexResult.data.roundList.length; ii1Iilll++) {
      if ($.plantBeanIndexResult.data.roundList[ii1Iilll].roundState === "2") {
        iiIl1li = ii1Iilll;
        break;
      }
    }

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      const i1i1iIi = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
      $.myPlantUuid = iilil1ii(i1i1iIi, "plantUuid");
      console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.myPlantUuid + "\n");
      ilII11II.push($.myPlantUuid);
      liIIIII = $.plantBeanIndexResult.data.roundList;
      lIll1iI = liIIIII[iiIl1li].roundId;
      ilil1Il = liIIIII[iiIl1li - 1].roundId;
      lliiilii = liIIIII[iiIl1li - 1].awardState;
      $.taskList = $.plantBeanIndexResult.data.taskList;
      li1IIIlI = "【京东昵称】" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
      i111I1ii++;
      await iiIlIIil();
      i111I1ii == 3 && (console.log("\n【访问接口次数达到3次，休息半分钟.....】\n"), await $.wait(30 * 1000), i111I1ii = 0);
      await $.wait(3 * 1000);
    } else console.log("种豆得豆-初始失败:  " + JSON.stringify($.plantBeanIndexResult));
  } catch (Ilii1) {
    $.logErr(Ilii1);
  }
}

async function iiIlIIil() {
  console.log("\n【开始账号内互助】\n");
  $.newShareCode = [...(ilII11II || [])];

  for (let IIilIlii of $.newShareCode) {
    console.log("【" + $.UserName + "】开始助力: " + IIilIlii);
    if (!IIilIlii) continue;

    if (IIilIlii === $.myPlantUuid || $.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n跳过自己的plantUuid\n");
      continue;
    }

    i11liII++;
    await i1iI11li(IIilIlii);
    i11liII == 5 && (console.log("\n【访问接口次数达到5次，休息半分钟.....】\n"), await $.wait(30 * 1000), i11liII = 0);

    if ($.helpResult && $.helpResult.code === "0" && $.helpResult.data) {
      console.log("助力好友结果: " + JSON.stringify($.helpResult.data.helpShareRes));

      if ($.helpResult.data && $.helpResult.data.helpShareRes) {
        if ($.helpResult.data.helpShareRes.state === "1") {
          console.log("助力好友" + IIilIlii + "成功");
          console.log($.helpResult.data.helpShareRes.promptText + "\n");
        } else {
          if ($.helpResult.data.helpShareRes.state === "2") {
            console.log("您今日助力的机会已耗尽，已不能再帮助好友助力了\n");
            break;
          } else {
            if ($.helpResult.data.helpShareRes.state === "3") {
              console.log("该好友今日已满9人助力/20瓶营养液,明天再来为Ta助力吧\n");
            } else $.helpResult.data.helpShareRes.state === "4" ? console.log($.helpResult.data.helpShareRes.promptText + "\n") : console.log("助力其他情况：" + JSON.stringify($.helpResult.data.helpShareRes));
          }
        }
      }
    } else {
      console.log("助力好友失败: " + JSON.stringify($.helpResult));
      break;
    }
  }
}

function Iil11Iii() {
  $.log("\n" + llI1IiI + "\n");
  ii1ill1I = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : ii1ill1I;
  (!ii1ill1I || ii1ill1I === "false") && $.msg($.name, li1IIIlI, llI1IiI);
}

async function iillI11l() {
  const lII1Ii1l = {
    "roundId": ilil1Il
  };
  $.getReward = await lI1lI1Ii("receivedBean", lII1Ii1l);
}

async function iiII1Ii(il1ilI11, Ili1liII) {
  let l111IlII = {
    "roundId": il1ilI11,
    "nutrientsType": Ili1liII
  };
  $.cultureBeanRes = await lI1lI1Ii("cultureBean", l111IlII);
}

async function IlIlili() {
  const IllII1 = {
    "pageNum": "1"
  };
  $.stealFriendList = await iI11Ill1("plantFriendList", IllII1);
}

async function ll1i11l1(I11Il1li) {
  console.log("开始偷好友");
  const lii1iIll = {
    "paradiseUuid": I11Il1li,
    "roundId": lIll1iI
  };
  $.stealFriendRes = await lI1lI1Ii("collectUserNutr", lii1iIll);
}

async function iI1ilIli() {
  $.receiveNutrientsRes = await lI1lI1Ii("receiveNutrients", {
    "roundId": lIll1iI,
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function llIIIIil() {
  $.plantEggDoLotteryResult = await iiillI1("plantEggDoLottery");
}

async function l1iI1l1() {
  $.plantEggLotteryRes = await iiillI1("plantEggLotteryIndex");
}

async function IiIliliI() {
  $.productTaskList = await iiillI1("productTaskList", {
    "monitor_refer": "plant_productTaskList"
  });
}

async function lI1liIIi() {
  $.plantChannelTaskList = await iI11Ill1("plantChannelTaskList");
}

async function iI1111li() {
  $.shopTaskListRes = await iI11Ill1("shopTaskList", {
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function Ilil1IlI(IllIl1il) {
  const i1I1lIi = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "awardType": "" + IllIl1il
  };
  $.receiveNutrientsTaskRes = await iiillI1("receiveNutrientsTask", i1I1lIi);
}

async function liIil1il() {
  $.shareSupportList = await iiillI1("plantShareSupportList", {
    "roundId": ""
  });

  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
      data: iiIiIil1
    } = $.shareSupportList,
          iiIliIii = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
          ili11lll = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let I1ilIIiI = [];
    iiIiIil1.map(ii1l1l1i => {
      iiIliIii <= ii1l1l1i.createTime && ii1l1l1i.createTime < ili11lll && I1ilIIiI.push(ii1l1l1i);
    });
    llI1IiI += "【助力您的好友】共" + I1ilIIiI.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}

async function i1iI11li(IIIIilII) {
  console.log("\n开始助力好友: " + IIIIilII);
  const ll1III1 = {
    "plantUuid": IIIIilII,
    "wxHeadImgUrl": "",
    "shareUuid": "",
    "followType": "1"
  };
  $.helpResult = await lI1lI1Ii("plantBeanIndex", ll1III1);
}

async function li1Il11l() {
  iIl1liIl = false;
  $.plantBeanIndexResult = await lI1lI1Ii("plantBeanIndex");

  if ($.plantBeanIndexResult.errorCode === "PB101") {
    console.log("\n活动太火爆了，还是去买买买吧！\n");
    iIl1liIl = true;
    return;
  }

  if ($.plantBeanIndexResult.errorCode) {
    console.log("获取任务及基本信息出错，10秒后重试\n");
    await $.wait(4000);
    $.plantBeanIndexResult = await lI1lI1Ii("plantBeanIndex");

    if ($.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n活动太火爆了，还是去买买买吧！\n");
      iIl1liIl = true;
      return;
    }
  }

  if ($.plantBeanIndexResult.errorCode) {
    console.log("获取任务及基本信息出错，30秒后重试\n");
    await $.wait(8000);
    $.plantBeanIndexResult = await lI1lI1Ii("plantBeanIndex");

    if ($.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n活动太火爆了，还是去买买买吧！\n");
      iIl1liIl = true;
      return;
    }
  }

  if ($.plantBeanIndexResult.errorCode) {
    console.log("获取任务及基本信息失败，活动异常，换个时间再试试吧....");
    console.log("错误代码;" + $.plantBeanIndexResult.errorCode);
    iIl1liIl = true;
    return;
  }
}

function Ii111iIi() {
  return new Promise(liIliii1 => {
    iiliI1lI = $.isNode() ? require("./sendNotify") : "";
    const i11Illil = $.isNode() ? require("./jdCookie.js") : "",
          il111l1l = "";

    if ($.isNode()) {
      Object.keys(i11Illil).forEach(iiill1li => {
        i11Illil[iiill1li] && liIIll1I.push(i11Illil[iiill1li]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else liIIll1I = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IlIl11ii($.getdata("CookiesJD") || "[]").map(i11l1II1 => i11l1II1.cookie)].filter(lllIl1iI => !!lllIl1iI);

    console.log("共" + liIIll1I.length + "个京东账号\n");
    $.shareCodesArr = [];
    if ($.isNode()) Object.keys(il111l1l).forEach(lIIIiiiI => {
      il111l1l[lIIIiiiI] && $.shareCodesArr.push(il111l1l[lIIIiiiI]);
    });else {
      if ($.getdata("jd_plantBean_help_inviter")) $.shareCodesArr = $.getdata("jd_plantBean_help_inviter").split("\n").filter(lIi11iII => !!lIi11iII);
    }
    liIliii1();
  });
}

function iI11Ill1(liiil1lI, IiIIill = {}) {
  return new Promise(async lI1ll11l => {
    const il1l1ll1 = {
      "url": Ii1Ii1ll + "?functionId=" + liiil1lI + "&body=" + encodeURIComponent(JSON.stringify(IiIIill)) + "&appid=signed_wh5&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
      "headers": {
        "Accept": "*/*",
        "Origin": "https://h5.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://h5.m.jd.com",
        "x-requested-with": "com.jingdong.app.mall",
        "Cookie": ll1IIliI
      },
      "timeout": 10000
    };
    $.get(il1l1ll1, (illIil1, iI1lIlii, lIi1Iil1) => {
      try {
        illIil1 ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(illIil1)) : lIi1Iil1 = JSON.parse(lIi1Iil1);
      } catch (li1iI1l1) {
        $.logErr(li1iI1l1, iI1lIlii);
      } finally {
        lI1ll11l(lIi1Iil1);
      }
    });
  });
}

function iiillI1(Il11lilI, l1liI1l1 = {}) {
  return new Promise(async iIiIlli => {
    let I11liiii = "";
    if (!i1I1i11i[Il11lilI]) I11liiii = Ii1Ii1ll + "?functionId=" + Il11lilI + "&body=" + encodeURIComponent(JSON.stringify(l1liI1l1)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      if (!l1liI1l1.version) {
        l1liI1l1.version = "9.2.4.3";
      }

      l1liI1l1.monitor_source = "plant_m_plant_index";
      i1I1i11i[Il11lilI] == "shopNutrientsTask" && (headers.referer = "https://plantearth.m.jd.com/", headers["x-requested-with"] = "https://plantearth.m.jd.com/");
      await $.wait(5000);
      const I1l11lll = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": Il11lilI,
        "body": l1liI1l1
      };
      let IIliII1l = await l1I11llI(i1I1i11i[Il11lilI], I1l11lll);
      I11liiii = Ii1Ii1ll + "?" + IIliII1l;
    }
    const IiIiiiIl = {
      "url": I11liiii,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": ll1IIliI
      },
      "timeout": 20000
    };
    $.get(IiIiiiIl, (iIlIllIi, l1lIIIii, IlIl1l11) => {
      try {
        iIlIllIi ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log(iIlIllIi), $.logErr(iIlIllIi)) : IlIl1l11 = JSON.parse(IlIl1l11);
      } catch (liII1i) {
        $.logErr(liII1i, l1lIIIii);
      } finally {
        iIiIlli(IlIl1l11);
      }
    });
  });
}

function lI1lI1Ii(I1i111i1, iiIlii1I = {}) {
  return new Promise(async ilI1iIli => {
    let I1l1IIiI = "";
    if (!i1I1i11i[I1i111i1]) I1l1IIiI = Ii1Ii1ll + "?functionId=" + I1i111i1 + "&body=" + encodeURIComponent(JSON.stringify(iiIlii1I)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      iiIlii1I.version = "9.2.4.3";
      iiIlii1I.monitor_source = "plant_m_plant_index";
      !iiIlii1I.monitor_refer && (iiIlii1I.monitor_refer = "");
      const i11li1li = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": I1i111i1,
        "body": iiIlii1I
      };
      let IlII1IiI = await l1I11llI(i1I1i11i[I1i111i1], i11li1li);
      I1l1IIiI = Ii1Ii1ll + "?" + IlII1IiI;
    }
    await $.wait(5000);
    let iIilillI = {
      "url": I1l1IIiI,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": ll1IIliI
      },
      "timeout": 10000
    };
    $.get(iIilillI, async (Ii11iii1, i1liI1Il, iiIIlliI) => {
      try {
        if (Ii11iii1) {
          console.log("\n种豆得豆: API查询请求失败 ‼️‼️");
          console.log("function_id:" + I1i111i1);
          $.logErr(Ii11iii1);
        } else {
          if (iiIIlliI.indexOf("data") > -1) iiIIlliI = JSON.parse(iiIIlliI);else {
            iiIIlliI = JSON.parse(iiIIlliI);
            console.log(iiIIlliI.errorMessage);
          }
        }
      } catch (IlIIiIII) {
        $.logErr(IlIIiIII, i1liI1Il);
      } finally {
        ilI1iIli(iiIIlliI);
      }
    });
  });
}

const i1I1i11i = {
  "plantBeanIndex": "d246a",
  "receiveNutrients": "b56b8",
  "cultureBean": "6a216",
  "receiveNutrientsTask": "d22ac",
  "plantChannelNutrientsTask": "2424e",
  "shopNutrientsTask": "19c88",
  "productTaskList": "7351b",
  "productNutrientsTask": "a4e2d",
  "collectUserNutr": "14357"
};

async function ll1il11l(lIlIIIIl, lIIliII1) {
  lIIliII1.version = "9.2.4.3";
  lIIliII1.monitor_source = "plant_app_plant_index";
  !lIIliII1.monitor_refer && (lIIliII1.monitor_refer = "");

  if (!i1I1i11i[lIlIIIIl]) {} else {
    const ilI11iIi = {
      "appid": "signed_wh5",
      "client": "android",
      "clientVersion": "10.1.0",
      "functionId": lIlIIIIl,
      "body": lIIliII1
    };
  }

  return {
    "url": Ii1Ii1ll + "?" + h5st,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
      "Cookie": ll1IIliI
    },
    "timeout": 10000
  };
}

async function l1I11llI(IillI11l, II1Ili1l) {
  try {
    let i1I1IIII = new l11IIi1l({
      "appId": IillI11l,
      "appid": "signed_wh5",
      "clientVersion": II1Ili1l?.["clientVersion"],
      "client": II1Ili1l?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await i1I1IIII.genAlgo(), body = await i1I1IIII.genUrlParams(II1Ili1l.functionId, II1Ili1l.body), body;
  } catch (iI1lI1ii) {}
}

async function iI1lI1l(lIIiliIl, IIll1l) {
  let llIli11 = {
    "searchParams": { ...IIll1l,
      "appId": lIIiliIl
    },
    "pt_pin": $.UserName,
    "client": IIll1l?.["client"],
    "clientVersion": IIll1l?.["clientVersion"]
  },
      lIliiiIl = {
    "Content-Type": "application/json",
    "User-Agent": $.UA
  },
      iiiI1Iii = {
    "url": "http://h5st.kingran.cf/api/h5st",
    "body": JSON.stringify(llIli11),
    "headers": lIliiiIl,
    "timeout": 30000
  };
  return new Promise(async iIl1I11 => {
    $.post(iiiI1Iii, (llilli1l, il1llIi, lIiillIi) => {
      let liIiI1I1 = "";

      try {
        if (llilli1l) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lIiillIi = JSON.parse(lIiillIi);
          console.log(JSON.stringify(lIiillIi));

          if (typeof lIiillIi === "object" && lIiillIi && lIiillIi.body) {
            if (lIiillIi.body) liIiI1I1 = lIiillIi || "";
          } else lIiillIi.code == 400 ? console.log("\n" + lIiillIi.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (I1l1lIll) {
        $.logErr(I1l1lIll, il1llIi);
      } finally {
        iIl1I11(lIlilli(liIiI1I1));
      }
    });
  });
}

function lIlilli(lililiil, iIIi11l = {}) {
  let ll1llil1 = [],
      liiIIlii = iIIi11l.connector || "&",
      l11illI1 = Object.keys(lililiil);
  if (iIIi11l.sort) l11illI1 = l11illI1.sort();

  for (let iilII1Il of l11illI1) {
    let iiiiii1l = lililiil[iilII1Il];
    if (iiiiii1l && typeof iiiiii1l === "object") iiiiii1l = JSON.stringify(iiiiii1l);
    if (iiiiii1l && iIIi11l.encode) iiiiii1l = encodeURIComponent(iiiiii1l);
    ll1llil1.push(iilII1Il + "=" + iiiiii1l);
  }

  return ll1llil1.join(liiIIlii);
}

function iilil1ii(I1i1IilI, llIl1i1i) {
  const I1il1il = new RegExp("(^|&)" + llIl1i1i + "=([^&]*)(&|$)", "i"),
        lil1IIi1 = I1i1IilI.match(I1il1il);
  if (lil1IIi1 != null) return unescape(lil1IIi1[2]);
  return null;
}

function IlIl11ii(iIIi) {
  if (typeof iIIi == "string") try {
    return JSON.parse(iIIi);
  } catch (iiiii1l1) {
    return console.log(iiiii1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
