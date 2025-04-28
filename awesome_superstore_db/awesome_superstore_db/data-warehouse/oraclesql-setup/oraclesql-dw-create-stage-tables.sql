--connect with system/oracle on oracle sql

CREATE OR REPLACE DIRECTORY load_data_dir AS '/media/sf_VMSHARE';
GRANT READ,WRITE ON DIRECTORY load_data_dir to dws;

DROP TABLE dws.stg_pkbc_fact_orders;
DROP TABLE dws.stg_pkbc_dim_address;
DROP TABLE dws.stg_pkbc_dim_customer;
DROP TABLE dws.stg_pkbc_dim_product;
DROP TABLE dws.stg_pkbc_dim_sub_category;



CREATE TABLE dws.stg_pkbc_dim_address (
    address_id   NUMBER(10) NOT NULL,
    postal_code  VARCHAR2(10),
    city_name    VARCHAR2(50) NOT NULL,
    state_name   VARCHAR2(50) NOT NULL,
    country_name VARCHAR2(50) NOT NULL,
    region_name  VARCHAR2(50) NOT NULL,
	TBL_LAST_DT  varchar2(19)
);
--ORGANIZATION EXTERNAL 
-- (
--  TYPE ORACLE_LOADER
--  DEFAULT DIRECTORY load_data_dir
--  ACCESS PARAMETERS 
--   (
--    RECORDS DELIMITED BY NEWLINE
--    FIELDS TERMINATED BY ','
--    OPTIONALLY ENCLOSED BY '"'
--    MISSING FIELD VALUES ARE NULL
--    (
--      country_id,   
--      country_name,   
--      TBL_LAST_DT   
--    )
--   )
--  LOCATION ('fullstg_pkbc_dim_address.csv')
--)
--REJECT LIMIT UNLIMITED;


CREATE TABLE dws.stg_pkbc_dim_customer (
    cust_id   	VARCHAR2(20) NOT NULL,
    cust_name 	VARCHAR2(50) NOT NULL,
    email     	VARCHAR2(30) NOT NULL,
	password  	VARCHAR2(100) NOT NULL ,
    segment   	NUMBER(2) NOT NULL,
	TBL_LAST_DT  varchar2(19)
);
--ORGANIZATION EXTERNAL 
-- (
--  TYPE ORACLE_LOADER
--  DEFAULT DIRECTORY load_data_dir
--  ACCESS PARAMETERS 
--   (
--    RECORDS DELIMITED BY NEWLINE
--    FIELDS TERMINATED BY ','
--    OPTIONALLY ENCLOSED BY '"'
--    MISSING FIELD VALUES ARE NULL
--    (
--      country_id,   
--      country_name,   
--      TBL_LAST_DT   
--    )
--   )
--  LOCATION ('fullstg_pkbc_dim_customer.csv')
--)
--REJECT LIMIT UNLIMITED;



CREATE TABLE dws.stg_pkbc_dim_product ( 
    product_id   VARCHAR2(20) NOT NULL,
    product_name VARCHAR2(200) NOT NULL,
    unit_price   NUMBER(10, 2) NOT NULL,
    market       NUMBER(1) NOT NULL,
	TBL_LAST_DT  varchar2(19)
);

--ORGANIZATION EXTERNAL 
-- (
--  TYPE ORACLE_LOADER
--  DEFAULT DIRECTORY load_data_dir
--  ACCESS PARAMETERS 
--   (
--    RECORDS DELIMITED BY NEWLINE	
--    FIELDS TERMINATED BY ','
--    OPTIONALLY ENCLOSED BY '"'
--    MISSING FIELD VALUES ARE NULL
--    (
--      country_id,   
--      country_name,   
--      TBL_LAST_DT   
--    )
--   )
--  LOCATION ('fullstg_pkbc_dim_product.csv')
--)
--REJECT LIMIT UNLIMITED;


CREATE TABLE dws.stg_pkbc_dim_sub_category (
    sub_category_id   NUMBER(5) NOT NULL,
    sub_category_name VARCHAR2(30) NOT NULL,
    category_name     VARCHAR2(30) NOT NULL,
	TBL_LAST_DT  		varchar2(19)
)ORGANIZATION EXTERNAL 
 (
  TYPE ORACLE_LOADER
  DEFAULT DIRECTORY load_data_dir
  ACCESS PARAMETERS 
   (
    RECORDS DELIMITED BY NEWLINE	
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    MISSING FIELD VALUES ARE NULL
    (
		sub_category_id   ,
        sub_category_name ,
        category_name     ,
        TBL_LAST_DT  	  
    )
   )
  LOCATION ('fullstg_pkbc_dim_sub_category.csv')
)
REJECT LIMIT UNLIMITED;


CREATE TABLE dws.stg_pkbc_fact_orders (
    row_id          NUMBER(12) NOT NULL,
    order_id        VARCHAR2(40) NOT NULL, 
    order_date      DATE NOT NULL,
    is_returned     CHAR(1) NOT NULL,
    quantity        NUMBER(12, 2) NOT NULL,
    discount        NUMBER(10, 2) NOT NULL,
    shipping_cost   NUMBER(10, 2) NOT NULL,
    profit          NUMBER(10, 2) NOT NULL,
    sales           NUMBER(12) NOT NULL,
    ship_date       DATE NOT NULL, 
    ship_mode       NUMBER(1) NOT NULL,
    address_id      NUMBER(10) NOT NULL,
    cust_id         VARCHAR2(20) NOT NULL,
    sub_category_id NUMBER(5) NOT NULL, 
    product_id      VARCHAR2(20) NOT NULL,
	market       NUMBER(1) NOT NULL,
    date_id         VARCHAR2(8) NOT NULL,
	TBL_LAST_DT  	varchar2(19)
);
