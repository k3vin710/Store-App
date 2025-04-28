use awesome_inc;

drop procedure if exists USP_Run_ETL_Incr_Extract;
delimiter $$
create procedure USP_Run_ETL_Incr_Extract()
BEGIN

--
SET @`curr` = now();
SET @`curr_str`= DATE_FORMAT( @`curr` , '%Y%m%d%H%i%s' );

--
SET@`qry` = CONCAT(
'select 
	 a.addr_id as address_id, 
		a.postal_code as postal_code,
        b.city_name as city_name, 
        c.state_name as state_name,  
        d.country_name as country_name, 
        e.region_name as region_name,
		a.tbl_last_dt
into outfile ' , 
' \'' , 'incr_pkbc_dim_address_' , @`curr_str`, '.csv \' ',
 'FIELDS TERMINATED BY' ,  '  \',\' ',  'OPTIONALLY ENCLOSED BY ' , ' \'\"\' ' ,
  'LINES TERMINATED BY' ,   ' \'\n\' ' ,
  'FROM pkbc_address a 
		INNER JOIN pkbc_city b on a.city_id = b.city_id
        INNER JOIN pkbc_state c on b.state_id = c.state_id
        INNER JOIN pkbc_country d on c.country_id = d.country_id
        INNER JOIN pkbc_region e on d.region_id = e.region_id
  WHERE a.tbl_last_dt > (select max(last_extract_date) from etl_extract_date); '
);

PREPARE `stmt` FROM @`qry`;
SET @`qry` := NULL;
EXECUTE `stmt`;
DEALLOCATE PREPARE `stmt`;

--

SET@`qry` = CONCAT(
'select 	cust_id , 
     cust_name,
     segment  ,
     email   ,
     `password`,
	tbl_last_dt
into outfile ' , 
' \'' , 'incr_pkbc_dim_customer_' , @`curr_str`, '.csv \' ',
 'FIELDS TERMINATED BY' ,  '  \',\' ',  'OPTIONALLY ENCLOSED BY ' , ' \'\"\' ' ,
  'LINES TERMINATED BY' ,   ' \'\n\' ' ,
  'FROM pkbc_customer 
   WHERE tbl_last_dt > (select max(last_extract_date) from etl_extract_date);'
);

PREPARE `stmt` FROM @`qry`;
SET @`qry` := NULL;
EXECUTE `stmt`;
DEALLOCATE PREPARE `stmt`;  
  --
 
 SET@`qry` = CONCAT(
'select 
	  product_id ,
	  product_name,      
	  unit_price , 
	  market  ,
		tbl_last_dt
into outfile ' , 
' \'' , 'incr_pkbc_dim_product_' , @`curr_str`, '.csv \' ',
 'FIELDS TERMINATED BY' ,  '  \',\' ',  'OPTIONALLY ENCLOSED BY ' , ' \'\"\' ' ,
  'LINES TERMINATED BY' ,   ' \'\n\' ' ,
  'FROM pkbc_product 
   WHERE tbl_last_dt > (select max(last_extract_date) from etl_extract_date);'
);

PREPARE `stmt` FROM @`qry`;
SET @`qry` := NULL;
EXECUTE `stmt`;
DEALLOCATE PREPARE `stmt`;  


--

SET@`qry` = CONCAT(
'
select * from (
SELECT \'sub_category_id\', \'sub_category_name\', \'category_name\',\'tbl_last_dt\'
UNION ALL
select 
	 sub_category_id ,
	  sub_category_name,      
	  category_name,
	a.tbl_last_dt 
	FROM pkbc_sub_category a 
		inner join pkbc_category b on a.category_id = b.category_id
   WHERE a.tbl_last_dt > (select max(last_extract_date) from etl_extract_date)
   ) resulting_set
into outfile ' , 
' \'' , 'incr_pkbc_dim_sub_category_' , @`curr_str`, '.csv \' ',
 'FIELDS TERMINATED BY' ,  '  \',\' ',  'OPTIONALLY ENCLOSED BY ' , ' \'\"\' ' ,
  'LINES TERMINATED BY' ,   ' \'\n\' ;'
);

PREPARE `stmt` FROM @`qry`;
SET @`qry` := NULL;
EXECUTE `stmt`;
DEALLOCATE PREPARE `stmt`;  

--

SET@`qry` = CONCAT(
'select 
	ord_prod_id as row_id,       
	a.order_id,       
	DATE_FORMAT(b.order_date, \'%Y%m%d %H:%i\'),     
	b.is_returned,     
	quantity,        
	discount ,       
	shipping_cost   ,
	profit     ,     
	sales   ,        
	DATE_FORMAT(ship_date, \'%Y%m%d %H:%i\'),
	ship_mode   ,    
	addr_id as address_id    ,  
	cust_id   ,      
	sub_category_id , 
	a.product_id  , 
	a.market   , 	
	DATE_FORMAT(order_date,\'%m%d%Y\'),
	a.tbl_last_dt
into outfile ' , 
' \'' , 'incr_pkbc_fact_orders_' , @`curr_str`, '.csv \' ',
 'FIELDS TERMINATED BY' ,  '  \',\' ',  'OPTIONALLY ENCLOSED BY ' , ' \'\"\' ' ,
  'LINES TERMINATED BY' ,   ' \'\n\' ' ,
  'FROM pkbc_ord_prod a         
	INNER JOIN pkbc_orders b on a.order_id = b.order_id
	INNER JOIN pkbc_product c on a.product_id = c.product_id and a.market = c.market
   WHERE a.tbl_last_dt > (select max(last_extract_date) from etl_extract_date);'
);

PREPARE `stmt` FROM @`qry`;
SET @`qry` := NULL;
EXECUTE `stmt`;
DEALLOCATE PREPARE `stmt`;  


--
  insert into etl_extract_date(last_extract_date) values ( @`curr` );
  
END;

-- CALL USP_Run_ETL_Incr_Extract();
