use awesome_inc;

drop procedure if exists USP_UpsertCustomer;
delimiter $$
create procedure USP_UpsertCustomer
(
	in cust_name VARCHAR(100), 
    in segment int, 
    in email varchar(30), 
    in `password` varchar(100)
)
begin
declare cust_id VARCHAR(20);
set cust_id = left(uuid(), 20);
insert into pkbc_customer (cust_id, cust_name, segment, email, `password`)
values (cust_id, cust_name, segment, email, `password`);
select cust_id;
end$$

delimiter ;

drop procedure if exists USP_GetCustomerById;
delimiter $$
create procedure USP_GetCustomerById(
	in cust_id VARCHAR(20)
)
begin
select * from pkbc_customer a where a.cust_id = cust_id limit 1;
end$$

delimiter ;

drop procedure if exists USP_GetCustomerByEmail;
delimiter $$
create procedure USP_GetCustomerByEmail(
	in email VARCHAR(30)
)
begin
select * from pkbc_customer a where a.email = email limit 1;
end$$

delimiter ;

drop procedure if exists USP_GetAllRegions;
delimiter $$
create procedure USP_GetAllRegions()
begin
select region_id, region_name from pkbc_region;
end$$

delimiter ;

drop procedure if exists USP_GetAllCountriesByRegion;
delimiter $$
create procedure USP_GetAllCountriesByRegion(
	in region_id int
)
begin
select c.country_id, c.country_name from pkbc_country c where c.region_id = region_id;
end$$

delimiter ;

drop procedure if exists USP_GetAllStatesByCountry;
delimiter $$
create procedure USP_GetAllStatesByCountry(
	in country_id int
)
begin
select s.state_id, s.state_name from pkbc_state s where s.country_id = country_id;
end$$

delimiter ;

drop procedure if exists USP_GetAllCitiesByState;
delimiter $$
create procedure USP_GetAllCitiesByState(
	in state_id int
)
begin
select c.city_id, c.city_name from pkbc_city c where c.state_id = state_id;
end$$

delimiter ;

drop procedure if exists USP_GetAllRegions;
delimiter $$
create procedure USP_GetAllRegions()
begin
select region_id, region_name from pkbc_region;
end$$

delimiter ;

drop procedure if exists USP_UpsertAddress;
delimiter $$
create procedure USP_UpsertAddress(
	in city_id int,
    in postal_code VARCHAR(10),
    in cust_id VARCHAR(20)
)
begin
insert into pkbc_address (city_id, postal_code, cust_id)
values (city_id, postal_code, cust_id);
select addr_id, city_id, postal_code, cust_id from pkbc_address where addr_id = last_insert_id();
end$$

delimiter ;

drop procedure if exists USP_GetAddressByCustomer;
delimiter $$
create procedure USP_GetAddressByCustomer(
	in cust_id VARCHAR(20)
)
begin
select a.addr_id, c.city_name, s.state_name, co.country_name, r.region_name, a.postal_code
from pkbc_address a 
left join pkbc_city c on a.city_id = c.city_id
left join pkbc_state s on s.state_id = c.state_id
left join pkbc_country co on co.country_id = s.country_id
left join pkbc_region r on co.region_id = r.region_id
where a.cust_id = cust_id;
end$$

delimiter ;

drop procedure if exists USP_UpdateAddress;
delimiter $$
create procedure USP_UpdateAddress(
	in addr_id int,
	in city_id int,
    in postal_code VARCHAR(10)
)
begin
update pkbc_address a
set 
a.city_id = city_id,
a.postal_code = postal_code
where a.addr_id = addr_id;
select a.addr_id, a.city_id, a.postal_code, a.cust_id from pkbc_address a where a.addr_id = addr_id;
end$$

delimiter ;

drop procedure if exists USP_UpdateCustomer;
delimiter $$
create procedure USP_UpdateCustomer(
	in cust_id VARCHAR(20),
    in cust_name VARCHAR(100), 
    in segment int, 
    in email varchar(30),
    in `password` varchar(100)
)
begin
update pkbc_customer c
set
c.cust_name = cust_name,
c.segment = segment,
c.email = email,
c.`password` = `password`
where c.cust_id = cust_id;
select c.cust_id, c.cust_name, c.segment, c.email from pkbc_customer c where c.cust_id = cust_id;
end$$

delimiter ;

