import requests
import re
import time
import json
import random
import datetime
import base64
import threading
import ssl
import execjs
import os
import sys
from bs4 import BeautifulSoup

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
from Crypto.Cipher import DES3
from Crypto.Util.Padding import pad, unpad
from Crypto.Util.strxor import strxor
from Crypto.Cipher import AES
from http import cookiejar  # Python 2: import cookielib as cookiejar
from requests.adapters import HTTPAdapter



class BlockAll(cookiejar.CookiePolicy):
    return_ok = set_ok = domain_return_ok = path_return_ok = lambda self, *args, **kwargs: False
    netscape = True
    rfc2965 = hide_cookie2 = False


def printn(m):
    print(f'\n{m}')


ORIGIN_CIPHERS = ('DEFAULT@SECLEVEL=1')

ip_list = []



class DESAdapter(HTTPAdapter):
    def __init__(self, *args, **kwargs):
        """
        A TransportAdapter that re-enables 3DES support in Requests.
        """
        self.CIPHERS = ORIGIN_CIPHERS + ':!aNULL:!eNULL:!MD5'
        super().__init__(*args, **kwargs)

    def init_poolmanager(self, *args, **kwargs):
        context = ssl.create_default_context()
        context.set_ciphers(self.CIPHERS)
        kwargs['ssl_context'] = context
        return super().init_poolmanager(*args, **kwargs)

    def proxy_manager_for(self, *args, **kwargs):
        context = ssl.create_default_context()
        context.set_ciphers(self.CIPHERS)
        kwargs['ssl_context'] = context
        return super().proxy_manager_for(*args, **kwargs)



ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE
ssl_context.set_ciphers('DEFAULT@SECLEVEL=0')
ss = requests.session()

ss.headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.97 Mobile Safari/537.36",
    "Referer": "https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html"}
ss.mount('https://', DESAdapter())

yc = 0.1
wt = 0
kswt = -3
yf = datetime.datetime.now().strftime("%Y%m")


data = {}
#print(data)
dirsize = 0


try:
    with open('权益id.log') as fr:
        data1 = fr.read()

        dirsize = len(data1)

        data = eval(data1)
except:
    with open('权益id.log', 'w') as f:
        pass



yf = datetime.datetime.now().strftime("%Y%m")

dd = datetime.datetime.now().strftime("%d")

# dd = '01'


def getId(s, phone, ck):
    global data
    if yf not in data:
        data[yf] = {}
        #print(1111)
        str1 = get_level(s, phone, ck)
        #print(str1)
        str2 = str1.split('#')
        #print(222)
        for i in range(0, 3):
            data[yf][f'{i + 4}'] = str2[i]
    elif 6 not in data[yf]:
        str1 = get_level(s, phone, ck)
        str2 = str1.split('#')
        #print(222)
        for i in range(0, 3):
            data[yf][f'{i + 4}'] = str2[i]


def get_level(s, phone, ck):
    #print(333)
    url = "https://wappark.189.cn/jt-sign/paradise/getLevelRightsList"
    body = {"para": encrypt_para(f'{{"phone":{phone}}}')}
    right_list = s.post("https://wappark.189.cn/jt-sign/paradise/getLevelRightsList", json=body,
                        cookies=ck).text
    #print(right_list)
    right_list_json = json.loads(right_list)
    rightsId = ''
    levelStr = ['V4', 'V5', 'V6']

    for str in levelStr:
        # right_list = self.req(url, "POST", body)[f"{str}"]
        # right_list = requests.post("https://wappark.189.cn:9001/jt-sign/paradise/getLevelRightsList",json=body,cookies=ck).json()
        # printn(right_list[f'{str}'])
        right_list1 = right_list_json[f'{str}']
        for data in right_list1:
            # print(dumps(data, indent=2, ensure_ascii=0))
            if "话费" in data["righstName"]:
                rightsId += f'{data["id"]}#'

    #print(rightsId)
    return rightsId



