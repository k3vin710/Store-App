
search_dir="/media/sf_VMSHARE"
file_pattern="*incr_pkbc_dim_address*.csv"

for file in $search_dir/$file_pattern
do
    
	sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_address.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/incr_pkbc_dim_address.txt', BAD='/media/sf_VMSHARE/control-files/bad/incr_pkbc_dim_address.bad', LOG='/media/sf_VMSHARE/control-files/log/incr_pkbc_dim_address.txt', DATA="$file" USERID=dws/dws@orcl

done


search_dir="/media/sf_VMSHARE"
file_pattern="*incr_pkbc_dim_customer*.csv"

for file in $search_dir/$file_pattern
do
    
	sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_customer.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/incr_pkbc_dim_customer.txt', BAD='/media/sf_VMSHARE/control-files/bad/incr_pkbc_dim_customer.bad', LOG='/media/sf_VMSHARE/control-files/log/incr_pkbc_dim_customer.txt', DATA="$file" USERID=dws/dws@orcl

done


search_dir="/media/sf_VMSHARE"
file_pattern="*incr_pkbc_dim_product*.csv"

for file in $search_dir/$file_pattern
do
    
	sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_dim_customer.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/incr_pkbc_dim_product.txt', BAD='/media/sf_VMSHARE/control-files/bad/incr_pkbc_dim_product.bad', LOG='/media/sf_VMSHARE/control-files/log/incr_pkbc_dim_product.txt', DATA="$file" USERID=dws/dws@orcl

done

search_dir="/media/sf_VMSHARE"
file_pattern="*incr_pkbc_fact_orders*.csv"

for file in $search_dir/$file_pattern
do
    
	sqlldr CONTROL='/media/sf_VMSHARE/control-files/fullstg_pkbc_fact_orders.ctl', DISCARD='/media/sf_VMSHARE/control-files/discard/incr_pkbc_fact_orders.txt', BAD='/media/sf_VMSHARE/control-files/bad/incr_pkbc_fact_orders.bad', LOG='/media/sf_VMSHARE/control-files/log/incr_pkbc_fact_orders.txt', DATA="$file" USERID=dws/dws@orcl

done
 
 


 
sqlplus dws/dws@orcl <<EOF
SET SERVEROUTPUT ON ;
EXEC load_merge_dim_pkbc_address;
EXEC load_merge_dim_pkbc_customer;
EXEC load_merge_dim_pkbc_product;
EXEC load_merge_dim_pkbc_sub_category;
EXEC load_merge_fact_pkbc_orders;
EXIT;
EOF
