import hashlib
import json
import os
import random
import re
import time
import base64
import zlib
from datetime import datetime
from typing import Dict, List, Optional, Any
from urllib.parse import unquote
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# 禁用SSL警告
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


# ==================== 配置常量 ====================
PROXY_TIMEOUT = 15
MAX_PROXY_RETRIES = 5
REQUEST_RETRY_COUNT = 3
CONCURRENT_NUM = int(os.getenv('SFBF', '1'))
if CONCURRENT_NUM > 20:
    CONCURRENT_NUM = 20
elif CONCURRENT_NUM < 1:
    CONCURRENT_NUM = 1

# 代理开关（默认启用）
ENABLE_PROXY = os.getenv('ENABLE_PROXY', 'flase').lower() == 'true'

print_lock = Lock()

# 端午龙舟活动配置
ACTIVITY_CODE = "DRAGONBOAT_2026"
TOKEN = 'wwesldfs29aniversaryvdld29'
SYS_CODE = 'MCS-MIMP-CORE'

# 需要跳过的任务类型（需要实际操作的）
SKIP_TASK_TYPES = [
    'SEND_INTERNATIONAL_PACKAGE',       
    'LOOK_BIG_PACKAGE_GET_CASH',        
    'SEND_SUCCESS_RECALL',              
    'CHARGE_NEW_EXPRESS_CARD',          
    'CHARGE_COLLECT_ALL',               
    'OPEN_FAMILY_HOME_MUTUAL',          
    'BUY_PAID_PACKET',                  
    'INVITEFRIENDS_PARTAKE_ACTIVITY',   
]


# ==================== 日志 ====================
class Logger:
    def __init__(self):
        self.messages: List[str] = []
        self.lock = Lock()

    def _log(self, icon: str, msg: str):
        line = f"{icon} {msg}"
        with print_lock:
            print(line)
        with self.lock:
            self.messages.append(line)

    def info(self, msg): self._log('📝', msg)
    def success(self, msg): self._log('✅', msg)
    def warning(self, msg): self._log('⚠️', msg)
    def error(self, msg): self._log('❌', msg)
    def task(self, msg): self._log('🎯', msg)
    def medal(self, msg): self._log('🏅', msg)


# ==================== 代理管理器 ====================
class ProxyManager:
    def __init__(self, api_url: str):
        self.api_url = api_url

    def get_proxy(self) -> Optional[Dict[str, str]]:
        # 如果代理开关关闭，直接返回 None
        if not ENABLE_PROXY:
            return None
        try:
            if not self.api_url:
                return None
            response = requests.get(self.api_url, timeout=10)
            if response.status_code == 200:
                # 尝试解析 JSON
                try:
                    data = response.json()
                    # 假设 JSON 结构为 {"data":{"list":[{"ip":"x.x.x.x","port":"xxxx"}]}}
                    if 'data' in data and 'list' in data['data'] and data['data']['list']:
                        proxy_info = data['data']['list'][0]
                        ip = proxy_info.get('ip')
                        port = proxy_info.get('port')
                        if ip and port:
                            proxy = f'http://{ip}:{port}'
                            with print_lock:
                                print(f"✅ 获取代理: {proxy}")
                            return {'http': proxy, 'https': proxy}
                except (json.JSONDecodeError, KeyError, IndexError):
                    # 不是 JSON，按纯文本处理（兼容旧格式）
                    proxy_text = response.text.strip()
                    if ':' in proxy_text:
                        proxy = proxy_text if proxy_text.startswith('http') else f'http://{proxy_text}'
                        display = proxy
                        if '@' in proxy:
                            parts = proxy.split('@')
                            display = f"http://***:***@{parts[-1]}"
                        with print_lock:
                            print(f"✅ 获取代理: {display}")
                        return {'http': proxy, 'https': proxy}
                with print_lock:
                    print(f"❌ 获取代理失败: 无法解析代理数据")
                return None
            else:
                with print_lock:
                    print(f"❌ 获取代理失败: HTTP {response.status_code}")
                return None
        except Exception as e:
            with print_lock:
                print(f"❌ 获取代理异常: {str(e)[:100]}")
            return None

