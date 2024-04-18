//author:https://github.com/yuzd 
const request = require('request');
//https://loseprivacy.xyz/  269569205@163.com qwe123

const options = {
  method: 'POST',
  url: 'https://loseprivacy.xyz/checkin',
  headers: {
    Host: 'loseprivacy.xyz',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
    //'Accept-Encoding': 'gzip, deflate, br',
    'X-Requested-With': 'XMLHttpRequest',
    Origin: 'https://loseprivacy.xyz',
    Connection: 'keep-alive',
    Referer: 'https://loseprivacy.xyz/ucenter',
	'Sec-Fetch-Dest':'empty',
	'Sec-Fetch-Mode':'cors',
	'Sec-Fetch-Site':'same-origin',
		cookie: 'USERID=d9h9eilcmv8be1op0fen94sff4; notice=1; _pk_id.29.8a4e=bff527afe8be85b7.1713428749.1.1713428840.1713428749.; _pk_ses.29.8a4e=1',
  },

};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

