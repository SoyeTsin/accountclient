/**
 * Created by Linyi on 2015/9/18 0018.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var RoomStateDao = require('../model/roomStateDao');
var roomStateDao = new RoomStateDao();
var session = require('express-session');

router.post('/getRoomStateList', function (req, res) {
    //var remember = req.param("remember");
    var rmap = {code: 0};
    roomStateDao.getRoomStateList(function (err, rows) {
        if (err) {
            log.error(err);
            rmap.code = -1;
        } else {
            rmap.roomStateList = rows || [];
        }
        res.send(rmap);
    });
});

module.exports = router;