# ==================== HTTP客户端 ====================
class SFHttpClient:
    def __init__(self, proxy_manager: ProxyManager):
        self.proxy_manager = proxy_manager
        self.session = requests.Session()
        self.session.verify = False

        # 根据开关决定是否尝试获取代理
        if ENABLE_PROXY:
            proxy = self.proxy_manager.get_proxy()
            if proxy:
                self.session.proxies = proxy
            else:
                if self.proxy_manager.api_url:
                    print("⚠️ 代理获取失败，将不使用代理")
        # else:
        #     print("🔒 代理已禁用（ENABLE_PROXY=false）")

        self.headers = {
            'Host': 'mcs-mimp-web.sf-express.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254173b) XWEB/19027',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'channel': 'xcxpart',
            'platform': 'MINI_PROGRAM',
            'accept-language': 'zh-CN,zh;q=0.9',
        }

    def _generate_sign(self) -> Dict[str, str]:
        timestamp = str(int(round(time.time() * 1000)))
        data = f'token={TOKEN}&timestamp={timestamp}&sysCode={SYS_CODE}'
        signature = hashlib.md5(data.encode()).hexdigest()
        return {
            'syscode': SYS_CODE,
            'timestamp': timestamp,
            'signature': signature,
        }

    def request(self, url: str, data: Optional[Dict] = None, method: str = 'POST') -> Optional[Dict]:
        retry_count = 0
        # 如果代理开关关闭，最多只进行一次尝试（不切换代理）
        max_proxy_retries = MAX_PROXY_RETRIES if ENABLE_PROXY else 1
        proxy_retry_count = 0

        while proxy_retry_count < max_proxy_retries:
            # 每次请求重新生成签名
            sign_data = self._generate_sign()
            headers = {**self.headers, **sign_data}

            try:
                if method == 'POST':
                    resp = self.session.post(url, headers=headers, json=data or {}, timeout=PROXY_TIMEOUT)
                else:
                    resp = self.session.get(url, headers=headers, timeout=PROXY_TIMEOUT)
                resp.raise_for_status()

                try:
                    result = resp.json()
                    if result is None:
                        retry_count += 1
                        if retry_count < REQUEST_RETRY_COUNT:
                            time.sleep(2)
                            continue
                        return None
                    return result
                except (json.JSONDecodeError, ValueError):
                    retry_count += 1
                    if retry_count < REQUEST_RETRY_COUNT:
                        time.sleep(2)
                        continue
                    return None

            except requests.exceptions.RequestException as e:
                retry_count += 1
                error_str = str(e)

                # 代理相关错误，仅当开关开启时尝试切换代理
                if ENABLE_PROXY and ('ProxyError' in error_str or 'SSLError' in error_str or 'ConnectionError' in error_str):
                    proxy_retry_count += 1
                    if proxy_retry_count < MAX_PROXY_RETRIES:
                        new_proxy = self.proxy_manager.get_proxy()
                        if new_proxy:
                            self.session.proxies = new_proxy
                        retry_count = 0  # 换代理后重置请求重试计数
                    time.sleep(2)
                    continue

                # 普通请求错误，重试
                if retry_count < REQUEST_RETRY_COUNT:
                    time.sleep(2)
                    continue
                return None

            except Exception:
                return None

        return None

    def login(self, url: str) -> tuple:
        """登录（兼容URL和CK格式）"""
        try:
            decoded_input = unquote(url)
            if decoded_input.startswith('sessionId=') or '_login_mobile_=' in decoded_input:
                cookie_dict = {}
                for item in decoded_input.split(';'):
                    item = item.strip()
                    if '=' in item:
                        k, v = item.split('=', 1)
                        cookie_dict[k] = v
                for k, v in cookie_dict.items():
                    self.session.cookies.set(k, v, domain='mcs-mimp-web.sf-express.com')
                user_id = cookie_dict.get('_login_user_id_', '')
                phone = cookie_dict.get('_login_mobile_', '')
                return (True, user_id, phone) if phone else (False, '', '')
            else:
                self.session.get(unquote(url), headers=self.headers, timeout=PROXY_TIMEOUT)
                cookies = self.session.cookies.get_dict()
                user_id = cookies.get('_login_user_id_', '')
                phone = cookies.get('_login_mobile_', '')
                return (True, user_id, phone) if phone else (False, '', '')
        except Exception as e:
            print(f'登录异常: {str(e)}')
            return False, '', ''


