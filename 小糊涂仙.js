const $ = new Env('小糊涂仙');
const CryptoJS = require('crypto-js');
var index=0;
var fs=require('fs');
var cookies=[
	
		{"cookie":"2384_user_cookie=caf33a32a57783b4562e7cb7e2fa101b; PHPSESSID=48a836e6feca0b195582724eb7a218db","name":'一条鱼'},
	{"cookie":"2384_user_cookie=4acccc7c232ffde9d6079ad28eb62c5b; PHPSESSID=bba747d291fc165edeec2b8e594b2437","name":'秋衣'},
	{"cookie":"2384_user_cookie=ee9989d8be3f9409c2dd7958716abbc7; PHPSESSID=05edc97aee69e8e61a8caad647122f7c","name":'心想事成'},
	{"cookie":"PHPSESSID=4cb170fcfd70b8b7aa71f84e999b22b6; 2384_user_cookie=e7ca60e0d429bb982066f07f4996ed8a","name":'杨月'},
	{"cookie":"PHPSESSID=26750538ab63cdf1ba2c4ad33ab16900; 2384_user_cookie=fc5957d0e9c1bfd0ca6cccb758e9e660","name":'东京的'},
	{"cookie":"2384_user_cookie=c4fb369fb921d687085efd1b35027bd7; PHPSESSID=71ff30b8dc0748b91ca33bf553fa4fee","name":'d哥'},
	{"cookie":"2384_user_cookie=8993dcc0dbe30fabaf8060a2e50cf6b1; PHPSESSID=9ca8a8885e23205c9f24bb28ae3c9d1f","name":'外外'},
	{"cookie":"2384_user_cookie=1d5e59f8173a238b68ec99264b28a12c; PHPSESSID=5bea815e23c1b9c2d0fd5460366a3a5e","name":'米粉'},
	{"cookie":"2384_user_cookie=55f2d52e0be1d6bd8e9d317d0467267f; PHPSESSID=05736efe1727eadd63c601a87450ebdd","name":'春雨'},
	{"cookie":"2384_user_cookie=3434ac2859c6e57d1e11fe970165961c; PHPSESSID=6beef03148dbbeafa3e69d7c72656803","name":'阿混'},

	{"cookie":"PHPSESSID=daab3150c98fc8d3f972ef85c7432a0f; 2384_user_cookie=26c77e101e5ad70c5d6ac4a6a3fd6900","name":'高山流水'},
	{"cookie":"2384_user_cookie=b4a8eb105f0578c485a3e595e8ee5a21; PHPSESSID=22fa770170dc6727a4b5578e5c81e36f","name":'瞌睡熊'},
	{"cookie":"2384_user_cookie=c5c0706fede8e45767d2fd81fb9ac2d0; PHPSESSID=f0f2f6f1957673c71cf7430cb3500deb","name":'霞光'},
	{"cookie":"2384_user_cookie=65af9d57014343d26a9788f5aedd1c92; PHPSESSID=5fa6385ec41efa458b217d6b4a727372","name":'kiel'},
	{"cookie":"2384_user_cookie=b0f422d9b7e08e205aa002709a8f4eb1; PHPSESSID=919ecaea68556e8f4e3bb423d7573e74","name":'白天鹅'},
	{"cookie":"PHPSESSID=ad358516999b290f8ae891f2112ce727; 2384_user_cookie=fc3b47b46951ce012ab3017c7bfbbf18","name":'杏林'},
	{"cookie":"PHPSESSID=4ea36187e7765d09eb209c3ad6be6d32; 2384_user_cookie=1f9a4d3ebb4024910e3a02a9731de5e2","name":'白云'},
	{"cookie":"2384_user_cookie=e55f552d6c84c9c8aa944db61c67820f; PHPSESSID=41901d47914d856a220048bb24e7e4f4","name":'最爱之心'},
	{"cookie":"PHPSESSID=82df34540093796beeba813cd67f1227; 2384_user_cookie=bdf6491da0204d74236c7994ced5e7df","name":'天涯客'},
	{"cookie":"2384_user_cookie=84d067bcc7ca3adcff9b9a07792e1844; PHPSESSID=a836338ae2ed5ef08a37a6086cbdb1ee","name":'悦风'},
];
class User
{
	//构造函数 只允许一个构造器
    constructor(ck) {
        this.cookie=ck.cookie;
		this.name=ck.name;
		this.currentGameInfo=null;
    }
	firstget() {
		var that=this;
	 return new Promise(async resolve => {
	var request = require("request");
	var data1='';
    const options = {
		  "url": 'https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/startGame',
		  "headers": {
			'Host': 'wx.cdh5.cn',
			'Connection': 'keep-alive',
			'Origin': 'https://wx.cdh5.cn',
				'X-Requested-With': 'XMLHttpRequest',
				'Accept-Charset':"utf-8",
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Referer': 'https://wx.cdh5.cn/2384_4549575a/index.php',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
			'Accept':'*/*',
			'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
			'Sec-Fetch-Dest':'empty',
			'Sec-Fetch-Mode':'cors',
			'Sec-Fetch-Site':'same-origin',
			'Cookie':that.cookie,
			//'Content-Length': data1.length
			
		  },
		  'body':data1
		}
		//console.log(options);
		request.post(options, function(err, resp, data) {
			try {
			if (err) {
			  console.log(`${JSON.stringify(err)}`)
			  console.log(`${$.name} API请求失败，请检查网路重试`)
			} else {
			  if (data) {
				  console.log(that.name+" "+data)
				data = JSON.parse(data);
				
				
			  } else {
				console.log(`服务器返回空数据`)
			  }
			}
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve(data);
		  }
		})
	  })
	}
	encryptByDES (y) {
		console.log(this.name+":")
		console.log(this.currentGameInfo)
					var x = CryptoJS.enc.Utf8.parse(this.currentGameInfo.key),
						s = CryptoJS.enc.Utf8.parse("cdlchd0123456789"),
						a = CryptoJS.enc.Utf8.parse(y + "");
					return {
						score: CryptoJS.AES.encrypt(a, x, {
								iv: s,
								mode: CryptoJS.mode.CBC,
								padding: CryptoJS.pad.Pkcs7
							})
							.ciphertext.toString(),
						id: this.currentGameInfo.id
	}
	}
	addQueryString(params) {
		var str = '';
		for (var Key in params) {
			str += Key + '=' + params[Key] + '&';
		}
		return str;
		//return '?' + str.substr(0, str.length -1); 严谨一些
	}
	endgame(score){
		var that=this;
	 return new Promise(async resolve => {
	var request = require("request");
	
	var data1=that.encryptByDES(score);
	console.log(data1)
    const options = {
		  "url": 'https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/endGame',
		  "headers": {
			'Host': 'wx.cdh5.cn',
			'Connection': 'keep-alive',
			'Origin': 'https://wx.cdh5.cn',
				'X-Requested-With': 'XMLHttpRequest',
				'Accept-Charset':"utf-8",
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Referer': 'https://wx.cdh5.cn/2384_4549575a/index.php',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
			'Accept':'*/*',
			'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
			'Sec-Fetch-Dest':'empty',
			'Sec-Fetch-Mode':'cors',
			'Sec-Fetch-Site':'same-origin',
			'Cookie':that.cookie,
			//'Content-Length': data1.length
			
		  },
		  'body':that.addQueryString(data1)
		}
		//console.log(options);
		request.post(options, function(err, resp, data) {
			try {
			if (err) {
			  console.log(`${JSON.stringify(err)}`)
			  console.log(`${$.name} API请求失败，请检查网路重试`)
			} else {
			  if (data) {
				 console.log(that.name+data)
				data = JSON.parse(data);
				
				console.log("提交成功------------"+that.name)
			  } else {
				console.log(`服务器返回空数据`)
			  }
			}
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve(data);
		  }
		})
	  })
	}
	index(){
		var that=this;
	 return new Promise(async resolve => {
	var request = require("request");
	
	
    const options = {
		  "url": 'https://wx.cdh5.cn/2384_4549575a/index.php',
		  "headers": {
			'Host': 'wx.cdh5.cn',
			'Connection': 'keep-alive',
			'Origin': 'https://wx.cdh5.cn',
				'X-Requested-With': 'XMLHttpRequest',
				'Accept-Charset':"utf-8",
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Referer': 'https://wx.cdh5.cn/2384_4549575a/index.php',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
			'Accept':'*/*',
			'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
			'Sec-Fetch-Dest':'empty',
			'Sec-Fetch-Mode':'cors',
			'Sec-Fetch-Site':'same-origin',
			'Cookie':that.cookie,
			//'Content-Length': data1.length
			
		  },
		  'body':''
		}
		//console.log(options);
		request.post(options, function(err, resp, data) {
			try {
			if (err) {
			  console.log(`${JSON.stringify(err)}`)
			  console.log(`${$.name} API请求失败，请检查网路重试`)
			} else {
			  if (data) {
				
				console.log("------------"+that.name)
			  } else {
				console.log(`服务器返回空数据`)
			  }
			}
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve(data);
		  }
		})
	  })
	}

