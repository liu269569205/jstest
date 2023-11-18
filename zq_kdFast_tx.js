/*
测试脚本
需要crypto-js.js依赖
*/

const jsname = '中青极速'
const $ = Env(jsname)
let logDebug = 0
const notifyFlag = process.env.zqnotify || 1; 	//0为关闭通知，1为打开通知,默认为0
const CryptoJS = require('crypto-js')

const notify = $.isNode() ? require('./sendNotify') : '';


let notifyStr=''
let userCookie = ($.isNode() ? process.env.zqkdFastCookie : $.getdata('zqkdFastCookie')) || '';
let userCookieArr = []
let cash = ($.isNode() ? process.env.zqkdCash : $.getdata('zqkdCash')) || '1';	//提现额度
let zqkdCashtype = ($.isNode() ? process.env.zqkdFastCashtype : $.getdata('zqkdFastCashtype')) ;	//提现类型，微信wechat和支付宝alipay
let withdraw_auto=process.env.zqkd_withdraw_auto||1	//是否打开自动提现，默认关闭
let zqkdCashtypeArr=[]

let tmpCk=''
let userIdx=''

function _0x3e7e(){const _0x121002=['push','sendNotify','toString','token_id=','catch','1044022bMzqIC','开始尝试提现0.3','&app_version=2.3.2&openudid=7dd446db27986d33&channel=c6001&device_id=37649193&device_model=OD105&device_brand=SMARTISAN&resolution=1080*1920&os_version=24&is_wxaccount=1&active_channel=c6001&access=wifi','&token=','&token_id=','wait','user_status','1334934zkzaND','失败：','428ZyPjkY','成功🎉','message','round','success','log','split','【账号状态】：','未设置zqkdCashtype，默认提现到WECHAT','token','2157YZzYjU','8SOIhtr','&openudid=7dd446db27986d33&os_version=24&resolution=1080*1920&token_id=','name','6451638UUwsfB',',\x20失败!\x20原因:\x20','length','个用户','token_id','未找到userCookie','replace','nickname','&active_channel=c6001&token=','indexOf','MD5','3850ozLvXn','score','https://user.youth.cn/v1/Withdraw/wechat.json','is_add_desktop=1&','&is_login=1&is_wxaccount=1&app_version=2.3.2&openudid=7dd446db27986d33&device_id=37649193&device_model=OD105&resolution=1080*1920&uid=','msg','查询今日收益失败：','【今日收益】：','51380nYhZBl','【青豆总数】：','&type=2&uid=','\x20-\x20','8435VQmfmk','uid','🎉\x0a','items','alipay','access=wifi&active_channel=c6001&add_desktop=1&app_version=2.3.2&channel=c6001&device_brand=SMARTISAN&device_id=37649193&device_model=OD105&is_login=1&is_wxaccount=1&money=','error_code','658qtnnQI','https://user.youth.cn/FastApi/Alipay/withdraw.json','运行通知\x0a','1439712tLhHas','&add_desktop=1&money='];_0x3e7e=function(){return _0x121002;};return _0x3e7e();}const _0x163444=_0x2575;(function(_0x5900f0,_0x3d75f0){const _0x3428b1=_0x2575,_0x4c62b1=_0x5900f0();while(!![]){try{const _0x4546b9=parseInt(_0x3428b1(0x204))/0x1*(-parseInt(_0x3428b1(0x1e7))/0x2)+parseInt(_0x3428b1(0x1ea))/0x3+parseInt(_0x3428b1(0x1fa))/0x4*(parseInt(_0x3428b1(0x1e0))/0x5)+-parseInt(_0x3428b1(0x208))/0x6+-parseInt(_0x3428b1(0x1f1))/0x7*(parseInt(_0x3428b1(0x205))/0x8)+parseInt(_0x3428b1(0x1f8))/0x9+-parseInt(_0x3428b1(0x21b))/0xa*(-parseInt(_0x3428b1(0x213))/0xb);if(_0x4546b9===_0x3d75f0)break;else _0x4c62b1['push'](_0x4c62b1['shift']());}catch(_0x58f02f){_0x4c62b1['push'](_0x4c62b1['shift']());}}}(_0x3e7e,0xa44c7),!(async()=>{const _0x1a35d1=_0x2575;if(!await checkEnv())return;for(userIdx=0x0;userIdx<userCookieArr[_0x1a35d1(0x20a)];userIdx++){console.log('等20秒');await $.wait(15000+parseInt(Math.random()*20000));tmpCk=userCookieArr[userIdx],await getBalance(userIdx);}await showmsg();})()[_0x163444(0x1f0)](_0x230262=>{const _0x4db825=_0x163444;$[_0x4db825(0x1ff)]('','❌\x20'+$['name']+_0x4db825(0x209)+_0x230262+'!','');})['finally'](()=>{$['done']();}));async function checkEnv(){const _0x5d95de=_0x163444;if(userCookie){if(userCookie[_0x5d95de(0x211)]('@')>-0x1){let _0x2ef14a=userCookie['split']('@');for(let _0x1fed3e=0x0;_0x1fed3e<_0x2ef14a[_0x5d95de(0x20a)];_0x1fed3e++){userCookieArr[_0x5d95de(0x1ec)](replaceCookie(_0x2ef14a[_0x1fed3e]));}}else{if(userCookie[_0x5d95de(0x211)]('\x0a')>-0x1){console['log']('cookie使用回车符分割');let _0x5d1259=userCookie[_0x5d95de(0x200)]('\x0a');for(let _0x29046f=0x0;_0x29046f<_0x5d1259[_0x5d95de(0x20a)];_0x29046f++){userCookieArr[_0x5d95de(0x1ec)](replaceCookie(_0x5d1259[_0x29046f]));}}else userCookieArr['push'](replaceCookie(userCookie));}}else return console[_0x5d95de(0x1ff)](_0x5d95de(0x20d)),![];if(zqkdCashtype){if(zqkdCashtype[_0x5d95de(0x211)]('@')>-0x1){let _0x25c0e0=zqkdCashtype[_0x5d95de(0x200)]('@');for(let _0x14540a=0x0;_0x14540a<_0x25c0e0[_0x5d95de(0x20a)];_0x14540a++){zqkdCashtypeP=_0x25c0e0[_0x14540a],zqkdCashtypeArr['push'](zqkdCashtypeP);}}else zqkdCashtypeP=zqkdCashtype,zqkdCashtypeArr['push'](zqkdCashtypeP);}else console[_0x5d95de(0x1ff)](_0x5d95de(0x202));if(userCookieArr[_0x5d95de(0x20a)]==0x0)return console[_0x5d95de(0x1ff)]('未找到有效的userCookie'),![];return console[_0x5d95de(0x1ff)]('共找到'+userCookieArr[_0x5d95de(0x20a)]+_0x5d95de(0x20b)),!![];}function replaceCookie(_0x1dacce){const _0x216b32=_0x163444;let _0x1d4a02='',_0x485a22='',_0x228540='',_0x293989=UrlParamHash(_0x1dacce);return _0x1d4a02='uid='+_0x293989[_0x216b32(0x1e1)]+_0x216b32(0x1f4)+_0x293989[_0x216b32(0x203)]+_0x216b32(0x1f5)+_0x293989[_0x216b32(0x20c)],_0x1d4a02;}async function showmsg(){const _0x4847e3=_0x163444;notifyBody=jsname+_0x4847e3(0x1e9)+notifyStr,notifyFlag!=0x1&&console['log'](notifyBody),notifyFlag==0x1&&(console[_0x4847e3(0x1ff)](notifyBody),$['isNode']()&&await notify[_0x4847e3(0x1ed)]($[_0x4847e3(0x207)],notifyBody));}async function getBalance(_0x4115ee){const _0x496f90=_0x163444;let _0x8b72a3=printCaller(),_0x492904=userCookieArr[_0x4115ee],_0x2ca2b3=0x0;_0x492904=_0x496f90(0x216)+_0x492904+_0x496f90(0x1f3);let _0x2fa30c='https://user.youth.cn/v1/user/userinfo.json?'+_0x492904,_0x2e91b1=PopulateGetUrl(_0x2fa30c);await HttpGet(_0x2e91b1,_0x8b72a3);let _0x8d7725=httpResult;if(!_0x8d7725)return;if(_0x8d7725[_0x496f90(0x1e6)]==0x0){let _0x3e1cff=Math['round'](_0x8d7725[_0x496f90(0x1e3)][_0x496f90(0x214)]/0x64)/0x64;if(_0x4115ee>0x0)notifyStr+='-----------------------\x0a';notifyStr+='账户'+(_0x4115ee+0x1)+'\x20'+_0x8d7725[_0x496f90(0x1e3)][_0x496f90(0x20f)]+':\x20\x0a',notifyStr+=_0x496f90(0x21c)+Math[_0x496f90(0x1fd)](_0x8d7725['items'][_0x496f90(0x214)]/0x64)/0x64+'\x0a',notifyStr+=_0x496f90(0x21a)+Math[_0x496f90(0x1fd)](_0x8d7725[_0x496f90(0x1e3)]['today_score']/0x64)/0x64+'\x0a';let _0x5c0f49=_0x8d7725[_0x496f90(0x1e3)][_0x496f90(0x1f7)]<0x1?'黑号':'正常';notifyStr+=_0x496f90(0x201)+_0x5c0f49+'\x0a';if(_0x3e1cff>=0x5)_0x2ca2b3=0x5;else{if(_0x3e1cff>=0x1)_0x2ca2b3=0x1;else{if(_0x3e1cff>=0.3)_0x2ca2b3=0.3;}}let _0x39c1cd=await mkurl(_0x2ca2b3),_0x13b78d=await mkurl(0.3);if(_0x2ca2b3>0.3)console[_0x496f90(0x1ff)]('用户'+(_0x4115ee+0x1)+'开始尝试提现'+_0x2ca2b3),await withdraw(_0x4115ee,_0x39c1cd,_0x2ca2b3),await $[_0x496f90(0x1f6)](0x7d0),console[_0x496f90(0x1ff)]('用户'+(_0x4115ee+0x1)+_0x496f90(0x1f2)),await withdraw(_0x4115ee,_0x13b78d,0.3);else await withdraw(_0x4115ee,_0x13b78d,0.3);}else console[_0x496f90(0x1ff)](_0x496f90(0x219)+_0x8d7725[_0x496f90(0x218)]);}async function mkurl(_0x3a160f){const _0x1862ab=_0x163444;let _0xbaf5a1=userCookieArr[userIdx],_0x1c6fe6=UrlParamHash(_0xbaf5a1),_0x1fd230=_0x1862ab(0x1e5)+_0x3a160f+_0x1862ab(0x206)+_0x1c6fe6[_0x1862ab(0x20c)]+_0x1862ab(0x21d)+_0x1c6fe6[_0x1862ab(0x1e1)],_0x34bb62=await encodeStr(_0x1fd230),_0x4cfb50=_0x1862ab(0x1ef)+_0x1c6fe6[_0x1862ab(0x20c)]+'&sign='+_0x34bb62+_0x1862ab(0x210)+_0x1c6fe6[_0x1862ab(0x203)]+_0x1862ab(0x1eb)+_0x3a160f+_0x1862ab(0x217)+_0x1c6fe6['uid']+'&os_version=24&device_brand=SMARTISAN&access=wifi&type=2&channel=c6001';return _0x4cfb50;}function _0x2575(_0x5510a3,_0x186e6f){const _0x3e7e27=_0x3e7e();return _0x2575=function(_0x2575ce,_0x2477c2){_0x2575ce=_0x2575ce-0x1df;let _0x598ff5=_0x3e7e27[_0x2575ce];return _0x598ff5;},_0x2575(_0x5510a3,_0x186e6f);}function encodeStr(_0x11e663){const _0x64b8f3=_0x163444;let _0x37f422='jdvylqcGGHHJZrfw0o2DgAbsmBCCGUapF1YChc';return replacedStr=_0x11e663[_0x64b8f3(0x20e)](/\&/g,''),replacedStr+=_0x37f422,md5Str=CryptoJS[_0x64b8f3(0x212)](replacedStr)[_0x64b8f3(0x1ee)](),md5Str;}async function withdraw(_0x212b45,_0x919c56,_0x1d11f9){const _0x398246=_0x163444;let _0x3ca7a2=printCaller(),_0x53dfc9=zqkdCashtypeArr[_0x212b45];if(!_0x53dfc9)_0x53dfc9='wechat';console[_0x398246(0x1ff)]('提现到：'+_0x53dfc9);let _0x1920fa=_0x398246(0x215);if(_0x53dfc9==_0x398246(0x1e4))_0x1920fa=_0x398246(0x1e8);let _0x1a54cf=PopulatePostUrl(_0x1920fa,_0x919c56);await HttpPost(_0x1a54cf,_0x3ca7a2);let _0x599c7e=httpResult;if(!_0x599c7e)return;_0x599c7e[_0x398246(0x1fe)]==!![]?(otherts=!![],notifyStr+='用户'+(_0x212b45+0x1)+'\x20提现：'+_0x1d11f9+_0x398246(0x1df)+_0x599c7e['message']+_0x398246(0x1e2),console[_0x398246(0x1ff)]('用户'+(_0x212b45+0x1)+'提现'+_0x1d11f9+_0x398246(0x1fb))):(console[_0x398246(0x1ff)]('用户'+(_0x212b45+0x1)+'提现'+_0x1d11f9+'失败：'+_0x599c7e[_0x398246(0x1fc)]),notifyStr+='用户'+(_0x212b45+0x1)+'提现'+_0x1d11f9+_0x398246(0x1f9)+_0x599c7e[_0x398246(0x1fc)]+'\x0a');}

 
/**
 * 传入对象 ,返回对象的属性数组
 */
