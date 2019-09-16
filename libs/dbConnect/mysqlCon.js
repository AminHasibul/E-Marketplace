var config = require('config') ;
var mysql = require('mysql');

const DBOptions = {
    host: config.get('MYSQL.HOST'),
    user: config.get('MYSQL.USER'),
    password: config.get('MYSQL.PASSWORD'),
    database: config.get('MYSQL.DATABASE'),
    dialect: config.get('MYSQL.DIALECT'),
    pool: {
        min:0,
        max:5,
    }
    //dialectModulePath:config.get('MYSQL.dialectModulePath')
};
'user strict';



//local mysql db connection
var connection = mysql.createConnection({
    host     : DBOptions.host,
    user     : DBOptions.user,
    password : DBOptions.password,
    database : DBOptions.database,
    dialect  : DBOptions.dialect,
    define: {timestamps: false},

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;