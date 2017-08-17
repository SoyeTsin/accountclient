/**
 * Created by Linyi on 2015/6/3 0003.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var MainDao = require('../model/mainDao');
var mainDao = new MainDao();
var session = require('express-session');
var request = require('request');
//var Base64 = require('../util/base64');
var redis = require('redis');
var con = require("../conf/serverConfig.json");

//微信支付部分
var ACCESS_TOKEN = "";
var jsapi_ticket = "";

setInterval(function () {
    var client = redis.createClient(con.redis.port, con.redis.host);
    client.get('ACCESS_TOKEN', function (error, resss) {
        if (error) {
            console.log(error);
        } else {
            if (resss) {
                ACCESS_TOKEN = resss;
                client.get('jsapi_ticket', function (error, resss) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (resss) {
                            jsapi_ticket = resss;
                            client.quit();
                        }
                    }
                })
            }
        }
    })
}, 10000);
var crypto = require('crypto');


router.post('/getSigid', function (req, res) {
    var data = req.param("data");
    var stringA = "appid=wxd0abd7f5ba498cf6&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
    console.log(data)
});


router.post('/get_access_token', function (req, res) {
    var rmap = {code: 0};
    var sha1 = crypto.createHash('sha1');
    var newDate = new Date();

    function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    var timestamp = parseInt(newDate.getTime() / 1000);
    var randomString = randomString(16);
    sha1.update('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + randomString + '&timestamp=' + timestamp + '&url=http://pay.show.baofeng.com/wechatpay.html');
    rmap.ACCESS_TOKEN = ACCESS_TOKEN;
    rmap.jsapi_ticket = jsapi_ticket;
    rmap.randomString = randomString;
    rmap.timestamp = timestamp;
    rmap.autograph = sha1.digest('hex');
    res.send(rmap);
});


router.get('/set_order', function (req, res) {
    var rmap = {code: 0};
    var userdata = req.param("userdata");
    var num = req.param("num");
    var md5 = crypto.createHash('md5');
    var newDate = new Date();

    function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    var timestamp = parseInt(newDate.getTime() / 1000);
    var randomString = randomString(16);
    md5.update("appid=wxd0abd7f5ba498cf6&body=funshow&device_info=1000&mch_id=1287530501&nonce_str=" + randomString + "&key=oqk43ll7od19pf27rncx95vcnegg2wtk");
    rmap.randomString = randomString;
    rmap.timestamp = timestamp;
    rmap.autograph = md5.digest('hex');
    res.send(rmap);
});

router.post('/get_openid', function (req, res) {
    var rmap = {code: 0};
    var code = req.param("code");
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd0abd7f5ba498cf6&secret=09244b42dd40604f107ecf330bc0d510&code=" + code + "&grant_type=authorization_code";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.code = 0;
            rmap.jsonObj = jsonObj;

            var sha1 = crypto.createHash('sha1');
            var newDate = new Date();

            function randomString(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            var timestamp = parseInt(newDate.getTime() / 1000);
            var randomString = randomString(16);
            sha1.update('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + randomString + '&timestamp=' + timestamp + '&url=http://pay.show.baofeng.com/xuancai.html?code=' + code + '&state=STATE');
            rmap.ACCESS_TOKEN = ACCESS_TOKEN;
            rmap.jsapi_ticket = jsapi_ticket;
            rmap.randomString = randomString;
            rmap.timestamp = timestamp;
            rmap.autograph = sha1.digest('hex');
            var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + rmap.jsonObj.access_token + "&openid=" + rmap.jsonObj.openid;
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(body);
                    var strList_3 = body.split('\n ');
                    var str_3 = strList_3.join('');
                    var jsonObj_3 = eval('(' + str_3 + ')');
                    rmap.userinfo = jsonObj_3;
                    res.send(rmap);
                } else {
                    rmap.code = 1000;
                    res.send(rmap);
                }
            })
        } else {
            rmap.code = 404;
            res.send(rmap);
        }
    })
});

router.post('/get_pay_openid', function (req, res) {
    var rmap = {code: 0};
    var code = req.param("code");
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd0abd7f5ba498cf6&secret=09244b42dd40604f107ecf330bc0d510&code=" + code + "&grant_type=authorization_code";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.code = 0;
            rmap.jsonObj = jsonObj;

            var sha1 = crypto.createHash('sha1');
            var newDate = new Date();

            function randomString(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            var timestamp = parseInt(newDate.getTime() / 1000);
            var randomString = randomString(16);
            sha1.update('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + randomString + '&timestamp=' + timestamp + '&url=http://pay.show.baofeng.com/wechatpay.html?code=' + code + '&state=STATE');
            rmap.ACCESS_TOKEN = ACCESS_TOKEN;
            rmap.jsapi_ticket = jsapi_ticket;
            rmap.randomString = randomString;
            rmap.timestamp = timestamp;
            rmap.autograph = sha1.digest('hex');
            var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + rmap.jsonObj.access_token + "&openid=" + rmap.jsonObj.openid;
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(body);
                    var strList_3 = body.split('\n ');
                    var str_3 = strList_3.join('');
                    var jsonObj_3 = eval('(' + str_3 + ')');
                    rmap.userinfo = jsonObj_3;
                    res.send(rmap);
                } else {
                    rmap.code = 1000;
                    res.send(rmap);
                }
            })
        } else {
            rmap.code = 404;
            res.send(rmap);
        }
    })
});
var client = redis.createClient(con.redis.port, con.redis.host);
client.on("error", function (error) {
    console.log(error);
});
client.set("caidan", JSON.stringify([]));
client.quit();

setInterval(function () {
    var client = redis.createClient(con.redis.port, con.redis.host);
    client.on("error", function (error) {
        console.log(error);
    });
    client.set("caidan", JSON.stringify([]));
    client.quit();
}, 4 * 60 * 60 * 1000)
router.post('/xuancai', function (req, res) {
    var client = redis.createClient(con.redis.port, con.redis.host);
    var rmap = {code: 0};
    var nick = req.param("nick");
    var caidanObj = req.param("caidan");
    client.get('caidan', function (error, resss) {
        if (error) {
            console.log(error);
        } else {
            if (resss) {
                var caidan = resss;
                var strList = caidan.split('\n ');
                var str = strList.join('');
                var jsonObj = eval('(' + str + ')');
                jsonObj.push({nick: nick, caidan: caidanObj});
                client.set("caidan", JSON.stringify(jsonObj));
                client.quit();
                res.send(rmap);
            }
        }
    })
});

router.post('/delcaidan', function (req, res) {
    var client = redis.createClient(con.redis.port, con.redis.host);
    var rmap = {code: 0};
    var nick = req.param("nick");
    res.send(rmap);
    client.get('caidan', function (error, resss) {
        if (error) {
            console.log(error);
        } else {
            if (resss) {
                var caidan = resss;
                var strList = caidan.split('\n ');
                var str = strList.join('');
                var caidan = eval('(' + str + ')');
                for (var i in caidan) {
                    if (caidan[i].nick == nick) {
                        delete caidan[i];
                    }
                }
                var arr = [];
                for (var i in caidan) {
                    if (caidan[i]) {
                        arr.push(caidan[i]);
                    }
                }
                client.set("caidan", JSON.stringify(arr));
                client.quit();
                res.send(rmap);
            }
        }
    })
});

router.post('/rencaidan', function (req, res) {
    var client = redis.createClient(con.redis.port, con.redis.host);
    var rmap = {code: 0};
    client.get('caidan', function (error, resss) {
        if (error) {
            console.log(error);
        } else {
            if (resss) {
                var caidan = resss;
                var strList = caidan.split('\n ');
                var str = strList.join('');
                var jsonObj = eval('(' + str + ')');
                rmap.caidan = jsonObj;
                client.quit();
                res.send(rmap);
            }
        }
    })
});

//获取支付签名
router.post('/pay_autograph', function (req, res) {
    var rmap = {code: 0};
    var data = req.param("data");
    var url = "http://pay.show.baofeng.com/order/weipay/pay?order_id=" + data.bfcsid + "&money=" + data.st + "&nick_name=" + data.from + "&pay_type=" + data.version;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.code = 0;
            rmap.jsonObj = jsonObj;
            res.send(rmap);
        } else {
            rmap.code = 1000;
            res.send(rmap);
        }
    })
});


/**
 * 验证暴风账号
 */
