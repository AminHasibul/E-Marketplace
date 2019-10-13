#----------------------------------------------------
#---------------------- 07-SEP-2019
#----------------------------------------------------
#------------------#CREATING DATABASE

CREATE DATABASE IF NOT EXISTS Marketplace_Test;

USE Marketplace_Test;


#------------------CREATING TABLE--------------
#------ PurchaseMaster----------------

CREATE TABLE IF NOT EXISTS PrimaryKeyGenerator
(
	PrimaryKeyGeneratorID	INT NOT NULL unique auto_increment,
	TableName				VARCHAR(100),
	NextGenID    			int,
    Year					Year,
	
    CONSTRAINT PK_PrimaryKeyGenerator_PrimaryKeyGeneratorID PRIMARY KEY (PrimaryKeyGeneratorID),
	UNIQUE KEY UK_TableName_Year (TableName,Year)
	#--CONSTRAINT FK_PurchaseMaster_ServiceCategoryID FOREIGN KEY (ServiceCategoryID) REFERENCES ServiceCategory(ServiceCategoryID)
    #--CONSTRAINT FK_PurchaseMaster_CurrencyCode FOREIGN KEY (CurrencyCode) REFERENCES Currency(CurrencyCode)
    #--CONSTRAINT FK_PurchaseMaster_LocationID FOREIGN KEY (LocationID) REFERENCES StoreLocation(LocationID)
);

SET SQL_SAFE_UPDATES=1;
-- SELECT  * FROM PrimaryKeyGenerator;

-- SELECT NextGenID FROM PrimaryKeyGenerator WHERE TableName = 'PurchaseMaster';

-- CALL spPrimaryKeyGenerator ('PurchaseMaster',2019,1);
-- CALL spPrimaryKeyGenerator ('PurchaseDetails',2019,2);

-- CALL spPrimaryKeyGenerator ('PurchaseMaster',2020,1);
-- CALL spPrimaryKeyGenerator ('PurchaseDetails',2020,2);

DROP PROCEDURE IF EXISTS spPrimaryKeyGenerator;
DELIMITER //
CREATE PROCEDURE spPrimaryKeyGenerator
(IN RefTable VARCHAR(200),
IN refyear Year,
IN NextID int)
BEGIN
	declare rowCount INT;
	SET rowCount = (SELECT Count(*) FROM PrimaryKeyGenerator WHERE TableName = RefTable AND Year = refyear);
    -- SELECT (rowCount);
		IF (rowCount > 0)THEN
			 UPDATE PrimaryKeyGenerator SET NextGenID = NextID 
				WHERE TableName = RefTable AND NextGenID <> 0 AND Year = refyear;
		ELSE
         INSERT INTO PrimaryKeyGenerator (TableName,NextGenID,Year) VALUES(RefTable,1,refyear);
	END IF;
END //
DELIMITER ;


CREATE TABLE IF NOT EXISTS PurchaseMaster
(
	PurchaseMasterID		VARCHAR(25) NOT NULL,
	Date					DATETIME,
	ServiceCategoryID    	Varchar (25),
	CurrencyCode 			Varchar (25),
	LocationID  			Varchar (25),
    
    CONSTRAINT PK_PurchaseMaster_PurchaseMasterID PRIMARY KEY (PurchaseMasterID)
	#--CONSTRAINT FK_PurchaseMaster_ServiceCategoryID FOREIGN KEY (ServiceCategoryID) REFERENCES ServiceCategory(ServiceCategoryID)
    #--CONSTRAINT FK_PurchaseMaster_CurrencyCode FOREIGN KEY (CurrencyCode) REFERENCES Currency(CurrencyCode)
    #--CONSTRAINT FK_PurchaseMaster_LocationID FOREIGN KEY (LocationID) REFERENCES StoreLocation(LocationID)
);


