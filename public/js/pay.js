avalon.filters.filterOrderState = function (screen) {
    var screenName = "";
    if (screen == "0") {
        screenName = "失败"
    } else if (screen == "1") {
        screenName = "成功"
    }
    return screenName
};
var payModel = createModel('pay', function (modelName) {
    return avalon.define(modelName, function (vm) {
        vm.WIDout_trade_no = '';
        vm.WIDsubject = '';
        vm.WIDtotal_fee = '';
        vm.WIDbody = '';
        vm.WIDshow_url = '';
        vm.order = {OrderID: '', GoodsNum: '', Money: 0};
        vm.userName = '';
        vm.phoneCheckMsg = '';
        vm.uuid = '';
        vm.nick_name = '';
        vm.toggle = 1;
        vm.radioClick = function () {
            vm.nick_name = '';
            vm.phoneCheckMsg = '';
            vm.orderState = 1;
            if (vm.toggle == '0') {
                vm.radioUuid = ''
            } else {
                vm.userName = ''
            }
        };
        vm.radioCheck = function (e) {
            if (e == 0) {
                vm.toggle = 0
            } else if (e == 1) {
                vm.toggle = 1
            }
            if (vm.toggle == '0') {
                vm.radioUuid = '';
                vm.phoneCheck()
            } else if (vm.toggle == '1') {
                vm.userName = '';
                vm.uuidCheck()
            }
        };
        vm.phoneCheck = function () {
            vm.orderState = 1;
            if (vm.userName.length > 30) {
                vm.phoneCheckMsg = '请输入正确的账号';
                vm.orderState = 1;
                $('#recharge').css('background', '#ccc')
            } else {
                ajaxPost("/payService/phoneCheck", {phone: vm.userName}, function (result) {
                    if (result.code == 0) {
                        vm.phoneCheckMsg = '充值用户：';
                        vm.nick_name = result.nickName;
                        vm.uuid = result.uuid;
                        if (result.uuid == '') {
                            vm.phoneCheckMsg = '账号未注册或激活';
                            vm.orderState = 1;
                            $('#recharge').css('background', '#ccc')
                        } else {
                            vm.orderState = 0;
                            setCookie("LIVE_USERNAME", vm.userName);
                            $('#recharge').css('background', '#f35892')
                        }
                    } else if (result.code == 2) {
                        vm.orderState = 1;
                        $('#recharge').css('background', '#ccc');
                        vm.phoneCheckMsg = '艺人账号无法充值。'
                    } else {
                        vm.orderState = 1;
                        $('#recharge').css('background', '#ccc');
                        vm.phoneCheckMsg = '账号未注册或激活。'
                    }
                })
            }
        };
        vm.radioUuid = '';
        vm.uuidCheck = function () {
            vm.orderState = 1;
            if (vm.radioUuid.length != 9) {
                vm.phoneCheckMsg = '请输入正确的风秀ID';
                vm.orderState = 1;
                $('#recharge').css('background', '#ccc')
            } else {
                ajaxPost("/payService/uuidCheck", {uuid: vm.radioUuid}, function (result) {
                    if (result.code == 0) {
                        vm.user = result.user;
                        vm.phoneCheckMsg = '昵称：';
                        vm.nick_name = result.user.nick_name;
                        vm.uuid = result.user.uuid;
                        if (result.user.uuid == '' || result.user.uuid == null) {
                            vm.phoneCheckMsg = '账号未注册或激活';
                            vm.orderState = 1;
                            $('#recharge').css('background', '#ccc')
                        } else {
                            vm.orderState = 0;
                            setCookie("LIVE_USERNAME_UUID", vm.radioUuid);
                            $('#recharge').css('background', '#f35892')
                        }
                    } else if (result.code == 2) {
                        vm.orderState = 1;
                        $('#recharge').css('background', '#ccc');
                        vm.phoneCheckMsg = '艺人账号无法充值。'
                    } else {
                        vm.orderState = 1;
                        $('#recharge').css('background', '#ccc');
                        vm.phoneCheckMsg = "查无此用户！"
                    }
                })
            }
        };
        vm.lijizhifu = function () {
            if (vm.userName.length > 30) {
                vm.phoneCheckMsg = '请输入正确的账号';
                vm.orderState = 1;
                $('#recharge').css('background', '#ccc')
            } else {
                if (vm.toggle == '0') {
                    ajaxPost("/payService/phoneCheck", {phone: vm.userName}, function (result) {
                        if (result.code == 0) {
                            vm.phoneCheckMsg = '昵称：';
                            vm.nick_name = result.nickName;
                            vm.uuid = result.uuid;
                            if (result.uuid == '') {
                                vm.phoneCheckMsg = '账号未注册或激活';
                                vm.orderState = 1;
                                $('#recharge').css('background', '#ccc')
                            } else {
                                if (vm.weixinState == 1) {
                                    vm.submit()
                                } else {
                                    vm.orderState = 0;
                                    setCookie("LIVE_USERNAME", vm.userName);
                                    $('#recharge').css('background', '#f35892');
                                    $(".payConfirmBG").css("display", "block")
                                }
                            }
                        } else if (result.code == 2) {
                            vm.orderState = 1;
                            $('#recharge').css('background', '#ccc');
                            vm.phoneCheckMsg = '艺人账号无法充值。'
                        } else {
                            vm.orderState = 1;
                            $('#recharge').css('background', '#ccc');
                            vm.phoneCheckMsg = '账号未注册或激活。'
                        }
                    })
                } else if (vm.toggle == '1') {
                    vm.orderState = 1;
                    if (vm.radioUuid.length != 9) {
                        vm.phoneCheckMsg = '请输入正确的风秀ID';
                        vm.orderState = 1;
                        $('#recharge').css('background', '#ccc')
                    } else {
                        ajaxPost("/payService/uuidCheck", {uuid: vm.radioUuid}, function (result) {
                            if (result.code == 0) {
                                vm.user = result.user;
                                vm.phoneCheckMsg = '昵称：';
                                vm.nick_name = result.user.nick_name;
                                vm.uuid = result.user.uuid;
                                if (result.user.uuid == '' || result.user.uuid == null) {
                                    vm.phoneCheckMsg = '账号未注册或激活';
                                    vm.orderState = 1;
                                    $('#recharge').css('background', '#ccc')
                                } else {
                                    if (vm.weixinState == 1) {
                                        vm.orderState = 0;
                                        vm.submit()
                                    } else {
                                        vm.orderState = 0;
                                        setCookie("LIVE_USERNAME", vm.userName);
                                        $('#recharge').css('background', '#f35892');
                                        $(".payConfirmBG").css("display", "block")
                                    }
                                }
                            } else {
                                vm.orderState = 1;
                                $('#recharge').css('background', '#ccc');
                                vm.phoneCheckMsg = "查无此用户！"
                            }
                        })
                    }
                }
            }
        };
        vm.submit = function () {
            if (vm.orderState == 0) {
                vm.WIDtotal_fee = vm.zhangdan.jine;
                vm.WIDbody = '你的账号';
                var data = {total_fee: vm.WIDtotal_fee, uuid: vm.uuid};
                var klklkl = 0;
                if (klklkl == 0) {
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
                                vm.order = result.data.order;
                                if (result.data.order.OrderID == '') {
                                    alert("订单创建失败,请重新下单。")
                                } else {
                                    klklkl = 0;
                                    vm.setForm();
                                    if (vm.weixinState != 1) {
                                        vm.payPopUpState = 1
                                    }
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
        };
        var chaxunzhifuinter = '';
        vm.zhifuchenggong = 2;
        vm.chaxunzhifu = function () {
            var i = 0;
            chaxunzhifuinter = setInterval(function () {
                i++;
                if (i >= 200) {
                    clearInterval(inter);
                    vm.daojishiFF();
                    vm.zhifuchenggong = 1
                }
                ajaxPost("/payService/getQRCode", {data: {order_id: vm.order.OrderID, money: vm.order.Money, nick_name: vm.nick_name}}, function (result) {
                    if (result.code == 0) {
                        if (result.data.Result == 1) {
                            vm.zhifuchenggong = 0;
                            vm.daojishiFF();
                            clearInterval(inter)
                        }
                    } else {
                        alert('获取微信二维码失败')
                    }
                })
            }, 2000)
        };
        vm.daojishi = 5;
        vm.daojishiFF = function () {
            vm.daojishi = 5;
            var inter = setInterval(function () {
                vm.daojishi = vm.daojishi - 1;
                if (vm.daojishi <= 0) {
                    vm.zhifuchenggong = 2;
                    vm.weixinView = 1;
                    vm.weixinState = 1;
                    clearInterval(inter)
                }
            }, 1000)
        };
        vm.fromObj = {order_id: '', money: '', nick_name: '', subject: '', defaultbank: ''};
        vm.weixinView = 0;
        vm.weixinState = 0;
        vm.setDefaultbank = function (bank) {
            vm.weixinView = 0;
            vm.weixinState = 0;
            if (bank == 'weixin') {
                vm.weixinView = 1;
                vm.weixinState = 1
            } else {
                vm.fromObj.defaultbank = bank
            }
        };
        vm.escWeiXin = function () {
            vm.weixinView = 0;
            clearInterval(chaxunzhifuinter)
        };
        vm.setForm = function () {
            if (vm.weixinState == 1) {
                ajaxPost("/payService/getQRCode", {data: {order_id: vm.order.OrderID, money: vm.order.Money, nick_name: vm.nick_name}}, function (result) {
                    if (result.code == 0) {
                        if (result.data.Result == 0) {
                            var weixinURL = result.data.CodeUrl;
                            $('#weixinUrl').parent().html("<div id='weixinUrl'></div>");
                            var qrcode = new QRCode("weixinUrl", {text: weixinURL, width: 200, height: 200, colorDark: "#000", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.Q});
                            vm.weixinView = 2;
                            vm.chaxunzhifu()
                        }
                    } else {
                        alert('获取微信二维码失败')
                    }
                })
            } else {
                vm.fromObj.order_id = vm.order.OrderID;
                vm.fromObj.money = vm.order.Money;
                vm.fromObj.nick_name = vm.nick_name;
                vm.fromObj.subject = '购买风秀科技的秀豆' + vm.order.Money * 10 + '个';
                document.getElementById('orderForm').submit()
            }
        };
        vm.clickOpenWin = function (f) {
            var dataKey = "clickOpenWin.dataKey";
            var me = $(this);
            var A = me.data(dataKey);
            var returnData = null;
            if (!A) {
                A = $("");
                me.data(dataKey, A);
                A.click(function (e) {
                    if (returnData) {
                        A.attr("href", returnData)
                    } else {
                        A.before(me);
                        e.stop()
                    }
                })
            }
            me.mouseover(function () {
                $(this).before(A).appendTo(A)
            });
            me.mouseout(function () {
                A.before($(this))
            });
            me.click(function () {
                A.attr("href", "#|");
                returnData = f.apply(this, arguments)
            })
        };
        vm.orderState = {};
        vm.payPopUpState = 0;
        vm.selOrder = function () {
            var data = {from_uuid: vm.order.FromUUID, order_id: vm.order.OrderID, order_time: vm.order.OrderTimestamp};
            vm.orderState.Status = '';
            ajaxPost("/payService/selOrder", {data: data}, function (result) {
                if (result.code == 0) {
                    vm.orderState = result.data.order;
                    if (result.data.order.Status == 1) {
                        vm.payPopUpState = 0;
                        window.location.href = "index.html"
                    } else {
                        vm.payPopUpState = 2
                    }
                } else if (result.code == 1) {
                    vm.payPopUpState = 2
                } else if (result.code == 2) {
                    alert("没有创建订单！")
                }
            })
        };
        vm.backIndex = function () {
            _mainModel.loginState = 1
        };
        vm.openIndex = function () {
            _mainModel.loginState = 1
        };
        vm.payObj = {order_id: '', money: 10, nick_name: '', subject: ''};
        vm.payMun = function (mun) {
            if (mun == 10) {
                vm.payObj.money = mun;
                vm.zhangdan.jine = mun;
                vm.zhangdan.xiudou = mun * 10;
                vm.radioCheck(function () {
                    vm.orderState = 0;
                    $('#recharge').css('background', '#f35892')
                })
            } else if (mun == 30) {
                vm.payObj.money = mun;
                vm.zhangdan.jine = mun;
                vm.zhangdan.xiudou = mun * 10;
                vm.radioCheck(function () {
                    vm.orderState = 0;
                    $('#recharge').css('background', '#f35892')
                })
            } else if (mun == 50) {
                vm.payObj.money = mun;
                vm.zhangdan.jine = mun;
                vm.zhangdan.xiudou = mun * 10;
                vm.radioCheck(function () {
                    vm.orderState = 0;
                    $('#recharge').css('background', '#f35892')
                })
            } else if (mun == 100) {
                vm.payObj.money = mun;
                vm.zhangdan.jine = mun;
                vm.zhangdan.xiudou = mun * 10;
                vm.radioCheck(function () {
                    vm.orderState = 0;
                    $('#recharge').css('background', '#f35892')
                })
            } else if (mun == 1000) {
                vm.payObj.money = mun;
                vm.zhangdan.jine = mun;
                vm.zhangdan.xiudou = mun * 10;
                vm.radioCheck(function () {
                    vm.orderState = 0;
                    $('#recharge').css('background', '#f35892')
                })
            } else if (mun == 0) {
                if (parseFloat(vm.kuMoney) > 0) {
                    vm.radioCheck(function () {
                        vm.orderState = 0;
                        $('#recharge').css('background', '#f35892');
                        vm.keyupMoney()
                    });
                    vm.keyupMoney()
                } else {
                    vm.orderState = 1;
                    $('#recharge').css('background', '#ccc')
                }
            }
        };
        vm.kuMoney = '';
        vm.zhangdan = {xiudou: 100, jine: 10};
        vm.tttMsg = '0个秀豆';
        vm.orderState = 0;
        vm.keyupMoney = function () {
            vm.zhangdan.jine = parseFloat(vm.kuMoney);
            vm.zhangdan.xiudou = parseFloat(vm.kuMoney) * 10;
            if (parseFloat(vm.kuMoney) > 0) {
                vm.tttMsg = vm.kuMoney * 10 + '个秀豆';
                vm.orderState = 0;
                $('#recharge').css('background', '#f35892')
            } else {
                vm.tttMsg = '最少购买1个秀豆';
                vm.orderState = 1;
                $('#recharge').css('background', '#ccc')
            }
        };
        vm.GetQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null
        };
        vm.urlLogin = function () {
            var uuid = vm.getParam('uuid');
            if (uuid) {
                vm.radioUuid = uuid;
                vm.userName = '';
                vm.toggle = 1;
                vm.uuidCheck()
            }
        };
        vm.getParam = function (name) {
            var search = document.location.search;
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(search);
            var items = null;
            if (null != matcher) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]))
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1])
                    } catch (e) {
                        items = matcher[1]
                    }
                }
            }
            return items
        };
        vm.init = function () {
            vm.urlLogin();
            $('#recharge').css('background', '#ccc')
        }
    })
});
$(document).ready(function () {
    var pullDown = $("#mainPullDown");
    var pullDownText = $(pullDown).find("span");
    pullDown.find("ul").hide();
    pullDownText.click(function () {
        $(this).siblings("ul").slideToggle(100);
        $(this).siblings("ul").find("li").click(function () {
            $(this).parents("ul").hide()
        })
    });
    $(".roomMemu > ul > li a").click(function () {
        $(".roomMemu > ul > li a").removeClass("active");
        $(this).addClass("active")
    });
    var indexMainH = $(document).height();
    $(".index").css("min-height", indexMainH - 290);
    function active(active) {
        $(active).find("ul").find("li").find("a").click(function () {
            $(active).find("ul").find("li").find("a").removeClass("active");
            $(this).addClass("active")
        })
    }

    active(".pay");
    active(".payTabTit");
    active(".payTabList");
    $(".yhList").css("display", "none");
    function displayBN(aTit, blo, non) {
        $(aTit).click(function () {
            $(blo).css("display", "block");
            $(non).css("display", "none")
        })
    }

    displayBN(".zfbTabTit", ".zfbList", ".yhList");
    displayBN(".wyTabTit", ".yhList", ".zfbList");
    $(".close").click(function () {
        $(".paySuccess,.paySuccess2").css("display", "none")
    })
});
$.fn.decimalinput = function (num) {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress", function (e) {
        if (e.charCode === 0)return true;
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code >= 48 && code <= 57) {
            var pos = getCurPosition(this);
            var selText = getSelectedText(this);
            var dotPos = this.value.indexOf(".");
            if (dotPos > 0 && pos > dotPos) {
                if (pos > dotPos + 2)return false;
                if (selText.length > 0 || this.value.substr(dotPos + 1).length < num)return true; else return false
            }
            return true
        }
        if (code == 46) {
            var selText = getSelectedText(this);
            if (selText.indexOf(".") > 0)return true; else if (/^[0-9]+\.$/.test(this.value + String.fromCharCode(code)))return true
        }
        return false
    });
    this.bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1)
        } else if (isNaN(this.value)) {
            this.value = ""
        }
        if (this.value)this.value = parseFloat(this.value).toFixed(1);
        $(this).trigger("input")
    });
    this.bind("paste", function () {
        if (window.clipboardData) {
            var s = clipboardData.getData('text');
            if (!isNaN(s)) {
                value = parseFloat(s);
                return true
            }
        }
        return false
    });
    this.bind("dragenter", function () {
        return false
    });
    this.bind("keyup", function () {
    });
    this.bind("propertychange", function (e) {
        if (isNaN(this.value))this.value = this.value.replace(/[^0-9\.]/g, "")
    });
    this.bind("input", function (e) {
        if (isNaN(this.value))this.value = this.value.replace(/[^0-9\.]/g, "")
    })
};
function getCurPosition(domObj) {
    var position = 0;
    if (domObj.selectionStart || domObj.selectionStart == '0') {
        position = domObj.selectionStart
    } else if (document.selection) {
        domObj.focus();
        var currentRange = document.selection.createRange();
        var workRange = currentRange.duplicate();
        domObj.select();
        var allRange = document.selection.createRange();
        while (workRange.compareEndPoints("StartToStart", allRange) > 0) {
            workRange.moveStart("character", -1);
            position++
        }
        currentRange.select()
    }
    return position
};
function getSelectedText(domObj) {
    if (domObj.selectionStart || domObj.selectionStart == '0') {
        return domObj.value.substring(domObj.selectionStart, domObj.selectionEnd)
    } else if (document.selection) {
        domObj.focus();
        var sel = document.selection.createRange();
        return sel.text
    } else return''
}
$(".payInput").decimalinput(1);
function ForceWindow() {
    this.r = document.documentElement;
    this.f = document.createElement("FORM");
    this.f.target = "_blank";
    this.f.method = "post";
    this.r.insertBefore(this.f, this.r.childNodes[0])
}
ForceWindow.prototype.open = function (url) {
    this.f.action = url;
    this.f.submit()
};
window.force = new ForceWindow();
$(document).ready(function () {
    $(".payConfirmBG .close").click(function () {
        $(".payConfirmBG").css("display", "none")
    })
});