		choujiang(){
		var that=this;
	 return new Promise(async resolve => {
	var request = require("request");
	
	
    const options = {
		  "url": 'https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/lottery',
		  "headers": {
			'Host': 'wx.cdh5.cn',
			'Connection': 'keep-alive',
			'Origin': 'https://wx.cdh5.cn',
				'X-Requested-With': 'XMLHttpRequest',
				'Accept-Charset':"utf-8",
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Referer': 'https://wx.cdh5.cn/2384_4549575a/index.php',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
			'Accept':'*/*',
			'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
			'Sec-Fetch-Dest':'empty',
			'Sec-Fetch-Mode':'cors',
			'Sec-Fetch-Site':'same-origin',
			'Cookie':that.cookie,
			//'Content-Length': data1.length
			
		  },
		  'body':''
		}
		//console.log(options);
		request.post(options, function(err, resp, data) {
			try {
			if (err) {
			  console.log(`${JSON.stringify(err)}`)
			  console.log(`${$.name} API请求失败，请检查网路重试`)
			} else {
			  if (data) {
				 console.log(that.name+data)
				data = JSON.parse(data);
				  if(data.data.awardid!=9)
					fs.appendFileSync('xht.txt',that.name+JSON.stringify(data)+'\r\n');
				console.log("------------"+that.name)
			  } else {
				console.log(`服务器返回空数据`)
			  }
			}
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve(data);
		  }
		})
	  })
	}
	async run(){
		await this.index();
		var currentGameInfo=await this.firstget();
		if(currentGameInfo==null){
			await this.run();
			return;
		}
		if(currentGameInfo.code!=0){
			console.log("开始游戏失败:"+this.name)
			console.log(currentGameInfo)
			return;
		}
		this.currentGameInfo=currentGameInfo.data;
		var t=10*1000+parseInt(Math.random()*10)*1000
		
		var score=40000+parseInt(Math.random()*40000)
		t=score*((60*1000*2.2)/10000)+parseInt(Math.random()*10)*1000
		await $.wait(t);
		await this.endgame(score);
		await $.wait(2000);
		await this.choujiang()
		console.log(date('H:i:s'))
		await $.wait(2000);
		this.run();
	}

}
!(async() => {
	var obj=[];
	for(var i=0;i<cookies.length;i++){
		var user=new User(cookies[i]);
		obj.push(user);
		await $.wait(200);
		obj[i].run();
	}
	setTimeout(function(){
		abc()
	},60000*60*5)


})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  });
exposure_QtList=[];
 

