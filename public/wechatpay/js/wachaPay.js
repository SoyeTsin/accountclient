//商户配置
var newDate = new Date();
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxd0abd7f5ba498cf6', // 必填，公众号的唯一标识
    timestamp: newDate.getTime() / 1000, // 必填，生成签名的时间戳
    nonceStr: '123456', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
//获取票据
!function get_access_token() {
    //  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "/payService/get_access_token", true);
    oReq.onload = function (oEvent) {
        if (oReq.readyState == 4 && oReq.status == 200) {
            if (!oReq) {
                alert("网络连接失败", 1);
                return false
            }
            var strList = oReq.responseText.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            if (jsonObj.code == 0) {
                alert(JSON.stringify(jsonObj))
            } else {
                console.log("查询失败")
            }
        } else {
            alert('网络异常')
        }
    };
    oReq.send()
}()
//验证表单
//选豆
!function () {
    var listLi = document.getElementById("list").getElementsByTagName("li");
    var yuan = document.getElementById("yuan");
    var dou = document.getElementById("dou");
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

//onBridgeReady();
//function onBridgeReady() {
//    WeixinJSBridge.invoke(
//        'getBrandWCPayRequest', {
//            "appId" ： "wx2421b1c4370ec43b",     //公众号名称，由商户传入
//        "timeStamp"：" 1395712654",         //时间戳，自1970年以来的秒数
//        "nonceStr" ： "e61463f8efa94090b1f366cccfbbb444", //随机串
//        "package" ： "prepay_id=u802345jgfjsdfgsdg888",
//        "signType" ： "MD5",         //微信签名方式：
//        "paySign" ： "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
//},
//    function (res) {
//        if (res.err_msg == "get_brand_wcpay_request：ok") {
//        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//    }
//
//);
//}
//if (typeof WeixinJSBridge == "undefined") {
//    if (document.addEventListener) {
//        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//    } else if (document.attachEvent) {
//        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//    }
//} else {
//    onBridgeReady();
//}
