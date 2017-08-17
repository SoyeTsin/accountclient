/**
 * Created by Linyi on 2015/9/15 0015.
 */
var db = require('./db.js');
var db2 = require('./db2.js');
var db3 = require('./db3.js');
var incomeInputDao = function () {

};

incomeInputDao.prototype.getIncomeGiftList = function (sociaty, yesDay, lastWeekStart, lastWeekEnd, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_gift_bill' + "_" + i;
            var selTableSql = "select table_name from information_schema.tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    var sql = "SELECT e.uuid,e.nickName,f.yesDayIncome,f.weekIncome,f.income FROM (SELECT ui.uuid,ui.nickName,ui.userName,ar.sociatyId FROM cr_userinfo ui left JOIN cr_artistref ar ON ar.uuId = ui.uuid where ar.sociatyId=?) e LEFT JOIN (SELECT c.uuid,c.yesDayIncome,c.weekIncome,d.income FROM(SELECT a.uuid,a.yesDayIncome,b.weekIncome from(SELECT sum(g1.money_dif*-1) yesDayIncome,g1.to_uuid uuid FROM " + newtableName + " g1 WHERE DATE_FORMAT(g1.cre_time,'%Y-%m-%d')=? GROUP BY g1.to_uuid) a left JOIN (SELECT sum(g2.money_dif*-1) weekIncome,g2.to_uuid uuid FROM " + newtableName + " g2  WHERE DATE_FORMAT(g2.cre_time,'%Y-%m-%d')>=? and DATE_FORMAT(g2.cre_time,'%Y-%m-%d')<=? GROUP BY g2.to_uuid) b ON a.uuid=b.uuid) c left JOIN (SELECT sum(g3.money_dif*-1) income,g3.to_uuid uuid FROM " + newtableName + " g3  GROUP BY g3.to_uuid) d ON c.uuid=d.uuid) f ON e.uuid = f.uuid";
                    connection.query(sql, [sociaty.sociatyId, yesDay, lastWeekStart, lastWeekEnd], function (err, row) {
                        if (row.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                                for (var j = 0; j < row.length; j++) {
                                    if (rows[i].uuid == row[j].uuid) {
                                        rows[i].yesDayIncome = rows[i].yesDayIncome + row[j].yesDayIncome;
                                        rows[i].weekIncome = rows[i].weekIncome + row[j].weekIncome;
                                        rows[i].income = rows[i].income + row[j].income;
                                    }
                                }
                            }
                            for (var i = 0; i < rows.length; i++) {
                                for (var j = 0; j < row.length; j++) {
                                    if (rows[i].uuid == row[j].uuid) {
                                        row[j].uuid = 0;
                                    }
                                }
                            }
                            for (var j = 0; j < row.length; j++) {
                                if (row[j].uuid != 0) {
                                    rows.push(row[j]);
                                }
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

incomeInputDao.prototype.getIncomeGuardList = function (sociaty, yesDay, lastWeekStart, lastWeekEnd, cb) {
    db2.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];

        function getConsumeDataFun(i) {
            var newtableName = 't_guard_bill' + "_" + i;
            var selTableSql = "select table_name from information_schema.tables where table_name ='" + newtableName + "'";
            connection.query(selTableSql, [], function (err, rowsTable) {
                if (rowsTable.length > 0) {
                    var sql = "SELECT t.uuid,t.nickName,t.userName,t.sociatyId,t.income,t.weekIncome,y.yesDayIncome FROM(SELECT a.uuid,a.nickName,a.userName,a.sociatyId,a.income,b.weekIncome FROM (SELECT e.uuid,e.nickName,e.userName,e.sociatyId,d.income FROM (SELECT ui.uuid,ui.nickName,ui.userName,ar.sociatyId FROM cr_userinfo ui left JOIN cr_artistref ar ON ar.uuId = ui.uuid where ar.sociatyId=?) e LEFT JOIN (SELECT sum(g3.price) income,g3.artist_id uuid FROM t_guard_bill_0 g3  GROUP BY g3.artist_id) d ON e.uuid=d.uuid) a LEFT JOIN (SELECT sum(g2.price) weekIncome,g2.artist_id uuid FROM t_guard_bill_0 g2  WHERE DATE_FORMAT(g2.start_time,'%Y-%m-%d')>=? and DATE_FORMAT(g2.start_time,'%Y-%m-%d')<=? GROUP BY g2.artist_id) b ON a.uuid=b.uuid) t LEFT JOIN (SELECT sum(g1.price) yesDayIncome,g1.artist_id uuid FROM t_guard_bill_0 g1 WHERE DATE_FORMAT(g1.start_time,'%Y-%m-%d')=? GROUP BY g1.artist_id) y ON t.uuid=y.uuid";
                    connection.query(sql, [sociaty.sociatyId, lastWeekStart, lastWeekEnd, yesDay], function (err, row) {
                        if (row.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                                for (var j = 0; j < row.length; j++) {
                                    if (rows[i].uuid == row[j].uuid) {
                                        rows[i].yesDayIncome = rows[i].yesDayIncome + row[j].yesDayIncome;
                                        rows[i].weekIncome = rows[i].weekIncome + row[j].weekIncome;
                                        rows[i].income = rows[i].income + row[j].income;
                                    }
                                }
                            }
                            for (var i = 0; i < rows.length; i++) {
                                for (var j = 0; j < row.length; j++) {
                                    if (rows[i].uuid == row[j].uuid) {
                                        row[j].uuid = 0;
                                    }
                                }
                            }
                            for (var j = 0; j < row.length; j++) {
                                if (row[j].uuid != 0) {
                                    rows.push(row[j]);
                                }
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

incomeInputDao.prototype.upData_st_artisttrack = function (data, cb) {
    db.getConnection(function (err, connection) {
        getConsumeDataFun(0);
        var rows = [];
        var errs = [];

        function getConsumeDataFun(i) {
            var selTableSql = "insert into st_artisttrack  set ?";

            connection.query(selTableSql, [data[i]], function (err, row) {
                if (i < data.length) {
                    if (err) {
                        errs.push(err)
                    } else {
                        rows.push(row)
                    }
                    getConsumeDataFun(i + 1);
                } else {
                    connection.release();
                    cb(errs, rows);
                }
            });
        }
    });
}

incomeInputDao.prototype.getLiveList = function (sociaty, monthStart, cb) {
    var sql = "SELECT ui.uuid,ui.nickName,ui.userName,ar.sociatyId FROM cr_userinfo ui left JOIN cr_artistref ar ON ar.uuId = ui.uuid where ar.sociatyId=?";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [sociaty.sociatyId], function (err, row) {
            if (row.length > 0) {
                var rows = [];
                var errs = null;
                var data = row || [];
                getConsumeDataFun(0);

                function getConsumeDataFun(i) {
                    if (i < data.length) {
                        var selTableSql = "SELECT endDate,startDate FROM st_artisttrack  where uuid=? and DATE_FORMAT(startDate,'%Y-%m-%d')>=?";
                        connection.query(selTableSql, [data[i].uuid, monthStart], function (err0, row0) {
                            if (i < data.length) {
                                if (err0) {
                                    errs.push(err0)
                                } else {
                                    //rows.push(row0)
                                    data[i].weekLiveDate = row0;
                                }
                                getConsumeDataFun(i + 1);
                            } else {
                                connection.release();
                                cb(errs, data);
                            }
                        });
                    } else {
                        connection.release();
                        cb(errs, data);
                    }
                }
            } else {
                connection.release();
                cb(errs, rows);
            }
        });
    });
}

incomeInputDao.prototype.likeRoom = function (time, cb) {
    var sql = "SELECT ru.uuid,count(ru.ip) counip,ru.ip,ri.roomName FROM st_room_used_bill ru INNER JOIN cr_roominfo ri ON ri.ip=ru.ip where DATE_FORMAT(ru.startDate,'%Y-%m-%d')>=? GROUP BY ru.ip,ru.uuid order by counip asc";
    db2.getConnection(function (err, connection) {
        connection.query(sql, [time], function (err, rows) {
            connection.release();
            cb(err, rows);
        });
    });
}

module.exports = incomeInputDao;