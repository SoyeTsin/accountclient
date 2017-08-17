var wait = 60;
var SSO = {
    Reg: function () {
        var f = $.trim($("#loginname").val());
        var a = $.trim($("#password").val());
        var e = $.trim($("#imgcode").val());
        if (!$("#memberme")[0].checked) {
            $("#tips").html("请阅读并同意《暴风影音注册协议》");
            return false
        }
        if (f == "") {
            $("#loginname").focus();
            $("#tips").html("请输入手机号");
            return false
        }
        var c = /^1\d{10}$/;
        var d = /^[a-zA-Z0-9]+[a-zA-Z0-9_|\-|\.]+@[a-zA-Z0-9_|\-|\.]+\.[a-zA-Z]{2,3}$/;
        if (d.test(f) || c.test(f)) {
        } else {
            $("#loginname").focus();
            $("#tips").html("手机格式错误");
            return false
        }
        if (a == "") {
            $("#password").focus();
            $("#tips").html("请输入6-32位英文、数字和符号的密码");
            return false
        } else {
            if (a.length < 6 || a.length > 32) {
                $("#password").focus();
                $("#tips").html("请输入6-32位英文、数字和符号的密码");
                return false
            }
        }
        if (e == "") {
            $("#tips").html("请输入验证码");
            return false
        }
        $("#tips").html("正在注册....");
        var b = new SSOConfig.ssoinit();
        b.setPublic(sso_p, sso_n);
        a = b.encrypt(a);
        $.post("/api/main/reg", "loginname=" + encodeURIComponent(f) + "&imgcode=" + e + "&password=" + encodeURIComponent(a) + "&" + querystr, function (g) {
            if (g.status == "1") {
                $("<iframe style='display:none' src='" + g.sysUrl + "'></iframe>").appendTo(document.body).get(0).contentWindow
            } else {
                if (g.status == "-2") {
                    $("#imgcode").val("");
                    $("#tips").html("验证码不正确")
                } else {
                    $("#tips").html(g.msg)
                }
            }
        }, "json")
    }, getMobileMsg: function () {
        var b = $.trim($("#loginname").val());
        var a = new SSOConfig.ssoinit();
        a.setPublic(sso_p, sso_n);
        mobile = a.encrypt(b);
        $.ajax({
            url: "/api/Msg/sso",
            type: "post",
            data: {mobile: mobile, time: time, sign: sign, action: "pcwebreg"},
            dataType: "json",
            success: function (c) {
                if (c.status == "1") {
                    $("#tips").html(c.msg);
                    SSO.get_code_time()
                } else {
                    if (c.status == "-2") {
                        $("#tips").html('该手机已注册或已被绑定！请直接<a href="/api/main/login?' + querystr + "&tmploginname=" + encodeURIComponent(b) + '">登录</a>')
                    } else {
                        $("#tips").html(c.msg)
                    }
                }
            },
            error: function (c) {
                $("#tips").html("短信验证码发送失败,请重试")
            }
        })
    }, get_code_time: function () {
        if (wait == 0) {
            $("#mobileback").show();
            $("#mobilebackno").hide();
            wait = 60
        } else {
            $("#mobileback").hide();
            $("#mobilebackno").show();
            $("#mobilebackno").html(wait + "秒后重新获得");
            wait--;
            setTimeout(function () {
                SSO.get_code_time()
            }, 1000)
        }
    }, LoginCallback: function (b, a) {
        if (b.status == 1) {
            if (a) {
                top.location.href = a
            } else {
                top.location.href = "http://i.baofeng.com/"
            }
        } else {
            $("#tips").html(b.info.msg)
        }
    }
};
$(function () {
    $.ajaxSetup({
        timeout: "9000", error: function () {
            $("#tips").html("您的当前网络不佳，请重试！")
        }
    });
    $("#loginname").val("");
    $("#imgcode").val("");
    document.onkeyup = function (b) {
        var a = document.all ? window.event : b;
        if (a.keyCode == 13) {
            SSO.Reg()
        }
    };
    $("#loginname").bind({
        focus: function () {
            $("#loginnameTip").hide();
            var a = $.trim($("#loginname").val());
            if (a == "") {
                $("#loginname").val("")
            }
            $("#loginname").addClass("input-box")
        }, blur: function () {
            var a = $.trim($("#loginname").val());
            if (a == "") {
                $("#tips").html("请输入手机号");
                $("#loginname").removeClass("input-box");
                $("#loginnameTip").show();
                return
            } else {
                $("#tips").html("")
            }
            $.get("/api/check/mobile", {mobile: a, randnum: (Math.random() * 1000)}, function (b) {
                if (b.status == 1 && b.info.exist) {
                    $("#tips").html('该手机已注册或已被绑定！请直接<a href="/api/main/login?' + querystr + "&tmploginname=" + encodeURIComponent(a) + '">登录</a>')
                } else {
                    $("#tips").html(b.info.msg)
                }
            }, "json");
            if (!$("#mobilebackno").is(":hidden")) {
                return
            }
            $("#mobileback").show();
            $("#mobilebackno").hide();
            $("#loginname").removeClass("input-box")
        }
    });
    $("#password").bind({
        focus: function () {
            $("#passwordTip").hide();
            $("#password").addClass("input-box")
        }, blur: function () {
            $("#password").removeClass("input-box");
            var a = $.trim($("#password").val());
            if ($("#tips").html().indexOf("已注册") > -1) {
                return
            }
            if (a == "") {
                $("#passwordTip").show();
                $("#tips").html("请输入6-32位英文、数字和符号的密码")
            } else {
                if (a.length < 6 || a.length > 32) {
                    $("#tips").html("请输入6-32位英文、数字和符号的密码")
                }
            }
        }
    });
    $("#loginnameTip").bind({
        click: function () {
            $("#loginname").addClass("input-box");
            $("#loginnameTip").hide();
            $("#loginname").focus()
        }
    });
    $("#passwordTip").bind({
        click: function () {
            $("#password").addClass("input-box");
            $("#passwordTip").hide();
            $("#password").focus()
        }
    });
    $("#imgcode").bind({
        blur: function () {
            $("#imgcode").removeClass("input-box");
            var c = $.trim($("#loginname").val());
            var b = $.trim($("#imgcode").val());
            var a = /^1\d{10}$/;
            if (!a.test(c) && b.length >= 4) {
                $.get("/api/user/checkv", {
                    action: "pcwebreg",
                    vcode: b,
                    randnum: (Math.random() * 1000)
                }, function (d) {
                    if (d.status == "0") {
                        $("#imgcode").val("");
                        $("#tips").html("验证码不正确")
                    }
                }, "json")
            }
        }, focus: function () {
            $("#imgcode").addClass("input-box")
        }
    })
});