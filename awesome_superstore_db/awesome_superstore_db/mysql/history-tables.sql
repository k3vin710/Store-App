drop table if exists pkbc_address_history;
create table pkbc_address_history as select * from pkbc_address where 1 = 2;
alter table pkbc_address_history add constraint pk_address_history primary key (addr_id);

delimiter $$
drop trigger if exists td_pkbc_address;
create trigger td_pkbc_address
before delete on pkbc_address for each row
begin
insert into pkbc_address_history 
select * from pkbc_address 
where addr_id = old.addr_id;
update pkbc_address_history
set tbl_last_dt=current_timestamp()
where addr_id=old.addr_id;
end$$
delimiter ;

drop table if exists pkbc_customer_history;
create table pkbc_customer_history as select * from pkbc_customer where 1 = 2;
alter table pkbc_customer_history add constraint pk_customer_history primary key (cust_id);

delimiter $$
drop trigger if exists td_pkbc_customer;
create trigger td_pkbc_customer
before delete on pkbc_customer for each row
begin insert into pkbc_customer_history
select * from pkbc_customer
where cust_id = old.cust_id;
update pkbc_customer_history
set tbl_last_dt=current_timestamp()
where cust_id=old.cust_id;
end$$
delimiter ;

drop table if exists pkbc_ord_prod_history;
create table pkbc_ord_prod_history as select * from pkbc_ord_prod where 1 = 2;
alter table pkbc_ord_prod_history add constraint pk_ord_prod_history primary key (ord_prod_id);

delimiter $$
drop trigger if exists td_pkbc_ord_prod;
create trigger td_pkbc_ord_prod
before delete on pkbc_ord_prod for each row
begin insert into pkbc_ord_prod_history
select * from pkbc_ord_prod
where ord_prod_id = old.ord_prod_id;
update pkbc_ord_prod_history
set tbl_last_dt=current_timestamp()
where ord_prod_id=old.ord_prod_id;
end$$
delimiter ;

drop table if exists pkbc_orders_history;
create table pkbc_orders_history as select * from pkbc_orders where 1 = 2;
alter table pkbc_orders_history add constraint pk_orders_history primary key (order_id);

delimiter $$
drop trigger if exists td_pkbc_orders;
create trigger td_pkbc_orders
before delete on pkbc_orders for each row
begin insert into pkbc_orders_history
select * from pkbc_orders
where order_id = old.order_id;
update pkbc_orders_history
set tbl_last_dt=current_timestamp()
where order_id = old.order_id;
end$$
delimiter ;

drop table if exists pkbc_product_history;
create table pkbc_product_history as select * from pkbc_product where 1 = 2;
alter table pkbc_product_history add constraint pk_product_history primary key (product_id);

delimiter $$
drop trigger if exists td_pkbc_product;
create trigger td_pkbc_product
before delete on pkbc_product for each row
begin insert into pkbc_product_history
select * from pkbc_product
where product_id = old.product_id;
update pkbc_product_history
set tbl_last_dt=current_timestamp()
where product_id = old.product_id;
end$$
delimiter ;
