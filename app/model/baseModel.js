var sql = require('../../libs/dbConnect/mysqlCon');
var CommonEnum = require('../../libs/helper/enums.js');
var logger = require('../../libs/helper/logger');
var { Paging } = require('../../libs/utility/pageSetup');

// var insertSingleData = function (TableName, Item) 
// {
//     insertMaster(TableName, Item);
// }

// var insertChildData = function (TableName, ItemList, isChild)
// {insertMasterChildData
//     if (isChild == fasle) 
//     {
//         insertMultipleItems(TableName, ItemList)
//     }
//     if (isChild) 
//     {
//         insertMultipleChildItems(TableName, ItemList);
//     }
// }
//#region  MasterChild data addition

function InsertParentChildData(tablelist, valueList, con, purchase) {
    try 
    {
        if (tablelist.length != valueList.length) {
            return "Error Tablelist length and value list did not match "
        }
        var result = "";
        var i = 0;
        var totalRows = 0;
        console.log(valueList);
        tablelist.forEach(function (tableNames)
        {
            var affeftedRow = 0;
            valueList.forEach(function (values) 
            {
                console.log(values);
               
                console.log (totalRows);
                values.forEach( function (valuelist) 
                {                   
                    // matching the table name for ensuring updating data only in to the matching table field
                    if (tableNames == valuelist.TableName)
                    { 
                        totalRows ++;
                        // removing the extra column which is not in the table
                        delete valuelist.TableName;

                        sql.query('INSERT INTO ' + tableNames + ' SET ?', [valuelist],function (err, data) 
                        {
                            if(err)
                            {
                                console.log("errorT: ", err);
                                result = err;
                                purchase(null,err);
                            }
                            else
                            {
                                i++;
                                affeftedRow += data.affectedRows;
                                result = affeftedRow;
                                if ( i >= totalRows)
                                {
                                    //sql.end();
                                    purchase (null,result);
                                }
                            }
                        });
                    }
                });
              
            });
           
        })
        //sql.end();
    }
    catch (error) {
        throw error;
    }
   
}

const insertMasterChildData = function (tablelist, valueList, con, purchase) {
    try 
    {
        return InsertParentChildData(tablelist, valueList, con, purchase)
         ;
    }
    catch (ex) {
        throw ex;
    }
}
//#endregion
const insertSingleData = function (TableName, Items, callback) {
    var result = "";
    
    sql.query('INSERT INTO ' + TableName + ' SET ?', [Items], function (err, data) 
    {
        if (err) {
            console.log("error: ", err);
            result = err;
            callback(null, err);
        }
        else {
            return callback(null, data);

        }
    });

    //sql.end();
}
const insertData = function (TableName, callback)
{
    var result = "";
    
    sql.query('Insert into ' + TableName + ' (SELECT bid_id, bid_status, owner_id, truck_id, truck_no, imei_id, convert(owner_rate, decimal(27,2)) as owner_rate, request_id, shipper_id,'+
      'distance, convert(rate, decimal(27,2)) as rate, pick_district, pick_division, pick_add, pick_add_title, drop_district, drop_division, drop_add,'+
      'drop_add_title, shipper_name, shipper_phone, pick_time, number_of_truck, tt_category, product_type, pick_thanaId, drop_thanaId,'+
      'pick_unionId, pick_areaId, drop_unionId, drop_areaId,status, listed, admin_user, convert(trip_price,'+
      'decimal(27,2)) as trip_price, convert(owner_price, decimal(27,2)) as owner_price,'+
      'convert(shipper_advance, decimal(27,2)) as shipper_advance, convert(owner_advance, decimal(27,2)) as owner_advance, convert(driver_commission,'+
      'decimal(27,2)) as driver_commission, username, phone, model, review, truck_categrory_text, tt_open_cover '+
      ' from shipper_new_bids) ',function (err, data) 
    {
        if (err) {
            console.log("error: ", err);
            result = err;
            callback(null, err);
        }
        else {
            callback(null, data);

        }
    });

    //sql.end();
}
var insertDataAsCollection = function (TableName, ItemList) 
{
    var i = 0;
    var totalRows = 0;
    var affeftedRow = 0;
    Items.forEach(function (Item)
    {
        totalRows ++;
        sql.query('INSERT INTO ' + TableName + ' SET ?', [Item], function (err, data) 
        {
            if (err) {
                console.log("error: ", err);
                result = err;
                callback(null, err);
            }
            else 
            {
                i++;
                affeftedRow += data.affectedRows;
                result = affeftedRow;
                if ( i >= totalRows)
                {
                    //sql.end();
                    callback (null,result);
                }
                //r//eturn callback(null, data);

            }
        });
    })
    //sql.end();
}

