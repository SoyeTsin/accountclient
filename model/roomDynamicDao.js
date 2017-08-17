/**
 * Created by Linyi on 2015/9/18 0018.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var roomDynamicDao = function () {

};
roomDynamicDao.prototype.getRoomList = function (cb) {
    var sql = "select * from cr_roominfo";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

roomDynamicDao.prototype.getRoomDynamicList = function (dataDay, cb) {
    var sql = "SELECT ri.roomCode,ri.roomName,rub.uuid,rub.nickName,rub.ip,rub.startDate,rub.endDate FROM cr_roominfo ri RIGHT JOIN (SELECT ui.nickName,ru.uuid,ru.ip,ru.startDate,ru.endDate FROM cr_userinfo ui RIGHT JOIN st_room_used_bill ru ON ru.uuid=ui.uuid where DATE_FORMAT(ru.startDate,'%Y-%m-%d')=?) rub ON ri.ip=rub.ip";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [dataDay], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}


module.exports = roomDynamicDao;