drop procedure if exists USP_GetAddressById;
delimiter $$
create procedure USP_GetAddressById(
	in addr_id int
)
begin
select a.city_id, s.state_id, co.country_id, r.region_id, a.postal_code, a.cust_id from pkbc_address a 
left join pkbc_city c on a.city_id = c.city_id
left join pkbc_state s on c.state_id = s.state_id
left join pkbc_country co on co.country_id = s.country_id
left join pkbc_region r on r.region_id = co.region_id
where a.addr_id = addr_id;
end$$

delimiter ;

drop procedure if exists USP_SetAndGetOTPByEmail;
delimiter $$
create procedure USP_SetAndGetOTPByEmail(
	in email VARCHAR(30)
)
begin
update pkbc_customer c
set c.otp_code = SUBSTRING(MD5(RAND()), 1, 5)
where c.email = email;
select c.otp_code from pkbc_customer c where c.email = email;
end$$

delimiter ;

drop procedure if exists USP_GetCustIdByEmailAndOTP;
delimiter $$
create procedure USP_GetCustIdByEmailAndOTP(
	in email VARCHAR(30),
    in otp VARCHAR(5)
)
begin
select c.cust_id from pkbc_customer c 
where c.email = email and c.otp = otp;
end$$

delimiter ;

drop procedure if exists USP_GetAllCategory;
delimiter $$
create procedure USP_GetAllCategory()
begin
select category_id, category_name from pkbc_category;
end$$

delimiter ;

drop procedure if exists USP_GetAllSubcategoryByCategory;
delimiter $$
create procedure USP_GetAllSubcategoryByCategory(
	in category_id int
)
begin
select s.sub_category_id, s.sub_category_name from pkbc_sub_category s where s.category_id = category_id;
end$$

delimiter ;

drop procedure if exists USP_UpsertProduct;
delimiter $$
create procedure USP_UpsertProduct(
	in product_name VARCHAR(200),
    in unit_price DECIMAL(10,2),
    in market int,
    in sub_category_id int
)
begin
declare sub_category_name VARCHAR(30);
declare category_name VARCHAR(30);
declare inserted_product_id VARCHAR(20);
select s.sub_category_name into sub_category_name from pkbc_sub_category s where s.sub_category_id = sub_category_id limit 1;
select c.category_name into category_name from pkbc_sub_category s inner join
pkbc_category c on c.category_id = s.category_id limit 1;
select CONCAT(UPPER(SUBSTRING(category_name, 1, 3)), "-", UPPER(SUBSTRING(sub_category_name, 1, 2)), "-", SUBSTRING(UUID(), 1, 4)) into inserted_product_id;
insert into pkbc_product(
        product_id   ,
        unit_price	 ,
        product_name ,
        market       ,
        sub_category_id 
)
values (
	inserted_product_id,
    unit_price,
    product_name,
    market,
    sub_category_id
);
select * from pkbc_product where product_id = inserted_product_id limit 1;
end$$

delimiter ;

DROP PROCEDURE IF EXISTS USP_InsertOrdersData;