async function getNextSeqForPrimaryKey(tableName, rowCount, result) {
    var dt = new Date();
    var year = dt.getFullYear();
    try 
    {
        var NextGenID = await sql.query('SELECT NextGenID FROM PrimaryKeyGenerator WHERE TableName =? AND Year = ?', [tableName, year]);

        if (NextGenID.err) {
            result = NextGenID.err;
        }
        else 
        {
            result = NextGenID;
            var nxtID = NextGenID + rowCount;
            await updateNextSeqGenID(tableName, year, NextGenID);
            logger.info("getting next avaiable no  for primary key generator", result);
            //return (NextGenID);
        }
        /*, [tableName, year],
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
                await  updateNextSeqGenID(tableName,year,NextGenID);
                logger.info("getting next avaiable no  for primary key generator",result);
                return (NextGenID);
            }    
        });*/
        return result;
    }
    catch (ex) {
        throw ex;
    }
    finally {
        sql.end;
    }
}

async function updateNextSeqGenID(TableName, Year, rowCount, result) {
    try {
        let sqlSP = `CALL spPrimaryKeyGenerator (?,?,?)`;
        result = await sql.query(sqlSP, [TableName, Year, rowCount]);

        return result;


    }
    catch (ex) {
        throw ex;
    }
}

var getUniqueSeqForchild =  function (tableName, rowCount) {
    try {
        var seqNo = Math.random(6);
       
       // await getNextSeqForPrimaryKey(tableName, rowCount, seqNo);
        seqNo = Number(seqNo.toString().slice(14));
        return seqNo;
    }
    catch (ex) {
        throw ex;
    }
}
var makeUniqueKeyForMaster =  function (tableName, rowCount, tableprefix) {
    try {
        var dt = new Date();
        var year = dt.getFullYear();
        var date = dt.getUTCDay();
        console.log (date);
        var seqNo = Math.random(6);
        seqNo = Number(seqNo.toString().slice(14));
        //seqNo = await getNextSeqForPrimaryKey(tableName, rowCount, seqNo);
        var mn = dt.getMonth();
        var date = dt.getDate();

        console.log (date);
        var time = dt.getHours(+6);
        var ms = dt.getMilliseconds();
        seqNo = time+""+ms+seqNo;
        console.log (seqNo);
        return tableprefix + "-" + year + "-"+mn+date+"-"+ seqNo;
    }
    catch (ex) {
        throw ex;
    }
}
var makeUniqueKeyForchild = function (seqNo, tableprefix) {
    try 
    {
        var dt = new Date();
        var year = dt.getFullYear();
        var mn = dt.getMonth();
        var date = dt.getDate();

        console.log (date);
        var time = dt.getHours(+6);
        var ms = dt.getMilliseconds();
        seqNo = time+""+ms+seqNo;
        console.log (seqNo);
        return tableprefix + "-" + year + "-"+mn+date+"-"+ seqNo;
    }
    catch (ex) {
        throw ex;
    }

}


module.exports = {
    insertSingleData,
    getUniqueSeqForchild,
    makeUniqueKeyForMaster,
    makeUniqueKeyForchild,
    insertMasterChildData,
    insertDataAsCollection,
    insertData
}