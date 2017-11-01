#!/bin/bash

mkdir -p ../deploy
cp -r ../built/packaged ../deploy/microbit
cp jx/microbit.exe ../deploy/microbit
mkdir -p ../deploy/microbit/api/compile
cp ../built/hexcache/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.hex ../deploy/microbit/api/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json
cd ../deploy/microbit/api/compile
#converts .hex into json file
sed -i '1s;^;{"enums":[],"functions":[],"hex":";' 0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json
sed -i '$s/$/\\r\\n"}/' 0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json
sed -i ':a;N;$!ba;s/\n/\\r\\n/g' 0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json
cd ../../../../tools

#copy translations to deploy folder
mkdir -p ../deploy/microbit/api/translations/pt-BR/microbit
cp ../translations/pt-BR/*-strings.json ../deploy/microbit/api/translations/pt-BR/microbit
cp ../translations/pt-BR/strings.json ../deploy/microbit/api/translations/pt-BR/
cp ../translations/pt-BR/website.json ../deploy/microbit/api/translations/pt-BR/


#copy targetconfig to deploy folder

mkdir -p ../deploy/microbit/api/config/microbit
cp ../translations/targetconfig.json ../deploy/microbit/api/config/microbit/
