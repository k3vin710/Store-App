@echo off
for /f "delims=" %%i in ('dir /s /b "C:\ProgramData\MySQL\MySQL Server 8.0\Data\awesome_inc\*incr_pkbc_*.csv"') do (
  echo Deleting file: %%i
  del "%%i"
)


@echo off
for /f "delims=" %%i in ('dir /s /b "D:\VMSHARE\*incr_pkbc_*.csv"') do (
  echo Deleting file: %%i
  del "%%i"
)

mysql  -u root -p   -e "CALL USP_Run_ETL_Incr_Extract()" awesome_inc



@echo off

for /f "delims=" %%i in ('dir /s /b "C:\ProgramData\MySQL\MySQL Server 8.0\Data\awesome_inc\*incr_pkbc_*.csv"') do (
  echo Moving file: %%i
  copy "%%i" D:\VMSHARE\ 
)