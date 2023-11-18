module.exports = {
            "id": "dsj",
            "name": "电视家APP",
            "keys": ["dsjheader","dsjheader2","dsjheader3","dsjheader4","dsjheader5","dsjheader6","dsjheader7","dsjheader8","dsjheader9","dsjheader10","dsjheader11","dsjheader12","dsjheader13","dsjheader14","dsjheader15","dsjheader16","dsjheader17","dsjheader18", "dsjheader19","dsjheader20"],
            "author": "@ziye",
            "settings": [{
                    "id": "dsjSuffix",
                    "name": "当前账号",
                    "val": "1",
                    "type": "number",
                    "desc": "当前抓取ck记录的账号序号，如：1、2、3、"
                },
                {
                    "id": "dsjCount",
                    "name": "账号个数",
                    "val": "2",
                    "type": "number",
                    "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
                },
                {
                    "id": "dsjXH",
                    "name": "循环获取CK",
                    "val": "0",
                    "type": "number",
                    "desc": "0关闭 1开启,默认关闭"
                }, 
                {
                    "id": "dsjXYZ",
                    "name": "执行概率",
                    "val": "100",
                    "type": "number",
                    "desc": "0不执行 可设置0-100,默认百分百"
                }, 
                {
                    "id": "dsjTXTX",
                    "name": "余额提醒",
                    "val": "5",
                    "type": "number",
                    "desc": "0不提醒 可设置0,5,10,20,25,30,50,100"
                },
                {
                    "id": "dsjnotifyttt",
                    "name": "推送控制",
                    "val": "1",
                    "type": "number",
                    "desc": "0关闭，1推送,默认12点以及23点推送"
                },
                {
                    "id": "dsjnotifyInterval",
                    "name": "通知控制",
                    "val": "2",
                    "type": "number",
                    "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知 "
                },
                {
                    "id": "dsjMinutes",
                    "name": "推送-通知 分钟控制",
                    "val": "10",
                    "type": "number",
                    "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
                }],
            "repo": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.js",
            "icons": ["https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.png", "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.png"],
            "script": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.js",
 "datas": [{
      "key": "dsjheader",
      "val": process.env.dsj1  //"7016c1166b25744c616c611e244&Tm1FNE9HUTRZamczWlRneFl6azNZalpqTm1NM1pqSm1ZV1ZqWlRJ8MTYzMzc5NTYxNDE4NDczMjgyNHwzYmEwNDcyMTk4YTQ2MzhjOWI2MjNjMjQyM2Q2ODkwODJmZTlhNWY1"
    }, 
   {
      "key": "dsjheader2",
      "val": process.env.dsj2 //"59dfbaa989eda44&TTJJeFpqTmlObUk1WVRGbFltTTRNelJrWVRZMU5XTTNxNTk0NDYzNjkxNXxjNzE3NDU5NmQxYjViMGM2MTZiZjdlMjc0ZGEzOTM2ODg2MmQxOWI3"
    }, 
   
],
    "sessions": [],
    "isLoaded": true
  }
