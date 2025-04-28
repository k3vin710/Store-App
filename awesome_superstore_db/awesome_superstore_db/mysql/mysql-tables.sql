-- create schema awesome_inc;
use awesome_inc;

DROP TABLE IF EXISTS pkbc_ord_prod;
DROP TABLE IF EXISTS pkbc_product;
DROP TABLE IF EXISTS pkbc_sub_category;
DROP TABLE IF EXISTS pkbc_category;
DROP TABLE IF EXISTS pkbc_category;
DROP TABLE IF EXISTS pkbc_orders;
DROP TABLE IF EXISTS pkbc_address;
DROP TABLE IF EXISTS pkbc_customer;
DROP TABLE IF EXISTS pkbc_city;
DROP TABLE IF EXISTS pkbc_state;
DROP TABLE IF EXISTS pkbc_country;
DROP TABLE IF EXISTS pkbc_region;



CREATE TABLE pkbc_address (
    addr_id     BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Address ID',
    city_id     BIGINT NOT NULL COMMENT 'City id',
    postal_code VARCHAR(10) COMMENT 'Postal code',
    cust_id     VARCHAR(20) NOT NULL COMMENT 'Customer Id ',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);

CREATE INDEX cust_id_idx ON pkbc_address (cust_id);


CREATE TABLE pkbc_sub_category (
    sub_category_id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Sub Category id.',
    sub_category_name     VARCHAR(30) NOT NULL COMMENT 'Product Sub Category Name',
    category_id       INT NOT NULL COMMENT 'Category id.',
    tbl_last_dt       DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);
CREATE TABLE pkbc_category (
    category_id       INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Category id.',
    category_name     VARCHAR(30) NOT NULL COMMENT 'Product Category Name',
    tbl_last_dt       DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);



CREATE TABLE pkbc_city (
    city_id     BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'City Id',
    city_name   VARCHAR(50) NOT NULL COMMENT 'City Name',
    state_id	BIGINT NOT NULL COMMENT 'State id',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);



CREATE TABLE pkbc_country (
    country_id   BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Country id',
    country_name VARCHAR(50) NOT NULL COMMENT 'Country Name',
    region_id 	 BIGINT NOT NULL COMMENT 'Region id',
    tbl_last_dt  DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);


CREATE TABLE pkbc_customer (
    cust_id     VARCHAR(20) NOT NULL COMMENT 'Customer Id.',
    cust_name   VARCHAR(100) NOT NULL COMMENT 'Customer name',
    segment     TINYINT NOT NULL COMMENT 'Customer Segment. 1: Consumer , 2: Corporate, 3: Home Office',
    email		VARCHAR(30) NOT NULL COMMENT 'Email of the customer',
    `password`	VARCHAR(100) NOT NULL COMMENT 'Password of the login of the customer',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);


ALTER TABLE pkbc_customer ADD CONSTRAINT pkbc_customer_pk PRIMARY KEY ( cust_id );

CREATE TABLE pkbc_ord_prod (
	ord_prod_id   BIGINT  NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'unique id for all orders and products',
    quantity      DECIMAL(12, 2) NOT NULL COMMENT 'Product Quantity for the order',
    discount      DECIMAL(10, 2) NOT NULL COMMENT 'Discount for product of  the order',
    shipping_cost DECIMAL(10, 2) NOT NULL COMMENT 'Shipping cost for product of  the order',
    profit        DECIMAL(10, 2) NOT NULL COMMENT 'Profit for product of  the order',
    sales         BIGINT NOT NULL COMMENT 'Sales for the product of the order', 
    order_id      VARCHAR(40) NOT NULL COMMENT 'Order Id', 
    product_id    VARCHAR(20) NOT NULL COMMENT 'Product Id',
    tbl_last_dt   DATETIME NOT NULL COMMENT 'Timestamp for the row data added',
    market        TINYINT NOT NULL,
    addr_id       BIGINT NOT NULL, 
    cust_id    	  VARCHAR(20) NOT NULL COMMENT 'Customer Id',
    ship_mode     TINYINT NOT NULL COMMENT 'shipping  mode. 1: First Class , 2 : Second Class , 3 : Same Day, 4 : Standard Class',
    ship_date     DATETIME NOT NULL COMMENT 'Shipping Date'
);

CREATE INDEX cust_id_idx ON pkbc_ord_prod (cust_id);
CREATE INDEX product_id_idx ON pkbc_ord_prod (product_id);


