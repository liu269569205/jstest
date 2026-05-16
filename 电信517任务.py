#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
import sys
import ssl
import time
import json
import execjs
import base64
import random
import certifi
import asyncio
import datetime
import requests
import binascii
import httpx
import urllib.parse
import subprocess
from bs4 import BeautifulSoup, Tag
from http import cookiejar
from functools import partial
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Cipher import DES3
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
from Crypto.Util.Padding import pad, unpad
import random

# 导入同级目录下的 notify 模块
import notify

def mask_phone(phone):
    if isinstance(phone, str) and len(phone) == 11:
        return f"{phone[:3]}****{phone[7:]}"
    return phone

def printn(m):
    current_time = datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3]
    print(f"[{current_time}] {m}")

class BlockAll(cookiejar.CookiePolicy):
    return_ok = set_ok = domain_return_ok = path_return_ok = (
        lambda self, *args, **kwargs: False
    )
    netscape = True
    rfc2965 = hide_cookie2 = False

context = ssl.create_default_context()
context.set_ciphers("DEFAULT@SECLEVEL=1")
context.check_hostname = False
context.verify_mode = ssl.CERT_NONE

class DESAdapter(requests.adapters.HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        kwargs["ssl_context"] = context
        return super().init_poolmanager(*args, **kwargs)

requests.packages.urllib3.disable_warnings()
ss = requests.session()
ss.headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.97 Mobile Safari/537.36",
    "Referer": "https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html",
}
ss.mount("https://", DESAdapter())
ss.cookies.set_policy(BlockAll())
key = b"1234567`90koiuyhgtfrdews"
iv = 8 * b"\0"

public_key_b64 = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBkLT15ThVgz6/NOl6s8GNPofdWzWbCkWnkaAm7O2LjkM1H7dMvzkiqdxU02jamGRHLX/ZNMCXHnPcW/sDhiFCBN18qFvy8g6VYb9QtroI09e176s+ZCtiv7hbin2cCTj99iUpnEloZm19lwHyo69u5UMiPMpq0/XKBO8lYhN/gwIDAQAB
-----END PUBLIC KEY-----"""

public_key_data = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+ugG5A8cZ3FqUKDwM57GM4io6JGcStivT8UdGt67PEOihLZTw3P7371+N47PrmsCpnTRzbTgcupKtUv8ImZalYk65dU8rjC/ridwhw9ffW2LBwvkEnDkkKKRi2liWIItDftJVBiWOh17o6gfbPoNrWORcAdcbpk2L+udld5kZNwIDAQAB
-----END PUBLIC KEY-----"""

