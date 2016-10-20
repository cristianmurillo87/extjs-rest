@echo off
REM @Date: 11/08/2016
REM Developer: Ing. Esp. Cristian Andres Murillo
REM Description: Beautify javascript code by means of npm js-beautify command tool 
@echo on
for /R %%g in (*.js) do js-beautify -r -t --no-preserve-newlines %%g
for %%g in (*.js) do js-beautify -t --no-preserve-newlines %%g

echo Edicion finalizada..
PAUSE