function getObjectKey(obj){
	return Object.keys(obj);
}
 
/**
 * 传入数组
 * 按字母顺序,升序
 * 冒泡排序
 */
function getKeySort(strArr){
	var count = 0;
	var compareInt = 0;
	for (var i = 0; i < strArr.length; i++) {
		for (var j = 0; j < strArr.length - 1 - i; j++) {
			/*if(strArr [j].substring(0,1) > strArr[j + 1].substring(0,1)){
				var temp = strArr[j + 1];
				strArr[j + 1] = strArr[j];
				strArr[j] = temp;
			}
			if(strArr [j].substring(0,1) == strArr[j + 1].substring(0,1)){
				if(strArr [j].substring(1,2) > strArr[j + 1].substring(1,2)){
					var temp = strArr[j + 1];
					strArr[j + 1] = strArr[j];
					strArr[j] = temp;
				}
			}*/
			compareToIndexValue(strArr,compareInt,j);
			count ++ ;
		}	
	}
	/*console.log("遍历次数:"+count);*/
	/*console.log(strArr);*/
	return strArr;
}
 
/**
 *  根据首字母 排序,如果首字母相同则根据第二个字母排序...直到排出大小
 */
function compareToIndexValue(arr,int,arrIndex){
	if(arr[arrIndex].substring(int,int+1) == arr[arrIndex + 1].substring(int,int+1)) compareToIndexValue(arr,int+1,arrIndex);//如果第一位相等,则继续比较第二个字符
	else if(arr[arrIndex].substring(int,int+1) > arr[arrIndex + 1].substring(int,int+1)) {
		var temp = arr[arrIndex + 1];
		arr[arrIndex + 1] = arr[arrIndex];
		arr[arrIndex] = temp
	}/*else if(arr[arrIndex].substring(int,int+1) < arr[arrIndex + 1].substring(int,int+1)) return;*/
	return;
}
 