router.post('/islogin', function (req, res) {
    var rmap = {code: 0};
    var data = req.param("data");
    var url = "http://shahe.sso.baofeng.net/islogin?bfcsid=" + data.bfcsid + "&st=" + data.st + "&from=" + data.from + "&version=" + data.version;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.code = 0;
            rmap.jsonObj = jsonObj;
            res.send(rmap);
        } else {
            rmap.code = 1000;
            res.send(rmap);
        }
    })
});

/**
 * 获取用户信息
 */
router.post('/getUserObj_uuid_nick', function (req, res) {
    var data = req.param("data");
    var rmap = {code: 0};
    var userid = data.info.userid;
    //var userid = req.session.passport.user.uuid;
    mainDao.getUserObj_uuid(userid, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
            res.send(rmap);
        } else {
            if (rows.length > 0) {
                var uuid = rows[0].uuid;
                mainDao.getUserObj_nick(uuid, function (err0, rows0) {
                    if (err0) {
                        log.error(err0);
                        rmap.code = 1;
                        res.send(rmap);
                    } else {
                        if (rows0.length > 0) {
                            rmap.userObj = {uuid: uuid, nickName: rows0[0].nick_name};
                            res.send(rmap);
                        } else {
                            rmap.code = 1;
                            res.send(rmap);
                        }
                    }
                });
            } else {
                rmap.code = 1;
                res.send(rmap);
            }
        }
    });
});

