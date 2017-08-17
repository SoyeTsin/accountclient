/**
 * Created by Linyi on 2015/10/14 0014.
 */
var _mainModel = createModel('main', function (modelName) {
    return avalon.define(modelName, function (vm) {
            var LOGIN = 'L';
            var MAIN = 'M';
            var CONTENT = 'C';
            vm.loginState = 0;
            vm.screen = null;
            vm.roomScreen = null;
            vm.uuid = "";
            vm.bfuid = "";
            vm.nickName = "";
            vm.user = {
                userName: "",
                password: ""
            };
            vm.userList = {
                userName: "",
                password: ""
            };
            vm.sociaty = {};
            vm.openCon = function (el) {
                vm.sociaty = el.$model;
            }
            vm.openIncomeInputScreen = function (el) {
                vm.loginState = 2;
                vm.sociaty = el.$model;
                vm.openScreen("incomeInput.html");
            }
            vm.yyy = 0;
            vm.openPayScreen = function () {
                vm.loginState = 2;
                vm.openScreen("pay.html");
                if (vm.yyy != 0) {
                    payModel.payPopUpState = 0;
                }
                vm.yyy = 1;
            }
            vm.openRoomStateScreen = function () {
                vm.openScreen("roomState.html");
            }
            vm.openRoomDynamicScreen = function () {
                vm.openScreen("roomDynamic.html");
            }
            vm.openArtistGearScreen = function () {
                vm.openScreen("artistGear.html");
            }
            vm.initIndex = function () {
                vm.loginState = 1;
            }
            vm.openSociatyPage = 0;
            vm.openSociaty = function (e) {
                vm.openSociatyPage = e;
            }
            vm.openScreen = function (screen) {
                if (screen == LOGIN || screen == MAIN) {
                    vm.state = screen;
                    vm.screen = null;
                    vm.setHelpScreen("main.html");
                } else {
                    vm.state = CONTENT;
                    vm.screen = screen;
                }
            }
            vm.keyLogin = function (e) {
                if (e.keyCode == 13) {
                    vm.login();
                }
            }
            vm.errMsg = '';
            vm.setErrMsg = function (msg) {
                //var oldTime = (new Date("1970/1/1 00:00:00")).getTime();
                vm.errMsg = msg;
            }
            //-28800000

            vm.login = function () {
                vm.errMsg = '';
                ajaxPost("/login", {
                    username: vm.uuid,
                    password: vm.bfuid
                }, function (result) {
                    if (result.code == -1) {
                        vm.setErrMsg("账号服务器发生未知错误，请稍后重试。");
                        vm.loginState = '0';

                    } else if (result.code == 2) {
                        vm.setErrMsg("账号不存在");
                        vm.loginState = '0';

                    } else if (result.code == 3) {
                        vm.setErrMsg("密码错误");
                        vm.loginState = '0';

                    } else if (result.code == 4) {
                        vm.setErrMsg("账号未激活，请下载风秀客户端登陆激活");
                        vm.loginState = '0';

                    } else if (result.code == -3) {
                        vm.setErrMsg("没有权限");
                        vm.loginState = '0';

                    } else if (result.code == -101) {
                        vm.setErrMsg("账号服务器连接失败,请稍后重试。");
                        vm.loginState = '0';

                    } else if (result.code == null) {
                        vm.setErrMsg("登陆状态异常！");
                        vm.loginState = '0';

                    } else {
                        setCookie("LIVE_USERNAME", result.user.userName);
                        //alert('登陆成功');
                        vm.uuid = result.user.uuid;
                        vm.openScreen();
                        vm.loginState = 1;
                        vm.getUser();
                        vm.getTotal();
                        vm.getBalance();
                        if (vm.userType == 2) {
                            vm.openPayScreen()
                        }
                        if (vm.GetQueryString("type") == '2') {
                            vm.openPayScreen()
                        }
                    }
                });
            }
            vm.GetQueryString = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)return unescape(r[2]);
                return null;
            }
            vm.uuid = '';
            vm.sociatyList = [];
            vm.nick_name = '';
            vm.getUser = function () {
                ajaxPost("/mainService/getUser", {uuid: vm.uuid}, function (result) {
                    if (result.code == 0) {
                        //vm.uuid = result.user.uuid;
                        vm.nick_name = result.user.nick_name;
                        //vm.initPagination(vm.roomWhiteList.length);
                    } else {
                        swal("查询失败！", "", "error");
                    }
                });
            }
            vm.outLog = function () {
                vm.loginState = 0;
            }
            vm.getParam = function (name) {
                var search = document.location.search;
                var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
                var matcher = pattern.exec(search);
                var items = null;
                if (null != matcher) {
                    try {
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                    } catch (e) {
                        try {
                            items = decodeURIComponent(matcher[1]);
                        } catch (e) {
                            items = matcher[1];
                        }
                    }
                }
                return items;
            };
            vm.initState = 0;
            vm.userType = 1;
            vm.urlLogin = function () {
                //var base64 = new Base64();
                //var data = {userName: '18778990898', password: '', type: 1}
                //var str1 = base64.encode(JSON.stringify(data));
                //var str2 = base64.encode(str1);
                //console.log(str2)
                var token = vm.getParam('token');
                if (vm.GetQueryString("token")) {
                    ajaxPost("/mainService/getUserLogin", {data: token}, function (result) {
                        if (result.code == 0) {
                            vm.userList.userName = result.userName;
                            vm.userList.password = result.password;
                            vm.userType = result.type;
                            vm.login();
                        } else {
                            //alert("查询失败！", "", "error");
                        }
                    });
                } else {
                    var userName = getCookie('LIVE_USERNAME')
                    vm.userList.userName = userName;
                }
            }
            //--------业务逻辑------------
            //秀豆余额
            vm.money_value = 0;
            vm.getBalance = function () {
                ajaxPost("/mainService/getBalance", {uuid: vm.uuid}, function (result) {
                    if (result.code == 0) {
                        vm.money_value = result.money_value;
                    } else {
                        //swal("查询失败！", "", "error");
                    }
                });
            }
            //查询周期
            vm.time = {
                startTime: '',
                endTime: ''
            }
            //查询收入支出列表
            vm.total = {
                recharge: 0,
                pay: 0
            }
            vm.totalList_subentry = [];
            vm.totalList = [];
            vm.totalListClone = [];
            vm.getTotal = function () {
                vm.money_value = 0;
                vm.totalListClone = [];
                vm.total = {
                    recharge: 0,
                    pay: 0
                }
                ajaxPost("/mainService/getTotalList", {
                    data: {
                        uuid: vm.uuid,
                        startDate: vm.time.startTime,
                        endDate: vm.time.endTime
                    }
                }, function (result) {
                    if (result.code == 0) {
                        vm.totalList_subentry = [];
                        vm.totalList = [];
                        vm.totalListClone = [];
                        vm.totalList = result.list;
                        vm.totalList_subentry = result.list;
                        vm.initPagination(vm.totalList.length);
                        vm.time.startTime = result.startDate;
                        vm.time.endTime = result.endDate;
                        vm.total.pay = 0;
                        for (var i in result.list) {
                            vm.total.pay = vm.total.pay + parseInt(result.list[i].pay);
                        }
                        vm.total.pay = vm.total.pay * -1;
                        //vm.total.recharge = vm.total.pay + vm.money_value;
                        vm.getRechargeList();
                        vm.nullFun();
                    } else {
                        //swal("查询失败！", "", "error");
                    }
                });
            }

            //查询充值记录
            vm.rechargeList = [];
            vm.getRechargeList = function () {
                var sum = 0;
                for (var i = 0; i < vm.totalList_subentry.$model.length; i++) {
                    if (vm.totalList_subentry.$model[i].type == '1') {
                        var str = vm.totalList_subentry.$model[i].recharge;
                        var mun = str.substring(1, vm.totalList_subentry.$model[i].recharge.length)
                        sum = sum + parseInt(mun);
                    }
                }
                vm.total.recharge = sum;
            }
            vm.subentry = function (e) {
                vm.totalList = [];
                if (e == 0) {
                    vm.totalList = vm.totalList_subentry;
                    vm.initPagination(vm.totalList.length);
                } else if (e == 1) {
                    vm.totalList = [];
                    for (var i in vm.totalList_subentry.$model) {
                        if (vm.totalList_subentry.$model[i].type == '') {
                            vm.totalList.push(vm.totalList_subentry.$model[i]);
                        }
                    }
                    vm.initPagination(vm.totalList.length);
                } else if (e == 2) {
                    vm.totalList = [];
                    for (var i in vm.totalList_subentry.$model) {
                        if (vm.totalList_subentry.$model[i].type != '') {
                            vm.totalList.push(vm.totalList_subentry.$model[i]);
                        }
                    }
                    vm.initPagination(vm.totalList.length);
                }
                vm.nullFun();
            }
            /**
             * 假分页
             */
            vm.countNum = 50;//总条数
            vm.pageTotal = 5;//总页数
            vm.pageNow = 1;//当前页
            vm.listLast = [];
            vm.initPagination = function (c) {//分页功能初始化
                vm.totalListClone = [];
                vm.countNum = c;//总条数
                vm.pageTotal = (c - c % 10) / 10;//总页数
                if (c % 10 != 0) {
                    vm.pageTotal = vm.pageTotal + 1;
                }
                vm.pageNow = 1;//当前页
                if (c <= 10) {
                    for (var i = 0; i < c; i++) {
                        vm.totalListClone.push(vm.totalList[i]);
                    }
                } else if (c > 10) {
                    for (var i = 0; i < 10; i++) {
                        vm.totalListClone.push(vm.totalList[i]);
                    }
                }
            }
            vm.payViewStates = 0;
            vm.dingdanObj = {};
            vm.viewT = function (el) {
                vm.dingdanObj = el.$model;
                vm.payViewStates = vm.payViewStates == 0 ? 1 : 0;
            }
            vm.viewC = function () {
                vm.payViewStates = vm.payViewStates == 0 ? 1 : 0;
            }
            vm.setRecharge = function () {
                vm.continueRecharge(vm.dingdanObj)
            }
            vm.weixinView = 0;
            vm.weixinState = 0;
            vm.setDefaultbank = function (bank) {
                vm.weixinView = 0;
                vm.weixinState = 0;
                if (bank == 'weixin') {
                    vm.weixinView = 1;
                    vm.weixinState = 1;
                } else {
                    vm.fromObj.defaultbank = bank;
                }
            }
            vm.nullList = {
                orderId: '',
                uuid: '',
                recharge: '',
                pay: '',
                remarks: '',
                type: ''
            }
            vm.nullFun = function () {
                if (vm.totalListClone.$model.length % 10 != 0 || vm.totalListClone.$model.length == 0) {
                    var mun = 10 - vm.totalListClone.$model.length;
                    for (var i = 0; i < mun; i++) {
                        vm.totalListClone.push(vm.nullList)
                    }
                }
            }
            vm.clickPage = function (e) {
                switch (parseInt(e)) {//parseInt(e)：e转化为int类型
                    case 0://首页
                        vm.initPagination(vm.totalList.length);
                        vm.pageNow = 1;
                        break;
                    case 1://上一页
                        if (vm.pageNow > 1) {
                            vm.pageNow = vm.pageNow - 1;
                            vm.totalListClone = [];
                            for (var i = (vm.pageNow - 1) * 10; i < ((vm.pageNow - 1) * 10) + 10; i++) {
                                if (vm.totalList[i]) {
                                    vm.totalListClone.push(vm.totalList[i]);
                                }
                            }
                        }
                        break;
                    case 2://下一页
                        if (vm.pageNow < vm.pageTotal) {
                            vm.totalListClone = [];
                            vm.pageNow = vm.pageNow + 1;
                            var a = 0;
                            for (var i = (vm.pageNow - 1) * 10; i < ((vm.pageNow - 1) * 10) + 10; i++) {
                                if (vm.totalList[i]) {
                                    vm.totalListClone.push(vm.totalList[i]);
                                }
                            }
                        }
                        vm.nullFun();
                        break;
                    case 3://尾页
                        vm.pageNow = vm.pageTotal;
                        vm.totalListClone = [];
                        for (var i = (vm.countNum - vm.countNum % 10); i < vm.countNum; i++) {
                            if (vm.totalList[i]) {
                                vm.totalListClone.push(vm.totalList[i]);
                            }
                        }
                        if (vm.countNum % 10 == 0) {
                            for (var i = (vm.countNum - 10); i < vm.countNum; i++) {
                                if (vm.totalList[i]) {
                                    vm.totalListClone.push(vm.totalList[i]);
                                }
                            }
                        }
                        vm.nullFun();
                        break;
                }
            }
            vm.skip = '';//页面跳转的页数
            vm.skipPage = function () {//页面跳转方法
                if (vm.skip <= vm.pageTotal) {
                    var a = 0;
                    if (vm.skip != '') {
                        a = parseInt(vm.skip);
                    }
                    if (a > 0 && a <= vm.pageTotal) {
                        vm.totalListClone = [];
                        for (var i = ( a - 1) * 10; i < ((a - 1) * 10) + 10; i++) {
                            if (vm.totalList[i]) {
                                vm.totalListClone.push(vm.totalList[i]);
                            }
                        }
                    }
                    vm.nullFun();
                    vm.pageNow = vm.skip;//当前页
                } else {
                    swal("你想跳太阳去吗？？？", "", "error");
                }
            }
            /**
             * 分页结束
             */
                //继续支付
            vm.fromObj = {
                order_id: '',
                money: '',
                nick_name: '',
                subject: '',
                defaultbank: ''
            }
            vm.weixinView = 0;
            vm.weixinState = 0;
            vm.continueRecharge = function (el) {
                var myWindow = new ForceWindow();
                var money = el.recharge.substring(1, el.recharge.length);
                var orderId = el.orderId.substring(2, el.orderId.length);
                vm.fromObj.order_id = orderId;
                vm.fromObj.money = money / 10;
                vm.fromObj.nick_name = vm.nick_name;
                vm.fromObj.subject = '继续支付-购买风秀科技的秀豆' + money * 10 + '个';
                //myWindow.open("http://pay.show.baofeng.com/order/alipay/pay?order_id=" + orderId + "&money=" + (money / 10) + "&nick_name=" + vm.nick_name + "&subject=" + '继续支付-购买风秀科技的秀豆' + money + '个');
                //window.open("http://pay.show.baofeng.com/order/alipay/pay?order_id=" + orderId + "&money=" + (money / 10) + "&nick_name=" + vm.nick_name + "&subject=" + '继续支付-购买风秀科技的秀豆' + money + '个')
                if (vm.weixinState == 1) {
                    ajaxPost("/payService/getQRCode", {
                        data: {
                            order_id: vm.fromObj.order_id,
                            money: vm.fromObj.money,
                            nick_name: vm.fromObj.nick_name
                        }
                    }, function (result) {
                        if (result.code == 0) {
                            if (result.data.Result == 0) {
                                var weixinURL = result.data.CodeUrl;
                                $('#weixinUrl').parent().html("<div id='weixinUrl'></div>");
                                var qrcode = new QRCode("weixinUrl", {
                                    text: weixinURL,
                                    width: 200,
                                    height: 200,
                                    colorDark: "#000",
                                    colorLight: "#ffffff",
                                    correctLevel: QRCode.CorrectLevel.Q
                                });
                                vm.weixinView = 2;
                                vm.chaxunzhifu();
                            }
                        } else {
                            alert('获取微信二维码失败')
                        }
                    });
                } else {
                    document.getElementById('orderForm').submit();
                }
            }
            vm.zhifuchenggong = 2;
            vm.chaxunzhifu = function () {
                var i = 0;
                var inter = setInterval(function () {
                    i++;
                    if (i >= 200) {
                        clearInterval(inter);
                        vm.daojishiFF();
                        vm.zhifuchenggong = 1;
                    }
                    ajaxPost("/payService/getQRCode", {
                        data: {
                            order_id: vm.fromObj.order_id,
                            money: vm.fromObj.money,
                            nick_name: vm.fromObj.nick_name
                        }
                    }, function (result) {
                        if (result.code == 0) {
                            if (result.data.Result == 1) {
                                vm.zhifuchenggong = 0;
                                vm.daojishiFF();
                                clearInterval(inter);
                            }
                        } else {
                            alert('获取微信二维码失败')
                        }
                    });
                }, 2000);//
            }
            vm.daojishi = 5;
            vm.daojishiFF = function () {
                var inter = setInterval(function () {
                    vm.daojishi = vm.daojishi - 1;
                    if (vm.daojishi <= 0) {
                        vm.zhifuchenggong = 2;
                        vm.weixinView = 1;
                        vm.weixinState = 1;
                        vm.payViewStates = 0;
                        vm.getTotal();
                        vm.getBalance();
                        clearInterval(inter);
                    }
                }, 1000);//
            }
            vm.escWeiXin = function () {
                vm.weixinView = 0;
            }
        /**
         * 注销
         */
        vm.outLogin = function () {
            vm.uuid = "";
            vm.nickName = "";
            vm.loginState = 0;
            window.location.href = 'http://sso.baofeng.net/api/server/logout?from=funshow_web&next_action=' + window.location.href;
        }
        /**
         * 登陆
         */
        vm.isLogin = function () {
            var bfcsid = getCookie('bfcsid');
            var st = getCookie('st');
            var bfuid = getCookie('bfuid');
            var data = {
                data: {
                    bfcsid: bfcsid, st: st, from: 'fengxiu_web', version: '1.0'
                }
            }
            ajaxPost("/mainService/islogin", data, function (result) {
                if (result.code == 0) {
                    if (result.jsonObj.status == 1) {
                        var bf_nick = result.jsonObj.info.username;
                        ajaxPost("/mainService/getUserObj_uuid_nick", {data: result.jsonObj}, function (result) {
                            if (result.code == 0) {
                                setCookie("LIVE_USERNAME", result.userObj.nickName);
                                setCookie("LIVE_UUID", result.userObj.uuid);
                                vm.user.uuid = result.userObj.uuid;
                                vm.user.nickName = result.userObj.nickName;
                                vm.uuid = result.userObj.uuid;
                                vm.nickName = result.userObj.nickName;
                                vm.bfuid = bfuid;
                                vm.login();
                            } else {
                                alert('您的暴风账号 ' + bf_nick + ' 还未在风秀激活，请登录风秀客户端激活');
                            }
                        });
                    } else {

                    }
                } else {
                }
            });
        }
            vm.init = function () {
                if (vm.initState == 0) {
                    vm.initState = 1;
                }
                //vm.urlLogin();
                vm.isLogin();
                //alert('临时升级维护，稍等几分钟');
            }
        }
    )
});