errcode = {
    "0": "兑换成功",
    "412": "兑换次数已达上限",
    "413": "商品已兑完",
    "420": "未知错误",
    "410": "该活动已失效~",
    "Y0001": "当前等级不足，去升级兑当前话费",
    "Y0002": "使用翼相连网络600分钟或连接并拓展网络500分钟可兑换此奖品",
    "Y0003": "使用翼相连共享流量400M或共享WIFI：2GB可兑换此奖品",
    "Y0004": "使用翼相连共享流量2GB可兑换此奖品",
    "Y0005": "当前等级不足，去升级兑当前话费",
    "E0001": "您的网龄不足10年，暂不能兑换"
}

# 加密参数
key = b'1234567`90koiuyhgtfrdews'
iv = 8 * b'\0'

public_key_b64 = '''-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBkLT15ThVgz6/NOl6s8GNPofdWzWbCkWnkaAm7O2LjkM1H7dMvzkiqdxU02jamGRHLX/ZNMCXHnPcW/sDhiFCBN18qFvy8g6VYb9QtroI09e176s+ZCtiv7hbin2cCTj99iUpnEloZm19lwHyo69u5UMiPMpq0/XKBO8lYhN/gwIDAQAB
-----END PUBLIC KEY-----'''

public_key_data = '''-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+ugG5A8cZ3FqUKDwM57GM4io6JGcStivT8UdGt67PEOihLZTw3P7371+N47PrmsCpnTRzbTgcupKtUv8ImZalYk65dU8rjC/ridwhw9ffW2LBwvkEnDkkKKRi2liWIItDftJVBiWOh17o6gfbPoNrWORcAdcbpk2L+udld5kZNwIDAQAB
-----END PUBLIC KEY-----'''


def t(h):
    date = datetime.datetime.now()
    date_zero = datetime.datetime.now().replace(year=date.year, month=date.month, day=date.day, hour=h, minute=59,
                                                second=59)
    date_zero_time = int(time.mktime(date_zero.timetuple()))
    return date_zero_time


def encrypt(text):
    cipher = DES3.new(key, DES3.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(text.encode(), DES3.block_size))
    return ciphertext.hex()


def decrypt(text):
    ciphertext = bytes.fromhex(text)
    cipher = DES3.new(key, DES3.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(ciphertext), DES3.block_size)
    return plaintext.decode()


def b64(plaintext):
    public_key = RSA.import_key(public_key_b64)
    cipher = PKCS1_v1_5.new(public_key)
    ciphertext = cipher.encrypt(plaintext.encode())
    return base64.b64encode(ciphertext).decode()


def encrypt_para(plaintext):
    public_key = RSA.import_key(public_key_data)
    cipher = PKCS1_v1_5.new(public_key)
    ciphertext = cipher.encrypt(plaintext.encode())
    return ciphertext.hex()


def encode_phone(text):
    encoded_chars = []
    for char in text:
        encoded_chars.append(chr(ord(char) + 2))
    return ''.join(encoded_chars)


def ophone(t):
    key = b'34d7cb0bcdf07523'
    utf8_key = key.decode('utf-8')
    utf8_t = t.encode('utf-8')
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(utf8_t, AES.block_size))
    return ciphertext.hex()





def userLoginNormal(phone, password):
    alphabet = 'abcdef0123456789'
    uuid = [''.join(random.sample(alphabet, 8)), ''.join(random.sample(alphabet, 4)),
            '4' + ''.join(random.sample(alphabet, 3)), ''.join(random.sample(alphabet, 4)),
            ''.join(random.sample(alphabet, 12))]
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    loginAuthCipherAsymmertric = 'iPhone 14 15.4.' + uuid[0] + uuid[1] + phone + timestamp + password[:6] + '0$$$0.'

    r = ss.post('https://appgologin.189.cn:9031/login/client/userLoginNormal', json={
        "headerInfos": {"code": "userLoginNormal", "timestamp": timestamp, "broadAccount": "", "broadToken": "",
                        "clientType": "#9.6.1#channel50#iPhone 14 Pro Max#", "shopId": "20002", "source": "110003",
                        "sourcePassword": "Sid98s", "token": "", "userLoginName": phone}, "content": {"attach": "test",
                                                                                                      "fieldData": {
                                                                                                          "loginType": "4",
                                                                                                          "accountType": "",
                                                                                                          "loginAuthCipherAsymmertric": b64(
                                                                                                              loginAuthCipherAsymmertric),
                                                                                                          "deviceUid":
                                                                                                              uuid[0] +
                                                                                                              uuid[1] +
                                                                                                              uuid[2],
                                                                                                          "phoneNum": encode_phone(
                                                                                                              phone),
                                                                                                          "isChinatelecom": "0",
                                                                                                          "systemVersion": "15.4.0",
                                                                                                          "authentication": password}}}).json()

    l = r['responseData']['data']['loginSuccessResult']

    if l:
        load_token[phone] = l
        with open(load_token_file, 'w') as f:
            json.dump(load_token, f)
        ticket = get_ticket(phone, l['userId'], l['token'])
        #print(ticket)
        return ticket

    return False


