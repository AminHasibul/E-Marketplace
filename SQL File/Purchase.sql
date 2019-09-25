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
	TableName				VARCHAR(100) unique,
	NextGenID    			int,
	
    CONSTRAINT PK_PrimaryKeyGenerator_PrimaryKeyGeneratorID PRIMARY KEY (PrimaryKeyGeneratorID)
	#--CONSTRAINT FK_PurchaseMaster_ServiceCategoryID FOREIGN KEY (ServiceCategoryID) REFERENCES ServiceCategory(ServiceCategoryID)
    #--CONSTRAINT FK_PurchaseMaster_CurrencyCode FOREIGN KEY (CurrencyCode) REFERENCES Currency(CurrencyCode)
    #--CONSTRAINT FK_PurchaseMaster_LocationID FOREIGN KEY (LocationID) REFERENCES StoreLocation(LocationID)
);

SET SQL_SAFE_UPDATES=1;

CALL spPrimaryKeyGenerator ('PurchaseDetails',1);

DROP PROCEDURE IF EXISTS spPrimaryKeyGenerator;
DELIMITER //
CREATE PROCEDURE spPrimaryKeyGenerator
(IN RefTable VARCHAR(200),
IN NextID int)
BEGIN
	declare rowCount INT;
	SET rowCount = (SELECT * FROM PrimaryKeyGenerator WHERE TableName = RefTable);
		IF (rowCount > 0)THEN
			 UPDATE PrimaryKeyGenerator SET NextGenID = NextID 
				WHERE TableName = RefTable;
		ELSE
         INSERT INTO PrimaryKeyGenerator (TableName,NextGenID) VALUES(RefTable,NextID);
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