DELIMITER $$
CREATE PROCEDURE USP_InsertOrdersData
(
    OrderProdJSON JSON,
    in_addr_id bigint,
	in_cust_id varchar(20),
    in_ship_mode tinyint,
    in_ship_date datetime
)
BEGIN
	declare o_id VARCHAR(40);
    
    DECLARE jsonItemsLength BIGINT UNSIGNED DEFAULT JSON_LENGTH(`OrderProdJSON`);
	DECLARE idx BIGINT UNSIGNED DEFAULT 0;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
		BEGIN
		  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
									  @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
		  SET @text = LEFT(@text, 100);
		  SET @Full_Error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
		  ROLLBACK;
		  SIGNAL SQLSTATE "45001" SET MESSAGE_TEXT = @Full_Error;
		END;
    
    SET autocommit = 0;
	START TRANSACTION;
    
	set o_id = left(uuid(), 40);
    
	insert into pkbc_orders(
        order_id   	,
        order_date  ,
        is_returned 
	) values (
		o_id,
        NOW(),
        false        
    );
    
     DROP TEMPORARY TABLE IF EXISTS `temp_pkbc_ord_prod`;
     
     CREATE TEMPORARY TABLE  IF NOT EXISTS  `temp_pkbc_ord_prod`(
	  `quantity` decimal(12,2) NOT NULL COMMENT 'Product Quantity for the order',
	  `discount` decimal(10,2) NOT NULL COMMENT 'Discount for product of  the order',
	  `shipping_cost` decimal(10,2) NOT NULL COMMENT 'Shipping cost for product of  the order',
	  `profit` decimal(10,2) NOT NULL COMMENT 'Profit for product of  the order',
	  `sales` bigint NOT NULL COMMENT 'Sales for the product of the order',
	  `order_id` varchar(40) NOT NULL COMMENT 'Order Id',
	  `product_id` varchar(20) NOT NULL COMMENT 'Product Id',
	  `market` tinyint NOT NULL,
	  `addr_id` bigint NOT NULL,
	  `cust_id` varchar(20) NOT NULL COMMENT 'Customer Id',
	  `ship_mode` tinyint NOT NULL COMMENT 'shipping  mode. 1: First Class , 2 : Second Class , 3 : Same Day, 4 : Standard Class',
	  `ship_date` datetime NOT NULL COMMENT 'Shipping Date'
     );
     
     WHILE idx < jsonItemsLength 
     DO
		 insert into `temp_pkbc_ord_prod`(
			quantity    	,
			discount        ,
			shipping_cost   ,
			profit          ,
			sales           ,
			order_id        ,
			product_id      ,
			market          ,
			addr_id         ,
			cust_id    	    ,
			ship_mode       ,
			ship_date   
		)  values (
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].quantity')))			,	
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].discount')))			,	
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].shipping_cost')))	,
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].profit')))			,		   
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].sales')))			,		   
			o_id,	
			JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].product_id')))		,	
			case when JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].market'))) = 'USCA'  then 1
				when JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].market'))) = 'Asia Pacific'  then 2
				when JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].market'))) = 'Europe'  then 3
				when JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].market'))) = 'Africa'  then 4
				when JSON_UNQUOTE(JSON_EXTRACT(OrderProdJSON, CONCAT('$[', idx , '].market'))) = 'LATAM'  then 5
				else 0 end ,	   
			in_addr_id			,		   
			in_cust_id			,		   
			in_ship_mode		,	
			in_ship_date       
        );
        
        
        
        SET idx = idx + 1;
	END WHILE;
    
    insert into pkbc_ord_prod(
		quantity    	,
		discount        ,
		shipping_cost   ,
		profit          ,
		sales           ,
		order_id        ,
		product_id      ,
		market          ,
		addr_id         ,
		cust_id    	    ,
		ship_mode       ,
		ship_date   		
	) select
		quantity    	,
		discount        ,
		shipping_cost   ,
		profit          ,
		sales           ,
		order_id        ,
		product_id      ,
		market          ,
		addr_id         ,
		cust_id    	    ,
		ship_mode       ,
		ship_date  
	from `temp_pkbc_ord_prod`;
    
     
	DROP TEMPORARY TABLE IF EXISTS `temp_pkbc_ord_prod`; 
    COMMIT WORK;   
    
END $$
DELIMITER ;

drop procedure if exists USP_GetOrdersByCustomer;

delimiter $$
create procedure USP_GetOrdersByCustomer(
	in cust_id VARCHAR(20),
    in is_returned CHAR(1)
)
begin
select op.order_id, o.order_date, count(op.order_id) total_items
from pkbc_ord_prod op 
left join pkbc_orders o on o.order_id = op.order_id
where op.cust_id = cust_id
and o.is_returned = is_returned
group by op.order_id;
end$$
delimiter ;

drop procedure if exists USP_ReturnOrder;

delimiter $$
create procedure USP_ReturnOrder(
	in order_id VARCHAR(40)
)
begin
update pkbc_orders o
set o.is_returned = '1'
where o.order_id = order_id;
select * from pkbc_orders o where o.order_id = order_id;
end$$
delimiter ;

drop procedure if exists USP_GetOrderProd;

delimiter $$
create procedure USP_GetOrderProd(
	in order_id VARCHAR(40)
)
begin
select 
op.quantity, 
op.discount, 
op.shipping_cost, 
op.profit, 
op.sales, 
op.ship_date,
op.ship_mode,
op.product_id,
p.product_name
from pkbc_ord_prod op
left join pkbc_product p on p.product_id = op.product_id
where op.order_id = order_id;
end$$
delimiter ;