router.post('/getUser', function (req, res) {
    //var uuid = req.param("uuid");
    var uuid = req.session.passport.user.uuid;
    var rmap = {code: 0};
    mainDao.getUser(uuid, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
        } else {
            rmap.user = rows[0] || {};
        }
        res.send(rmap);
    });
});


router.post('/getRoomSelectList', function (req, res) {
    var userId = req.session.user.uuid;
    var rmap = {code: 0};
    mainDao.getRoomSelectList(userId, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
        } else {
            rmap.roomSelectList = rows || [];
            req.session.roomCode = {roomCode: rows[0].rid}
        }
        res.send(rmap);
    });
});

router.post('/getKeyStr', function (req, res) {
    var rmap = {code: 0};
    var data = req.param("data");
    var newDate = new Date();
    var strDate = '' + newDate.getTime();
    var time = strDate.substring(0, 10);
    //引入MD5加密
    var createHash = require('crypto').createHash;
    var md5 = function (string) {
        return createHash('md5').update(string).digest('hex');
    }
    //var md5Paw_1 = md5(password);//第一次md5加密
    var key = md5(data + time + '7f1109196c0efa59d646d1a30c48c9f4');
    rmap.time = time;
    rmap.key = key;
    res.send(rmap);

});

router.post('/getUserLogin', function (req, res) {
    var rmap = {code: 0};
    var data = req.param("data");
    if (data) {
        var base64 = new Base64();
        var tokenStr1 = base64.decode(data)
        var tokenStr2 = base64.decode(tokenStr1)
        var jsonObj = eval('(' + tokenStr2 + ')');
        var userName = jsonObj.userName;
        var password = jsonObj.password;
        var type = jsonObj.type;
        rmap.userName = userName;
        rmap.password = password;
        rmap.type = type;
    } else {
        rmap.code = 1;
    }
    res.send(rmap);
});

router.post('/strToRsa', function (req, res) {
    var rmap = {code: 0};
    var data = req.param("data");
    var url = "http://artist.show.baofeng.com/account/baofengrsa?str=" + data;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            if (jsonObj.Result == 0) {
                rmap.rsa = jsonObj.Str;
            } else {
                rmap.code = 1000;
            }
        } else {
            rmap.code = 1000;
        }
        console.log(rmap.rsa)
        res.send(rmap);
    })
});


router.post('/getArtistList', function (req, res) {
    var userId = req.session.user.uuid;
    var rmap = {code: 0};
    rmap.nickName = req.session.user.nickName;
    rmap.userName = req.session.user.userName;
    rmap.creDate = req.session.user.creDate;
    mainDao.getArtistList(userId, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
        } else {
            rmap.user = rows[0] || {};
        }
        res.send(rmap);
    });
});


