LOAD DATA
INTO TABLE stg_pkbc_dim_product
TRUNCATE
NULLIF = "NULL"
DATE FORMAT "yyyy-mm-dd HH24:MI"
   (
		 product_id   TERMINATED BY ',' optionally enclosed by '"'	,
		 product_name  TERMINATED BY '",' "replace(:product_name ,'\"')" ,
		 unit_price    TERMINATED BY ','  optionally enclosed by '"' ,
		 market        TERMINATED BY ','  optionally enclosed by '"' ,
		 TBL_LAST_DT  TERMINATED BY ','  optionally enclosed by '"'
	)