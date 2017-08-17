/**
 * Created by Linyi on 2015/6/3 0003.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var PayDao = require('../model/payDao');
var payDao = new PayDao();
var session = require('express-session');
var request = require('request');

router.post('/getData', function (req, res) {
    var type = {};
    var data = req.param("data");
    var rmap = {code: 0};
    var uuid = data.uuid;
    //引入MD5加密
    var createHash = require('crypto').createHash;
    var md5 = function (string) {
        return createHash('md5').update(string).digest('hex');
    }
    var md5Paw_1 = md5(uuid);//第一次md5加密
    var buffer_1 = new Buffer(16);
    var k = 0;
    for (var i = 0; i < md5Paw_1.length; i += 2) {
        var bufferObj = parseInt(md5Paw_1.substr(i, 2), 16)
        buffer_1[k] = bufferObj;
        k++;
    }
    var md5Paw_2 = md5(buffer_1);
    var y = 0;
    var buffer_2 = new Buffer(16);
    for (var i = 0; i < md5Paw_1.length; i += 2) {
        var bufferObj = parseInt(md5Paw_2.substr(i, 2), 16)
        buffer_2[y] = bufferObj;
        y++;
    }
    var token = buffer_2.toString('base64');
    //console.log(token);

    //http://192.168.1.194:8080/order/new?token=xxx&from_uuid=xxx&from_pay_id=xxx&from_pay_type=xxx&moey=10
    var url = encodeURI("http://artist.show.baofeng.com/order/new?token=" + token + "&from_uuid=" + uuid + "&from_pay_id=xxx&from_pay_type=JS&money=" + data.total_fee);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.data = jsonObj;
            res.send(rmap);
        } else {
            rmap.code = 1;
            res.send(rmap);
        }
    })
});


router.post('/getQRCode', function (req, res) {
    var type = {};
    var data = req.param("data");
    var rmap = {code: 0};
    var url = encodeURI("http://pay.show.baofeng.com/order/weipay/pay?order_id=" + data.order_id + "&money=" + data.money + "&nick_name=" + data.nick_name);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.data = jsonObj;
            res.send(rmap);
        } else {
            rmap.code = 1;
            res.send(rmap);
        }
    })
});

router.post('/getWebPayOrder', function (req, res) {
    var type = {};
    var data = req.param("data");
    var rmap = {code: 0};
    var url = encodeURI("http://pay.show.baofeng.com/order/weipay/pay?order_id=" + data.order_id + "&money=" + data.money + "&nick_name=" + data.nick_name + "&pay_type=JS&openid=" + data.openid);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var strList = body.split('\n ');
            var str = strList.join('');
            var jsonObj = eval('(' + str + ')');
            rmap.data = jsonObj;
            res.send(rmap);
        } else {
            rmap.code = 1;
            res.send(rmap);
        }
    })
});

//查询支付结果：http://192.168.1.194:8080/order/query?token=xxx&from_uuid=xxx&order_id=201510203&order_time=144543987
router.post('/selOrder', function (req, res) {
    var type = {};
    var data = req.param("data");
    var rmap = {code: 0};
    //var uuid = req.session.user.uuid;
    //引入MD5加密
    var createHash = require('crypto').createHash;
    var md5 = function (string) {
        return createHash('md5').update(string).digest('hex');
    }
    var md5Paw_1 = md5(data.from_uuid);//第一次md5加密
    var buffer_1 = new Buffer(16);
    //转成buffer
    var k = 0;
    for (var i = 0; i < md5Paw_1.length; i += 2) {
        var bufferObj = parseInt(md5Paw_1.substr(i, 2), 16)
        buffer_1[k] = bufferObj;
        k++;
    }
    //第二次md5加密
    var md5Paw_2 = md5(buffer_1)
    var y = 0;
    var buffer_2 = new Buffer(16);
    //转成buffer
    for (var i = 0; i < md5Paw_1.length; i += 2) {
        var bufferObj = parseInt(md5Paw_2.substr(i, 2), 16)
        buffer_2[y] = bufferObj;
        y++;
    }
    //base64加密
    var token = buffer_2.toString('base64');

    if (data) {
        var url = encodeURI("http://artist.show.baofeng.com/order/query?token=" + token + "&from_uuid=" + data.from_uuid + "&order_id=" + data.order_id + "&order_time=" + data.order_time);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                var strList = body.split('\n ');
                var str = strList.join('');
                var jsonObj = eval('(' + str + ')');
                rmap.data = jsonObj;
                res.send(rmap);
            } else {
                rmap.code = 1;
                res.send(rmap);
            }
        })
    } else {
        rmap.code = 2;
        res.send(rmap);
    }

});

//验证手机是否注册
router.post('/phoneCheck', function (req, res) {
    var rmap = {code: 0};
    var phone = req.param("phone");
    payDao.phoneCheck(phone, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
            res.send(rmap);
        } else {
            if (rows.length > 0) {
                rmap.uuid = rows[0].uuid;
                rmap.nickName = rows[0].nick_name;
                payDao.selUserInfo(rows[0].uuid, function (err1, rows1) {
                    if (err1) {
                        log.error(err1);
                        rmap.code = -1;
                        res.send(rmap);
                    } else {
                        if (rows1.length > 0) {
                            rmap.uuid = '';
                            rmap.nickName = '';
                            rmap.code = 2;
                            res.send(rmap);
                        } else {
                            res.send(rmap);
                        }
                    }
                });
            } else {
                rmap.uuid = '';
                rmap.nickName = '';
                res.send(rmap);
            }
        }
    });
});


//验证uuid是否注册
router.post('/uuidCheck', function (req, res) {
    var uuid = req.param("uuid");
    var rmap = {code: 0};
    payDao.uuidCheck(uuid, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
            res.send(rmap);
        } else {
            rmap.user = rows[0] || {};
        }
        payDao.selUserInfo(rows[0].uuid, function (err1, rows1) {
            if (err1) {
                log.error(err1);
                rmap.code = -1;
                res.send(rmap);
            } else {
                if (rows1.length > 0) {
                    rmap.uuid = '';
                    rmap.nickName = '';
                    rmap.code = 2;
                    res.send(rmap);
                } else {
                    res.send(rmap);
                }
            }
        });
    });
});

module.exports = router;