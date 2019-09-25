const config = require('config') ;
const mysql = require('mysql');
const logger = require('../helper/logger')

logger.info("Opening connection to MySql DB")

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
};
'user strict';

const connection = mysql.createConnection({
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
connection.connect(function(err)
 {
    if (err)
    {
        logger.info("Connection Error:" + err.message.toString());
        throw err;
    }
});


const rollback = function (connection, err) 
{
    connection.rollback(function () 
    {
        throw err;
    });
}

const commit = function(connection)
 {
    connection.commit(function (err)
    {
        if (err) {
            rollback(connection, err);
        }
        console.log('success!');
    });
}

module.exports = connection;