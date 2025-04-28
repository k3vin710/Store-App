-- CREATE TRIGGERS FOR TABLES FOR TBL_LAST_DT

-- pkbc_address TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_address_default_date;

DELIMITER $$
CREATE TRIGGER `TI_address_default_date` 
	BEFORE INSERT ON `pkbc_address` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_address_default_date;


DELIMITER $$
CREATE TRIGGER `TU_address_default_date` 
	BEFORE UPDATE ON `pkbc_address` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_category TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_category_default_date;

DELIMITER $$
CREATE TRIGGER `TI_category_default_date` 
	BEFORE INSERT ON `pkbc_category` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_category_default_date;


DELIMITER $$
CREATE TRIGGER `TU_category_default_date` 
	BEFORE UPDATE ON `pkbc_category` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_sub_category TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_sub_category_default_date;

DELIMITER $$
CREATE TRIGGER `TI_sub_category_default_date` 
	BEFORE INSERT ON `pkbc_sub_category` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_sub_category_default_date;


DELIMITER $$
CREATE TRIGGER `TU_sub_category_default_date` 
	BEFORE UPDATE ON `pkbc_sub_category` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;



-- pkbc_city TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_city_default_date;

DELIMITER $$
CREATE TRIGGER `TI_city_default_date` 
	BEFORE INSERT ON `pkbc_city` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_city_default_date;


DELIMITER $$
CREATE TRIGGER `TU_city_default_date` 
	BEFORE UPDATE ON `pkbc_city` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_country TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_country_default_date;

DELIMITER $$
CREATE TRIGGER `TI_country_default_date` 
	BEFORE INSERT ON `pkbc_country` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_country_default_date;


DELIMITER $$
CREATE TRIGGER `TU_country_default_date` 
	BEFORE UPDATE ON `pkbc_country` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_customer TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_customer_default_date;

DELIMITER $$
CREATE TRIGGER `TI_customer_default_date` 
	BEFORE INSERT ON `pkbc_customer` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_customer_default_date;


DELIMITER $$
CREATE TRIGGER `TU_customer_default_date` 
	BEFORE UPDATE ON `pkbc_customer` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_ord_prod TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_ord_prod_default_date;

DELIMITER $$
CREATE TRIGGER `TI_ord_prod_default_date` 
	BEFORE INSERT ON `pkbc_ord_prod` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_ord_prod_default_date;


DELIMITER $$
CREATE TRIGGER `TU_ord_prod_default_date` 
	BEFORE UPDATE ON `pkbc_ord_prod` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_orders TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_orders_default_date;

DELIMITER $$
CREATE TRIGGER `TI_orders_default_date` 
	BEFORE INSERT ON `pkbc_orders` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_orders_default_date;


DELIMITER $$
CREATE TRIGGER `TU_orders_default_date` 
	BEFORE UPDATE ON `pkbc_orders` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_product TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_product_default_date;

DELIMITER $$
CREATE TRIGGER `TI_product_default_date` 
	BEFORE INSERT ON `pkbc_product` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_product_default_date;


DELIMITER $$
CREATE TRIGGER `TU_product_default_date` 
	BEFORE UPDATE ON `pkbc_product` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_region TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_region_default_date;

DELIMITER $$
CREATE TRIGGER `TI_region_default_date` 
	BEFORE INSERT ON `pkbc_region` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_region_default_date;


DELIMITER $$
CREATE TRIGGER `TU_region_default_date` 
	BEFORE UPDATE ON `pkbc_region` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;

-- pkbc_state TABLE TRIGGER

DROP TRIGGER IF EXISTS TI_state_default_date;

DELIMITER $$
CREATE TRIGGER `TI_state_default_date` 
	BEFORE INSERT ON `pkbc_state` 
	FOR EACH ROW
	BEGIN
		if ( isnull(new.tbl_last_dt) ) then
			set new.tbl_last_dt=current_timestamp();
		end if;
	END$$;
DELIMITER ;

DROP TRIGGER IF EXISTS TU_state_default_date;


DELIMITER $$
CREATE TRIGGER `TU_state_default_date` 
	BEFORE UPDATE ON `pkbc_state` 
	FOR	EACH ROW
	BEGIN
		set NEW.tbl_last_dt=current_timestamp();
	END$$;
DELIMITER ;