# ==================== 端午龙舟活动任务执行器 ====================
class DragonBoatExecutor:
    # MODIFIED: 增加 user_id 参数
    def __init__(self, http: SFHttpClient, logger: Logger, user_id: str):
        self.http = http
        self.logger = logger
        self.user_id = user_id

    def _load_route_pool(self) -> List[str]:
        raw = 'eJwFwcsBADEEBcD7VhM8wdEn+i9pZ3w2rsbwGgNMdVKvTtvCUTVfOFgmI1ULfm/IvKX3+trSWn/GraVhY3BIVcqcx9S2c3MgHyt1T25eCFRO0inrUjui1Xgf+VluR5MGbMt5nZx7N7bOtQ+2jQhsc0MO0voKvwSnTjV9ar0nK7DeOGerK2Ru0PPaFPoBMO4zeQ=='
        return zlib.decompress(base64.b64decode(raw)).decode().splitlines()

    # ---------- API 方法 ----------

    def get_activity_index(self) -> Optional[Dict]:
        """获取端午龙舟活动首页信息"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026IndexService~index'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', {})
        return None

    def get_task_list(self) -> Optional[List[Dict]]:
        """获取端午龙舟活动任务列表"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'
        data = {
            "activityCode": ACTIVITY_CODE,
            "channelType": "SFAPP"
        }
        resp = self.http.request(url, data=data)
        if resp and resp.get('success'):
            return resp.get('obj', [])
        else:
            error_msg = resp.get('errorMessage', '未知错误') if resp else '请求失败'
            self.logger.error(f'获取任务列表失败: {error_msg}')
            return None

    def finish_task(self, task_code: str) -> bool:
        """完成任务（浏览类）"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask'
        data = {"taskCode": task_code}
        resp = self.http.request(url, data=data)
        if resp and resp.get('success'):
            return True
        return False

    # ========== 新增：专用接口-领取寄件会员权益 ==========
    def receive_vip_benefit(self) -> bool:
        """领取寄件会员权益（特殊任务）"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberManage~memberEquity~commonEquityReceive'
        data = {"key": "surprise_benefit"}
        resp = self.http.request(url, data=data)
        if resp and resp.get('success'):
            self.logger.success(f'[领取寄件会员权益] 完成成功')
            if resp.get('obj'):
                self.logger.info(f'领取详情: {resp["obj"]}')
            return True
        else:
            error_msg = resp.get('errorMessage', '未知错误') if resp else '请求失败'
            self.logger.warning(f'[领取寄件会员权益] 完成失败: {error_msg}')
            return False
    # =================================================

    def get_accrued_task_award(self) -> Optional[Dict]:
        """获取累计任务奖励进度"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026TaskService~getAccruedTaskAward'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', {})
        return None

    def get_user_rest_integral(self) -> int:
        """查询用户剩余积分"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~getUserRestIntegral'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            points = resp.get('obj', 0)
            self.logger.info(f'当前可用积分: {points}')
            return points
        return 0

    def exchange_points_for_crush(self) -> bool:
        """积分兑换砸粽子次数（10积分兑1次）"""
        points = self.get_user_rest_integral()
        if points < 10:
            self.logger.warning(f'积分不足10，无法兑换（当前: {points}）')
            return False

        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026TaskService~integralExchange'
        data = {
            "exchangeNum": 1,
            "activityCode": ACTIVITY_CODE
        }
        resp = self.http.request(url, data=data)
        if resp and resp.get('success'):
            self.logger.success('积分兑换成功，获得1次砸粽子次数')
            return True
        else:
            error_msg = resp.get('errorMessage', '未知错误') if resp else '请求失败'
            self.logger.warning(f'积分兑换失败: {error_msg}')
            return False

    def query_zongzi_status(self) -> Optional[Dict]:
        """查询粽子状态（金币、粽子数量等）"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026ZongziService~queryStatus'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', {})
        return None

    def crush_zongzi(self) -> Optional[Dict]:
        """砸粽子"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026ZongziService~crush'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', {})
        else:
            error_msg = resp.get('errorMessage', '未知错误') if resp else '请求失败'
            self.logger.warning(f'砸粽子失败: {error_msg}')
            return None

    def get_daily_gift_status(self, city_code: str = '551') -> Optional[Dict]:
        """查询每日礼包状态"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026DailyService~getDailyGiftStatus'
        data = {"cityCode": city_code}
        resp = self.http.request(url, data=data)
        if resp and resp.get('success'):
            return resp.get('obj', {})
        return None

    def query_extra_reward_cards(self) -> Optional[List]:
        """查询额外奖励卡片（倒计时等）"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026ZongziService~queryExtraRewardCards'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', [])
        return None

    def get_family_status(self) -> Optional[Dict]:
        """查询家庭权益状态"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026FamilyService~familyStatus'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', {})
        return None



    # ---------- 邀请相关 ----------
    def do_invite(self):
        """发送邀请初始化请求"""
        try:
            candidates = [item for item in self._load_route_pool() if item != self.user_id]
            if not candidates:
                return
            selected_user = random.choice(candidates)
            url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026IndexService~index"
            data = {"inviteType": 1, "inviteUserId": selected_user}
            self.http.request(url, data=data)
        except Exception:
            pass

    def get_invite_list(self) -> Optional[List[Dict]]:
        """查询已邀请好友列表"""
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2026TaskService~taskInviteList'
        resp = self.http.request(url, data={})
        if resp and resp.get('success'):
            return resp.get('obj', [])
        else:
            error_msg = resp.get('errorMessage', '未知错误') if resp else '请求失败'
            self.logger.warning(f"查询邀请列表失败: {error_msg}")
            return None

    def do_tasks(self, result: Dict) -> None:
        """执行所有可自动完成的任务"""
        tasks = self.get_task_list()
        if tasks is None:
            return

        self.logger.info(f'共发现 {len(tasks)} 个任务')

        for task in tasks:
            task_name = task.get('taskName', '未知')
            task_type = task.get('taskType', '')
            task_code = task.get('taskCode', '')
            status = task.get('status')
            process = task.get('process', '')
            rest_finish = task.get('restFinishTime', 0)
            virtual_token = task.get('virtualTokenNum', 0)

            # status=3 表示已完成且已领奖，status=1且restFinishTime=0表示已完成待领奖
            if status == 3 or (status == 1 and rest_finish <= 0):
                can_receive = task.get('canReceiveTokenNum', 0)
                if can_receive > 0:
                    self.logger.info(f'[{task_name}] 已完成，待领取 {can_receive} 次砸粽子机会')
                else:
                    self.logger.success(f'[{task_name}] 已完成 ({process})')
                continue

            if task_type in SKIP_TASK_TYPES:
                self.logger.info(f'[{task_name}] 需要实际操作，跳过')
                continue

            # 积分兑换特殊处理
            if task_type == 'INTEGRAL_EXCHANGE':
                self.logger.task(f'[{task_name}] 尝试用积分兑换砸粽子次数...')
                if self.exchange_points_for_crush():
                    self.logger.success(f'[{task_name}] 积分兑换成功')
                    result['tasks_completed'] += 1
                continue

            # ========== 领取寄件会员权益特殊处理 ==========
            if task_type == 'RECEIVE_VIP_BENEFIT':
                self.logger.task(f'[{task_name}] 尝试专用接口领取...')
                if self.receive_vip_benefit():
                    result['tasks_completed'] += 1
                continue
            # =================================================

            # 有taskCode的任务尝试自动完成（通用接口）
            if task_code:
                self.logger.task(f'[{task_name}] 尝试完成任务 (taskCode: {task_code})')
                if self.finish_task(task_code):
                    self.logger.success(f'[{task_name}] 完成成功，可获得 {virtual_token} 次砸粽子机会')
                    result['tasks_completed'] += 1
                else:
                    self.logger.warning(f'[{task_name}] 完成失败')
                time.sleep(1)
            else:
                self.logger.info(f'[{task_name}] 无taskCode，跳过 ({task_type})')

    def do_fetch_rewards(self, result: Dict) -> None:
        """查看累计任务奖励进度"""
        self.logger.info('查看累计任务奖励进度...')
        time.sleep(1)
        award = self.get_accrued_task_award()
        if award:
            progress = award.get('currentProgress', 0)
            config = award.get('progressConfig', {})
            if config:
                milestones = ', '.join([f'{k}个任务得{v}次砸粽机会' for k, v in sorted(config.items(), key=lambda x: int(x[0]))])
                self.logger.info(f'累计完成任务数: {progress} (里程碑: {milestones})')
            else:
                self.logger.info(f'累计完成任务数: {progress}')

    def do_daily_gift(self, result: Dict) -> None:
        """查看每日礼包状态"""
        self.logger.info('查看每日礼包...')
        time.sleep(1)
        gift = self.get_daily_gift_status()
        if gift:
            if gift.get('received'):
                products = gift.get('dailyGiftProductList', [])
                if products:
                    names = ', '.join([p.get('productName', '未知') for p in products])
                    self.logger.success(f'今日礼包已领取: {names}')
                else:
                    self.logger.success('今日礼包已领取')
            elif gift.get('canReceive'):
                self.logger.info('每日礼包待领取（可能需手动领取）')
            else:
                self.logger.info('每日礼包暂不可领取')
        else:
            self.logger.warning('获取每日礼包状态失败')

    def do_extra_rewards(self, result: Dict) -> None:
        """查询额外奖励卡片（倒计时等）"""
        cards = self.query_extra_reward_cards()
        if cards:
            for card in cards:
                extra_type = card.get('extraType', '')
                latest_time = card.get('latestTime', '')
                countdown = card.get('countdownHours', 0)
                type_map = {'DAILY': '每日奖励', 'BUSINESS_COUPON': '商业券'}
                type_name = type_map.get(extra_type, extra_type)
                self.logger.info(f'额外奖励 [{type_name}]: 上次领取 {latest_time}, 倒计时 {countdown}h')

    def do_crush_zongzi(self, result: Dict) -> None:
        """砸粽子直到没有粽子"""
        # 先查看当前状态
        zongzi_status = self.query_zongzi_status()
        if zongzi_status:
            accounts = zongzi_status.get('currentAccountList', [])
            gold_coin_balance = 0
            zongzi_balance = 0
            for acc in accounts:
                if acc.get('currency') == 'GOLD_COIN':
                    gold_coin_balance = acc.get('balance', 0)
                elif acc.get('currency') == 'GOLD_ZONGZI':
                    zongzi_balance = acc.get('balance', 0)
            total_crush = zongzi_status.get('totalCrushTimes', 0)

            self.logger.info(f'当前金币: {gold_coin_balance}, 金粽子: {zongzi_balance}, 已砸次数: {total_crush}')

            if zongzi_balance <= 0:
                self.logger.info('无金粽子可砸，跳过')
                return

        # 开始砸粽子
        self.logger.info('开始砸粽子...')
        crush_count = 0
        max_crush = 30

        while crush_count < max_crush:
            time.sleep(1)
            crush_result = self.crush_zongzi()
            if crush_result is None:
                # 检查是否没粽子了
                current_status = self.query_zongzi_status()
                if current_status:
                    for acc in current_status.get('currentAccountList', []):
                        if acc.get('currency') == 'GOLD_ZONGZI':
                            if acc.get('balance', 0) <= 0:
                                self.logger.info('金粽子已用完')
                            break
                break

            received = crush_result.get('receivedAccountList', [])
            current_accounts = crush_result.get('currentAccountList', [])

            if received:
                for item in received:
                    currency = item.get('currency', '未知')
                    amount = item.get('amount', 0)
                    self.logger.medal(f'砸粽子获得: {currency} x{amount}')
                    result['crush_detail'].append({'type': currency, 'amount': amount})
                    result['gold_coin_earned'] += amount
                crush_count += 1
            else:
                self.logger.info('没有获得奖励')
                break

            # 检查剩余粽子
            zongzi_balance = 0
            gold_coin_balance = 0
            for acc in current_accounts:
                if acc.get('currency') == 'GOLD_ZONGZI':
                    zongzi_balance = acc.get('balance', 0)
                elif acc.get('currency') == 'GOLD_COIN':
                    gold_coin_balance = acc.get('balance', 0)

            result['gold_coin_balance'] = gold_coin_balance
            self.logger.info(f'剩余粽子: {zongzi_balance}, 金币: {gold_coin_balance}')

            if zongzi_balance <= 0:
                break

        self.logger.info(f'砸粽子完成，本次共获得 {result["gold_coin_earned"]} 金币')



    def run(self) -> Dict[str, Any]:
        """执行端午龙舟活动全流程"""
        result = {
            'tasks_completed': 0,
            'gold_coin_earned': 0,
            'crush_detail': [],
            'gold_coin_balance': 0,
        }

        self.do_invite()
        # 0. 获取活动首页信息
        index_info = self.get_activity_index()
        if index_info:
            self.logger.info(f'活动时间: {index_info.get("acStartTime", "")} ~ {index_info.get("acEndTime", "")}')
            self.logger.info(f'历史寄件数: {index_info.get("sendNum", 0)}，累计支付: {index_info.get("payAmount", 0)}元')

        # 1. 每日礼包
        self.do_daily_gift(result)
        # 2. 额外奖励
        self.do_extra_rewards(result)
        # 3. 执行任务
        self.do_tasks(result)
        # 4. 查看累计奖励进度
        self.do_fetch_rewards(result)
        # 5. 砸粽子
        self.do_crush_zongzi(result)
        return result


# ==================== 账号执行 ====================
def run_account(account_url: str, index: int) -> Dict[str, Any]:
    """执行单个账号"""
    logger = Logger()
    proxy_url = os.getenv('SF_PROXY_API_URL', '')
    proxy_manager = ProxyManager(proxy_url)

    # 登录
    http = SFHttpClient(proxy_manager)
    retry_count = 0
    login_success = False
    phone = ''
    user_id = ''

    while retry_count < MAX_PROXY_RETRIES and not login_success:
        try:
            if retry_count > 0:
                http = SFHttpClient(proxy_manager)
            success, user_id, phone = http.login(account_url)
            if success:
                login_success = True
                break
        except Exception as e:
            pass
        retry_count += 1
        if retry_count < MAX_PROXY_RETRIES:
            time.sleep(2)

    if not login_success:
        logger.error(f'账号{index + 1} 登录失败')
        return {'success': False, 'phone': '', 'index': index,
                'tasks_completed': 0, 'gold_coin_earned': 0, 'crush_detail': [], 'gold_coin_balance': 0}

    masked_phone = phone[:3] + "****" + phone[7:] if len(phone) >= 7 else phone
    logger.success(f'账号{index + 1}: 【{phone}】登录成功')

    # 随机延迟
    time.sleep(random.uniform(1, 3))

    executor = DragonBoatExecutor(http, logger, user_id)
    activity_result = executor.run()

    return {
        'success': True,
        'phone': phone,
        'index': index,
        **activity_result,
    }


# ==================== 主程序 ====================
def main():
    env_name = 'sfsyUrl'
    env_value = os.getenv(env_name)
    if not env_value:
        print(f"❌ 未找到环境变量 {env_name}，请检查配置")
        return

    account_urls = [url.strip() for url in re.split(r'[&\n]+', env_value) if url.strip()]
    if not account_urls:
        print(f"❌ 环境变量 {env_name} 为空或格式错误")
        return

    print(f"📱 共获取到 {len(account_urls)} 个账号")
    all_results = []

    if CONCURRENT_NUM <= 1:
        for idx, url in enumerate(account_urls):
            result = run_account(url, idx)
            all_results.append(result)
            if idx < len(account_urls) - 1:
                print("-" * 60)
                time.sleep(2)
    else:
        with ThreadPoolExecutor(max_workers=CONCURRENT_NUM) as pool:
            futures = {pool.submit(run_account, url, idx): idx for idx, url in enumerate(account_urls)}
            for future in as_completed(futures):
                all_results.append(future.result())

    all_results.sort(key=lambda x: x['index'])


if __name__ == '__main__':
    main()