function check(titleIndex,an){
	allAnswerList=[{"answer":encodeURIComponent(an.answer),"sign":an.sign}];
	exposure_QtList.push(titleIndex);
	//var questionObj={"gameId":gameId,"req_Type":"check","isManage":false,"playerAnswer":an.answer,"qtInfoParam":{"exposure_QtList":exposure_QtList,"score_Qt":score_Qt,"qtNum":qtNum,"qtScore":qtNum,"moreAnswer":false,"allAnswerList":[{"answer":an.answer,"sign":an.sign}]},"openId":openid};
	
	var questionObj={"gameId":gameId,"req_Type":"check","isManage":false,"playerAnswer":an.answe,"qtInfoParam":{"exposure_QtList":exposure_QtList,"score_Qt":score_Qt,"qtNum":qtNum,"qtScore":qtScore,"moreAnswer":false,"allAnswerList":allAnswerList},"openId":openid}

	var data1="questionObj="+JSON.stringify(questionObj)+"&canal=-1&playerOrigin=3&uid=";
	console.log(data1)
	return new Promise(async resolve => {
			var request = require("request");
			const options = {
			  "url": url,
			  "headers": {
				'Host': '25938733-5.hd.faisco.cn',
				'Connection': 'keep-alive',
				'Origin': 'https://18062026-14.hd.faisco.cn',
					'X-Requested-With': 'XMLHttpRequest',
					'Accept-Charset':"utf-8",
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Referer': 'https://25938733-5.hd.faisco.cn/25938733/T-WXnewebaUBnvIuAdqLyw/nldtz.html?_source=1&appid=wx50775cad5d08d7ad',
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
				'Accept':'*/*',
				'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
				'Cookie':cookie,
				//'Content-Length': data1.length
				
			  },
			  'body':data1
			}
			//console.log(options);
			request.post(options, function(err, resp, data) {
				try {
				if (err) {
				  console.log(`${JSON.stringify(err)}`)
				  console.log(`${$.name} API请求失败，请检查网路重试`)
				} else {
				  if (data) {
					data = JSON.parse(data);
					
					var right=[];
					console.log(data)
					//	console.log('------------')
						if(data.success==false) {
							//firstget();
							//return;
							
						}
					score_Qt=data.data.score_Qt;
					r_List=data.data.r_List;
					for(var i=0;i<data.data.r_List.length;i++){
						right.push(data.data.r_List[i].answer)
					}
					ansa[titleIndex+""]=right.join("|")
					console.log(ansa)
				  } else {
					
				  }
				}
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		  })
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
var date=function(format, timestamp) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	  // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: MeEtc (http://yass.meetcweb.com)
	  // +   improved by: Brad Touesnard
	  // +   improved by: Tim Wiel
	  // +   improved by: Bryan Elliott
	  //
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: David Randall
	  // +      input by: Brett Zamir (http://brett-zamir.me)
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +  derived from: gettimeofday
	  // +      input by: majak
	  // +   bugfixed by: majak
	  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +      input by: Alex
	  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
	  // +   improved by: JT
	  // +   improved by: Theriault
	  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
	  // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
	  // +      input by: Martin
	  // +      input by: Alex Wilson
	  // +   bugfixed by: Chris (http://www.devotis.nl/)
	  // %        note 1: Uses global: php_js to store the default timezone
	  // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
	  // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
	  // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
	  // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
	  // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
	  // *     returns 1: '09:09:40 m is month'
	  // *     example 2: date('F j, Y, g:i a', 1062462400);
	  // *     returns 2: 'September 2, 2003, 2:26 am'
	  // *     example 3: date('Y W o', 1062462400);
	  // *     returns 3: '2003 36 2003'
	  // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
	  // *     example 4: (x+'').length == 10 // 2009 01 09
	  // *     returns 4: true
	  // *     example 5: date('W', 1104534000);
	  // *     returns 5: '53'
	  // *     example 6: date('B t', 1104534000);
	  // *     returns 6: '999 31'
	  // *     example 7: date('W U', 1293750000.82); // 2010-12-31
	  // *     returns 7: '52 1293750000'
	  // *     example 8: date('W', 1293836400); // 2011-01-01
	  // *     returns 8: '52'
	  // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
	  // *     returns 9: '52 2011-01-02'
	    var that = this,
	      jsdate,
	      f,
	      formatChr = /\\?([a-z])/gi,
	      formatChrCb,
	      // Keep this here (works, but for code commented-out
	      // below for file size reasons)
	      //, tal= [],
	      _pad = function (n, c) {
	        n = n.toString();
	        return n.length < c ? _pad('0' + n, c, '0') : n;
	      },
	      txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	  formatChrCb = function (t, s) {
	    return f[t] ? f[t]() : s;
	  };
	  f = {
	    // Day
	    d: function () { // Day of month w/leading 0; 01..31
	      return _pad(f.j(), 2);
	    },
	    D: function () { // Shorthand day name; Mon...Sun
	      return f.l().slice(0, 3);
	    },
	    j: function () { // Day of month; 1..31
	      return jsdate.getDate();
	    },
	    l: function () { // Full day name; Monday...Sunday
	      return txt_words[f.w()] + 'day';
	    },
	    N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
	      return f.w() || 7;
	    },
	    S: function(){ // Ordinal suffix for day of month; st, nd, rd, th
	      var j = f.j()
	      i = j%10;
	      if (i <= 3 && parseInt((j%100)/10) == 1) i = 0;
	      return ['st', 'nd', 'rd'][i - 1] || 'th';
	    },
	    w: function () { // Day of week; 0[Sun]..6[Sat]
	      return jsdate.getDay();
	    },
	    z: function () { // Day of year; 0..365
	      var a = new Date(f.Y(), f.n() - 1, f.j()),
	        b = new Date(f.Y(), 0, 1);
	      return Math.round((a - b) / 864e5);
	    },

	    // Week
	    W: function () { // ISO-8601 week number
	      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
	        b = new Date(a.getFullYear(), 0, 4);
	      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
	    },

	    // Month
	    F: function () { // Full month name; January...December
	      return txt_words[6 + f.n()];
	    },
	    m: function () { // Month w/leading 0; 01...12
	      return _pad(f.n(), 2);
	    },
	    M: function () { // Shorthand month name; Jan...Dec
	      return f.F().slice(0, 3);
	    },
	    n: function () { // Month; 1...12
	      return jsdate.getMonth() + 1;
	    },
	    t: function () { // Days in month; 28...31
	      return (new Date(f.Y(), f.n(), 0)).getDate();
	    },

	    // Year
	    L: function () { // Is leap year?; 0 or 1
	      var j = f.Y();
	      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
	    },
	    o: function () { // ISO-8601 year
	      var n = f.n(),
	        W = f.W(),
	        Y = f.Y();
	      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
	    },
	    Y: function () { // Full year; e.g. 1980...2010
	      return jsdate.getFullYear();
	    },
	    y: function () { // Last two digits of year; 00...99
	      return f.Y().toString().slice(-2);
	    },

	    // Time
	    a: function () { // am or pm
	      return jsdate.getHours() > 11 ? "pm" : "am";
	    },
	    A: function () { // AM or PM
	      return f.a().toUpperCase();
	    },
	    B: function () { // Swatch Internet time; 000..999
	      var H = jsdate.getUTCHours() * 36e2,
	        // Hours
	        i = jsdate.getUTCMinutes() * 60,
	        // Minutes
	        s = jsdate.getUTCSeconds(); // Seconds
	      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
	    },
	    g: function () { // 12-Hours; 1..12
	      return f.G() % 12 || 12;
	    },
	    G: function () { // 24-Hours; 0..23
	      return jsdate.getHours();
	    },
	    h: function () { // 12-Hours w/leading 0; 01..12
	      return _pad(f.g(), 2);
	    },
	    H: function () { // 24-Hours w/leading 0; 00..23
	      return _pad(f.G(), 2);
	    },
	    i: function () { // Minutes w/leading 0; 00..59
	      return _pad(jsdate.getMinutes(), 2);
	    },
	    s: function () { // Seconds w/leading 0; 00..59
	      return _pad(jsdate.getSeconds(), 2);
	    },
	    u: function () { // Microseconds; 000000-999000
	      return _pad(jsdate.getMilliseconds() * 1000, 6);
	    },

	    // Timezone
	    e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
	      // The following works, but requires inclusion of the very large
	      // timezone_abbreviations_list() function.
	/*              return that.date_default_timezone_get();
	*/
	      throw 'Not supported (see source code of date() for timezone on how to add support)';
	    },
	    I: function () { // DST observed?; 0 or 1
	      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
	      // If they are not equal, then DST is observed.
	      var a = new Date(f.Y(), 0),
	        // Jan 1
	        c = Date.UTC(f.Y(), 0),
	        // Jan 1 UTC
	        b = new Date(f.Y(), 6),
	        // Jul 1
	        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
	      return ((a - c) !== (b - d)) ? 1 : 0;
	    },
	    O: function () { // Difference to GMT in hour format; e.g. +0200
	      var tzo = jsdate.getTimezoneOffset(),
	        a = Math.abs(tzo);
	      return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
	    },
	    P: function () { // Difference to GMT w/colon; e.g. +02:00
	      var O = f.O();
	      return (O.substr(0, 3) + ":" + O.substr(3, 2));
	    },
	    T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
	      // The following works, but requires inclusion of the very
	      // large timezone_abbreviations_list() function.
	/*              var abbr = '', i = 0, os = 0, default = 0;
	      if (!tal.length) {
	        tal = that.timezone_abbreviations_list();
	      }
	      if (that.php_js && that.php_js.default_timezone) {
	        default = that.php_js.default_timezone;
	        for (abbr in tal) {
	          for (i=0; i < tal[abbr].length; i++) {
	            if (tal[abbr][i].timezone_id === default) {
	              return abbr.toUpperCase();
	            }
	          }
	        }
	      }
	      for (abbr in tal) {
	        for (i = 0; i < tal[abbr].length; i++) {
	          os = -jsdate.getTimezoneOffset() * 60;
	          if (tal[abbr][i].offset === os) {
	            return abbr.toUpperCase();
	          }
	        }
	      }
	*/
	      return 'UTC';
	    },
	    Z: function () { // Timezone offset in seconds (-43200...50400)
	      return -jsdate.getTimezoneOffset() * 60;
	    },

	    // Full Date/Time
	    c: function () { // ISO-8601 date.
	      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
	    },
	    r: function () { // RFC 2822
	      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
	    },
	    U: function () { // Seconds since UNIX epoch
	      return jsdate / 1000 | 0;
	    }
	  };
	  this.date = function (format, timestamp) {
	    that = this;
	    jsdate = (timestamp === undefined ? new Date() : // Not provided
	      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
	      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
	    );
	    return format.replace(formatChr, formatChrCb);
	  };
	  return this.date(format, timestamp);
	}
	var strtotime=function(text, now) {
  //  discuss at: http://phpjs.org/functions/strtotime/
  //     version: 1109.2016
  // original by: Caio Ariede (http://caioariede.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Caio Ariede (http://caioariede.com)
  // improved by: A. Matías Quezada (http://amatiasq.com)
  // improved by: preuter
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Mirko Faber
  //    input by: David
  // bugfixed by: Wagner B. Soares
  // bugfixed by: Artur Tchernychev
  //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
  //   example 1: strtotime('+1 day', 1129633200);
  //   returns 1: 1129719600
  //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
  //   returns 2: 1130425202
  //   example 3: strtotime('last month', 1129633200);
  //   returns 3: 1127041200
  //   example 4: strtotime('2009-05-04 08:30:00 GMT');
  //   returns 4: 1241425800

  var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

  if (!text) {
    return fail;
  }

  // Unecessary spaces
  text = text.replace(/^\s+|\s+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\t\r\n]/g, '')
    .toLowerCase();

  // in contrast to php, js Date.parse function interprets:
  // dates given as yyyy-mm-dd as in timezone: UTC,
  // dates with "." or "-" as MDY instead of DMY
  // dates with two-digit years differently
  // etc...etc...
  // ...therefore we manually parse lots of common date formats
  match = text.match(
    /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

  if (match && match[2] === match[4]) {
    if (match[1] > 1901) {
      switch (match[2]) {
        case '-':
          { // YYYY-M-D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // YYYY.M.D is not parsed by strtotime()
            return fail;
          }
        case '/':
          { // YYYY/M/D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else if (match[5] > 1901) {
      switch (match[2]) {
        case '-':
          { // D-M-YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // D.M.YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '/':
          { // M/D/YYYY
            if (match[1] > 12 || match[3] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else {
      switch (match[2]) {
        case '-':
          { // YY-M-D
            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
              return fail;
            }

            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
            return new Date(year, parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case '.':
          { // D.M.YY or H.MM.SS
            if (match[5] >= 70) { // D.M.YY
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }

              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
            }
            if (match[5] < 60 && !match[6]) { // H.MM.SS
              if (match[1] > 23 || match[3] > 59) {
                return fail;
              }

              today = new Date();
              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
            }

            return fail; // invalid format, cannot be parsed
          }
        case '/':
          { // M/D/YY
            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
              return fail;
            }

            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
            return new Date(year, parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case ':':
          { // HH:MM:SS
            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
              return fail;
            }

            today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
              match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
          }
      }
    }
  }

  // other formats and "now" should be parsed by Date.parse()
  if (text === 'now') {
    return now === null || isNaN(now) ? new Date()
      .getTime() / 1000 | 0 : now | 0;
  }
  if (!isNaN(parsed = Date.parse(text))) {
    return parsed / 1000 | 0;
  }

  date = now ? new Date(now * 1000) : new Date();
  days = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
  };
  ranges = {
    'yea': 'FullYear',
    'mon': 'Month',
    'day': 'Date',
    'hou': 'Hours',
    'min': 'Minutes',
    'sec': 'Seconds'
  };

  function lastNext(type, range, modifier) {
    var diff, day = days[range];

    if (typeof day !== 'undefined') {
      diff = day - date.getDay();

      if (diff === 0) {
        diff = 7 * modifier;
      } else if (diff > 0 && type === 'last') {
        diff -= 7;
      } else if (diff < 0 && type === 'next') {
        diff += 7;
      }

      date.setDate(date.getDate() + diff);
    }
  }

  function process(val) {
    var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
      type = splt[0],
      range = splt[1].substring(0, 3),
      typeIsNumber = /\d+/.test(type),
      ago = splt[2] === 'ago',
      num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

    if (typeIsNumber) {
      num *= parseInt(type, 10);
    }

    if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
      return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
    }

    if (range === 'wee') {
      return date.setDate(date.getDate() + (num * 7));
    }

    if (type === 'next' || type === 'last') {
      lastNext(type, range, num);
    } else if (!typeIsNumber) {
      return false;
    }

    return true;
  }

  times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
    '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
    '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
  regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

  match = text.match(new RegExp(regex, 'gi'));
  if (!match) {
    return fail;
  }

  for (i = 0, len = match.length; i < len; i++) {
    if (!process(match[i])) {
      return fail;
    }
  }

  // ECMAScript 5 only
  // if (!match.every(process))
  //    return false;

  return (date.getTime() / 1000);
}