def get_ticket(phone, userId, token):
    r = ss.post('https://appgologin.189.cn:9031/map/clientXML',
                data='<Request><HeaderInfos><Code>getSingle</Code><Timestamp>' + datetime.datetime.now().strftime(
                    "%Y%m%d%H%M%S") + '</Timestamp><BroadAccount></BroadAccount><BroadToken></BroadToken><ClientType>#9.6.1#channel50#iPhone 14 Pro Max#</ClientType><ShopId>20002</ShopId><Source>110003</Source><SourcePassword>Sid98s</SourcePassword><Token>' + token + '</Token><UserLoginName>' + phone + '</UserLoginName></HeaderInfos><Content><Attach>test</Attach><FieldData><TargetId>' + encrypt(
                    userId) + '</TargetId><Url>4a6862274835b451</Url></FieldData></Content></Request>',
                headers={'user-agent': 'CtClient;10.4.1;Android;13;22081212C;NTQzNzgx!#!MTgwNTg1'})

    # printn(phone, '获取ticket', re.findall('<Reason>(.*?)</Reason>',r.text)[0])

    tk = re.findall('<Ticket>(.*?)</Ticket>', r.text)
    if len(tk) == 0:
        return False

    return decrypt(tk[0])


def queryInfo(phone, s):
    global rs
    a = 1
    while a < 4:
        if rs:
            bd = js.call('main').split('=')
            ck[bd[0]] = bd[1]

        r = s.get('https://wapact.189.cn:9001/gateway/golden/api/queryInfo', cookies=ck).json()

        try:
            printn(f'{phone} 金豆余额 {r["biz"]["amountTotal"]}')
            amountTotal = r["biz"]["amountTotal"]
        except:
            amountTotal = 0
        if amountTotal < 3000:
            if rs == 1:
                bd = js.call('main').split('=')
                ck[bd[0]] = bd[1]

            res = s.post('http://wapact.189.cn:9000/gateway/stand/detail/exchange', json={"activityId": jdaid},
                         cookies=ck).text

            if '$_ts=window' in res:
                first_request()
                rs = 1

            time.sleep(3)
        else:
            return r
        a += 1

    return r






def exchange(phone, s, rightsId):
    try:
        bd = js.call('main').split('=')
        ck[bd[0]] = bd[1]
        
        # 添加发送时间显示
        send_time = datetime.datetime.now().strftime("%H:%M:%S:%f")[:-3]
        print(f"发送包时间：{send_time}  Phone:{phone}  RightsId:{rightsId}")

        now = datetime.datetime.now().strftime('%H:%M:%S.%f')
        data = {"para": encrypt_para(f'{{"phone":{phone},"rightsId":"{rightsId}"}},"receiveCount":1')}

        # 发送请求并记录返回时间
        response = s.post('https://wappark.189.cn/jt-sign/paradise/conversionRights', json=data,cookies=ck)
        return_time = datetime.datetime.now().strftime("%H:%M:%S:%f")[:-3]
        print(f"返回包时间：{return_time}  Phone:{phone}  ResponseCode:{response.status_code}")

        print(f'{now}--Phone:{phone}--{response.text}')

        if '$_ts=window' in r.text:
            first_request(r.text)
            return
        r = r.json()

        if r["code"] == 0:
            if r["biz"] != {} and r["biz"]["resultCode"] in errcode:
                printn(f'{str(datetime.datetime.now())[11:22]} {phone}  {errcode[r["biz"]["resultCode"]]}')

                if r["biz"]["resultCode"] in ["0", "412"]:
                    if r["biz"]["resultCode"] == "0":
                        msg = phone + ":" + "兑换成功"
                        try:
                            import notify
                            title = "电信等级权益任务结果"
                            content = "已抢到"
                            notify.send(title, content)
                        except ImportError:
                            print("无法导入notify模块，请检查notify.py文件是否存在。")



        else:
            printn(f'{str(datetime.datetime.now())[11:22]} {phone} {r}')

    except Exception as e:
        print(f"兑换请求异常: {e}")
        pass



