LOAD DATA
INTO TABLE stg_pkbc_fact_orders
TRUNCATE
FIELDS TERMINATED BY ',' optionally enclosed by '"'
NULLIF = "NULL"
DATE FORMAT "yyyy-mm-dd HH24:MI"
   (
   
   row_id         	, 
   order_id         ,
   order_date date "yyyy-mm-dd HH24:MI"    ,
   is_returned      ,
   quantity         ,
   discount         ,
   shipping_cost    ,
   profit           ,
   sales            ,
   ship_date  date "yyyy-mm-dd HH24:MI"      ,
   ship_mode        ,
   address_id       ,
   cust_id          ,
   sub_category_id  ,
   product_id       ,
   market			,
   date_id          ,
   TBL_LAST_DT  	
		 	
	)