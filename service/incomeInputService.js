/**
 * Created by Linyi on 2015/9/15 0015.
 */
/**
 * Created by Linyi on 2015/6/3 0003.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var IncomeInputDao = require('../model/incomeInputDao');
var incomeInputDao = new IncomeInputDao();
var session = require('express-session');

router.post('/getIncomeInputList', function (req, res) {
    var sociaty = req.param("sociaty");
    var rmap = {code: 0};
    var yesDay = commUtil.getDataDay('yesterday');
    var lastWeekStart = commUtil.getDataDay('lastWeekStart');
    var lastWeekEnd = commUtil.getDataDay('lastWeekEnd');
    var monthStart = commUtil.getDataDay('monthStart');
    incomeInputDao.getIncomeGiftList(sociaty, yesDay, lastWeekStart, lastWeekEnd, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = 1;
            res.send(rmap);
        } else {
            var incomeGiftList = rows || [];
        }
        incomeInputDao.getIncomeGuardList(sociaty, yesDay, lastWeekStart, lastWeekEnd, function (err, rows) {
            if (err) {
                log.error(err);
                rmap.code = 1;
                res.send(rmap);
            } else {
                var incomeGuardList = rows || [];
                for (var i = 0; i < incomeGiftList.length; i++) {
                    for (var j = 0; j < incomeGuardList.length; j++) {
                        if (incomeGiftList[i].uuid == incomeGuardList[j].uuid) {
                            incomeGiftList[i].yesDayIncome = incomeGiftList[i].yesDayIncome + incomeGuardList[j].yesDayIncome;
                            incomeGiftList[i].weekIncome = incomeGiftList[i].weekIncome + incomeGuardList[j].weekIncome;
                            incomeGiftList[i].income = incomeGiftList[i].income + incomeGuardList[j].income;
                        }
                    }
                }
                for (var i = 0; i < incomeGiftList.length; i++) {
                    for (var j = 0; j < incomeGuardList.length; j++) {
                        if (incomeGiftList[i].uuid == incomeGuardList[j].uuid) {
                            incomeGuardList[j].uuid = 0;
                        }
                    }
                }
                for (var j = 0; j < incomeGuardList.length; j++) {
                    if (incomeGuardList[j].uuid != 0) {
                        incomeGiftList.push(incomeGuardList[j]);
                    }
                }
                incomeInputDao.getLiveList(sociaty, monthStart, function (err, rows) {
                    if (err) {
                        log.error(err);
                        rmap.code = -1;
                        res.send(rmap);
                    } else {
                        function liveDate(date) {
                            //计算出相差天数
                            var days = Math.floor(date / (24 * 3600 * 1000))
                            var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                            var hours = Math.floor(leave1 / (3600 * 1000))
                            var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                            var minutes = Math.floor(leave2 / (60 * 1000))
                            var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                            var seconds = Math.round(leave3 / 1000)
                            return (days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒")
                        }

                        for (var i in rows) {
                            var weekLiveTime = 0;
                            var monthLiveTime = 0;
                            for (var j in rows[i].weekLiveDate) {
                                var a = rows[i].weekLiveDate[j].startDate;
                                var b = commUtil.fromStrToDate(commUtil.getDataDay('weekStart') + " 00:00:00");
                                var c = commUtil.fromStrToDate(commUtil.getDataDay('monthStart') + " 00:00:00");
                                //console.log(a)
                                //console.log(b + ':' + commUtil.getDataDay('weekStart'))
                                //console.log(c + ':' + commUtil.getDataDay('monthStart'))
                                if (a > b) {
                                    //incomeGiftList[i].weekLiveTime = liveDate(rows[i].weekLiveDate)
                                    weekLiveTime = weekLiveTime + (rows[i].weekLiveDate[j].endDate - rows[i].weekLiveDate[j].startDate);
                                }
                                if (a > c) {
                                    //incomeGiftList[i].monthLiveTime = liveDate(rows[i].weekLiveDate)
                                    monthLiveTime = monthLiveTime + (rows[i].weekLiveDate[j].endDate - rows[i].weekLiveDate[j].startDate);
                                }
                            }
                            incomeGiftList[i].weekLiveTime = liveDate(weekLiveTime);
                            incomeGiftList[i].monthLiveTime = liveDate(monthLiveTime);
                        }
                        //console.log(commUtil.fromStrToDate(commUtil.getDataDay('weekStart') + "00:00:00"))
                        /**
                         * 偏好直播间
                         * @type {*|Array}
                         */
                        var time = commUtil.getDataDay('lastWeekStart');
                        incomeInputDao.likeRoom(time, function (err2, rows2) {
                            if (err2) {
                                log.error(err2);
                                rmap.code = -1;
                                res.send(rmap);
                            } else {
                                for (var i = 0; i < incomeGiftList.length; i++) {
                                    for (var j = 0; j < rows2.length; j++) {
                                        if (incomeGiftList[i].uuid == rows2[j].uuid) {
                                            incomeGiftList[i].liveRoom = rows2[j].roomName;
                                        }
                                    }
                                }
                                rmap.incomeInputList = incomeGiftList;
                                res.send(rmap);
                            }
                        });
                    }
                });
            }
        });
    });
});

router.post('/login', function (req, res) {
    var type = {};
    type.remember = req.param("sociaty");
    var rmap = {code: 0};
    incomeInputDao.login(type.remember.userName, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            if (rows.length == 0) {
                rmap.code = 1;
            }
            if (type.remember.password != rows[0].password) {
                rmap.code = 2;
            }
            req.session.user = rows[0] || [];
        }
        res.send(rmap);
    });
});

module.exports = router;