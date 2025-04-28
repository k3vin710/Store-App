insert into pkbc_region(
        region_name
) select distinct region from pkbc_awesome_inc_orders;


insert into pkbc_country(
        country_name, region_id
) select distinct a.country, r.region_id from pkbc_awesome_inc_orders a
left join (select distinct r.region_id, a.region
from pkbc_region r
inner join pkbc_awesome_inc_orders a on r.region_name = a.region) r on r.region = a.region;

 
insert into pkbc_state(
        state_name, country_id
) select distinct a.state, c.country_id from pkbc_awesome_inc_orders a
left join (select distinct c.country_id, a.country
from pkbc_country c
inner join pkbc_awesome_inc_orders a on c.country_name = a.country) c on c.country = a.country;


insert into pkbc_city(
        city_name, state_id
) select distinct a.city, s.state_id from pkbc_awesome_inc_orders a
left join (select distinct s.state_id, a.state
from pkbc_state s
inner join pkbc_awesome_inc_orders a on s.state_name = a.state) s on s.state = a.state;
 
insert into pkbc_customer(
        cust_id     ,
        cust_name   ,
        segment     ,
        email		,
        `password`	
) select distinct `Customer ID`, `Customer Name`, 
	CASE WHEN `Segment` = 'Consumer'  THEN 1
		WHEN `Segment` = 'Corporate'  THEN 2
		WHEN `Segment` = 'Home Office'  THEN 3
        ELSE 0 
	END `Segment Code`,
    CONCAT(`Customer ID`, '@gmail.com'),
    CONCAT('pass_', `Customer ID`)
	from pkbc_awesome_inc_orders;

  
insert into pkbc_address(
	city_id      ,        
    postal_code  ,
	cust_id       
) select distinct
	city_id      ,  
	`Postal Code`   , 
	cust_id     
from pkbc_awesome_inc_orders a
	inner join pkbc_city b on a.City = b.city_name
    inner join pkbc_region c on a.Region = c.region_name
    inner join pkbc_customer e on a.`Customer ID` = e.cust_id;
    

 insert into pkbc_category(
        category_name    
) select distinct	
		Category
 from pkbc_awesome_inc_orders;
 
 insert into pkbc_sub_category(
        sub_category_name       ,
        category_id   
) select distinct	
		a.`Sub-Category`,
        (select b.category_id from pkbc_category b where b.category_name = a.`Category`) 
        as category_id
 from pkbc_awesome_inc_orders a;
 