router.post('/getUserAsset', function (req, res) {
    var type = {};
    var data = req.param("data");
    type.userId = req.session.user.uuid;
    var rmap = {code: 0};
    type.yesterday = [commUtil.GetDateStr(-1), commUtil.GetDateStr(0)];
    type.Week = commUtil.getLastWeekDate();
    mainDao.getUserAsset(type, function (err, yesterdayIncome, weekIncome, assetSum) {
        if (err) {
            log.error(err);
            rmap.code = 1;
        } else {
            rmap.yesterdayIncome = yesterdayIncome[0].incomeSum || 0;
            rmap.weekIncome = weekIncome[0].incomeSum || 0;
            rmap.assetSum = assetSum[0].assetSum || 0;
        }
        res.send(rmap);
    });
});

router.post('/getSociatyList', function (req, res) {
    //var uuid = req.param("uuid");
    var uuid = req.session.user.uuid;
    var rmap = {code: 0};
    mainDao.getSociatyList(uuid, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
        } else {
            rmap.sociatyList = rows || [];
        }
        res.send(rmap);
    });
});
//
//router.post('/login', function (req, res) {
//    var type = {};
//    type.remember = req.param("remember");
//    var rmap = {code: 0};
//    mainDao.login(type.remember.userName, function (err, rows) {
//        if (err) {
//            log.error(err);
//            rmap.code = -1;
//        } else {
//            if (rows.length == 0) {
//                rmap.code = 1;
//            }
//            if (type.remember.password != rows[0].password) {
//                rmap.code = 2;
//            }
//            req.session.user = rows[0] || [];
//        }
//        res.send(rmap);
//    });
//});
/**
 * 业务逻辑
 */
