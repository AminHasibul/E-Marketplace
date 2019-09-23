 
 exports.Paging = function (skip,limit,totalRow)
 { 
    if(skip <=0)
    {
        fromRange  = skip;
        toRange = skip + limit;
    }
    else    
    {
        fromRange = skip; 
        toRange = fromRange + limit;
       
        if(toRange > totalRow)
        {
            toRange = totalRow;
        }
    }
    return (fromRange +"-"+ toRange);
 }
//module.exports = Paging;