/**
 * 输入排序过后的key=value 值数组,用  "&" 字符拼接为字符串
 */
function getKeyValueSortStr(strArr){
	var longStr = "";
	for (var str in strArr) {
		longStr += strArr[str] + "&";
	}
	return longStr.substring(0,longStr.length - 1);//移除最后一个 & 符号
}
////////////////////////////////////////////////////////////////////
function PopulatePostUrl(url,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; OD105 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36 hap/1.5/smartisan com.miui.hybrid/1.5.0.2 com.youth.kandianquickapp/2.3.2 ({"packageName":"com.miui.home","type":"shortcut","extra":{"original":{"packageName":"com.tencent.mm","type":"url","extra":{}},"scene":"api"}})',
            'Host' : 'user.youth.cn',
            'Connection' : 'keep-alive',
        },
        body: reqBody
    }
    return urlObject;
}

function PopulateGetUrl(url){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; OD105 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36 hap/1.5/smartisan com.miui.hybrid/1.5.0.2 com.youth.kandianquickapp/2.3.2 ({"packageName":"com.miui.home","type":"shortcut","extra":{"original":{"packageName":"com.tencent.mm","type":"url","extra":{}},"scene":"api"}})',
            'Host' : 'user.youth.cn',
            'Connection' : 'keep-alive',
        }
    }
    return urlObject;
}


async function HttpPost(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data,caller);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function HttpGet(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data,caller)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}
//要写入的文件   要写入的内容       a追加|w写入（默认）|r（读取）  回调函数
function writelog(filename,model,content){
	//console.log('模式：'+model);
	fs.writeFile(filename,content,{flag:`${model}`},function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log(`写入${filename}成功,模式为：${model}`);
    }
	})
}
//检查文件是否存在
function check_file_exist(filename){
	try { 
		fs.accessSync(filename, fs.constants.R_OK); 
		return true;
	} catch (err) { 
		console.error(`检测文件${filename}不存在`); 
		return false;
	}
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function UrlParamHash(url) {
    var params = [], h;
	//var hash = url.slice(url.indexOf("?") + 1).split('&');

    var hash = url.split('&');
    for (var i = 0; i < hash.length; i++) {
        h = hash[i].split("=");
        params.push(h[0]);
        params[h[0]] = h[1];
    }
    return params;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