def getSign(ticket,session):
    try:
        bd = js.call('main').split('=')
        ck[bd[0]] = bd[1]

        response_data = session.get('https://wappark.189.cn/jt-sign/ssoHomLogin?ticket=' + ticket, cookies=ck).json()[
            'sign']

        #print(response_data)
        return response_data
    except Exception as e:
        print(e)


def level_ex(phone, rightsId,session,ck):
    # self.get_level()
    wt = t(0)
    print(f"目标时间：{datetime.datetime.fromtimestamp(wt)}")

    # 等待到目标时间
    while wt > time.time():
        pass

    printn(f"{str(datetime.datetime.now())[11:22]} {phone} 开始执行任务")

    try:
        bd = js.call('main').split('=')
        ck[bd[0]] = bd[1]
        now = datetime.datetime.now().strftime('%H:%M:%S.%f')
        data = {"para": encrypt_para(f'{{"phone":{phone},"rightsId":"{rightsId}"}},"receiveCount":1')}

        response = session.post('https://wappark.189.cn/jt-sign/paradise/conversionRights', json=data,cookies=ck)
        print(f'{now}--Phone:{phone}--{response.text}')
    except Exception as e:
        print(e)

def aes_ecb_encrypt(plaintext, key):
    key = key.encode('utf-8')
    if len(key) not in [16, 24, 32]:
        raise ValueError("密钥长度必须为16/24/32字节")

    # 对明文进行PKCS7填充
    padded_data = pad(plaintext.encode('utf-8'), AES.block_size)
    #padded_data = plaintext.encode('utf-8')
    # 创建AES ECB加密器
    cipher = AES.new(key, AES.MODE_ECB)

    # 加密并返回Base64编码结果
    ciphertext = cipher.encrypt(padded_data)
    return base64.b64encode(ciphertext).decode('utf-8')

def ks(phone, ticket,level):
    global wt

    
    s = requests.session()
    s.headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.97 Mobile Safari/537.36",
        "Referer": "https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html"}
    s.cookies.set_policy(BlockAll())
    s.mount('https://', DESAdapter())
    s.timeout = 30
    if rs:

        bd = js.call('main').split('=')
        ck[bd[0]] = bd[1]

    encrypted_data  = aes_ecb_encrypt(json.dumps({"ticket":ticket,"backUrl":"https%3A%2F%2Fwapact.189.cn%3A9001","platformCode":"P201010301","loginType":2}), 'telecom_wap_2018')

    login = ss.post('https://wapact.189.cn:9001/unified/user/login',data=encrypted_data, headers={"Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/javascript, */*; q=0.01"}, cookies=ck).json()
    if login['code'] == 0:
        printn(phone + " 获取token成功")
        s.headers["Authorization"] = "Bearer " + login["biz"]["token"]

        queryInfo(phone, s)


        if rs:
            bd = js.call('main').split('=')
            ck[bd[0]] = bd[1]
            response_data = \
            s.get('https://wappark.189.cn/jt-sign/ssoHomLogin?ticket=' + ticket, cookies=ck).json()['sign']
            new_header = {
                "User-Agent": f"CtClient;9.6.1;Android;12;SM-G9860;{base64.b64encode(phone[5:11].encode()).decode().strip('=+')}!#!{base64.b64encode(phone[0:5].encode()).decode().strip('=+')}",
                "Referer": "https://wappark.189.cn/resources/dist/signInActivity.html",
                "sign": response_data}
            s.headers.update(new_header)
            if dd == '01' or dirsize < 20:
                getId(s, phone, ck)
                with open('权益id.log', 'w') as f:
                    f.write(json.dumps(data))
                print('已获取权益id，请再跑一次脚本')
                #print(data)
            rightsId = data[yf][level]
            sign = getSign(ticket, s)
            new_header = {
                "User-Agent": f"CtClient;9.6.1;Android;12;SM-G9860;{base64.b64encode(phone[5:11].encode()).decode().strip('=+')}!#!{base64.b64encode(phone[0:5].encode()).decode().strip('=+')}",
                "Referer": "https://wappark.189.cn/resources/dist/signInActivity.html",
                "sign": sign}
            s.headers.update(new_header)

            wt = t(23) + kswt
            if wt - time.time() > 20 * 60:
                print(wt)
                print("等待时间超过20分钟")
                return
            threading.Thread(target=dh, args=(phone, s, wt, rightsId)).start()



    else:

        printn(f"{phone} 获取token {login['message']}")


