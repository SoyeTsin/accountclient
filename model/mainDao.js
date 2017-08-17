/**
 * Created by Linyi on 2015/6/3 0003.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var mainDao = function () {

};
/**
 * 根据暴风userid查找风秀id
 * @param uuid
 * @param cb
 */
mainDao.prototype.getUserObj_uuid = function (userid, cb) {
    var sql = 'SELECT uuid,userid FROM t_baofeng_account WHERE userid=?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, userid, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}
/**
 * 根绝uuid查找用户昵称
 * @param userid
 * @param cb
 */
mainDao.prototype.getUserObj_nick = function (uuid, cb) {
    var sql = 'SELECT * FROM t_yl_userinfo WHERE uuid=?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, uuid, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getUser = function (uuid, cb) {
    var sql = 'SELECT * from t_yl_userinfo where uuid=?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, uuid, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getRoomSelectList = function (userId, cb) {
    var sql = 'SELECT ci.rid,ci.channelName from cr_channelinfo ci INNER JOIN cr_channeladmininfo cai on(cai.channelId=ci.rid) WHERE cai.uuid= ?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, userId, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}


mainDao.prototype.getArtistList = function (userId, cb) {
    var sql = 'select * from cr_userinfo where rid = ?';
    db2.getConnection(function (err, connection) {
        connection.query(sql, userId, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getSociatyList = function (uuid, cb) {
    var sql = 'SELECT asd.sociatyId,asd.sociatyName,asd.sociatyLogoUrl,asd.sociatyIconUrl,asd.sociatyCode,asd.uuid,asd.userName,asd.nickName,asd.creDate,arr.count FROM (SELECT ss.*,ui.userName,ui.nickName FROM cr_userinfo ui right JOIN (SELECT si.rid,sr.uuId,si.sociatyName,si.sociatyCode,si.sociatyLogoUrl,si.sociatyIconUrl,si.rid sociatyId,si.creDate FROM cr_sociatyinfo si INNER JOIN cr_sociatyref sr ON si.rid = sr.sociatyId where si.uuid=?) ss ON ss.uuId=ui.uuid) asd LEFT JOIN (SELECT COUNT(*) count,ar.sociatyId FROM cr_artistref ar GROUP BY ar.sociatyId) arr ON (asd.sociatyId=arr.sociatyId)';
    db2.getConnection(function (err, connection) {
        connection.query(sql, uuid, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getUserAsset = function (type, cb) {
    db2.getConnection(function (err, connection) {
        var sql = "select FORMAT(SUM(gg.giveNum*gi.price),2) incomeSum from cr_givegiftref gg INNER JOIN cr_giftinfo gi ON(gg.giftId=gi.rid) where gg.getUserId=? and gg.giveDate>=? AND gg.giveDate<?";
        connection.query(sql, [type.userId, type.yesterday[0], type.yesterday[1]], function (err, yesterdayIncome) {
            connection.query(sql, [type.userId, type.Week[0], type.Week[7]], function (err, weekIncome) {
                var sql_userAsset = 'select FORMAT(assetSum,2) assetSum from st_asset where uuid = ?';
                connection.query(sql_userAsset, type.userId, function (err, assetSum) {
                    connection.release();
                    cb(err, yesterdayIncome, weekIncome, assetSum);
                });
            });
        });
    });
}

mainDao.prototype.login = function (userName, cb) {
    db2.getConnection(function (err, connection) {
        var sql = 'select * from cr_userinfo where userName = ?';
        connection.query(sql, userName, function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}
/**
 * ҵ���߼�
 * @type {Function}
 */

mainDao.prototype.getTotal_gift = function (uuid, startDate, endDate, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_gift_bill' + "_" + i;
            var selTableSql = "select table_name from information_schema.tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    var sql = "SELECT b.uuid,b.cre_time time,(b.money_dif*-1) pay,b.to_uuid,b.to_nick,g.giftName,b.gift_num FROM " + newtableName + " b INNER JOIN cr_giftinfo g ON g.giftCode=b.gift_id WHERE b.uuid=? and b.gift_id!=99 and DATE_FORMAT(b.cre_time,'%Y-%m-%d')>=? and DATE_FORMAT(b.cre_time,'%Y-%m-%d')<=?";
                    connection.query(sql, [uuid, startDate, endDate], function (err, row) {
                        if (row.length > 0) {
                            for (var j = 0; j < row.length; j++) {
                                rows.push(row[j]);
                            }
                            getConsumeDataFun(i + 1);
                        } else {
                            getConsumeDataFun(i + 1);
                        }
                    });
                } else {
                    connection.release();
                    cb(err, rows);
                }
            });
        }
    });
}


mainDao.prototype.getTotal_guard = function (uuid, startDate, endDate, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_guard_bill' + "_" + i;
            var selTableSql = "select table_name from information_schema.tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    var sql = "SELECT a.uuid,a.total pay,a.start_time time,a.artist_id,u.nickName artistNick,a.month FROM " + newtableName + " a INNER JOIN cr_userinfo u ON a.artist_id=u.uuid WHERE a.uuid=? and DATE_FORMAT(a.start_time,'%Y-%m-%d')>=? and DATE_FORMAT(a.start_time,'%Y-%m-%d')<=?";
                    connection.query(sql, [uuid, startDate, endDate], function (err, row) {
                        if (row.length > 0) {
                            for (var j = 0; j < row.length; j++) {
                                rows.push(row[j]);
                            }
                            getConsumeDataFun(i + 1);
                        } else {
                            getConsumeDataFun(i + 1);
                        }
                    });
                } else {
                    connection.release();
                    cb(err, rows);
                }
            });
        }
    });
}


mainDao.prototype.getTotal_car = function (uuid, startDate, endDate, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_car_bill' + "_" + i;
            var selTableSql = "select table_name from information_schema.tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    var sql = "SELECT c.uuid,c.price pay,c.start_time time,y.name carName,c.buy_renew,c.month FROM " + newtableName + " c INNER JOIN t_yl_car_cfg y ON c.car_id=y.rid WHERE c.uuid=? and DATE_FORMAT(c.start_time,'%Y-%m-%d')>=? and DATE_FORMAT(c.start_time,'%Y-%m-%d')<=?";
                    connection.query(sql, [uuid, startDate, endDate], function (err, row) {
                        if (row.length > 0) {
                            for (var j = 0; j < row.length; j++) {
                                rows.push(row[j]);
                            }
                            getConsumeDataFun(i + 1);
                        } else {
                            getConsumeDataFun(i + 1);
                        }
                    });
                } else {
                    connection.release();
                    cb(err, rows);
                }
            });
        }
    });
}


