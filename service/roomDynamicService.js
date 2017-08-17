/**
 * Created by Linyi on 2015/9/18 0018.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var fs = require("fs");
var mime = require("mime");
var excelUtil = require("../util/excelUtil");
var commUtil = require('../util/commUtil');
var RoomDynamicDao = require('../model/roomDynamicDao');
var roomDynamicDao = new RoomDynamicDao();
var session = require('express-session');

router.post('/getRoomDynamicList', function (req, res) {
    //var remember = req.param("remember");
    var rmap = {code: 0};
    var myDate = new Date();
    var dataDay = myDate.toLocaleDateString();
    roomDynamicDao.getRoomList(function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
            res.send(rmap);
        } else {
            var roomList = rows || [];
            roomDynamicDao.getRoomDynamicList(dataDay, function (err0, rows0) {
                if (err0) {
                    log.error(err0);
                    rmap.code = -1;
                    res.send(rmap);
                } else {
                    var roomDynamicList = rows0 || [];
                    var dataList = [];
                    var data = {
                        roomCode: '',
                        roomName: '',
                        time_0: '',
                        time_1: '',
                        time_2: '',
                        time_3: '',
                        time_4: '',
                        time_5: '',
                        time_6: '',
                        time_7: '',
                        time_8: '',
                        time_9: '',
                        time_10: '',
                        time_11: '',
                        time_12: '',
                        time_13: '',
                        time_14: '',
                        time_15: '',
                        time_16: '',
                        time_17: '',
                        time_18: '',
                        time_19: '',
                        time_20: '',
                        time_21: '',
                        time_22: '',
                        time_23: '',
                    }
                    for (var i = 0; i < roomList.length; i++) {
                        data = {
                            roomCode: '',
                            roomName: '',
                            time_0: '',
                            time_1: '',
                            time_2: '',
                            time_3: '',
                            time_4: '',
                            time_5: '',
                            time_6: '',
                            time_7: '',
                            time_8: '',
                            time_9: '',
                            time_10: '',
                            time_11: '',
                            time_12: '',
                            time_13: '',
                            time_14: '',
                            time_15: '',
                            time_16: '',
                            time_17: '',
                            time_18: '',
                            time_19: '',
                            time_20: '',
                            time_21: '',
                            time_22: '',
                            time_23: '',
                        }
                        for (var j = 0; j < 24; j++) {
                            var startTime = '';
                            var endTime = '';
                            if (j < 10) {
                                startTime = dataDay + " 0" + j + ":00:00";
                                endTime = dataDay + " 0" + j + ":59:59";
                            } else {
                                startTime = dataDay + " " + j + ":00:00";
                                endTime = dataDay + " " + j + ":59:59";

                            }
                            var StartDataTime = commUtil.fromStrToDate(startTime);
                            var endDataTime = commUtil.fromStrToDate(endTime);
                            var date23 = commUtil.fromStrToDate(dataDay + " 23:59:59");
                            for (var k = 0; k < roomDynamicList.length; k++) {
                                if (roomList[i].ip == roomDynamicList[k].ip) {
                                    if (roomDynamicList[k].startDate <= endDataTime && roomDynamicList[k].endDate >= StartDataTime) {
                                        if (j == 0) {
                                            data.time_0 = roomDynamicList[k].nickName
                                        }
                                        if (j == 1) {
                                            data.time_1 = roomDynamicList[k].nickName
                                        }
                                        if (j == 2) {
                                            data.time_2 = roomDynamicList[k].nickName
                                        }
                                        if (j == 3) {
                                            data.time_3 = roomDynamicList[k].nickName
                                        }
                                        if (j == 4) {
                                            data.time_4 = roomDynamicList[k].nickName
                                        }
                                        if (j == 5) {
                                            data.time_5 = roomDynamicList[k].nickName
                                        }
                                        if (j == 6) {
                                            data.time_6 = roomDynamicList[k].nickName
                                        }
                                        if (j == 7) {
                                            data.time_7 = roomDynamicList[k].nickName
                                        }
                                        if (j == 8) {
                                            data.time_8 = roomDynamicList[k].nickName
                                        }
                                        if (j == 9) {
                                            data.time_9 = roomDynamicList[k].nickName
                                        }
                                        if (j == 10) {
                                            data.time_10 = roomDynamicList[k].nickName
                                        }
                                        if (j == 11) {
                                            data.time_11 = roomDynamicList[k].nickName
                                        }
                                        if (j == 12) {
                                            data.time_12 = roomDynamicList[k].nickName
                                        }
                                        if (j == 13) {
                                            data.time_13 = roomDynamicList[k].nickName
                                        }
                                        if (j == 14) {
                                            data.time_14 = roomDynamicList[k].nickName
                                        }
                                        if (j == 15) {
                                            data.time_15 = roomDynamicList[k].nickName
                                        }
                                        if (j == 16) {
                                            data.time_16 = roomDynamicList[k].nickName
                                        }
                                        if (j == 17) {
                                            data.time_17 = roomDynamicList[k].nickName
                                        }
                                        if (j == 18) {
                                            data.time_18 = roomDynamicList[k].nickName
                                        }
                                        if (j == 19) {
                                            data.time_19 = roomDynamicList[k].nickName
                                        }
                                        if (j == 20) {
                                            data.time_20 = roomDynamicList[k].nickName
                                        }
                                        if (j == 21) {
                                            data.time_21 = roomDynamicList[k].nickName
                                        }
                                        if (j == 22) {
                                            data.time_22 = roomDynamicList[k].nickName
                                        }
                                        if (j == 23) {
                                            data.time_23 = roomDynamicList[k].nickName
                                        }
                                    }
                                }
                            }

                        }
                        data.roomCode = roomList[i].roomCode;
                        data.roomName = roomList[i].roomName;
                        dataList.push(data);
                    }
                    rmap.roomDynamicList = dataList || [];
                    res.send(rmap);
                }
            });

        }
    });
});

/**
 * 下载报表
 */
