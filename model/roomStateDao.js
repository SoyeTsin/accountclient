/**
 * Created by Linyi on 2015/9/18 0018.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var roomStateDao = function () {

};

roomStateDao.prototype.getRoomStateList = function (cb) {
    var sql = "select ri.*,ui.nickName from cr_roominfo ri left JOIN cr_userinfo ui ON ri.user_uuid=ui.uuid";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}


module.exports = roomStateDao;