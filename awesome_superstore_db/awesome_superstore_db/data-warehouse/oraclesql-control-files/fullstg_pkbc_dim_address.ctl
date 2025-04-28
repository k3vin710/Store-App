LOAD DATA
INTO TABLE stg_pkbc_dim_address
TRUNCATE
FIELDS TERMINATED BY ',' optionally enclosed by '"'
NULLIF = "NULL"
DATE FORMAT "yyyy-mm-dd HH24:MI"
   (
		address_id  	,
		postal_code     ,
		city_name       ,
		state_name      ,
		country_name    ,
		region_name     ,
		TBL_LAST_DT 
		 	
	)