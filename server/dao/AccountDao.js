/*
var connection = require('../MySQLConnect');

export class AccountDao {

        findCredentialsByUsername(username, callback) {
        connection.init();
        connection.acquire(function (err, con) {
                con.query(`SELECT * FROM accounts WHERE accounts.username='${username}'`, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    if (result.length === 0) {
                        return callback("No record found",null);

                    }
                    con.end();
                    callback(err, JSON.parse(JSON.stringify(result))[0]);

                })

        });

    };

}*/



var pool= require('../MySQLConnect');
export class AccountDao {

    findCredentialsByUsername(username, callback) {
        pool.getConnection(function(err,connection){
            if (err) {
                console.log(err);
                connection.release();
                throw err;
            }
            const sql = `SELECT * FROM accounts WHERE accounts.username='${username}'`;

            connection.query(sql,function(error,result){
                connection.release();
                if (result.length === 0) {
                    return callback("No record found",null);

                }
                callback(err, JSON.parse(JSON.stringify(result))[0]);
            });
            connection.on('error', function(err) {
                throw err;
            });
        });


    }

    findUserByAddress(account_address, callback){
        pool.getConnection(function(err,connection){
            if (err) {
                console.log(err);
                connection.release();
                throw err;
            }
            const sql = `SELECT * FROM accounts WHERE accounts.address='${account_address}'`;

            connection.query(sql,function(error,result){
                connection.release();
                if (result.length === 0) {
                    return callback("No record found",null);

                }
                callback(err, JSON.parse(JSON.stringify(result))[0]);
            });
            connection.on('error', function(err) {
                throw err;
            });
        });
    }
}