CREATE TABLE pkbc_orders ( 
    order_id    VARCHAR(40) NOT NULL COMMENT 'Order Id', 
    order_date  DATETIME NOT NULL COMMENT 'Order Date', 
    is_returned CHAR(1) NOT NULL COMMENT 'Is order returned. True : returned, False: not returned',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);


ALTER TABLE pkbc_orders ADD CONSTRAINT pkbc_orders_pk PRIMARY KEY ( order_id );

CREATE TABLE pkbc_product ( 
    product_id   VARCHAR(20) NOT NULL COMMENT 'Product  id.',
    product_name VARCHAR(200) NOT NULL COMMENT 'Product Name',
    market       TINYINT NOT NULL COMMENT 'Product Market. 1: Africa, 2: Asia Pacific, 3: Europe, 4: LATAM, 5: USCA',
    sub_category_id  INT NOT NULL COMMENT 'Category Id',
    tbl_last_dt  DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);

CREATE INDEX product_id_idx ON pkbc_product (product_id);

ALTER TABLE pkbc_product ADD CONSTRAINT pkbc_product_pk PRIMARY KEY ( product_id,
                                                                      market );

CREATE TABLE pkbc_region (
    region_id   BIGINT NOT NULL  PRIMARY KEY AUTO_INCREMENT COMMENT 'Country id',
    region_name VARCHAR(50) NOT NULL COMMENT 'Region  Name',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);


CREATE TABLE pkbc_state (
    state_id    BIGINT NOT NULL  PRIMARY KEY AUTO_INCREMENT COMMENT 'state id',
    state_name  VARCHAR(50) NOT NULL COMMENT 'State Name',
    country_id 	BIGINT NOT NULL COMMENT 'Country id',
    tbl_last_dt DATETIME NOT NULL COMMENT 'Timestamp for the row data added'
);



ALTER TABLE pkbc_address
    ADD CONSTRAINT pkbc_address_pkbc_city_fk FOREIGN KEY ( city_id )
        REFERENCES pkbc_city ( city_id );

ALTER TABLE pkbc_address
    ADD CONSTRAINT pkbc_address_pkbc_customer_fk FOREIGN KEY ( cust_id )
        REFERENCES pkbc_customer ( cust_id )
        ON UPDATE CASCADE;
        
ALTER TABLE pkbc_country
	ADD CONSTRAINT pkbc_country_pkbc_region_fk FOREIGN KEY ( region_id )
		REFERENCES pkbc_region ( region_id );
        
ALTER TABLE pkbc_state
	ADD CONSTRAINT pkbc_state_pkbc_country_fk FOREIGN KEY ( country_id )
		REFERENCES pkbc_country ( country_id );
        
ALTER TABLE pkbc_city
	ADD CONSTRAINT pkbc_city_pkbc_state_fk FOREIGN KEY ( state_id )
		REFERENCES pkbc_state ( state_id );

ALTER TABLE pkbc_ord_prod
    ADD CONSTRAINT pkbc_ord_prod_pkbc_address_fk FOREIGN KEY ( addr_id )
        REFERENCES pkbc_address ( addr_id );

ALTER TABLE pkbc_ord_prod
    ADD CONSTRAINT pkbc_ord_prod_pkbc_orders_fk FOREIGN KEY ( order_id )
        REFERENCES pkbc_orders ( order_id );

ALTER TABLE pkbc_ord_prod
    ADD CONSTRAINT pkbc_ord_prod_pkbc_product_fk FOREIGN KEY ( product_id,
                                                               market )
        REFERENCES pkbc_product ( product_id,
                                  market );

ALTER TABLE pkbc_ord_prod
    ADD CONSTRAINT pkbc_ord_prod_pkbc_customer_fk FOREIGN KEY ( cust_id )
        REFERENCES pkbc_customer ( cust_id )
        ON UPDATE CASCADE;

ALTER TABLE pkbc_product
    ADD CONSTRAINT pkbc_sub_category_fk FOREIGN KEY ( sub_category_id )
        REFERENCES pkbc_sub_category ( sub_category_id );
        
ALTER TABLE pkbc_sub_category
    ADD CONSTRAINT pkbc_category_fk FOREIGN KEY ( category_id )
        REFERENCES pkbc_category ( category_id );
        
ALTER TABLE pkbc_customer
ADD otp_code VARCHAR(5);


ALTER TABLE pkbc_product 
ADD COLUMN unit_price DECIMAL(10,2) NOT NULL DEFAULT 0;


