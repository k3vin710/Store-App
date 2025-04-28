SET SERVEROUTPUT ON ;
create or replace PROCEDURE  load_merge_dim_pkbc_address IS
err_code NUMBER;
err_msg VARCHAR2(32000);
count_n number;
BEGIN
    MERGE INTO dim_pkbc_address a
    USING stg_pkbc_dim_address b
    ON (a.address_id = b.address_id)
  WHEN MATCHED THEN
    UPDATE SET	  
	  a.postal_code     = b.postal_code ,
	  a.city_name       = b.city_name   ,
	  a.state_name      = b.state_name  ,
	  a.country_name    = b.country_name,
	  a.region_name     = b.region_name ,
      a.TBL_LAST_DATE = to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS')      
  WHEN NOT MATCHED THEN
      INSERT (
	  address_id  	,
	  postal_code   ,
	  city_name     ,
	  state_name    ,
	  country_name  ,
	  region_name   ,
	  TBL_LAST_DATE   
	  )
      VALUES (
	  b.address_id	,	
	  b.postal_code ,
	  b.city_name   ,
	  b.state_name  ,
	  b.country_name,
	  b.region_name ,
	  to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS'));
      
      select count(*) into count_n from dim_pkbc_address;
      dbms_output.put_line('count '||  count_n);
      commit;
EXCEPTION
    WHEN OTHERS THEN
         err_code := SQLCODE;
         err_msg  := SQLERRM;
         dbms_output.put_line('Error code ' || err_code || ': ' || err_msg);
         
END;
/

-- execute load_merge_dim_pkbc_address;


create or replace PROCEDURE  load_merge_dim_pkbc_customer IS
err_code NUMBER;
err_msg VARCHAR2(32000);
count_n number;
BEGIN
    MERGE INTO dim_pkbc_customer a
    USING stg_pkbc_dim_customer b
    ON (a.cust_id = b.cust_id)
  WHEN MATCHED THEN
    UPDATE SET	  
	  a.cust_name 	    = b.cust_name 	,
	  a.email     	    = b.email     	,
	  a.password  	    = b.password  	,
	  a.segment   	    = b.segment   	,
      a.TBL_LAST_DATE = to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS')      
  WHEN NOT MATCHED THEN
      INSERT (
	  cust_id  			, 	
	  cust_name 	    ,
	  email     	    ,
	  password  	    ,
	  segment   	    ,
	  TBL_LAST_DATE   
	  )
      VALUES (
	  b.cust_id   		,
	  b.cust_name 	    ,
	  b.email     	    ,
	  b.password  	    ,
	  b.segment   	    ,
	  to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS'));
      
      select count(*) into count_n from dim_pkbc_customer;
      dbms_output.put_line('count '||  count_n);
      commit;
EXCEPTION
    WHEN OTHERS THEN
         err_code := SQLCODE;
         err_msg  := SQLERRM;
         dbms_output.put_line('Error code ' || err_code || ': ' || err_msg);
         
END;
/

-- execute load_merge_dim_pkbc_customer;

create or replace PROCEDURE  load_merge_dim_pkbc_product IS
err_code NUMBER;
err_msg VARCHAR2(32000);
count_n number;
BEGIN
    MERGE INTO dim_pkbc_product a
    USING stg_pkbc_dim_product b
    ON (a.product_id = b.product_id and a.market = b.market)
  WHEN MATCHED THEN
    UPDATE SET	  
	  a.product_name    = b.product_name 	,
	  a.unit_price      = b.unit_price   	,
      a.TBL_LAST_DATE = to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS')         
  WHEN NOT MATCHED THEN
      INSERT (
	  product_id   	, 	
	  product_name     ,
	  unit_price       ,
	  market           ,
	  TBL_LAST_DATE      
	  )
      VALUES (
	  b.product_id    	    ,
	  b.product_name  	    ,
	  b.unit_price    	    ,
	  b.market        	    ,
        to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS'));
            
      select count(*) into count_n from dim_pkbc_product;
      dbms_output.put_line('count '||  count_n);
      commit;
EXCEPTION
    WHEN OTHERS THEN
         err_code := SQLCODE;
         err_msg  := SQLERRM;
         dbms_output.put_line('Error code ' || err_code || ': ' || err_msg);
         
END;
/

-- execute load_merge_dim_pkbc_product;

create or replace PROCEDURE  load_merge_dim_pkbc_sub_category IS
err_code NUMBER;
err_msg VARCHAR2(32000);
count_n number;
BEGIN
    MERGE INTO dim_pkbc_sub_category a
    USING stg_pkbc_dim_sub_category b
    ON (a.sub_category_id = b.sub_category_id)
  WHEN MATCHED THEN
    UPDATE SET	  
	  a.sub_category_name = b.sub_category_name	,
	  a.category_name     = b.category_name     ,	  
      a.TBL_LAST_DATE = to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS')         
  WHEN NOT MATCHED THEN
      INSERT (
	  sub_category_id		,   
	  sub_category_name     ,
	  category_name         ,
	  TBL_LAST_DATE      
	  )
      VALUES (
	  b.sub_category_id   	,
	  b.sub_category_name   ,
	  b.category_name       ,
        to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS'));
            
      select count(*) into count_n from dim_pkbc_sub_category;
      dbms_output.put_line('count '||  count_n);
      commit;
EXCEPTION
    WHEN OTHERS THEN
         err_code := SQLCODE;
         err_msg  := SQLERRM;
         dbms_output.put_line('Error code ' || err_code || ': ' || err_msg);
         
END;
/

-- execute load_merge_dim_pkbc_sub_category;

create or replace PROCEDURE  load_merge_fact_pkbc_orders IS
err_code NUMBER;
err_msg VARCHAR2(32000);
count_n number;
BEGIN
    MERGE INTO fact_pkbc_orders a
    USING stg_pkbc_fact_orders b
    ON (a.row_id = b.row_id)
  WHEN MATCHED THEN
    UPDATE SET	         
        a.order_id         = b.order_id       	,
        a.order_date       = b.order_date      ,
        a.is_returned      = b.is_returned     ,
        a.quantity         = b.quantity        ,
        a.discount         = b.discount        ,
        a.shipping_cost    = b.shipping_cost   ,
        a.profit           = b.profit          ,
        a.sales            = b.sales           ,
        a.ship_date        = b.ship_date       ,
        a.ship_mode        = b.ship_mode       ,
        a.address_id       = b.address_id      ,
        a.cust_id          = b.cust_id         ,
        a.sub_category_id  = b.sub_category_id ,
        a.product_id       = b.product_id      ,
		a.market	       = b.market      		,
        a.date_id          = b.date_id         ,   
      a.TBL_LAST_DATE = to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS')         
  WHEN NOT MATCHED THEN
      INSERT (
	  row_id      		,   
	  order_id          ,
	  order_date        ,
	  is_returned       ,
	  quantity          ,
	  discount          ,
	  shipping_cost     ,
	  profit            ,
	  sales             ,
	  ship_date         ,
	  ship_mode         ,
	  address_id        ,
	  cust_id           ,
	  sub_category_id   ,
	  product_id        ,
	  market			,
	  date_id           ,	
	  TBL_LAST_DATE      
	  )
      VALUES (
	  b.row_id 			,        
	  b.order_id        ,
	  b.order_date      ,
	  b.is_returned     ,
	  b.quantity        ,
	  b.discount        ,
	  b.shipping_cost   ,
	  b.profit          ,
	  b.sales           ,
	  b.ship_date       ,
	  b.ship_mode       ,
	  b.address_id      ,
	  b.cust_id         ,
	  b.sub_category_id ,
	  b.product_id      ,
	  b.market			,
	  b.date_id         ,	  
      to_timestamp(b.tbl_last_dt,'RRRR-MM-DD HH24:MI:SS'));
            
      select count(*) into count_n from fact_pkbc_orders;
      dbms_output.put_line('count '||  count_n);
      commit;
EXCEPTION
    WHEN OTHERS THEN
         err_code := SQLCODE;
         err_msg  := SQLERRM;
         dbms_output.put_line('Error code ' || err_code || ': ' || err_msg);
         
END;
/

-- execute load_merge_fact_pkbc_orders;