public_key_xbk = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIPOHtjs6p4sTlpFvrx+ESsYkEvyT4JB/dcEbU6C8+yclpcmWEvwZFymqlKQq89laSH4IxUsPJHKIOiYAMzNibhED1swzecH5XLKEAJclopJqoO95o8W63Euq6K+AKMzyZt1SEqtZ0mXsN8UPnuN/5aoB3kbPLYpfEwBbhto6yrwIDAQAB",
-----END PUBLIC KEY-----"""

jsCache = "Cache.js"
fileContent = ""

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
httpx._config.DEFAULT_CIPHERS += ":ALL:@SECLEVEL=1"

def get_first_three(value):
    if isinstance(value, (int, float)):
        return int(str(value)[:3])
    elif isinstance(value, str):
        return str(value)[:3]
    else:
        raise TypeError("error")

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
    if not isinstance(plaintext, str):
        plaintext = json.dumps(plaintext)
    public_key = RSA.import_key(public_key_data)
    cipher = PKCS1_v1_5.new(public_key)
    key_size = public_key.size_in_bytes()
    max_chunk_size = key_size - 11
    plaintext_bytes = plaintext.encode()
    ciphertext = b""
    for i in range(0, len(plaintext_bytes), max_chunk_size):
        chunk = plaintext_bytes[i : i + max_chunk_size]
        encrypted_chunk = cipher.encrypt(chunk)
        ciphertext += encrypted_chunk
    return binascii.hexlify(ciphertext).decode()

def encode_phone(text):
    encoded_chars = []
    for char in text:
        encoded_chars.append(chr(ord(char) + 2))
    return "".join(encoded_chars)

def xbkb64(plaintext):
    public_key = RSA.import_key(public_key_xbk)
    cipher = PKCS1_v1_5.new(public_key)
    key_size = public_key.size_in_bytes()
    max_chunk = key_size - 11
    ciphertext = b""
    for i in range(0, len(plaintext.encode()), max_chunk):
        chunk = plaintext.encode()[i : i + max_chunk]
        ciphertext += cipher.encrypt(chunk)
    return base64.b64encode(ciphertext).decode()

def aes_encrypt(data, key="34d7cb0bcdf07523"):
    if type(data) == dict:
        data = json.dumps(data)
    key_bytes = key.encode("utf-8")
    data_bytes = data.encode("utf-8")
    cipher = AES.new(key_bytes, AES.MODE_ECB)
    ct_bytes = cipher.encrypt(pad(data_bytes, AES.block_size))
    return ct_bytes.hex()

def aes_ecb_encrypt(plaintext, key):
    if len(key) not in [16, 24, 32]:
        raise ValueError("密钥长度必须为16/24/32字节")
    key_bytes = key.encode('utf-8') if isinstance(key, str) else key
    plaintext_bytes = plaintext.encode('utf-8') if isinstance(plaintext, str) else plaintext
    padded = pad(plaintext_bytes, AES.block_size)
    cipher = AES.new(key_bytes, AES.MODE_ECB)
    encrypted = cipher.encrypt(padded)
    return base64.b64encode(encrypted).decode('utf-8')

def userLoginNormal(phone, password):
    alphabet = "abcdef0123456789"
    uuid = [
        "".join(random.sample(alphabet, 8)),
        "".join(random.sample(alphabet, 4)),
        "4" + "".join(random.sample(alphabet, 3)),
        "".join(random.sample(alphabet, 4)),
        "".join(random.sample(alphabet, 12)),
    ]
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    loginAuthCipherAsymmertric = (
        "iPhone 14 15.4."
        + uuid[0]
        + uuid[1]
        + phone
        + timestamp
        + password[:6]
        + "0$$$0."
    )
    try:
        r = ss.post(
            "https://appgologin.189.cn:9031/login/client/userLoginNormal",
            json={
                "headerInfos": {
                    "code": "userLoginNormal",
                    "timestamp": timestamp,
                    "broadAccount": "",
                    "broadToken": "",
                    "clientType": "#12.2.0#channel50#iPhone 14 Pro Max#",
                    "shopId": "20002",
                    "source": "110003",
                    "sourcePassword": "Sid98s",
                    "token": "",
                    "userLoginName": encode_phone(phone),
                },
                "content": {
                    "attach": "test",
                    "fieldData": {
                        "loginType": "4",
                        "accountType": "",
                        "loginAuthCipherAsymmertric": b64(loginAuthCipherAsymmertric),
                        "deviceUid": uuid[0] + uuid[1] + uuid[2],
                        "phoneNum": encode_phone(phone),
                        "isChinatelecom": "0",
                        "systemVersion": "15.4.0",
                        "authentication": encode_phone(password),
                    },
                },
            },
        ).json()
        if "responseData" in r and r["responseData"].get("data"):
            l = r["responseData"]["data"]
            if l and l.get("loginSuccessResult"):
                l_res = l.get("loginSuccessResult")
                load_token[phone] = l_res
                with open(load_token_file, "w", encoding="utf-8") as f:
                    json.dump(load_token, f, indent=2, ensure_ascii=False)
                ticket = get_ticket(phone, l_res["userId"], l_res["token"])
                return ticket
        printn(f"   - 登录响应异常: {r}")
    except Exception as e:
        printn(f"   - 登录请求失败: {e}")
    return False

def get_ticket(phone, userId, token):
    try:
        r = ss.post(
            "https://appgologin.189.cn:9031/map/clientXML",
            data="<Request><HeaderInfos><Code>getSingle</Code><Timestamp>"
            + datetime.datetime.now().strftime("%Y%m%d%H%M%S")
            + "</Timestamp><BroadAccount></BroadAccount><BroadToken></BroadToken><ClientType>#9.6.1#channel50#iPhone 14 Pro Max#</ClientType><ShopId>20002</ShopId><Source>110003</Source><SourcePassword>Sid98s</SourcePassword><Token>"
            + token
            + "</Token><UserLoginName>"
            + phone
            + "</UserLoginName></HeaderInfos><Content><Attach>test</Attach><FieldData><TargetId>"
            + encrypt(userId)
            + "</TargetId><Url>4a6862274835b451</Url></FieldData></Content></Request>",
            headers={
              "user-agent": "CtClient;10.4.1;Android;13;22081212C;NTQzNzgx!#!MTgwNTg1",
               'Content-Type': 'application/xml;charset=utf-8'
            },
            verify=False,
        )
        tk = re.findall("<Ticket>(.*?)</Ticket>", r.text)
        if len(tk) == 0:
            return False
        return decrypt(tk[0])
    except Exception as e:
        printn(f"   - 获取Ticket失败: {e}")
        return False

def get_set_cookie_header(response):
    set_cookie = response.headers.get("Set-Cookie", "")
    raw_headers = getattr(getattr(response, "raw", None), "headers", None)
    if raw_headers:
        get_all = getattr(raw_headers, "get_all", None) or getattr(raw_headers, "getlist", None)
        if get_all:
            cookies = get_all("Set-Cookie")
            if cookies:
                set_cookie = "; ".join(cookies)
    return set_cookie

def extract_reqparam(location):
    match = re.search(r"[?&]reqparam=([^&]+)", location or "")
    if not match:
        return ""
    return urllib.parse.unquote(match.group(1))

def extract_newmallsession(set_cookie):
    match = re.search(r"(newmallsession=[^;]+;)", set_cookie or "")
    if not match:
        return ""
    return match.group(1)

def get_query_param(url, key):
    parsed_url = urllib.parse.urlparse(url or "")
    query = urllib.parse.parse_qs(parsed_url.query, keep_blank_values=True)
    values = query.get(key)
    return values[0] if values else ""

def normalize_cookie_header(cookie):
    return (cookie or "").strip().rstrip(";")

def request_merchants_dock(reqparam, session, headers, location=""):
    if not reqparam:
        return None

    request_kwargs = {
        "headers": headers,
        "allow_redirects": False,
        "timeout": 15
    }
    if location:
        response = session.get(location, **request_kwargs)
    else:
        response = session.get(
            "https://m.telefen.com/MobileSSOv2/MerchantsDock.aspx",
            params={
                "appcode": "HGOKHD",
                "reqparam": reqparam
            },
            **request_kwargs
        )

    location = response.headers.get("Location", "")
    return {
        "status_code": response.status_code,
        "location": location,
        "text": "" if response.is_redirect else response.text[:200]
    }

def build_517_api_context(newmallsession, referer):
    token = get_query_param(referer, "Token")
    channel = get_query_param(referer, "channel") or "HGOKHD"
    promoid = get_query_param(referer, "promoid")
    cookie = normalize_cookie_header(newmallsession)
    return {
        "channel": channel,
        "promoid": promoid,
        "token": token,
        "referer": referer,
        "cookie": cookie,
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "appcode": "HGOKHD",
            "Connection": "keep-alive",
            "Content-Type": "application/json;charset=UTF-8",
            "Cookie": cookie,
            "Host": "apps.telefen.com",
            "Referer": referer,
            "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"iOS\"",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "ssotoken": token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1"
        }
    }

def request_ck517_page(session, api_context, referer=""):
    if not api_context or not api_context.get("referer"):
        return None

    headers = {
        "User-Agent": api_context["headers"]["User-Agent"],
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cookie": api_context["headers"]["Cookie"],
        "Referer": referer,
        "Upgrade-Insecure-Requests": "1",
        "sec-ch-ua": api_context["headers"]["sec-ch-ua"],
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"iOS\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-site"
    }
    response = session.get(
        api_context["referer"],
        headers=headers,
        allow_redirects=True,
        timeout=15
    )
    set_cookie = get_set_cookie_header(response)
    newmallsession = extract_newmallsession(set_cookie)
    if newmallsession:
        cookie = normalize_cookie_header(newmallsession)
        api_context["cookie"] = cookie
        api_context["headers"]["Cookie"] = cookie

    printn(f"   - 517落地页: {response.status_code}")
    return {
        "status_code": response.status_code,
        "url": response.url,
        "set_cookie": set_cookie,
        "text": response.text[:200]
    }

def request_account_check(session, api_context):
    if not api_context or not api_context.get("token"):
        return None

    params = {
        "noload": "true"
    }
    response = session.get(
        "https://apps.telefen.com/mallactive/api/account/check",
        params=params,
        headers=api_context["headers"],
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None

    err_code = data.get("errCode") if isinstance(data, dict) else None
    err_msg = data.get("errMsg") if isinstance(data, dict) else response.text[:200]
    is_login = bool(isinstance(data, dict) and (data.get("data") or {}).get("deviceNo"))
    printn(f"   - 517登录态检查: status={response.status_code} code={err_code} msg={err_msg} login={is_login}")
    return {
        "status_code": response.status_code,
        "url": response.url,
        "params": params,
        "json": data,
        "is_login": is_login,
        "text": "" if data is not None else response.text[:500]
    }

def request_activity_home(session, api_context):
    if not api_context or not api_context.get("token"): 
        return None

    params = {
        "channel": api_context["channel"],
        "noload": "true",
        "activeCode": "2026517"
    }
    response = session.get(
        "https://apps.telefen.com/mallactive/api/v26517/activity/home",
        params=params,
        headers=api_context["headers"],
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None
    if isinstance(data, dict) and data.get("errCode") != "0000":
        printn(f"   - 517任务列表异常: {data.get('errCode')} {data.get('errMsg')}")
        printn(f"   - 517任务列表URL: {response.url}")
        printn(f"   - 517任务列表Referer: {api_context['headers'].get('Referer', '')}")
        printn(f"   - 517任务列表Cookie: {api_context['headers'].get('Cookie', '')}")
        printn(f"   - 517任务列表ssotoken: {api_context['headers'].get('ssotoken', '')}")
    return {
        "status_code": response.status_code,
        "url": response.url,
        "params": params,
        "headers": api_context["headers"],
        "json": data,
        "text": "" if data is not None else response.text[:500]
    }

def parse_activity_tasks(activity_home):
    data = activity_home.get("json") if activity_home else None
    if not isinstance(data, dict):
        printn("   - 517任务列表: 返回不是JSON")
        return [], []
    biz_data = data.get("data") or {}
    if not isinstance(biz_data, dict):
        printn(f"   - 517任务列表: data为空 {data.get('errMsg', '')}")
        return [], []
    task_list = biz_data.get("taskList", []) or []
    unfinished_tasks = []
    for task in task_list:
        task_name = task.get("taskName", "")
        task_type = task.get("taskType", "")
        completed_times = task.get("completedTimes", 0)
        max_times = task.get("maxTimes", 0)
        is_finished = task.get("isFinished", 0)
        status = "已完成" if is_finished == 1 else "未完成"
        printn(f"   - 517任务: {task_name} [{task_type}] {completed_times}/{max_times} {status}")
        if is_finished != 1:
            unfinished_tasks.append(task)
    return task_list, unfinished_tasks

def request_complete_task(session, api_context, task):
    task_type = task.get("taskType", "")
    task_name = task.get("taskName", task_type)
    headers = dict(api_context["headers"])
    headers["Origin"] = "https://apps.telefen.com"
    payload = {
        "channel": api_context["channel"],
        "taskType": task_type,
        "activityId": "2026517",
        "noload": True
    }
    response = session.post(
        "https://apps.telefen.com/mallactive/api/v26517/task/complete",
        json=payload,
        headers=headers,
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None
    result_msg = ""
    if isinstance(data, dict):
        result_msg = data.get("errMsg") or data.get("message") or data.get("msg") or ""
    else:
        result_msg = response.text[:200]
    printn(f"   - 517完成任务: {task_name} [{task_type}] status={response.status_code} {result_msg}")
    return {
        "status_code": response.status_code,
        "payload": payload,
        "json": data,
        "text": "" if data is not None else response.text[:500]
    }

def is_complete_response_finished(data):
    if not isinstance(data, dict):
        return False
    values = [
        data.get("isFinished"),
        data.get("finished"),
        data.get("success"),
    ]
    biz_data = data.get("data")
    if isinstance(biz_data, dict):
        values.extend([
            biz_data.get("isFinished"),
            biz_data.get("finished"),
            biz_data.get("success"),
        ])
    return any(value is True or value == 1 or value == "1" for value in values)

def sync_sub_wechat_task_status(session, api_context, activity_home):
    data = activity_home.get("json") if activity_home else None
    biz_data = data.get("data") if isinstance(data, dict) else None
    task_list = biz_data.get("taskList", []) if isinstance(biz_data, dict) else []
    if not isinstance(task_list, list):
        return activity_home

    sub_wechat_task = next(
        (task for task in task_list if isinstance(task, dict) and task.get("taskType") == "SUB_WECHAT"),
        None
    )
    if not sub_wechat_task or sub_wechat_task.get("isFinished") == 1:
        return activity_home

    printn("   - 517公众号任务: 按前端逻辑单独校验绑定状态")
    result = request_complete_task(session, api_context, sub_wechat_task)
    sub_wechat_task["_subWechatChecked"] = True
    if is_complete_response_finished(result.get("json")):
        sub_wechat_task["isFinished"] = 1
        sub_wechat_task["completedTimes"] = sub_wechat_task.get("maxTimes") or 1
        printn("   - 517公众号任务: 已关注绑定，同步为已完成")
    else:
        printn("   - 517公众号任务: 接口仍返回未完成，继续走正常任务提交")
    return activity_home

CARD_PIECES_517 = [
    (10000, "天翼云盘"),
    (10001, "天翼智铃"),
    (10002, "天翼智屏"),
    (10003, "通讯助理"),
    (10004, "云智手机"),
    (10005, "直连卫星"),
]

def _to_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default

def parse_517_piece_collection(data):
    biz_data = data.get("data") if isinstance(data, dict) else {}
    if not isinstance(biz_data, dict):
        biz_data = {}
    piece_list = biz_data.get("pieceList", []) or []
    piece_map = {}
    for piece in piece_list:
        if not isinstance(piece, dict):
            continue
        piece_id = _to_int(piece.get("pieceId"))
        valid_count = _to_int(piece.get("validPieceCount"))
        gifting_count = _to_int(piece.get("giftingPieceCount"))
        used_count = _to_int(piece.get("usedPieceCount"))
        piece_map[piece_id] = {
            "pieceId": piece_id,
            "pieceName": piece.get("pieceName", ""),
            "validPieceCount": valid_count,
            "giftingPieceCount": gifting_count,
            "usedPieceCount": used_count,
            "availableCount": valid_count + gifting_count,
            "raw": piece,
        }

    cards = []
    missing = []
    for piece_id, name in CARD_PIECES_517:
        item = piece_map.get(piece_id, {})
        available_count = _to_int(item.get("availableCount"))
        used_count = _to_int(item.get("usedPieceCount"))
        cards.append({
            "pieceId": piece_id,
            "pieceName": item.get("pieceName") or name,
            "availableCount": available_count,
            "usedPieceCount": used_count,
        })
        if available_count <= 0:
            missing.append(name)

    return {
        "cards": cards,
        "missing": missing,
        "is_all_collected": len(missing) == 0,
        "piece_list": piece_list,
    }

def print_517_piece_collection(collection):
    cards = collection.get("cards", []) if isinstance(collection, dict) else []
    parts = []
    for card in cards:
        used_count = _to_int(card.get("usedPieceCount"))
        suffix = f"(已用{used_count})" if used_count > 0 else ""
        parts.append(f"{card.get('pieceName')}x{card.get('availableCount', 0)}{suffix}")
    if parts:
        printn(f"   - 517卡片: {'，'.join(parts)}")

    missing = collection.get("missing", []) if isinstance(collection, dict) else []
    if missing:
        printn(f"   - 517卡片: 未集齐，缺少 {'、'.join(missing)}")
    else:
        printn("   - 517卡片: 已集齐，可合成")

def has_517_composite_record_payload(data):
    if isinstance(data, bool):
        return data
    if not isinstance(data, dict):
        return False
    return bool(
        data.get("hasCompositeRecord")
        or data.get("isComposite")
        or data.get("isComposited")
        or data.get("compositeRecord")
        or data.get("compositeRecordId") is not None
        or data.get("id") is not None
        or data.get("compositeTime")
        or data.get("commodityId")
        or data.get("commodityName")
    )

def request_my_piece_list(session, api_context):
    params = {
        "gameId": "10000"
    }
    response = session.get(
        "https://apps.telefen.com/mallactive/api/fragment/getMyPieceList",
        params=params,
        headers=api_context["headers"],
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None

    total_chance_count = 0
    collection = {
        "cards": [],
        "missing": [name for _, name in CARD_PIECES_517],
        "is_all_collected": False,
        "piece_list": [],
    }
    if isinstance(data, dict):
        biz_data = data.get("data") or {}
        if isinstance(biz_data, dict):
            total_chance_count = biz_data.get("totalChanceCount", 0) or 0
        collection = parse_517_piece_collection(data)
    printn(f"   - 517抽奖次数: {total_chance_count}")
    print_517_piece_collection(collection)
    return {
        "status_code": response.status_code,
        "params": params,
        "json": data,
        "total_chance_count": total_chance_count,
        "collection": collection,
        "text": "" if data is not None else response.text[:500]
    }

def request_fragment_composite_record(session, api_context):
    headers = dict(api_context["headers"])
    headers["Origin"] = "https://apps.telefen.com"
    payload = {
        "gameId": "10000"
    }
    response = session.post(
        "https://apps.telefen.com/mallactive/api/fragment/getCompositeRecord",
        json=payload,
        headers=headers,
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None

    biz_data = data.get("data") if isinstance(data, dict) else None
    has_record = has_517_composite_record_payload(biz_data)
    if isinstance(data, dict):
        printn(f"   - 517合成记录: {'已有' if has_record else '暂无'} {data.get('errMsg', '')}")
        if has_record and isinstance(biz_data, dict):
            prize_name = biz_data.get("commodityName") or biz_data.get("prizeName") or ""
            if prize_name:
                printn(f"   - 517已有奖品: {prize_name}")
    else:
        printn(f"   - 517合成记录: status={response.status_code} {response.text[:200]}")

    return {
        "status_code": response.status_code,
        "payload": payload,
        "json": data,
        "has_record": has_record,
        "text": "" if data is not None else response.text[:500]
    }

def request_fragment_composite(session, api_context):
    headers = dict(api_context["headers"])
    headers["Origin"] = "https://apps.telefen.com"
    payload = {
        "gameId": "10000",
        "appCode": api_context.get("channel") or "HGOKHD"
    }
    response = session.post(
        "https://apps.telefen.com/mallactive/api/fragment/composite",
        json=payload,
        headers=headers,
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None

    if isinstance(data, dict):
        printn(f"   - 517合成结果: {data.get('errMsg', '')}")
        biz_data = data.get("data") or {}
        if isinstance(biz_data, dict):
            success = biz_data.get("success")
            record_id = biz_data.get("compositeRecordId") or biz_data.get("id")
            is_won = biz_data.get("isWon")
            prize_name = biz_data.get("commodityName") or biz_data.get("prizeName") or ""
            prize_type = biz_data.get("commodityType")
            received_status = biz_data.get("receivedStatus")
            printn(f"   - 517合成记录ID: {record_id} success={success} isWon={is_won} receivedStatus={received_status}")
            if is_won is False:
                printn("   - 517合成: 未中奖")
            elif prize_name:
                printn(f"   - 517合成奖品: {prize_name} type={prize_type}")
            if prize_type == 1:
                printn("   - 517合成: 实物奖品需要在页面填写收货地址")
    else:
        printn(f"   - 517合成结果: status={response.status_code} {response.text[:200]}")

    return {
        "status_code": response.status_code,
        "payload": payload,
        "json": data,
        "text": "" if data is not None else response.text[:500]
    }

def maybe_composite_517(session, api_context, piece_info=None):
    if not piece_info:
        piece_info = request_my_piece_list(session, api_context)
    collection = piece_info.get("collection", {}) if isinstance(piece_info, dict) else {}
    if not collection.get("is_all_collected"):
        return None

    record = request_fragment_composite_record(session, api_context)
    if record and record.get("has_record"):
        printn("   - 517合成: 已有合成记录，跳过")
        return record

    printn("   - 517合成: 六张卡已集齐，开始合成")
    return request_fragment_composite(session, api_context)

def request_fragment_draw(session, api_context, draw_count):
    headers = dict(api_context["headers"])
    headers["Origin"] = "https://apps.telefen.com"
    payload = {
        "drawCount": draw_count,
        "gameId": "10000",
        "activityId": "2026517"
    }
    response = session.post(
        "https://apps.telefen.com/mallactive/api/fragment/draw",
        json=payload,
        headers=headers,
        timeout=15
    )
    try:
        data = response.json()
    except Exception:
        data = None

    if isinstance(data, dict):
        printn(f"   - 517抽奖结果: {data.get('errMsg', '')}")
        biz_data = data.get("data") or {}
        win_piece_list = biz_data.get("winPieceList", []) if isinstance(biz_data, dict) else []
        win_piece_list = win_piece_list or []
        if win_piece_list:
            for piece in win_piece_list:
                printn(f"   - 517抽中: {piece.get('pieceName', '')} x{piece.get('count', 0)}")
        else:
            printn("   - 517抽奖: 未获得碎片")
    else:
        printn(f"   - 517抽奖结果: status={response.status_code} {response.text[:200]}")

    return {
        "status_code": response.status_code,
        "payload": payload,
        "json": data,
        "text": "" if data is not None else response.text[:500]
    }

async def ck517(ticket, session):
    try:
        params = {
            "channel": "HGOKHD",
            "action": "2",
            "rdurl": "https://apps.telefen.com/mallactive/ck517?channel=HGOKHD",
            "promoid": "f15c4b971ecfa50b",
            "ticket": ticket,
            "utm_scha": "utm_ch-010001002009.utm_sch-hg_sy_yxtc-1.utm_af-1000000037.utm_as-456876200001.utm_sd1-S0076579"
        }
        headers = {
            "User-Agent": "CtClient;13.2.0;Android;14;22021211RC;",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Upgrade-Insecure-Requests": "1",
            "X-Requested-With": "com.ct.client",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Android WebView\";v=\"120\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        response = session.get(
            "https://apps.telefen.com/middleparse/api/access/ticket",
            params=params,
            headers=headers,
            allow_redirects=False,
            timeout=15
        )
        set_cookie = get_set_cookie_header(response)
        location = response.headers.get("Location", "")
        reqparam = extract_reqparam(location)
        newmallsession = extract_newmallsession(set_cookie)

        if response.status_code in (301, 302, 303, 307, 308):
            printn(f"   - 517跳转: {response.status_code}")
            printn(f"   - 517 获取cookie成功: {set_cookie}")
            merchants_dock = request_merchants_dock(reqparam, session, headers, location)
            if merchants_dock:
                printn(f"   - 517二跳: {merchants_dock['status_code']}")
                printn(f"   - 517二跳 Location: {merchants_dock['location']}")
            api_context = build_517_api_context(
                newmallsession,
                merchants_dock.get("location") if merchants_dock else ""
            )
            printn(f"   - 517后续获取Token成功: {api_context['token']}")
            ck517_page = request_ck517_page(session, api_context, location)
            account_check = request_account_check(session, api_context)
            return {
                "status_code": response.status_code,
                "set_cookie": set_cookie,
                "newmallsession": newmallsession,
                "location": location,
                "reqparam": reqparam,
                "merchants_dock": merchants_dock,
                "ck517_page": ck517_page,
                "account_check": account_check,
                "api_context": api_context
            }

        printn(f"   - 517接口未返回302: status={response.status_code}, body={response.text[:200]}")
        return {
            "status_code": response.status_code,
            "set_cookie": set_cookie,
            "newmallsession": newmallsession,
            "location": location,
            "reqparam": reqparam,
            "text": response.text
        }
    except Exception as e:
        printn(f"   - 517登录: 发生错误 ❌: {e}")
        return None

async def ks(phone, ticket):
    session = requests.Session()
    session.mount("https://", DESAdapter())
    session.verify = False
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 13; 22081212C Build/TKQ1.220829.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.97 Mobile Safari/537.36"
    }
    session.headers.update(headers)
    
    ck517_info = await ck517(ticket, session)
    if not ck517_info or not ck517_info.get("api_context"):
        printn("   - 517任务列表: 缺少后续请求参数")
        return None

    activity_home = request_activity_home(session, ck517_info["api_context"])
    if activity_home:
        printn(f"   - 517任务列表: {activity_home['status_code']}")
        activity_home = sync_sub_wechat_task_status(session, ck517_info["api_context"], activity_home)
        task_list, unfinished_tasks = parse_activity_tasks(activity_home)
        printn(f"   - 517任务数量: 总计{len(task_list)}个，未完成{len(unfinished_tasks)}个")

        for task in unfinished_tasks:
            completed_times = task.get("completedTimes", 0) or 0
            max_times = task.get("maxTimes", 1) or 1
            remaining_times = max(max_times - completed_times, 1)
            for index in range(remaining_times):
                printn(f"   - 517提交完成: {task.get('taskName', task.get('taskType'))} 第{index + 1}/{remaining_times}次")
                request_complete_task(session, ck517_info["api_context"], task)
                await asyncio.sleep(1)

        piece_info = request_my_piece_list(session, ck517_info["api_context"])
        draw_count = piece_info.get("total_chance_count", 0) if piece_info else 0
        if draw_count > 0:
            printn(f"   - 517开始抽奖: 一次性抽{draw_count}次")
            request_fragment_draw(session, ck517_info["api_context"], draw_count)
            piece_info = request_my_piece_list(session, ck517_info["api_context"])
        else:
            printn("   - 517抽奖: 暂无可用次数")

        # 尝试合成，并获取合成结果
        composite_result = maybe_composite_517(session, ck517_info["api_context"], piece_info)

        # 构造返回结果（按新格式）
        masked_phone = mask_phone(phone)
        result_msg = ""
        # 优先检查是否有合成奖品
        if composite_result and composite_result.get("json"):
            data = composite_result["json"]
            biz_data = data.get("data") if isinstance(data, dict) else {}
            prize_name = biz_data.get("commodityName") or biz_data.get("prizeName")
            if prize_name:
                result_msg = f"合成奖品: {prize_name}"
            elif biz_data.get("isWon") is False:
                result_msg = "合成: 未中奖"
            else:
                result_msg = "合成: 未知结果"
        else:
            # 无合成记录，检查卡片收集情况
            collection = piece_info.get("collection", {}) if isinstance(piece_info, dict) else {}
            missing = collection.get("missing", [])
            if missing:
                result_msg = f"卡片: 未集齐，缺少 {'、'.join(missing)}"
            else:
                result_msg = "卡片: 已集齐但未合成（可能已合过）"
        return masked_phone, result_msg

    return None   # 活动首页获取失败

async def main():
    printn(PHONES)
    if not PHONES:
        printn("❌ 未在环境变量中找到 `chinaTelecomAccount`, 请检查配置。")
        return

    phone_list = [acc for acc in re.split(r"[&\n@]", PHONES) if acc.strip()]
    printn(f"   - ✨ 检测到 {len(phone_list)} 个账号，准备开始执行任务...")
    print("-" * 50)

    results = []

    for index, phoneV in enumerate(phone_list):
        printn(f"   - 👤 开始处理第 {index + 1} / {len(phone_list)} 个账号...")
        value = phoneV.split("#")
        if len(value) < 2:
            printn(f"   - ❌ 账号格式错误, 跳过: {phoneV}")
            print("-" * 50)
            continue

        phone, password = value[0], value[1]
        masked_phone = mask_phone(phone)
        max_retries = 3
        retry_count = 0
        ticket = False

        while retry_count < max_retries and not ticket:
            retry_count += 1
            printn(f"   - 🔄 账号 {masked_phone} 第 {retry_count} 次登录尝试...")

            if phone in load_token:
                printn(f"   - 🎨 尝试使用缓存Token登录...")
                ticket = get_ticket(
                    phone, load_token[phone]["userId"], load_token[phone]["token"]
                )

            if not ticket:
                printn(f"   - 🎨 缓存无效或不存在，尝试使用密码登录...")
                ticket = userLoginNormal(phone, password)

            if ticket:
                printn(f"   - 🔑 账号 {masked_phone} 登录成功 ✅")
                break
            else:
                printn(f"   - ❌ 账号 {masked_phone} 第 {retry_count} 次登录失败")
                if retry_count < max_retries:
                    await asyncio.sleep(2)

        if ticket:
            result = await ks(phone, ticket)
            if result:
                masked_phone, msg = result
                # 根据消息内容决定格式（合成奖品带空格，卡片不带空格）
                if "合成奖品" in msg or "合成:" in msg:
                    results.append(f"账号{index+1}:[{masked_phone}] {msg}")
                else:
                    results.append(f"账号{index+1}:[{masked_phone}]{msg}")
            else:
                results.append(f"账号{index+1}:{masked_phone} 任务执行失败")
            printn(f"   - ✅ 第 {index + 1} 个账号 {masked_phone} 的所有任务执行完毕。")
        else:
            fail_msg = f"账号{index+1}:{masked_phone} 登录失败，已达最大重试次数"
            results.append(fail_msg)
            printn(f"   - ❌ {fail_msg}，跳过此账号。")

        print("-" * 50)
        if index < len(phone_list) - 1:
            await asyncio.sleep(3)

    # 使用 notify 模块推送
    if results:
        push_title = "电信517活动汇总"
        push_content = "\n".join(results)
        notify.send(push_title, push_content)

load_token_file = "chinaTelecom_cache.json"
try:
    with open(load_token_file, "r") as f:
        load_token = json.load(f)
except:
    load_token = {}

PHONES = os.environ.get("chinaTelecomAccount")
if __name__ == "__main__":
    try:
        asyncio.run(main())
    finally:
        printn("电信任务结束")