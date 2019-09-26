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
	PurchaseMasterID	VARCHAR(25) NOT NULL,
	Date				DATETIME,
	ServiceCategoryID    	Varchar (25),
	CurrencyCode 			Varchar (25),
	LocationID  		Varchar (25),
    
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
	ProductID    		Numeric(18,4) NOT NULL,
	Rate 				Numeric(18,4), 
	PurchaseAmount  	Numeric(18,4)DEFAULT 0, 
    CONSTRAINT PK_PurchaseDetails_PurchaseMasterID PRIMARY KEY (PurchaseMasterID),
    CONSTRAINT FK_PurchaseMaster_PurchaseMasterID FOREIGN KEY (PurchaseMasterID) REFERENCES PurchaseMaster(PurchaseMasterID)
    
    #--CONSTRAINT FK_PurchaseMaster_ProductID FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
    #--CONSTRAINT FK_PurchaseMaster_LocationID FOREIGN KEY (LocationID) REFERENCES StoreLocation(LocationID)
);

