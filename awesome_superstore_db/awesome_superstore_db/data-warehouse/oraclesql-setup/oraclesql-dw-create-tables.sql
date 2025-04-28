DROP TABLE fact_pkbc_orders;
DROP TABLE dim_pkbc_address;
DROP TABLE dim_pkbc_customer;
DROP TABLE dim_pkbc_date;
DROP TABLE dim_pkbc_product;
DROP TABLE dim_pkbc_sub_category;



CREATE TABLE dim_pkbc_address (
    address_id   NUMBER(10) NOT NULL,
    postal_code  VARCHAR2(10),
    city_name    VARCHAR2(50) NOT NULL,
    state_name   VARCHAR2(50) NOT NULL,
    country_name VARCHAR2(50) NOT NULL,
    region_name  VARCHAR2(50) NOT NULL
);

COMMENT ON COLUMN dim_pkbc_address.address_id IS
    'Location ID';

COMMENT ON COLUMN dim_pkbc_address.city_name IS
    'City Name';

COMMENT ON COLUMN dim_pkbc_address.state_name IS
    'State name';

COMMENT ON COLUMN dim_pkbc_address.country_name IS
    'Country name';

COMMENT ON COLUMN dim_pkbc_address.region_name IS
    'Region name';

ALTER TABLE dim_pkbc_address ADD CONSTRAINT dim_pkbc_address_pk PRIMARY KEY ( address_id );

CREATE TABLE dim_pkbc_customer (
    cust_id   VARCHAR2(20) NOT NULL,
    cust_name VARCHAR2(50) NOT NULL,
    email     VARCHAR2(30) NOT NULL,
	password  VARCHAR2(100) NOT NULL ,
    segment   NUMBER(2) NOT NULL
);

COMMENT ON COLUMN dim_pkbc_customer.password IS 'Password of the login of the customer';

COMMENT ON COLUMN dim_pkbc_customer.cust_id IS
    'Customer Id.';

COMMENT ON COLUMN dim_pkbc_customer.cust_name IS
    'Customer name';

COMMENT ON COLUMN dim_pkbc_customer.segment IS
    'Customer Segment. 1: Consumer , 2: Corporate, 3: Home Office';

COMMENT ON COLUMN dim_pkbc_customer.email IS
    'Email of the customer';

ALTER TABLE dim_pkbc_customer ADD CONSTRAINT dim_pkbc_customer_pk PRIMARY KEY ( cust_id );

CREATE TABLE dim_pkbc_date AS
SELECT
      n AS ENTRY_ID,
      TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day') AS Full_Date,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'DD') AS Days,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'Mon') AS Month_Short,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'MM') AS Month_Num,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'Month') AS Month_Long,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'D') AS Day_Of_Week_Short,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'Day') AS Day_Of_Week_Long,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'YYYY') AS Year,
      CASE
         WHEN TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'MM') IN (1,2,3) THEN 'Q1'
         WHEN TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'MM') IN (4,5,6) THEN 'Q2'
         WHEN TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'MM') IN (7,8,9) THEN 'Q3'
      ELSE
        'Q4'
      END Quarter,
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'MM')||
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'DD')||
      TO_CHAR(TO_DATE('31/12/1970','DD/MM/YYYY') + NUMTODSINTERVAL(n,'day'),'YYYY') 
      AS DATE_ID        
FROM (
  select level n
  from dual
  connect by level <= 36600);  -- this will create dates for 10  years starting 01/01/1971
  

COMMENT ON COLUMN dim_pkbc_date.month_short IS
    'Month';

COMMENT ON COLUMN dim_pkbc_date.month_long IS
    'Month';

COMMENT ON COLUMN dim_pkbc_date.year IS
    'Year';

ALTER TABLE dim_pkbc_date ADD CONSTRAINT dim_pkbc_date_pk PRIMARY KEY ( date_id );

CREATE TABLE dim_pkbc_product (
    product_id   VARCHAR2(20) NOT NULL,
    product_name VARCHAR2(200) NOT NULL,
    unit_price   NUMBER(10, 2) NOT NULL,
    market       NUMBER(1) NOT NULL
);

COMMENT ON COLUMN dim_pkbc_product.product_id IS
    'Product  id.';

COMMENT ON COLUMN dim_pkbc_product.product_name IS
    'Product Name';

COMMENT ON COLUMN dim_pkbc_product.unit_price IS
    'Price';

COMMENT ON COLUMN dim_pkbc_product.market IS
    'Product Market. 1: Africa, 2: Asia Pacific, 3: Europe, 4: LATAM, 5: USCA