insert into pkbc_product(
        product_id   ,
        product_name ,
        market       ,
        sub_category_id 
)  select distinct
	`Product ID`,
    `Product Name`,
    case when Market = 'USCA'  then 1
		when Market = 'Asia Pacific'  then 2
		when Market = 'Europe'  then 3
		when Market = 'Africa'  then 4
		when Market = 'LATAM'  then 5
        else 0
	end as Market ,
    (
		select sub_category_id 
        from pkbc_sub_category b 
        where a.`Sub-Category` = b.sub_category_name
        and a.Category in ( select c.category_name from pkbc_category c where b.category_id = c.category_id) 
    ) as sub_category_id
 from pkbc_awesome_inc_orders a  ;
 
 
 insert into pkbc_orders(
        order_id   	,
        order_date  ,
        is_returned 
) select distinct 
        `Order ID`   	,
		STR_TO_DATE(`Order Date`, '%m/%d/%Y')   ,
        '0' as is_returned 
	from pkbc_awesome_inc_orders a ;


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
		CASE WHEN quantity is NULL or quantity='' then 0  
			WHEN quantity REGEXP '^[0-9\.]+$' then CAST(quantity as  DECIMAL(10,2) )
            when SUBSTRING_INDEX(TRIM(quantity),' ',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(quantity),' ',1) as  DECIMAL(10,2) )
			WHEN substring(quantity , 1, 1) = '$' THEN CAST( REPLACE( REPLACE(TRIM(quantity), ',', '') , '$' , '' ) AS DECIMAL(10,2))
			ELSE -1
        END as quantity ,
		CASE WHEN discount is NULL or discount = '' then 0  
			WHEN discount REGEXP '^[0-9\.]+$' then CAST(discount as  DECIMAL(10,2) )
            WHEN substring(discount , 1, 1) = '$' THEN CAST( REPLACE( REPLACE(TRIM(discount), ',', '') , '$' , '' ) AS DECIMAL(10,2))
			-- WHEN SUBSTRING_INDEX(TRIM(discount),'/',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(discount),'/',1) as  DECIMAL(10,2) )
			-- WHEN SUBSTRING_INDEX(TRIM(discount),' ',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(discount),' ',1) as  DECIMAL(10,2) )
			ELSE -1
		END as discount,
		CASE WHEN `Shipping Cost` is NULL or `Shipping Cost` = '' then 0
			WHEN `Shipping Cost` REGEXP '^[0-9\.]+$' then CAST(`Shipping Cost` as  DECIMAL(10,2) )
			WHEN substring(`Shipping Cost` , 1, 1) = '$' THEN CAST( REPLACE( REPLACE(TRIM(`Shipping Cost`), ',', '') , '$' , '' ) AS DECIMAL(10,2))
			WHEN substring(`Shipping Cost` , 1, 2) = '-$' THEN CAST( REPLACE( REPLACE(TRIM(`Shipping Cost`), ',', '') , '-$' , '-' ) AS DECIMAL(10,2))
			WHEN SUBSTRING_INDEX(TRIM(sales),'/',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(`Shipping Cost`),'/',1) as  DECIMAL(10,2) )
			WHEN SUBSTRING_INDEX(TRIM(sales),' ',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(`Shipping Cost`),' ',1) as  DECIMAL(10,2) )
			ELSE -1
        END as `Shipping Cost` ,
		 CASE WHEN Profit is NULL or Profit = '' then 0
			WHEN Profit REGEXP '^[0-9\.]+$' then CAST(Profit as  DECIMAL(10,2) )
			WHEN substring(Profit , 1, 1) = '$' THEN CAST( REPLACE( REPLACE(TRIM(Profit), ',', '') , '$' , '' ) AS DECIMAL(10,2))
			WHEN substring(Profit , 1, 2) = '-$' THEN CAST( REPLACE( REPLACE(TRIM(Profit), ',', '') , '-$' , '-' ) AS DECIMAL(10,2))
			WHEN SUBSTRING_INDEX(TRIM(Profit),'/',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(Profit),'/',1) as  DECIMAL(10,2) )
			WHEN SUBSTRING_INDEX(TRIM(Profit),' ',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(Profit),' ',1) as  DECIMAL(10,2) )
			ELSE -1000000
        END as profit   ,
        CASE WHEN sales is NULL or sales = '' then 0
			WHEN sales REGEXP '^[0-9\.]+$' then CAST(sales as  DECIMAL(10,2) )
			WHEN substring(sales , 1, 1) = '$' THEN CAST( REPLACE( REPLACE(TRIM(sales), ',', '') , '$' , '' ) AS DECIMAL(10,2))
			WHEN substring(sales , 1, 2) = '-$' THEN CAST( REPLACE( REPLACE(TRIM(sales), ',', '') , '-$' , '-' ) AS DECIMAL(10,2))
			WHEN SUBSTRING_INDEX(TRIM(sales),'/',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(sales),'/',1) as  DECIMAL(10,2) )
			WHEN SUBSTRING_INDEX(TRIM(sales),' ',1) REGEXP '^[0-9\.]+$' then CAST(SUBSTRING_INDEX(TRIM(sales),' ',1) as  DECIMAL(10,2) )
			ELSE -1
		END as sales,
		a.`Order ID`as order_id ,
		a.`Product ID` as product_id ,
		case when Market = 'USCA'  then 1
			when Market = 'Asia Pacific'  then 2
			when Market = 'Europe'  then 3
			when Market = 'Africa'  then 4
			when Market = 'LATAM'  then 5
			else 0
		end as market ,
		(
			select addr_id from pkbc_address b
				inner join pkbc_city c on c.city_id = b.city_id
                inner join pkbc_state s on s.state_id = c.state_id
                inner join pkbc_country co on co.country_id = s.country_id
                inner join pkbc_region r on r.region_id = co.region_id
				where c.city_id in (select c.city_id from pkbc_city c where a.City = c.city_name) 
                and	  r.region_id in (select d.region_id from pkbc_region d where a.Region = d.region_name )
                and   b.cust_id in (select f.cust_id from pkbc_customer f where a.`Customer ID` = f.cust_id )
                and   co.country_id  in (select g.country_id from pkbc_country g where a.Country = g.country_name )
                and   b.postal_code = a.`Postal Code` limit 1
        ) as addr_id,
		a.`Customer ID` ,
		case when `Ship Mode` = 'First Class' then 1  
			 when `Ship Mode` = 'Second Class' then 2 
			 when `Ship Mode` = 'Same Day' then 3
			 when `Ship Mode` = 'Standard Class' then 4
             else 0
        end as ship_mode,
		STR_TO_DATE(`Ship Date`, '%m/%d/%Y')  as ship_date
 from pkbc_awesome_inc_orders  a ;


update pkbc_orders a set is_returned = '1' 
where a.order_id in ( select `Order ID` from pkbc_awesome_inc_returns);

delete from pkbc_ord_prod 
where quantity = -1 
	or discount = -1
    or shipping_cost = -1000000
    or profit = -1
    or sales = -1;

-- number of records whose prices were null before

-- with temptable as (select p.unit_price , 
-- 	(select sum(op.sales) / sum(op.quantity) from pkbc_ord_prod op where op.product_id = p.product_id and op.market = p.market
--     ) as cal
--  from  pkbc_product p)
-- select * from temptable where  cal is null;

    
update pkbc_product p
set p.unit_price = coalesce(
( select sum(op.sales) / sum(op.quantity) from pkbc_ord_prod op where op.product_id = p.product_id and op.market = p.market
 ), 10);