mainDao.prototype.getRechargeList = function (uuid, startDate, endDate, cb) {
    var sql = "select order_id,from_uuid,from_unixtime(order_timestamp,'%Y-%m-%d %H:%i:%s') order_timestamp,money,goods_num,status from t_order_info where from_uuid = ? and from_unixtime(order_timestamp,'%Y-%m-%d')>=? and from_unixtime(order_timestamp,'%Y-%m-%d')<=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [uuid, startDate, endDate], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getMoneyList = function (uuid, startDate, endDate, cb) {
    var sql = "SELECT * FROM t_money_record mr INNER JOIN t_yl_userinfo nu ON nu.uuid=mr.to_uuid WHERE mr.type=10 and mr.uuid=?  and DATE_FORMAT(mr.cte_time,'%Y-%m-%d')>=? and DATE_FORMAT(mr.cte_time,'%Y-%m-%d')<=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [uuid, startDate, endDate], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

mainDao.prototype.getBalance = function (uuid, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_user_money_' + i;
            var selTableSql = "select table_name from information_schema. tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    //" + newtableName + "
                    var sql = "SELECT * from " + newtableName + " where money_type=0 and uuid=?";
                    connection.query(sql, [uuid], function (err, row) {
                        if (row.length > 0) {
                            for (var j = 0; j < row.length; j++) {
                                rows.push(row[j]);
                            }
                            getConsumeDataFun(i + 1);
                        } else {
                            getConsumeDataFun(i + 1);
                        }
                    });
                } else {
                    connection.release();
                    cb(err, rows);
                }
            });
        }
    });
}

module.exports = mainDao;