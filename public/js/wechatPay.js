var listLi = document.getElementById("list").getElementsByTagName("li");
var yuan = document.getElementById("yuan");
var dou = document.getElementById("dou");
var nick_name = "";
var uuid = document.getElementById("uuid").value;
var moblie = document.getElementById("mobile").value;
var code = GetQueryString("code");
console.log(code)

//商户配置
var newDate = new Date();

//获取票据
if (!code) {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd0abd7f5ba498cf6&redirect_uri=http://pay.show.baofeng.com/wechatpay.html&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
} else {
    //获取票据
    !function get_access_token() {
        //  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        var oReq = new XMLHttpRequest();
        var code = GetQueryString("code");
        oReq.open("POST", "/mainService/get_pay_openid?code=" + code, true);
        oReq.onload = function (oEvent) {
            console.log(JSON.stringify(oReq))
            if (oReq.readyState == 4 && oReq.status == 200) {
                if (!oReq) {
                    alert("网络连接失败", 1);
                    return false
                }
                var strList = oReq.responseText.split('\n ');
                var str = strList.join('');
                var jsonObj = eval('(' + str + ')');
                if (jsonObj.code == 0) {
                    userInfo = jsonObj.userinfo;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wxd0abd7f5ba498cf6', // 必填，公众号的唯一标识
                        timestamp: jsonObj.timestamp, // 必填，生成签名的时间戳
                        nonceStr: jsonObj.randomString, // 必填，生成签名的随机串
                        signature: jsonObj.autograph,// 必填，签名，见附录1
                        jsApiList: ['checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.ready(function () {

                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

                        wx.onMenuShareAppMessage({
                            title: '风秀公众号支付', // 分享标题
                            desc: '风秀公众号支付，尽享便捷支付新体验', // 分享描述
                            link: 'http://pay.show.baofeng.com/wechatpay.html', // 分享链接
                            imgUrl: 'http://picture.show.baofeng.com/web/loginLogo.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: '风秀公众号支付', // 分享标题
                            link: 'http://pay.show.baofeng.com/wechatpay.html', // 分享链接
                            imgUrl: 'http://picture.show.baofeng.com/web/loginLogo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareQQ({
                            title: '风秀公众号支付', // 分享标题
                            desc: '风秀公众号支付，尽享便捷支付新体验', // 分享描述
                            link: 'http://pay.show.baofeng.com/wechatpay.html', // 分享链接
                            imgUrl: 'http://picture.show.baofeng.com/web/loginLogo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareQZone({
                            title: '风秀公众号支付', // 分享标题
                            desc: '风秀公众号支付，尽享便捷支付新体验', // 分享描述
                            link: 'http://pay.show.baofeng.com/wechatpay.html', // 分享链接
                            imgUrl: 'http://picture.show.baofeng.com/web/loginLogo.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                } else {
                    console.log("查询失败")
                }
            } else {
                alert('网络异常')
            }
        };
        oReq.send()
    }();
}

//验证表单
//选豆
!function () {
    for (var i = 0; i < listLi.length; i++) {
        listLi[i].i = i;
        listLi[i].onclick = function () {
            for (i = 0; i < listLi.length; i++) {
                listLi[i].className = listLi[i].className.replace(/\s?active/, "");
            }
            this.className += "active";

            switch (parseInt(this.i)) {
                case 0:
                    yuan.innerHTML = 10;
                    break;
                case 1:
                    yuan.innerHTML = 30;
                    break;
                case 2:
                    yuan.innerHTML = 50;
                    break;
                case 3:
                    yuan.innerHTML = 100;
                    break;
                case 4:
                    yuan.innerHTML = 200;
                    break;
                case 5:
                    yuan.innerHTML = 300;
                    break;
                case 6:
                    yuan.innerHTML = 0;
                    break;
            }
            dou.innerHTML = yuan.innerHTML * 10;
        }
    }
}()
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
function phoneCheck(cb) {
    ajaxPost("/payService/phoneCheck", {phone: moblie}, function (result) {
        if (result.code == 0) {
            nick_name = result.nickName;
            uuid = result.uuid;
            if (result.uuid == '') {
                alert('账号未注册或激活');
            }
            cb();
        } else if (result.code == 2) {
            alert('艺人账号无法充值。');
        } else {
            alert('账号未注册或激活。');
        }
    })
}
function uuidCheck(cb) {
    ajaxPost("/payService/uuidCheck", {uuid: uuid}, function (result) {
        if (result.code == 0) {
            nick_name = result.user.nickName;
            uuid = result.user.uuid;
            cb();
            if (result.user.uuid == '' || result.user.uuid == null) {
                alert('账号未注册或激活');
            }
        } else if (result.code == 2) {
            alert('艺人账号无法充值。');
        } else {
            alert('账号未注册或激活。');
        }
    })
}
function submitFun() {
    uuid = document.getElementById("uuid").value;
    moblie = document.getElementById("mobile").value;
    if (moblie) {
        if (moblie.length != 11) {
            alert("请填写正确的手机号码")
        }
        phoneCheck(function () {
            sub();
        })
    } else {
        if (!uuid) {
            alert("请填写手机号码或风秀ID")
            return;
        }
        uuidCheck(function () {
            sub();
        })
    }
    function sub() {
        var data = {total_fee: document.getElementById("yuan").innerHTML, uuid: uuid};
        ajaxPost("/payService/getData", {data: data}, function (result) {
            if (result.code == 0) {
                if (result.data.result == 10) {
                    alert('签名错误!')
                } else if (result.data.result == 11) {
                    alert('参数错误!')
                } else if (result.data.result == 12) {
                    alert('账号没找到!')
                } else if (result.data.result == 13) {
                    alert('调用后台接口失败!')
                } else if (result.data.result == 15) {
                    alert('主键重复!')
                } else if (result.data.result == 16) {
                    alert('请求频繁!')
                } else if (result.data.result == 17) {
                    alert('审核错误!')
                } else if (result.data.result == 0) {
                    var order = result.data.order;
                    if (result.data.order.OrderID == '') {
                        alert("订单创建失败,请重新下单。")
                    } else {
                        ajaxPost("/payService/getWebPayOrder", {
                                data: {
                                    order_id: result.data.order.OrderID,
                                    money: document.getElementById("yuan").innerHTML,
                                    nick_name: nick_name,
                                    openid: userInfo.openid
                                }
                            },
                            function (result) {
                                if (result.code == 0) {
                                    if (result.data.Result == 0) {

                                        function onBridgeReady() {
                                            WeixinJSBridge.invoke(
                                                'getBrandWCPayRequest', {
                                                    "appId": "wxd0abd7f5ba498cf6",     //公众号名称，由商户传入
                                                    "timeStamp": result.data.Timestamp,         //时间戳，自1970年以来的秒数
                                                    "nonceStr": result.data.Noncestr, //随机串
                                                    "package": "prepay_id=" + result.data.Prepayid,
                                                    "signType": "MD5",         //微信签名方式：
                                                    "paySign": result.data.Sign //微信签名
                                                },
                                                function (res) {
                                                    alert("HH:" + JSON.stringify(res));
                                                    if (res.err_msg == "get_brand_wcpay_request：ok") {
                                                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                }
                                            );
                                        }

                                        alert((typeof WeixinJSBridge == "undefined"))
                                        if (typeof WeixinJSBridge == "undefined") {
                                            if (document.addEventListener) {
                                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                            } else if (document.attachEvent) {
                                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                            }
                                        } else {
                                            onBridgeReady();
                                        }
                                    }
                                } else {
                                    alert('获取微信二维码失败')
                                }
                            }
                        )
                    }
                } else {
                    alert('服务器返回未知错误!')
                }
            } else {
                klklkl = 0;
                alert("订单创建失败,请重新下单。")
            }
        })
    }
}
function getSigid(data, cb) {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/mainService/pay_autograph?data=" + data, true);
    oReq.onload = function (oEvent) {
        console.log(JSON.stringify(oReq))
        if (oReq.readyState == 4 && oReq.status == 200) {
            if (!oReq) {
                alert("网络连接失败", 1);
                return false
            }
            var strList = oReq.responseText.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            if (jsonObj.code == 0) {
                cb(jsonObj);
            }
        }
    }
    oReq.send()
}
/**
 * Ajax POST访问
 * @param url 需要访问的地址
 * @param data 需要传递的参数，json格式
 * @param cb 访问成功后的回调函数
 */
function ajaxPost(url, data, cb) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: "json",
        success: function (result) {
            cb(result);
        }, error: function (err) {
            if (err.status == '401') {

            } else if (err.status == '500') {
            }
        }
    });
}