function ForceWindow() {
    this.r = document.documentElement;
    this.f = document.createElement("FORM");
    this.f.target = "_blank";
    this.f.method = "post";
    this.r.insertBefore(this.f, this.r.childNodes[0]);
}
ForceWindow.prototype.open = function (url) {
    this.f.action = url;
    this.f.submit();
}
window.force = new ForceWindow();
$(document).ready(function (e) {
    $(".continueMain .close").click(function () {
        $(".continueBg").css("display", "none");
    });
    $(".continueBut a").click(function () {
        $(".continueBut a").removeClass("active");
        $(this).addClass("active");
    });

});

$(document).ready(function () {
    var pullDown = $("#mainPullDown");
    var pullDownText = $(pullDown).find("span");
    pullDown.find("ul").hide();
    //pullDownText.text(pullDown.find("ul").find("li:first-child").text())
    pullDownText.click(function () {
        $(this).siblings("ul").slideToggle(100)
        $(this).siblings("ul").find("li").click(function () {
            //pullDownText.find("img")[0].src = $(this).find("img")[0].src;
            //pullDownText.find("h4").text($(this).find("h4").text())
            //pullDownText.find("p").text($(this).find("p").text())
            $(this).parents("ul").hide();
        })
    })
    $(".roomMemu > ul > li a").click(function () {
        $(".roomMemu > ul > li a").removeClass("active");
        $(this).addClass("active");
    })
    var indexMainH = $(document).height();
    $(".index").css("min-height", indexMainH - 290);
    //pay
    function active(active) {
        $(active).find("ul").find("li").find("a").click(function () {
            $(active).find("ul").find("li").find("a").removeClass("active");
            $(this).addClass("active");
        })
    }

    active(".pay");
    active(".payTabTit");
    active(".payTabList");

    $(".yhList").css("display", "none");
    function displayBN(aTit, blo, non) {
        $(aTit).click(function () {
            $(blo).css("display", "block");
            $(non).css("display", "none");
        })
    }

    displayBN(".zfbTabTit", ".zfbList", ".yhList");
    displayBN(".wyTabTit", ".yhList", ".zfbList");

    $(".close").click(function () {
        $(".paySuccess,.paySuccess2").css("display", "none");
    })

});