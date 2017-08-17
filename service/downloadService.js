/**
 * Created by Linyi on 2016/4/11 0011.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var log = require('../util/log');
var commUtil = require('../util/commUtil');
var fs = require("fs");
var mime = require("mime");

router.get('/download_file', function (req, res) {
    var filename = req.param("filename");
    //判断是否存在文件
    var filePath = "../../h5_proj/" + filename;
    fs.exists(filePath, function (exist) {
        if (exist) {
            // 将文件返回客户端
            var contentType = mime.lookup(filePath);
            res.setHeader("Content-Type", contentType + ";chareset=utf-8");
            res.setHeader('Content-Disposition', 'attachment; filename=start.sh');

            var stream = fs.createReadStream(filePath);
            stream.on("end", function () {
                //删除临时文件
                //fs.unlink(filePath);
                res.end();
            });
            stream.pipe(res);
        } else {
            res.send(false);
        }
    })
});

module.exports = router;