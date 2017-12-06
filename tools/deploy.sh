#!/bin/bash

cd ..
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" #absolute root dir

PACKAGED=$DIR"/deploy/microbit"      #static html packaged abs path
PEMFILE=$DIR"/tools/microbit.pem"    #pem file abs path

cd tools
rm -rf ../deploy
cd ..
pxt staticpkg
cd tools
mkdir -p ../deploy
cp -r ../built/packaged ../deploy/microbit
cd jx
./run.sh
cd ..
cp manifest.json ../deploy/microbit
cp background.js ../deploy/microbit
cp icon-microbit-128.png ../deploy/microbit
cp jx/microbit.exe ../deploy/microbit
cp jx/microbit.bat ../deploy
mkdir -p ../deploy/microbit/api/compile
cp ../built/hexcache/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.hex ../deploy/microbit/api/compile/
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

mkdir -p ../deploy/microbit/api/translations/es-ES/microbit
cp ../translations/es-ES/*-strings.json ../deploy/microbit/api/translations/es-ES/microbit
cp ../translations/es-ES/strings.json ../deploy/microbit/api/translations/es-ES/
cp ../translations/es-ES/website.json ../deploy/microbit/api/translations/es-ES/


#copy targetconfig to deploy folder

mkdir -p ../deploy/microbit/api/config/microbit
cp ../translations/targetconfig.json ../deploy/microbit/api/config/microbit/

#copy some files to ensure compatibility with chrome extension
cp ../deploy/microbit/api/config/microbit/targetconfig.json ../deploy/microbit/api/config/microbit/targetconfig
cp ../deploy/microbit/api/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json ../deploy/microbit/api/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71

#pack deploy folder into .crx file
chrome.exe --pack-extension=$PACKAGED --pack-extension-key=$PEMFILE