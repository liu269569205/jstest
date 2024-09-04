
## 6dy

声明: 此库所有内容仅用于个人学习！！！

### [TG CHANEL](https://t.me/dylan_jdpro)


国内机（带代理）：

```
ql repo https://js.jdpro.site/https://github.com/6dylan6/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify|utils"

```
默认代理拉不了，自行找可用代理

国外机：

```
ql repo https://github.com/6dylan6/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify|utils"

```


定时随意


线报监控类，[入口](https://github.com/6dylan6/jdm.git)



## 简要流程

1、部署青龙并登陆。

2、到配置管理config.sh修改，差不多在17行（特别注意，没有修改此配置，sh类型任务拉不下来）；

RepoFileExtensions="js py"修改为 RepoFileExtensions="js py sh" 保存；

3、到订阅管理创建订阅并运行；正确配置[参考](https://github.com/6dylan6/jdpro/issues/22)

4、订阅运行完毕，到定时任务搜索依赖安装（jd_indeps.sh)任务执行，步骤2未完成会拉不到该任务；

4、到环境变量，创建变量，名称: JD_COOKIE,值：抓的CK（要安全就手抓），多个每行建一个，不要写在一个里；

5、配置通知，通知的key填写到配置管理config.sh文件；


<details>
<summary>笔记</summary>
<pre><code>

1、任务并发和分组

并发配置方法：

在任务后面加conc JD_COOKIE

如 task XXXXX.js conc JD_COOKIE

任务分组运行方法：

在任务后面加desi JD_COOKIE 需要运行的ck序号

如 task XXXX.js desi JD_COOKIE 1-10  前10个一组运行，2 8 9就是第2/8/9序号的ck执行，以此类推。

2、通知支持一对一推送和显示备注（需用本库sendnotify文件），还有分组通知等用法参考[notify.md](./notify.md)

备注显示变量如下

export NOTIFY_SHOWNAMETYPE="1"    不做任何变动

export NOTIFY_SHOWNAMETYPE="2"    效果是 :  账号名称：别名(备注)	

export NOTIFY_SHOWNAMETYPE="3"    效果是 :  账号名称：pin(备注)

export NOTIFY_SHOWNAMETYPE="4"    效果是 :  账号名称：备注

3、因为青龙有随机延时（可以在配置文件设置为0，默认300秒），所以涉及准点运行的任务，最后加now，如果是desi或conc不用加也会准时跑。

4、青龙系统通知（新增删除任务、登录等通知），需把通知变量写到config.sh文件，在环境变量里只发脚本运行通知哈。

5、建议调整任务运行超时时间，青龙默认1小时有些跑不完就被强制结束，config.sh里配置。CommandTimeoutTime="3h"  即改为3小时，根据自己ck数量调整。
</code></pre>
</details>



如需禁止某些CK参加所有活动或某些活动功能，实现重组CK顺序功能，包括随机、优先、轮换、组队、分段等功能，把[task_before](./docker/task_before.sh)文件内容复制到配置管理task_before.sh保存

常用变量举例：

Recombin_CK_Mode="1"  全部顺序随机

Recombin_CK_Mode="2" Recombin_CK_ARG1="15" 假设有100个CK，前15个CK按正常顺序靠前，其余CK随机乱序

Recombin_CK_Mode="3" Recombin_CK_ARG1="5" Recombin_CK_ARG2="5"  假设有100个CK，希望前5个账号始终保持在前部，剩余95个账号按照轮换模式每天轮换5个

其他用法具体参考[文档](https://docs.qq.com/doc/DTXh6QUVjRXJ1TFdN)

## 通用环境变量（到配置管理-config.sh里添加变量,export xxx=''格式)

AUTOCFG='true' 自动配置sendNotify文件到deps目录 

代理API模式部分支持

DY_PROXY='URL1@URL2' 多个@分割

PERMIT_API='test' 需要走API代理的js关键词，多个&分割，可不设置，支持的js都会走

DY_PROXY_RENUM='5'  获取IP失败重试次数

DY_PROXY_REDELAY='3' 获取失败重试间隔 单位秒

代理池模式支持全部js脚

DP_POOL='http://xxx' 代理池url

PERMIT_JS='farm&plant&opencard' 需要走代理池的js关键词，多个&分割，必须设置

禁止指定的pin执行任务：

多个任务同pin：BANPIN='任务1|任务2@pin1,pin2'

多个任务不同pin：BANPIN='任务1@pin,pin2&任务2@pin2,pin3'

不指定任务只写pin  全部任务都不执行该pin：BANPIN='pin1,pin2'


## 支持的通知方式

server酱，go-cqhttp，pushdeer，Bark App，tg bot，钉钉bot，企业微信bot，企业微信应用消息，飞书，iGot，push plus，WxPusher，gotify

请在配置管理config文件里填写对应key