router.get('/exRoomDynamicList', function (req, res) {
    //var remember = req.param("remember");
    var rmap = {code: 0};
    var myDate = new Date();
    var dataDay = myDate.toLocaleDateString();
    roomDynamicDao.getRoomList(function (err, rows) {
        if (err) {
            log.error("查询失败:" + err + "\n 查询参数:" + params);
            res.status(500).send("导出失败");
        } else {
            var roomList = rows || [];
            roomDynamicDao.getRoomDynamicList(dataDay, function (err0, rows0) {
                if (err0) {
                    log.error("查询失败:" + err + "\n 查询参数:" + params);
                    res.status(500).send("导出失败");
                } else {
                    var roomDynamicList = rows0 || [];
                    var dataList = [];
                    var data = {
                        roomCode: '',
                        roomName: '',
                        time_0: '',
                        time_1: '',
                        time_2: '',
                        time_3: '',
                        time_4: '',
                        time_5: '',
                        time_6: '',
                        time_7: '',
                        time_8: '',
                        time_9: '',
                        time_10: '',
                        time_11: '',
                        time_12: '',
                        time_13: '',
                        time_14: '',
                        time_15: '',
                        time_16: '',
                        time_17: '',
                        time_18: '',
                        time_19: '',
                        time_20: '',
                        time_21: '',
                        time_22: '',
                        time_23: '',
                    }
                    for (var i = 0; i < roomList.length; i++) {
                        data = {
                            roomCode: '',
                            roomName: '',
                            time_0: '',
                            time_1: '',
                            time_2: '',
                            time_3: '',
                            time_4: '',
                            time_5: '',
                            time_6: '',
                            time_7: '',
                            time_8: '',
                            time_9: '',
                            time_10: '',
                            time_11: '',
                            time_12: '',
                            time_13: '',
                            time_14: '',
                            time_15: '',
                            time_16: '',
                            time_17: '',
                            time_18: '',
                            time_19: '',
                            time_20: '',
                            time_21: '',
                            time_22: '',
                            time_23: '',
                        }
                        for (var j = 0; j < 24; j++) {
                            var startTime = '';
                            var endTime = '';
                            if (j < 10) {
                                startTime = dataDay + " 0" + j + ":00:00";
                                endTime = dataDay + " 0" + j + ":59:59";
                            } else {
                                startTime = dataDay + " " + j + ":00:00";
                                endTime = dataDay + " " + j + ":59:59";

                            }
                            var StartDataTime = commUtil.fromStrToDate(startTime);
                            var endDataTime = commUtil.fromStrToDate(endTime);
                            var date23 = commUtil.fromStrToDate(dataDay + " 23:59:59");
                            for (var k = 0; k < roomDynamicList.length; k++) {
                                if (roomList[i].ip == roomDynamicList[k].ip) {
                                    if (roomDynamicList[k].startDate <= endDataTime && roomDynamicList[k].endDate >= StartDataTime) {
                                        if (j == 0) {
                                            data.time_0 = roomDynamicList[k].nickName
                                        }
                                        if (j == 1) {
                                            data.time_1 = roomDynamicList[k].nickName
                                        }
                                        if (j == 2) {
                                            data.time_2 = roomDynamicList[k].nickName
                                        }
                                        if (j == 3) {
                                            data.time_3 = roomDynamicList[k].nickName
                                        }
                                        if (j == 4) {
                                            data.time_4 = roomDynamicList[k].nickName
                                        }
                                        if (j == 5) {
                                            data.time_5 = roomDynamicList[k].nickName
                                        }
                                        if (j == 6) {
                                            data.time_6 = roomDynamicList[k].nickName
                                        }
                                        if (j == 7) {
                                            data.time_7 = roomDynamicList[k].nickName
                                        }
                                        if (j == 8) {
                                            data.time_8 = roomDynamicList[k].nickName
                                        }
                                        if (j == 9) {
                                            data.time_9 = roomDynamicList[k].nickName
                                        }
                                        if (j == 10) {
                                            data.time_10 = roomDynamicList[k].nickName
                                        }
                                        if (j == 11) {
                                            data.time_11 = roomDynamicList[k].nickName
                                        }
                                        if (j == 12) {
                                            data.time_12 = roomDynamicList[k].nickName
                                        }
                                        if (j == 13) {
                                            data.time_13 = roomDynamicList[k].nickName
                                        }
                                        if (j == 14) {
                                            data.time_14 = roomDynamicList[k].nickName
                                        }
                                        if (j == 15) {
                                            data.time_15 = roomDynamicList[k].nickName
                                        }
                                        if (j == 16) {
                                            data.time_16 = roomDynamicList[k].nickName
                                        }
                                        if (j == 17) {
                                            data.time_17 = roomDynamicList[k].nickName
                                        }
                                        if (j == 18) {
                                            data.time_18 = roomDynamicList[k].nickName
                                        }
                                        if (j == 19) {
                                            data.time_19 = roomDynamicList[k].nickName
                                        }
                                        if (j == 20) {
                                            data.time_20 = roomDynamicList[k].nickName
                                        }
                                        if (j == 21) {
                                            data.time_21 = roomDynamicList[k].nickName
                                        }
                                        if (j == 22) {
                                            data.time_22 = roomDynamicList[k].nickName
                                        }
                                        if (j == 23) {
                                            data.time_23 = roomDynamicList[k].nickName
                                        }
                                    }
                                }
                            }

                        }
                        data.roomCode = roomList[i].roomCode;
                        data.roomName = roomList[i].roomName;
                        dataList.push(data);
                    }

                    rmap.roomDynamicList = dataList || [];
                    if (dataList && dataList.length > 0) {
                        var data = formatListToData(dataList);
                        var uuid = commUtil.createUUID();
                        var filePath = "./logs/reports/" + uuid + ".xlsx";
                        excelUtil.dataToXlsx(data, "房间使用动态", filePath, function (err) {
                            if (err) {
                                log.error("文件类型错误"); //不可能出现的
                            } else {
                                //判断是否存在文件
                                fs.exists(filePath, function (exist) {
                                    if (exist) {
                                        // 将文件返回客户端
                                        var contentType = mime.lookup(filePath);

                                        res.setHeader("Content-Type", contentType + ";chareset=utf-8");
                                        res.setHeader('Content-Disposition', 'attachment; filename=' + uuid + ".xlsx");

                                        var stream = fs.createReadStream(filePath);
                                        stream.on("end", function () {
                                            //删除临时文件
                                            fs.unlink(filePath);
                                        });
                                        stream.pipe(res);
                                    } else {
                                        res.send(false);
                                    }
                                })
                            }
                        });
                    } else {
                        res.send(false);
                    }
                }
            });

        }
    });
});
function formatListToData(list) {
    var data = [];
    var titles = ["房间号", "房间名", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00", '直播间使用小时'];
    data.push(titles);
    for (var index  in list) {
        var item = list[index];
        var exchangeArray = [];
        var roomCode = item.roomCode;
        var roomName = item.roomName;
        var time_0 = item.time_0;
        var time_1 = item.time_1;
        var time_2 = item.time_2;
        var time_3 = item.time_3;
        var time_4 = item.time_4;
        var time_5 = item.time_5;
        var time_6 = item.time_6;
        var time_7 = item.time_7;
        var time_8 = item.time_8;
        var time_9 = item.time_9;
        var time_10 = item.time_10;
        var time_11 = item.time_11;
        var time_12 = item.time_12;
        var time_13 = item.time_13;
        var time_14 = item.time_14;
        var time_15 = item.time_15;
        var time_16 = item.time_16;
        var time_17 = item.time_17;
        var time_18 = item.time_18;
        var time_19 = item.time_19;
        var time_20 = item.time_20;
        var time_21 = item.time_21;
        var time_22 = item.time_22;
        var time_23 = item.time_23;
        var roomLiveTime = 0;
        exchangeArray.push(roomCode);
        exchangeArray.push(roomName);
        exchangeArray.push(time_0);
        exchangeArray.push(time_1);
        exchangeArray.push(time_2);
        exchangeArray.push(time_3);
        exchangeArray.push(time_4);
        exchangeArray.push(time_5);
        exchangeArray.push(time_6);
        exchangeArray.push(time_7);
        exchangeArray.push(time_8);
        exchangeArray.push(time_9);
        exchangeArray.push(time_10);
        exchangeArray.push(time_11);
        exchangeArray.push(time_12);
        exchangeArray.push(time_13);
        exchangeArray.push(time_14);
        exchangeArray.push(time_15);
        exchangeArray.push(time_16);
        exchangeArray.push(time_17);
        exchangeArray.push(time_18);
        exchangeArray.push(time_19);
        exchangeArray.push(time_20);
        exchangeArray.push(time_21);
        exchangeArray.push(time_22);
        exchangeArray.push(time_23);
        exchangeArray.push(roomLiveTime);
        data.push(exchangeArray);
    }
    return data;
}
module.exports = router;