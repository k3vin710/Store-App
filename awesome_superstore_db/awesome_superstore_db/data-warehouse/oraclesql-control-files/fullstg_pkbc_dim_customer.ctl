LOAD DATA
INTO TABLE stg_pkbc_dim_customer
TRUNCATE
FIELDS TERMINATED BY ',' optionally enclosed by '"'
NULLIF = "NULL"
DATE FORMAT "yyyy-mm-dd HH24:MI"
   (
		 cust_id   		,
		 cust_name 	    ,
		 segment  ,
		 email   ,
		 password ,
		 tbl_last_dt
		 	
	)