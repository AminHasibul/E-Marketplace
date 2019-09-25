var sql = require('../../../libs/dbConnect/mysqlCon.js');
var CommonEnum = require('../../../libs/helper/enums.js');
var logger = require('../../../libs/helper/logger');
var {Paging} = require('../../../libs/utility/pageSetup');

var insertSingleData = function (TableName,Item)
{
    return insertMaster(TableName,Item,callback)
}

var insertChildData = function (TableName,ItemList,refID,callback,isChild)
{
    if(isChild == fasle)
    {
        return insertMultipleItems(TableName,ItemList,callback)
    }
    if(isChild)
    {
        return insertMultipleChildItems(TableName,ItemList,refID,callback)
    }
}

function insertMaster(TableName,Items, callback)
{
    sql.query('INSERT INTO ? SET ?', [TableName,Items],function (err, result)
    {
        return callback(err, result);
    });
}

function insertMultipleChildItems(TableName, ItemList,refID,callback)
{
    async.each(ItemList, function (Item, asyncCallback)
    {
        connection.query('INSERT INTO ? SET ?', [TableName,Item], function (err, data) {
            return asyncCallback(err, data);
        });
    }, 
    function (err) 
    {
        if (err)
        {
            return callback(err);
        }
        return callback();
    });
}

var lastRowNow = function(TableName)
{
    connection.query('')
}; 
module.exports = {
    insertSingleData,
    insertChildData,
    lastRowNow}