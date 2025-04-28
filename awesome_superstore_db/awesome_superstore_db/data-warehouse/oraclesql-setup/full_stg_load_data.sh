 
 
 sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_address.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/fullstg_pkbc_dim_address.txt', BAD='/media/sf_VMSHARE/control-files/bad/fullstg_pkbc_dim_address.bad', LOG='/media/sf_VMSHARE/control-files/log/fullstg_pkbc_dim_address.txt', DATA='/media/sf_VMSHARE/fullstg_pkbc_dim_address.csv' USERID=dws/dws@orcl
 
 
 sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_customer.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/fullstg_pkbc_dim_customer.txt', BAD='/media/sf_VMSHARE/control-files/bad/fullstg_pkbc_dim_customer.bad', LOG='/media/sf_VMSHARE/control-files/log/fullstg_pkbc_dim_customer.txt', DATA='/media/sf_VMSHARE/fullstg_pkbc_dim_customer.csv' USERID=dws/dws@orcl
 
 sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_product.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/fullstg_pkbc_dim_product.txt', LOG='/media/sf_VMSHARE/control-files/log/fullstg_pkbc_dim_product.txt',  BAD='/media/sf_VMSHARE/control-files/bad/fullstg_pkbc_dim_product.bad', DATA='/media/sf_VMSHARE/fullstg_pkbc_dim_product.csv' USERID=dws/dws@orcl
 
 
 
 sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_fact_orders.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/fullstg_pkbc_fact_orders.txt', LOG='/media/sf_VMSHARE/control-files/log/fullstg_pkbc_fact_orders.txt',   BAD='/media/sf_VMSHARE/control-files/bad/fullstg_pkbc_fact_orders.bad', DATA='/media/sf_VMSHARE/fullstg_pkbc_fact_orders.csv' USERID=dws/dws@orcl
 
 
 
sqlplus dws/dws@orcl <<EOF
SET SERVEROUTPUT ON ;
EXEC load_merge_dim_pkbc_address;
EXEC load_merge_dim_pkbc_customer;
EXEC load_merge_dim_pkbc_product;
EXEC load_merge_dim_pkbc_sub_category;
EXEC load_merge_fact_pkbc_orders;
EXIT;
EOF