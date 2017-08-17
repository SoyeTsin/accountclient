/**
 * Created by Linyi on 2015/9/21 0021.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var ArtistGearDao = require('../model/artistGearDao');
var artistGearDao = new ArtistGearDao();
var session = require('express-session');

router.post('/getRoomList', function (req, res) {
    //var remember = req.param("remember");
    var rmap = {code: 0};
    artistGearDao.getRoomList(function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            rmap.roomList = rows || [];
        }
        res.send(rmap);
    });
});

router.post('/getArtistList', function (req, res) {
    var sociatyId = req.param("sociatyId");
    var rmap = {code: 0};
    artistGearDao.getArtistList(sociatyId,function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            rmap.artistList = rows || [];
        }
        res.send(rmap);
    });
});

router.post('/getGearList', function (req, res) {
    var data = req.param("data");
    var dataList = [
        '00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'
    ]
    if (data.date.startDate == '' || data.date.endDate == '') {
        data.date.startDate = commUtil.getDataDay('weekStart');
        data.date.endDate = commUtil.getDataDay('weekEnd');
    }
    //console.log(data.date.startDate + "---" + data.date.endDate);
    var rmap = {code: 0};
    var dbData = [];
    for (var i = 0; i < dataList.length; i++) {
        dbData.push({
            time: dataList[i],
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: ''
        })
    }
    artistGearDao.getGearList(data, function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
            res.send(rmap);
        } else {
            for (var i = 0; i < dataList.length; i++) {
                var myDate = new Date();
                var time, endTime = 0;

                function datafun() {
                    if (i < 10) {
                        time = myDate.toLocaleDateString() + " 0" + i + ":00:00";     //获取当前日期
                        endTime = myDate.toLocaleDateString() + " 0" + i + ":59:59";     //获取当前日期
                    } else {
                        time = myDate.toLocaleDateString() + " " + i + ":00:00";     //获取当前日期
                        endTime = myDate.toLocaleDateString() + " " + i + ":59:59";     //获取当前日期

                    }
                }

                //周一
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Monday = rows[j].nick;
                    }
                }
                //周二
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Tuesday = rows[j].nick;
                    }
                }
                //周三
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Wednesday = rows[j].nick;
                    }
                }
                //周四
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Thursday = rows[j].nick;
                    }
                }
                //周五
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Friday = rows[j].nick;
                    }
                }
                //周六
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Saturday = rows[j].nick;
                    }
                }
                //周日
                myDate.setDate(myDate.getDate() + 1);
                datafun()
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].creDate >= commUtil.fromStrToDate(time) && rows[j].creDate <= commUtil.fromStrToDate(endTime)) {
                        dbData[i].Sunday = rows[j].nick;
                    }
                }
            }

            rmap.gearList = dbData || [];
            res.send(rmap);
        }
    });
})
;

module.exports = router;