CREATE TABLE IF NOT EXISTS PurchaseDetails
(
	PurchaseDetailsID	VARCHAR(25) NOT NULL, 
	PurchaseMasterID	VARCHAR(25) NOT NULL ,
	PurchaseQty			Numeric(18,4)DEFAULT 0, 
	ProductID    		Varchar(25) NOT NULL,
	Rate 				Numeric(18,4), 
	PurchaseAmount  	Numeric(18,4)DEFAULT 0, 
    CONSTRAINT PK_PurchaseDetails_PurchaseDetailsID PRIMARY KEY (PurchaseDetailsID),
    CONSTRAINT FK_PurchaseMaster_PurchaseMasterID FOREIGN KEY (PurchaseMasterID) REFERENCES PurchaseMaster(PurchaseMasterID)
    
    #--CONSTRAINT FK_PurchaseMaster_ProductID FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
    #--CONSTRAINT FK_PurchaseMaster_LocationID FOREIGN KEY (LocationID) REFERENCES StoreLocation(LocationID)
);



DROP PROCEDURE IF EXISTS spGetAllList;

DELIMITER $$
CREATE PROCEDURE spGetAllList()
BEGIN
     
     SELECT payment_id, shipper_id, convert( amount, decimal(27,2)) as amount, 
     convert( balance_before, decimal(27,2)) as balance_before, convert( balance_after, decimal(27,2)) 
     as balance_after, type, truck_id, in_bkash_phone, txn_id, in_type, receive_type, refund_reason, details, 
     created_on, shipper_reference from shipper_payment where shipper_id = '33314';

     SELECT request_id, shipper_id, shipper_name, shipper_phone, pick_time, tt_category, tt_open_cover, product_type,
       pick_thanaId, drop_thanaId,
       pick_unionId, pick_areaId, drop_unionId, drop_areaId,
       status, convert( trip_price, decimal(27,2)) as trip_price, convert( owner_price, decimal(27,2)) as owner_price
     from rq_v where shipper_id = '33314' order by pick_time asc;

    SELECT bid_id, owner_id, driver_name, review, driver_phone, model, truck_categrory_text, truck_id, truck_no,
            imei_id, convert(owner_rate, decimal(27,2)) as owner_rate, bid_status, request_id, shipper_id, distance, 
            convert( rate, decimal(27,2)) as rate, pick_district, pick_division, pick_add, pick_add_title, 
            drop_district, drop_division, drop_add, drop_add_title, shipper_name, shipper_phone, pick_time,
            number_of_truck, tt_category, tt_open_cover, product_type, pick_thanaId, drop_thanaId, 
            pick_unionId, pick_areaId, drop_unionId, drop_areaId,
            status, listed, admin_user, convert(trip_price, decimal(27,2)) as trip_price, 
           convert(owner_price, decimal(27,2)) as owner_price, convert(shipper_advance, decimal(27,2)) 
           as shipper_advance, convert(owner_advance, decimal(27,2)) as owner_advance, 
           convert(promo_rate, decimal(27,2)) as promo_rate 
     FROM shipper_active_trips 
     where  shipper_id = '33314' order by pick_time asc ;

        SELECT request_id, status FROM request_review where shipper_id = '33314' and shipper_experience = 'not reviewed';

        SELECT id, person_id, convert(balance, decimal(27,2)) as balance, username, company_name, review, admin_user, phone, p_id,
                 p_assigned_on, ban, created_on, shipper_reference, url, log_status, promo_code_level 
          FROM p_shipper where id = '5';

        
        SELECT 'ডিসকাউন্ট আছে!' as title_bangla,'Discount Available!' as title_english,'আপনার ডিসকাউন্ট কোড প্রয়োগ করে নিন।' as message_bangla,
                      'Please enter discount code to avail the offer!' as message_english ; 

        SELECT 30  as bid_limit; 

        SELECT 3  as ondemandTotalTime;
        SELECT 15  as onDemandPerPostTime; 
      
        SELECT express_total_time, express_per_post_time from express_dispatch_config  ;

        SELECT 'on_demand' as on_demand ;

        SELECT distinct owner_id FROM `trucks_info` 
             where truck_categrory = any ( select type from tt_category where express_status = 'enabled' );


    
END $$