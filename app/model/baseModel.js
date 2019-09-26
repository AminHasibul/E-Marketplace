var sql = require('../../libs/dbConnect/mysqlCon');
var CommonEnum = require('../../libs/helper/enums.js');
var logger = require('../../libs/helper/logger');
var { Paging } = require('../../libs/utility/pageSetup');

var insertSingleData = function (TableName, Item,callback) 
{
    return insertMaster(TableName, Item, callback)
}

var insertChildData = function (TableName, ItemList, refID, callback, isChild) {
    if (isChild == fasle) 
    {
        return insertMultipleItems(TableName, ItemList, callback)
    }
    if (isChild) 
    {
        return insertMultipleChildItems(TableName, ItemList, refID, callback)
    }
}

function insertMaster(TableName, Items, callback) 
{
   // sql.query('INSERT INTO '+ TableName+' SET ?', [Items], function (err, result) {
    //    return callback(err, result);
    //});

    Items.forEach(function (Item)
    {
        sql.query('INSERT INTO '+ TableName +' SET ?', [Item], function (err, data) {
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
               // console.log (userId);
                //callback(null, data);
                
            }
        });
    })
}

function insertMultipleChildItems(TableName, ItemList, callback) {
    async.each(ItemList, function (Item, asyncCallback) {
        connection.query('INSERT INTO '+ TableName+' SET ?', [ Item], function (err, data) {
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                //console.log (userId);
               // callback(null, data);
                
            }
        });
    })
       /*() function (err) {
            if (err) {
                return callback(err);
            }
        });*/
}

function getNextSeqForPrimaryKey(tableName,rowCount,result)
{
    var dt = new Date();
    var year = dt.getFullYear();
    sql.query('SELECT NextGenID FROM PrimaryKeyGenerator WHERE TableName =? AND Year = ?' , [tableName, year],
    function (err, [{NextGenID}])
    {
        if (err)
        {
            
            console.log("error: ", err);
            return (null, err);
        }
        else
        {
            console.log("error: ",NextGenID);
            var nxtID =NextGenID+rowCount;
            updateNextSeqGenID(tableName,year,NextGenID);
            logger.info("getting next avaiable no  for primary key generator",result);
            return (null,NextGenID);
        }
    });
}

function updateNextSeqGenID(TableName,Year,rowCount,result)
{
    try
    {
        let sqlSP = `CALL spPrimaryKeyGenerator (?,?,?)`;
        sql.query(sqlSP, [TableName,Year,rowCount],
        function (err, res)
        {
            if (err)
            {
               
                console.log("error: ", err);
               return err;
            }
            else
            {
                console.log("Result: ",res);
                logger.info("Updating next avaiable no  for primary key generator",res);
                return res;
            }
        });

    }
    catch(ex)
    {
        throw ex;
    }
}

var getUniqueSeqForchild = function(tableName,rowCount)
{
    try
    {
        var seqNo = Math.random(6);
        seqNo = Number(seqNo.toString().slice(12));
        getNextSeqForPrimaryKey(tableName,rowCount,seqNo);
        
        return seqNo;
    }
    catch(ex)
    {
        throw ex;
    }
}
var makeUniqueKeyForMaster = function(tableName,rowCount,tableprefix)
{
    try
    {
        var dt = new Date();
        var year = dt.getFullYear();
        var seqNo = Math.random(6);
        seqNo = Number(seqNo.toString().slice(12));
        getNextSeqForPrimaryKey(tableName,rowCount,seqNo);
        
        return tableprefix+"-"+year+"-"+seqNo;
    }
    catch(ex)
    {
        throw ex;
    }
}
var makeUniqueKeyForchild = function(seqNo,tableprefix)
{
    try
    {
        var dt = new Date();
        var year = dt.getFullYear();
        return tableprefix+"-"+year+"-"+seqNo;
    }
    catch(ex)
    {
        throw ex;
    }
}


module.exports = {
    insertSingleData,
    insertChildData,
    getUniqueSeqForchild,
    makeUniqueKeyForMaster,
    makeUniqueKeyForchild
}