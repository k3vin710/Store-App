LOAD DATA
INTO TABLE stg_pkbc_dim_sub_category
TRUNCATE
FIELDS TERMINATED BY ',' optionally enclosed by '"'
NULLIF = "NULL"
DATE FORMAT "yyyy-mm-dd HH24:MI"
   (
		sub_category_id 		,
		sub_category_name       ,
		category_name           ,
		TBL_LAST_DT  			
		 	
	)