router.post('/getTotalList', function (req, res) {
    var data = req.param("data");
    //var uuid = data.uuid;
    var uuid = req.session.user.uuid;
    var rmap = {code: 0};
    var newDate = new Date();
    var endDate = (commUtil.fromDateToStr(newDate, "yyyy-MM-dd"));
    newDate.setDate(newDate.getDate() - 30);
    var startDate = (commUtil.fromDateToStr(newDate, "yyyy-MM-dd"));
    if (data.endDate != '' && data.startDate != '') {
        endDate = data.endDate;
        startDate = data.startDate;
    }
    mainDao.getTotal_gift(uuid, startDate, endDate, function (err0, rows0) {
        if (err0) {
            log.error(err0);
            rmap.code = -1;
            res.send(rmap);
        } else {
            mainDao.getTotal_guard(uuid, startDate, endDate, function (err1, rows1) {
                if (err1) {
                    log.error(err1);
                    rmap.code = -1;
                    res.send(rmap);
                } else {
                    mainDao.getTotal_car(uuid, startDate, endDate, function (err2, rows2) {
                        if (err2) {
                            log.error(err2);
                            rmap.code = -1;
                            res.send(rmap);
                        } else {
                            var list = [];
                            for (var i in rows0) {
                                list.push({
                                    orderId: 'L-' + (('' + rows0[i].time.getTime()).substring(0, 10) + i),
                                    uuid: rows0[i].uuid,
                                    time: rows0[i].time,
                                    recharge: 0,
                                    pay: '-' + rows0[i].pay,
                                    remarks: '给主播[' + rows0[i].to_nick + ']送了' + rows0[i].gift_num + '个[' + rows0[i].giftName + ']',
                                    type: ''
                                })
                            }
                            for (var i in rows1) {
                                var ttt = {
                                    orderId: 'G-' + (('' + rows1[i].time.getTime()).substring(0, 10) + i),
                                    uuid: rows1[i].uuid,
                                    time: rows1[i].time,
                                    recharge: 0,
                                    pay: '-' + rows1[i].pay,
                                    remarks: '给主播[' + rows1[i].artistNick + ']开通了' + rows1[i].month + '个月的[守护]',
                                    type: ''
                                }
                                list.push(ttt)
                            }
                            for (var i in rows2) {
                                var str = '续费了';
                                if (rows2[i].buy_renew == 1) {
                                    var str = '购买了';
                                }
                                var tttt = {
                                    orderId: 'C-' + (('' + rows2[i].time.getTime()).substring(0, 10) + i),
                                    uuid: rows2[i].uuid,
                                    time: rows2[i].time,
                                    recharge: 0,
                                    pay: '-' + rows2[i].pay,
                                    remarks: str + rows2[i].month + '个月的[' + rows2[i].carName + ']',
                                    type: ''

                                }
                                list.push(tttt)
                            }
                            mainDao.getRechargeList(uuid, startDate, endDate, function (err3, rows3) {
                                if (err3) {
                                    log.error(err3);
                                    rmap.code = -1;
                                } else {
                                    for (var i in rows3) {
                                        var str = '';
                                        var type = rows3[i].status;
                                        var time = commUtil.fromStrToDate(rows3[i].order_timestamp);
                                        if (rows3[i].status == 1) {
                                            str = '充值[￥' + rows3[i].money + '元]购买了[' + rows3[i].goods_num + '个]秀豆';
                                        } else {
                                            str = '充值[￥' + rows3[i].money + '元]未支付';
                                            var newTime = new Date();
                                            newTime.setDate(newTime.getDate() - 1);
                                            if (time < newTime) {
                                                type = 2;
                                            }
                                        }
                                        var tyty = {
                                            orderId: 'R-' + rows3[i].order_id,
                                            uuid: rows3[i].from_uuid,
                                            time: time,
                                            recharge: '+' + rows3[i].goods_num,
                                            pay: 0,
                                            remarks: str,
                                            type: type
                                        };
                                        list.push(tyty);
                                    }
                                    mainDao.getMoneyList(uuid, startDate, endDate, function (err4, rows4) {
                                        if (err4) {
                                            log.error(err4);
                                            rmap.code = -1;
                                        } else {
                                            for (var i in rows4) {
                                                var str = '';
                                                str = '跪了土豪[' + rows4[i].nick_name + ']获得[' + rows4[i].money_dif + ']秀豆';
                                                var tyty = {
                                                    orderId: 'Orz-' + (rows4[i].cte_time.getTime() + '').substr(0, 10),
                                                    uuid: rows4[i].to_uuid,
                                                    time: rows4[i].cte_time,
                                                    recharge: '+' + rows4[i].money_dif,
                                                    pay: 0,
                                                    remarks: str,
                                                    type: '1'
                                                };
                                                list.push(tyty);
                                            }
                                        }
                                        for (var i in list) {
                                            var hhh = {};
                                            for (var j in list) {
                                                if (list[i].time > list[j].time) {
                                                    hhh = list[i];
                                                    list[i] = list[j];
                                                    list[j] = hhh;
                                                }
                                            }
                                        }
                                        rmap.list = list;
                                        rmap.startDate = startDate;
                                        rmap.endDate = endDate;
                                        res.send(rmap);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
//http://pay.show.baofeng.com/order/alipay/callback?body=为大草充值0.01元&buyer_email=18778990898&buyer_id=2088702137419361&exterface=create_direct_pay_by_user&is_success=T&notify_id=RqPnCoPT3K9%252Fvwbh3InVaIHuSa7QycD8Lnq6LZIhnOZyKAp1teEL9nl6Y9EtaUFVlp0X&notify_time=2015-11-02+10%3A57%3A59&notify_type=trade_status_sync&out_trade_no=2015110227&payment_type=1&seller_email=bill%40shoushikeji.com&seller_id=2088121067735022&subject=购买风秀科技的秀豆0.1个&total_fee=0.01&trade_no=2015110221001004360079401104&trade_status=TRADE_SUCCESS&sign=4610d862fe9febb03e1cc3cbca88304a&sign_type=MD5
router.post('/getRechargeList', function (req, res) {
    var uuid = req.session.user.uuid;
    var rmap = {code: 0};
    var newDate = new Date();
    var endDate = (commUtil.fromDateToStr(newDate, "yyyy-MM-dd"));
    newDate.setDate(newDate.getDate() - 7);
    var startDate = (commUtil.fromDateToStr(newDate, "yyyy-MM-dd"));
    mainDao.getRechargeList(uuid, startDate, endDate, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            if (rows.length == 0) {
                rmap.code = 1;
                rmap.total = {
                    uuid: uuid,
                    money_value: 0,
                    money_type: 0
                };
            } else {
                rmap.money_value = rows[0].money_value;
            }
        }
        res.send(rmap);
    });
});

router.post('/getBalance', function (req, res) {
    //var uuid = req.param("uuid");
    var uuid = req.session.user.uuid;
    var rmap = {code: 0};
    mainDao.getBalance(uuid, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            if (rows.length == 0) {
                rmap.code = 1;
                rmap.total = {
                    uuid: uuid,
                    money_value: 0,
                    money_type: 0
                };
            } else {
                rmap.money_value = rows[0].money_value;
            }
        }
        res.send(rmap);
    });
});

module.exports = router;

function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}