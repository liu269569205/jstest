//Tue Jul 02 2024 10:45:26 GMT+0800 (中国标准时间)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("带图评价晒单");
const bdy_0x2c5ab8 = $.isNode() ? require("./sendNotify") : "",
  bdy_0x25fe4e = $.isNode() ? require("./jdCookie.js") : "",
  bdy_0x3a94f1 = require("./function/dylanx"),
  bdy_0x284d79 = require("./USER_AGENTS");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let bdy_0x581d3c = [],
  bdy_0x266d5a = "";
if ($.isNode()) {
  var bdy_0xc571ca = new Buffer.from("64796C616E", "Hex").toString("utf8");
  Object.keys(bdy_0x25fe4e).forEach(_0x5012ce => {
    bdy_0x581d3c.push(bdy_0x25fe4e[_0x5012ce]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  let bdy_0x42b4f6 = $.getdata("CookiesJD") || "[]";
  bdy_0x42b4f6 = jsonParse(bdy_0x42b4f6);
  bdy_0x581d3c = bdy_0x42b4f6.map(_0x22ce5d => _0x22ce5d.cookie);
  bdy_0x581d3c.reverse();
  bdy_0x581d3c.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  bdy_0x581d3c.reverse();
  bdy_0x581d3c = bdy_0x581d3c.filter(_0x2ac326 => _0x2ac326 !== "" && _0x2ac326 !== null && _0x2ac326 !== undefined);
}
if (process.env.DY_PROXY) {
  const bdy_0x4a0f84 = require("./function/proxy.js");
  $.get = bdy_0x4a0f84.intoRequest($.get.bind($));
  $.post = bdy_0x4a0f84.intoRequest($.post.bind($));
}
const bdy_0x2c8dcc = process.env.EVALNUM ? process.env.EVALNUM : undefined;
let bdy_0x188763 = process.env.EVAL_WORD_COUNT ?? 10,
  bdy_0x197daa = process.env.ONEVAL ?? false,
  bdy_0x5473b3 = process.env.EVAL_CPKEY ? process.env.EVAL_CPKEY : "",
  bdy_0x31ecfe = ["垃圾", "质量差", "差评", "好差", "欺骗"],
  bdy_0x57f2ad = ["非常满意的购物体验！商品质量很好，价格实惠。物流迅速，包装严密。非常感谢商家的耐心解答和及时发货，给予8分好评。", "商品质量非常好，价格实惠，物流速度很快。包装完好，没有损坏。非常感谢商家的耐心解答和热情服务，下次还会再来购买。", "这是一次愉快的购物体验，商品质量非常好，价格也很实惠。物流速度快，包装严密。非常感谢商家的耐心服务和及时回复，给予8分好评。", "商品收到了，非常满意！质量可以，价格也还合理。感谢商家客服的热情服务和及时发货，好的话会推荐给朋友们。", "这次购物真是太棒了！商品质量很好，与描述一致。包装仔细，没有损坏。非常感谢商家的认真态度和及时发货，下次还会再来购买。", "质量非常好,与卖家描述的完全一致,真的很喜欢,完全超出期望值,发货速度非常快,物流公司服务态度很好,运送速度很快,店主态度特好,很好很好!质量好而价低廉，很热情的客服，下次还来祝你生意兴隆质量非常好，出乎我的意料包装非常仔细。", "我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。", "感觉物超所值 服务态度还是可以的，没什么太多可挑剔的，再接再厉，祝老板生意兴隆", "这是一条好评段子，花钱的评价，麻烦你们认真点!先说商品质量：产品总体不错，包装严实。再说商家服务：点赞啦。最后点评快递：发货很快。其他就是感谢店家打折送券活动，毕竟便宜好货更实在。希望店家多多优惠，及时通知老客户，促成回购。祝生意兴隆。", "滴滴滴，我来汇报了，东西还行，客服节能有待提高哈，一贯好评啦，快递是真的快，后面再来追评吧，就这样"],
  bdy_0x37b457 = ["赠品", "权益", "非实物", "非卖品", "增值服务", "服务", "券包", "只换不修"],
  bdy_0x59c513 = ["送的没花钱哈哈", "东西还还不错", "现在的购物体验越来越好", "以前还没有这么多贴心的赠品、增值服务、权益等服务", "给赞", "算不算白嫖"],
  bdy_0x20a40f = ["以上是我购物感受和体验，仅供参考，也不要只看好评，适合我的不一定适合你。。。。", "总的来说，还可以，我的评价供大家参考借鉴，根据自己情况。。。。", "总之还行，买不了吃亏，买的了上当，嘿嘿！！！！", "就这样，一惯好评啦，不是非常烂一般不会差评", "最后，希望京东越来越好，感恩"],
  bdy_0x42e926 = [],
  bdy_0x460a2d = "",
  bdy_0x5a057a = true;
!__filename.includes(bdy_0xc571ca) && (bdy_0x5a057a = false);
!(async () => {
  if (!bdy_0x581d3c[0]) {
    const _0x5bcbf7 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x5bcbf7);
    return;
  }
  console.log("当前版本：20240625 差评内容关键词");
  console.log("每次运行最多20个账号，每个账号最多评价10个商品");
  console.log("差评关键词变量 EVAL_CPKEY='xxx&yyy' 多个&连接");
  console.log("问题反馈：https://t.me/dylan_jdpro");
  if (bdy_0x197daa === false) {
    console.log("\n\n默认不执行, 请设置变量 ONEVAL='true'");
    return;
  }
  bdy_0x5473b3 != "" && (console.log("\n合并自定义差评内容关键词"), bdy_0x5473b3.includes("&") ? bdy_0x31ecfe = bdy_0x31ecfe.concat(bdy_0x5473b3.split("&")) : bdy_0x31ecfe.push(bdy_0x5473b3), bdy_0x31ecfe = [...new Set(bdy_0x31ecfe)]);
  console.log("\n屏蔽差评内容关键词：" + JSON.stringify(bdy_0x31ecfe));
  let _0x2f4ff2 = 0;
  if (bdy_0x581d3c.length > 50) {
    _0x2f4ff2 = bdy_0x2c8dcc ?? 50;
  } else {
    _0x2f4ff2 = bdy_0x581d3c.length;
  }
  await bdy_0x45ba4d();
  if (bdy_0x460a2d == "") {
    console.log("未知错误，反馈作者修！");
    return;
  }
  for (let _0x4126c8 = 0; _0x4126c8 < _0x2f4ff2; _0x4126c8++) {
    if (bdy_0x581d3c[_0x4126c8]) {
      bdy_0x266d5a = bdy_0x581d3c[_0x4126c8];
      $.UserName = decodeURIComponent(bdy_0x266d5a.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x266d5a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4126c8 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.commentWareList = "";
      $.commentInfoList = "";
      $.UA = bdy_0x284d79.UARAM ? bdy_0x284d79.UARAM(1) : bdy_0x284d79.USER_AGENT;
      $.UA = "okhttp/3.12.16;jdmall;android;version/12.4.2;build/99108;";
      await bdy_0x864513();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        const _0x3fdd04 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x3fdd04);
        $.isNode() && (await bdy_0x2c5ab8.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await bdy_0x26ad63();
      console.log("\n等待10秒...");
      await $.wait(10000);
    }
  }
})().catch(_0x8e5059 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x8e5059 + "!", "");
}).finally(() => {
  $.done();
});
async function bdy_0x26ad63() {
  try {
    $.commentWareList = [];
    $.caidanList = [];
    await bdy_0x2daf37();
    if (!$.maxPage) {
      console.log("获取待评价数据失败");
      return;
    }
    $.maxPage > 1 && (await $.wait(2000), await bdy_0x2daf37($.maxPage), $.commentWareList.length == 0 && (await $.wait(2000), await bdy_0x2daf37($.maxPage - 1)));
    await $.wait(1000);
    await bdy_0x2daf37("1", "4");
    $.caidanList.length != 0 && (console.log("有" + $.caidanList.length + "个彩蛋评价！"), $.commentWareList = $.commentWareList.concat($.caidanList));
    console.log("当前有" + Number($.sdnum) + "个待评价晒单，开始评价最后一页的" + $.commentWareList.length + "个商品...");
    for (let _0x19bb2f of $.commentWareList.reverse()) {
      let _0x4ccfad = [],
        _0x2352a4 = [],
        _0x52d7f9 = "",
        _0x352ded = [];
      bdy_0x42e926 = [];
      $.log("\n去评价 👉 " + _0x19bb2f.wname);
      if (_0x19bb2f.commentRewardStatus == "1") {
        await bdy_0x18695d(_0x19bb2f.orderId, _0x19bb2f.wareId);
        console.log($.rewardInfo);
        console.log("要求至少" + $.wnezi + "字," + $.saitu + "图");
      } else {
        _0x19bb2f.estJingBean > 0 && $.log("评价完成最多可得 " + _0x19bb2f.estJingBean + " 豆 🥔");
      }
      if (bdy_0x37b457.filter(_0x42e536 => _0x19bb2f.wname.includes(_0x42e536)).length == 0) {
        console.log("\n开始获取商品好评和图片...");
        await $.wait(5000);
        await bdy_0x13c629(_0x19bb2f.wareId);
        if ($.maxPage > 1) {
          await $.wait(1000);
          await bdy_0x13c629(_0x19bb2f.wareId, Math.floor(Math.random() * Math.min.apply(null, [$.maxPage, 10]) + 2));
        }
        await $.wait(2000);
        for (const _0x47acd9 of bdy_0x42e926) {
          if (_0x47acd9.commentInfo.pictureInfoList) {
            for (const _0x3e6da7 of _0x47acd9.commentInfo.pictureInfoList || {}) {
              if (_0x3e6da7.mediaType != "2") {
                let _0x16927f = "";
                if (_0x3e6da7.picURL.indexOf("dpg") !== -1) {
                  _0x16927f = _0x3e6da7.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, "$1");
                } else {
                  if (_0x3e6da7.picURL.indexOf("webp") !== -1) {
                    _0x16927f = _0x3e6da7.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, "$1");
                  } else {
                    if (_0x3e6da7.picURL.indexOf("avif") !== -1) {
                      _0x16927f = _0x3e6da7.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, "$1");
                    }
                  }
                }
                _0x16927f != "" && _0x4ccfad.push(_0x16927f);
              }
            }
          }
          if (_0x47acd9.commentInfo.commentScore === "5" && _0x47acd9.commentInfo.commentData.length > bdy_0x188763) {
            _0x2352a4.push(_0x47acd9.commentInfo.commentData);
          }
        }
        for (let _0x15869f of bdy_0x31ecfe) {
          _0x2352a4 = _0x2352a4.filter(_0x5b749a => !_0x5b749a.includes(_0x15869f));
        }
        _0x2352a4.length > 2 ? _0x52d7f9 = bdy_0x51fd8f(_0x2352a4) : _0x52d7f9 = bdy_0x51fd8f(bdy_0x57f2ad);
        if (_0x4ccfad.length >= 2) {
          let _0x4954c9 = bdy_0x3d7349(_0x4ccfad, 2);
          _0x352ded = _0x4954c9.slice(0, _0x4954c9.length).map(_0xd65c72 => ({
            picUrl: _0xd65c72
          }));
        }
      } else {
        console.log("赠品权益，只发布文字评价");
        _0x52d7f9 += bdy_0x201cb5(bdy_0x59c513);
      }
      _0x52d7f9 = _0x52d7f9.replace(/\*/gi, "");
      _0x19bb2f.estJingBean > 0 && _0x52d7f9.length < 60 && ($.log("评价有豆，字数不够，我在凑点..."), _0x52d7f9 += " " + bdy_0x51fd8f(bdy_0x20a40f));
      if (_0x19bb2f.commentRewardStatus == "1") {
        _0x52d7f9.length < Number($.wnezi) && (_0x52d7f9 += " " + bdy_0x51fd8f(bdy_0x20a40f));
        if (_0x52d7f9.length < Number($.wnezi)) {
          _0x52d7f9 += " 好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了，好评了";
        }
        let _0x5a5d84 = bdy_0x3d7349(_0x4ccfad, Math.max(2, Number($.saitu)));
        _0x352ded = _0x5a5d84.slice(0, _0x5a5d84.length).map(_0x16e186 => ({
          picUrl: _0x16e186
        }));
      }
      if (_0x352ded.length != 0 && _0x2352a4.length > 2) {
        console.log("成功获取到图片和评价，去发布✍️✍️✍️...\n");
        await bdy_0x398bbf("pubComment", {
          productId: _0x19bb2f.wareId,
          kocSynFlag: "0",
          categoryList: _0x19bb2f.categoryList,
          voucherStatus: "0",
          extInfo: {
            mediasExt: "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
          },
          officerScore: "1699",
          anonymousFlag: "1",
          commentScore: "5",
          shopType: "0",
          orderId: _0x19bb2f.orderId,
          shopId: _0x19bb2f.shopId,
          addPictureFlag: "0",
          commentData: _0x52d7f9,
          pictureInfoList: _0x352ded,
          officerLevel: "3",
          isCommentTagContent: "0"
        });
      } else {
        if (_0x352ded.length != 0 && _0x2352a4.length <= 2) {
          console.log("成功获取到图片，但没有获取到评价内容，使用内置评价，去发布✍️✍️✍️...\n");
          const _0x3c9543 = {
            mediasExt: "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
          };
          const _0x4a521c = {
            productId: _0x19bb2f.wareId,
            kocSynFlag: "0",
            categoryList: _0x19bb2f.categoryList,
            voucherStatus: "0",
            extInfo: _0x3c9543,
            officerScore: "1699",
            anonymousFlag: "1",
            commentScore: "5",
            shopType: "0",
            orderId: _0x19bb2f.orderId,
            shopId: _0x19bb2f.shopId,
            addPictureFlag: "0",
            commentData: _0x52d7f9,
            pictureInfoList: _0x352ded,
            officerLevel: "3",
            isCommentTagContent: "0"
          };
          await bdy_0x398bbf("pubComment", _0x4a521c);
        } else {
          if (_0x352ded.length == 0 && _0x2352a4.length > 2) {
            console.log("没有获取到图片，但获取到评价，去发布✍️✍️✍️...\n");
            await bdy_0x398bbf("pubComment", {
              productId: _0x19bb2f.wareId,
              kocSynFlag: "0",
              categoryList: _0x19bb2f.ategoryList,
              voucherStatus: "0",
              officerScore: "1699",
              anonymousFlag: "1",
              commentScore: "5",
              shopType: "0",
              orderId: _0x19bb2f.orderId,
              shopId: _0x19bb2f.shopId,
              addPictureFlag: "0",
              commentData: _0x52d7f9,
              pictureInfoList: "",
              officerLevel: "3",
              isCommentTagContent: "0"
            });
          } else {
            if (bdy_0x42e926.length <= 1) {
              console.log("没有获取到评价和图片,使用内置文字评价，去发布✍️✍️✍️...\n");
              const _0x2709a7 = {
                productId: _0x19bb2f.wareId,
                kocSynFlag: "0",
                categoryList: _0x19bb2f.ategoryList,
                voucherStatus: "0",
                officerScore: "1699",
                anonymousFlag: "1",
                commentScore: "5",
                shopType: "0",
                orderId: _0x19bb2f.orderId,
                shopId: _0x19bb2f.shopId,
                addPictureFlag: "0",
                commentData: _0x52d7f9,
                pictureInfoList: "",
                officerLevel: "3",
                isCommentTagContent: "0"
              };
              await bdy_0x398bbf("pubComment", _0x2709a7);
            }
          }
        }
      }
      console.log("评价内容(" + _0x52d7f9.length + "字) ：" + _0x52d7f9);
      _0x352ded.length != 0 && (console.log("晒图详情："), _0x352ded.forEach(_0x2a0300 => console.log(_0x2a0300.picUrl)));
      await $.wait(1000);
    }
  } catch (_0x480e84) {
    console.log(_0x480e84);
    console.log("出错了，反馈作者修！！！");
  }
}
switch ($.type) {
  case "nb":
    const bdy_0x5de19b = {
      nb: nb
    };
    _0xf1f6le = bdy_0x5de19b;
    break;
}
async function bdy_0x13c629(_0x1b679c, _0x48d0d2 = 1) {
  const _0x15ca16 = {
    sortType: "5",
    isCurrentSku: false,
    sku: "" + _0x1b679c,
    pictureCommentType: "A",
    shieldCurrentComment: "1",
    shopType: "0",
    type: "4",
    shadowMainSku: "0",
    num: "10",
    offset: "" + _0x48d0d2,
    pageNum: "" + _0x48d0d2,
    pageSize: "10"
  };
  s = await bdy_0x398bbf("getCommentListWithCard", _0x15ca16);
  bdy_0x42e926 = bdy_0x42e926.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function bdy_0x2341f8(_0x4acbdf, _0x5dd1cf = 1) {
  const _0xf516dd = {
    bbtf: ""
  };
  const _0x2a2a2d = {
    category: "",
    extInfo: _0xf516dd,
    isCurrentSku: true,
    num: "21",
    offset: "" + _0x5dd1cf,
    shadowMainSku: "0",
    shopType: "0",
    sku: "" + _0x4acbdf
  };
  s = await bdy_0x398bbf("getShowPictures", _0x2a2a2d);
  $.commentInfoList = s.commentShowPicInfoList;
  $.maxPage = s.maxPage;
}
async function bdy_0x32631b(_0x2652ec, _0x5a57bd = 1) {
  const _0x550534 = {
    bbtf: ""
  };
  const _0x4d53ea = {
    category: "",
    extInfo: _0x550534,
    isCurrentSku: false,
    num: "10",
    offset: "" + _0x5a57bd,
    shopType: "0",
    sku: "" + _0x2652ec,
    type: "4"
  };
  s = await bdy_0x398bbf("getFoldCommentList", _0x4d53ea);
  bdy_0x42e926 = bdy_0x42e926.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function bdy_0x18695d(_0x1ae857, _0x523cf3) {
  const _0x203e0c = {
    allFloorsFlag: null,
    business: "1",
    evaAuraVersion: "120602",
    lowSaleQuantity: null,
    orderId: _0x1ae857,
    qrType: "1",
    sku: _0x523cf3
  };
  s = await bdy_0x398bbf("commentEditInfo", _0x203e0c);
  $.rewardInfo = s.commentFloorList[0].productCommentFloor.newCommentRewardMap?.["bannerInfo"] || "评价有礼";
  $.wnezi = JSON.stringify(s).match(new RegExp("(\\d+)字")) ? JSON.stringify(s).match(new RegExp("(\\d+)字"))[1] : 60;
  $.saitu = JSON.stringify(s).match(new RegExp("(\\d+)晒图")) ? JSON.stringify(s).match(new RegExp("(\\d+)晒图"))[1] : 2;
}
async function bdy_0x2daf37(_0x194c5d = "1", _0xf3d5b1 = "1") {
  const _0x44f652 = {
    pageIndex: _0x194c5d,
    pageSize: "10",
    planType: "1",
    status: _0xf3d5b1
  };
  s = await bdy_0x398bbf("getCommentWareList", _0x44f652);
  $.maxPage = s.commentWareListInfo?.["maxPage"];
  $.sdnum = s.commentWareListInfo?.["wait4CommentCount"];
  _0xf3d5b1 == "4" ? $.caidanList = s.commentWareListInfo?.["commentWareList"] : $.commentWareList = s.commentWareListInfo?.["commentWareList"];
}
async function bdy_0x398bbf(_0x43e3e6, _0x2101ab) {
  let _0x4ba591 = await bdy_0x3a94f1[bdy_0x460a2d](_0x43e3e6, _0x2101ab, "11.0.2", "1"),
    _0x469e83 = {
      url: "https://api.m.jd.com/client.action?functionId=" + _0x43e3e6,
      body: "fuctionId=" + _0x43e3e6 + "&" + _0x4ba591,
      headers: {
        Host: "api.m.jd.com",
        accept: "*/*",
        "user-agent": $.UA,
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        Cookie: bdy_0x266d5a
      }
    };
  return new Promise(_0x166741 => {
    $.dpost(_0x469e83, (_0x1c869a, _0x35dc3f, _0x491796) => {
      try {
        _0x1c869a ? console.log(_0x1c869a) : _0x491796 = JSON.parse(_0x491796);
        switch (_0x43e3e6) {
          case "pubComment":
            _0x491796.message && console.log(_0x491796.message);
            break;
          default:
            break;
        }
      } catch (_0x17b0a6) {
        console.log(_0x17b0a6);
      } finally {
        _0x166741(_0x491796);
      }
    });
  });
}
function bdy_0x240475() {
  return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}
function bdy_0x51fd8f(_0x4a6c9e) {
  return _0x4a6c9e[Math.floor(Math.random() * _0x4a6c9e.length)] || "";
}
function bdy_0x3d7349(_0x124311, _0x54686c) {
  const _0x581781 = _0x124311.slice();
  let _0x58a46d = _0x124311.length,
    _0x9878ed,
    _0x3d25da;
  while (_0x58a46d--) {
    _0x3d25da = Math.floor((_0x58a46d + 1) * Math.random());
    _0x9878ed = _0x581781[_0x3d25da];
    _0x581781[_0x3d25da] = _0x581781[_0x58a46d];
    _0x581781[_0x58a46d] = _0x9878ed;
  }
  return _0x581781.slice(0, _0x54686c);
}
function bdy_0x45ba4d() {
  let _0x1e0a48 = {
    url: "https://verify-dy-server-hchdzuwrsu.cn-hangzhou.fcapp.run/pingjia",
    timeout: 30000
  };
  return new Promise(_0x5077fa => {
    $.post(_0x1e0a48, async (_0x351022, _0x563215, _0x47737c) => {
      try {
        if (!_0x351022) {
          if (_0x47737c) {
            _0x47737c = JSON.parse(_0x47737c);
            if (_0x47737c.status === 200) {
              bdy_0x460a2d = _0x47737c.method;
            }
          }
        }
      } catch (_0x380dfd) {
        $.logErr(_0x380dfd, _0x563215);
      } finally {
        _0x5077fa(_0x47737c);
      }
    });
  });
}
function bdy_0x7c8216(_0x34637b) {
  const _0x336f98 = [],
    _0x3475f4 = /[\u4e00-\u9fa5]/;
  for (let _0x963e60 = 0; _0x963e60 < _0x34637b.length; _0x963e60++) {
    const _0x4c3683 = _0x34637b[_0x963e60];
    _0x3475f4.test(_0x4c3683) && !_0x336f98.includes(_0x4c3683) && _0x336f98.push(_0x4c3683);
  }
  return _0x336f98.length;
}
function bdy_0x201cb5(_0xe5af42) {
  for (let _0xe84b96 = _0xe5af42.length - 1; _0xe84b96 > 0; _0xe84b96--) {
    const _0x25dbbc = Math.floor(Math.random() * (_0xe84b96 + 1));
    [_0xe5af42[_0xe84b96], _0xe5af42[_0x25dbbc]] = [_0xe5af42[_0x25dbbc], _0xe5af42[_0xe84b96]];
  }
  return _0xe5af42.join(",");
}
function bdy_0x864513() {
  return new Promise(_0x4ca14b => {
    const _0x1e9963 = {
      Cookie: bdy_0x266d5a,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x6c08a7 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x1e9963,
      timeout: 10000
    };
    $.get(_0x6c08a7, (_0x4a12a8, _0x986bf8, _0xa1f943) => {
      try {
        if (_0xa1f943) {
          _0xa1f943 = JSON.parse(_0xa1f943);
          if (!(_0xa1f943.islogin === "1")) {
            _0xa1f943.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0xce364b) {
        console.log(_0xce364b);
      } finally {
        _0x4ca14b();
      }
    });
  });
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
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
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
      if (i) {
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
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
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
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
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
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
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
      } else {
        s = this.setval(t, e);
      }
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
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
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
          }, t => e(t));
        } else {
          if (this.isNode()) {
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
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
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