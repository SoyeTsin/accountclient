/**
 * Created by Linyi on 2015/9/21 0021.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var artistGearDao = function () {

};
artistGearDao.prototype.getRoomList = function (cb) {
    var sql = "select * from cr_roominfo";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

artistGearDao.prototype.getArtistList = function (sociatyId, cb) {
    var sql = "SELECT ui.uuid,ui.nickName,ui.userName,ar.sociatyId FROM cr_userinfo ui left JOIN cr_artistref ar ON ar.uuId = ui.uuid where ar.sociatyId=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [sociatyId], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

artistGearDao.prototype.getGearList = function (data, cb) {
    var sql = "select * from st_gear ri WHERE roomId=? and  DATE_FORMAT(creDate,'%Y-%m-%d')>=? and  DATE_FORMAT(creDate,'%Y-%m-%d')<=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [data.initRoom.roomCode, data.date.startDate, data.date.endDate], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

module.exports = artistGearDao;