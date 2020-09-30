/*

import mysql from 'mysql';

function MySQLConnect(){
    this.pool = null;

    this.init = function(){
       this.pool = mysql.createPool({
            connectionLimit: 0,
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'auction_db',
            multipleStatements : true
        });
    };

    this.acquire = function (callback) {

        this.pool.getConnection(function (err, connection) {
            console.log(err);
            callback(err, connection)
        })

    }

}

module.exports = new MySQLConnect();*/


var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'auction_db',
    debug    :  false
});
module.exports = pool;
