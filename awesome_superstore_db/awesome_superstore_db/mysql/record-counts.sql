SELECT
  'pkbc_ord_prod' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_ord_prod
UNION ALL
SELECT
  'pkbc_product' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_product
UNION ALL
SELECT
  'pkbc_sub_category' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_sub_category
UNION ALL
SELECT
  'pkbc_category' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_category
UNION ALL
SELECT
  'pkbc_orders' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_orders
UNION ALL
SELECT
  'pkbc_address' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_address
UNION ALL
SELECT
  'pkbc_customer' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_customer
UNION ALL
SELECT
  'pkbc_city' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_city
UNION ALL
SELECT
  'pkbc_state' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_state
UNION ALL
SELECT
  'pkbc_country' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_country
UNION ALL
SELECT
  'pkbc_region' AS table_name,
  COUNT(*) AS record_count
FROM
  pkbc_region;