';

ALTER TABLE dim_pkbc_product ADD CONSTRAINT dim_pkbc_product_pk PRIMARY KEY ( product_id, market );

CREATE TABLE dim_pkbc_sub_category (
    sub_category_id   NUMBER(5) NOT NULL,
    sub_category_name VARCHAR2(30) NOT NULL,
    category_name     VARCHAR2(30) NOT NULL
);

COMMENT ON COLUMN dim_pkbc_sub_category.sub_category_id IS
    'Category id.';

COMMENT ON COLUMN dim_pkbc_sub_category.sub_category_name IS
    'Product Category Name';

COMMENT ON COLUMN dim_pkbc_sub_category.category_name IS
    'Category name';

ALTER TABLE dim_pkbc_sub_category ADD CONSTRAINT dim_pkbc_sub_category_pk PRIMARY KEY ( sub_category_id );

CREATE TABLE fact_pkbc_orders (
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
    date_id         VARCHAR2(8) NOT NULL
);

COMMENT ON COLUMN fact_pkbc_orders.order_id IS
    'Order id';

COMMENT ON COLUMN fact_pkbc_orders.order_date IS
    'Oder Date';

COMMENT ON COLUMN fact_pkbc_orders.is_returned IS
    'Is returned';

COMMENT ON COLUMN fact_pkbc_orders.quantity IS
    'Product Quantity for the order';

COMMENT ON COLUMN fact_pkbc_orders.discount IS
    'Discount for product of  the order';

COMMENT ON COLUMN fact_pkbc_orders.shipping_cost IS
    'Shipping cost for product of  the order';

COMMENT ON COLUMN fact_pkbc_orders.profit IS
    'Profit for product of  the order';

COMMENT ON COLUMN fact_pkbc_orders.sales IS
    'Sales for the product of the order';


COMMENT ON COLUMN fact_pkbc_orders.ship_date IS
    'Shipping Date';

COMMENT ON COLUMN fact_pkbc_orders.ship_mode IS
    'Shipping Mode';

ALTER TABLE fact_pkbc_orders ADD CONSTRAINT fact_pkbc_orders_pk PRIMARY KEY ( row_id );

ALTER TABLE fact_pkbc_orders
    ADD CONSTRAINT orders_address_fk FOREIGN KEY ( address_id )
        REFERENCES dim_pkbc_address ( address_id );

ALTER TABLE fact_pkbc_orders
    ADD CONSTRAINT orders_customer_fk FOREIGN KEY ( cust_id )
        REFERENCES dim_pkbc_customer ( cust_id );

ALTER TABLE fact_pkbc_orders
    ADD CONSTRAINT orders_date_fk FOREIGN KEY ( date_id )
        REFERENCES dim_pkbc_date ( date_id );

ALTER TABLE fact_pkbc_orders
    ADD CONSTRAINT orders_product_fk FOREIGN KEY ( product_id, market )
        REFERENCES dim_pkbc_product ( product_id, market );
		

ALTER TABLE fact_pkbc_orders
    ADD CONSTRAINT orders_sub_category_fk FOREIGN KEY ( sub_category_id )
        REFERENCES dim_pkbc_sub_category ( sub_category_id );
		
-- add tbl_last_date for all tables
alter table dim_pkbc_address add tbl_last_date timestamp default sysdate;
alter table dim_pkbc_customer add tbl_last_date timestamp default sysdate;
alter table dim_pkbc_date add tbl_last_date timestamp default sysdate;
alter table dim_pkbc_product add tbl_last_date timestamp default sysdate;
alter table dim_pkbc_sub_category add tbl_last_date timestamp default sysdate;
alter table fact_pkbc_orders add tbl_last_date timestamp default sysdate;

COMMENT ON COLUMN dim_pkbc_address.tbl_last_date IS
    'Timestamp for the row data added';
	
COMMENT ON COLUMN dim_pkbc_customer.tbl_last_date IS
    'Timestamp for the row data added';

COMMENT ON COLUMN dim_pkbc_date.tbl_last_date IS
    'Timestamp for the row data added';

COMMENT ON COLUMN dim_pkbc_product.tbl_last_date IS
    'Timestamp for the row data added';

COMMENT ON COLUMN dim_pkbc_sub_category.tbl_last_date IS
    'Timestamp for the row data added';

COMMENT ON COLUMN fact_pkbc_orders.tbl_last_date IS
    'Timestamp for the row data added';