def dh(phone, s, wt, rightsId):
    wt += 3.8
    while wt > time.time():
        pass
    printn(f"{str(datetime.datetime.now())[11:22]} {phone}  开始兑换")

    if rs:
        bd = js.call('main').split('=')
        ck[bd[0]] = bd[1]
    for cs in range(cfcs):
        threading.Thread(target=exchange, args=(phone, s,rightsId)).start()
        # time.sleep(5)

def first_request(res=''):
    global js, fw
    url = 'https://wapact.189.cn:9001/gateway/standExchange/detailNew/exchange'
    if res == '':
        response = ss.get(url)
        res = response.text
    soup = BeautifulSoup(res, 'html.parser')
    scripts = soup.find_all('script')
    for script in scripts:
        if 'src' in str(script):
            rsurl = re.findall('src="([^"]+)"', str(script))[0]

        if '$_ts=window' in script.get_text():
            ts_code = script.get_text()

    urls = url.split('/')
    rsurl = urls[0] + '//' + urls[2] + rsurl
    # print(rsurl)
    ts_code += ss.get(rsurl).text
    content_code = soup.find_all('meta')[1].get('content')
    with open("瑞数通杀.js", encoding='utf-8') as f:
        js_code_ym = f.read()
    js_code = js_code_ym.replace('content_code', content_code).replace("'ts_code'", ts_code)
    js = execjs.compile(js_code)

    for cookie in ss.cookies:
        ck[cookie.name] = cookie.value
    return content_code, ts_code, ck


def main():
    global wt, rs
    r = ss.get('https://wapact.189.cn:9001/gateway/standExchange/detailNew/exchange')
    if '$_ts=window' in r.text:
        rs = 1
        print("瑞数加密已开启")
        first_request()
    else:
        print("瑞数加密已关闭")
        rs = 0
    if os.environ.get('PHONES1') != None:
        chinaTelecomAccount = os.environ.get('PHONES1')
    else:
        print('添加PHONES1环境变量啊')
    #chinaTelecomAccount = ""
    for i in chinaTelecomAccount.split('#'):

        i = i.split('&')
        phone = i[0]
        password = i[1]
        level = i[2]
        ticket = False

        # ticket = get_userTicket(phone)

        if phone in load_token:
            printn(f'{phone} 使用缓存登录')
            ticket = get_ticket(phone, load_token[phone]['userId'], load_token[phone]['token'])

        if ticket == False:
            printn(f'{phone} 使用密码登录')
            ticket = userLoginNormal(phone, password)

        if ticket:
            threading.Thread(target=ks, args=(phone, ticket,level)).start()

            time.sleep(1)
        else:
            printn(f'{phone} 登录失败')


cfcs = 8

jdaid = '66c7e5e1085c813fd0cc5380'
ck = {}
load_token_file = 'chinaTelecom_cache.json'
try:
    with open(load_token_file, 'r') as f:
        load_token = json.load(f)
except:
    load_token = {}

main()
