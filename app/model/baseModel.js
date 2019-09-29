var sql = require('../../libs/dbConnect/mysqlCon');
var CommonEnum = require('../../libs/helper/enums.js');
var logger = require('../../libs/helper/logger');
var { Paging } = require('../../libs/utility/pageSetup');

/*var insertSingleData = function (TableName, Item) 
{
    insertMaster(TableName, Item);
}

var insertChildData = function (TableName, ItemList, isChild)
{insertMasterChildData
    if (isChild == fasle) 
    {
        insertMultipleItems(TableName, ItemList)
    }
    if (isChild) 
    {
        insertMultipleChildItems(TableName, ItemList);
    }
}*/

const insertMasterChildData = function(tablelist,valueList,con,callback)
{
    try
    {
        console.log(tablelist);
        console.log(valueList);

        if(tablelist.length != valueList.length)
        {
            console.log("Error Tablelist length and value list did not match ");
            return "Error Tablelist length and value list did not match "
        }
        var result ="";

        tablelist.forEach(function (tableNames)
        {        
            valueList.forEach(function (values)
            {
                values.forEach(function (valuelist)
                {
                    // matching the table name for ensuring updating data only in to the matching table field
                    if(tableNames == valuelist.TableName)
                    {
                        // removing the extra column which is not in the table
                        delete valuelist.TableName;

                        sql.query('INSERT INTO '+ tableNames +' SET ?', [valuelist], function (err, data) 
                        {
                            if(err)
                            {
                                console.log("error: ", err);
                                result = err;
                                callback(null,err);
                            }
                            else
                            {
                                result += data;
                            }
                        });
                    }
                });
            });
        })
        //sql.end();
        callback (null,result);
    }
    catch (ex) 
    {
        console.log(ex);
        throw ex;
    }    
}

const insertSingleData = function (TableName, Items,callback) 
{
    var result ="";
    Items.forEach(function (Item)
    {        
        sql.query('INSERT INTO '+ TableName +' SET ?', [Item], function (err, data) {
            if(err)
            {
                console.log("error: ", err);
                result = err;
                callback(null,err);
            }
            else
            {
                result += data;
               // console.log (userId);
                //return callback(null, data);
                
            }
        });
    })
    //sql.end();
    callback (null,result);
}

const insertChildData = function (TableName, ItemList)
{
    var result ="";
    ItemList.each(ItemList, function (Item)
    {
        sql.query('INSERT INTO '+ TableName +' SET ?', [Item], function (err, data)
        {
            if(err)
            {
                console.log("error: ", err);
                callback( null,err);
            }
            else{
                console.log (data);
                result += data;
                
                
            }
        });
    })
    //sql.end();
    sql.end();
    return result;
   // callback(null, result);
    //callback();
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
            return (err);
        }
        else
        {
            console.log("error: ",NextGenID);
            var nxtID =NextGenID+rowCount;
            updateNextSeqGenID(tableName,year,NextGenID);
            logger.info("getting next avaiable no  for primary key generator",result);
            return (NextGenID);
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
                return (err);
            }
            else
            {
                console.log("Result: ",res);
                logger.info("Updating next avaiable no  for primary key generator",res);
                return (res);
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
    makeUniqueKeyForchild,
    insertMasterChildData
}