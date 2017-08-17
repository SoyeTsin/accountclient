/**
 * Created by Linyi on 2015/9/18 0018.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var payDao = function () {

};

payDao.prototype.phoneCheck = function (phone, cb) {
    var sql = "select * from t_baofeng_record where account=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [phone], function (err, row0) {
            if (row0.length > 0) {
                var rows = [];
                var uuid = row0[0].uuid;
                var sql = 'select * from t_yl_userinfo where uuid = ?';
                db.getConnection(function (err, connection) {
                    connection.query(sql, uuid, function (err, rows) {
                        connection.release();
                        cb(err, rows);
                    });
                });
            } else {
                connection.release();
                cb(err, row0);
            }
        });
    });
}

payDao.prototype.getRoomDynamicList = function (dataDay, cb) {
    var sql = "SELECT ri.roomCode,ri.roomName,rub.uuid,rub.nickName,rub.ip,rub.startDate,rub.endDate FROM cr_roominfo ri RIGHT JOIN (SELECT ui.nickName,ru.uuid,ru.ip,ru.startDate,ru.endDate FROM cr_userinfo ui RIGHT JOIN st_room_used_bill ru ON ru.uuid=ui.uuid where DATE_FORMAT(ru.startDate,'%Y-%m-%d')=?) rub ON ri.ip=rub.ip";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [dataDay], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

payDao.prototype.selUserInfo = function (userId, cb) {
    var sql = 'select * from cr_userinfo where uuid = ?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, userId, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}


payDao.prototype.uuidCheck = function (uuid, cb) {
    var sql = 'select * from t_yl_userinfo where uuid = ?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, uuid, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}
module.exports = payDao;