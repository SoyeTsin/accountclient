/**
 * Created by Linyi on 2015/9/15 0015.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
//var IncomeInputDao = require('../model/incomeInputDao');
//var incomeInputDao = new IncomeInputDao();
var session = require('express-session');
var request = require('request');

router.post('/setUser', function (req, res) {
    var data = req.param("data");
    request.post('http://sso.baofeng.net/api/reg/client', {
        form: {
            loginname: data.userName,
            password: data.password
        }
    }, function () {
        res.send(request);
    });
});
module.exports = router;