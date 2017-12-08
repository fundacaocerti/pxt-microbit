#!/bin/bash

cd ..
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" #absolute root dir

PACKAGED=$DIR"/deploy/microbit"      #static html packaged abs path
RESOURCES=$DIR"/resources"
PEMFILE=$RESOURCES"/chrome/microbit.pem"    #pem file abs path


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
cd $DIR/tools

#copy translations to deploy folder
cp -r $RESOURCES/api/translations ../deploy/microbit/api/

#copy targetconfig to deploy folder
mkdir -p ../deploy/microbit/api/config/microbit
cp $RESOURCES/api/config/microbit/* ../deploy/microbit/api/config/microbit/

#copy some files to ensure compatibility with chrome extension
cp ../deploy/microbit/api/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71.json ../deploy/microbit/api/compile/0662709fa031556725d5759589cee8061b26701a654d387f175c459b186d0d71

#copy chrome extension required files
cp $RESOURCES/chrome/background.js ../deploy/microbit/
cp $RESOURCES/chrome/icon-microbit-128.png ../deploy/microbit/
cp $RESOURCES/chrome/manifest.json ../deploy/microbit/

#copy aditional resources for offline compatibility
cp -r $RESOURCES/api/md  		 ../deploy/microbit/api/
cp $RESOURCES/api/clientconfig ../deploy/microbit/api

#pack deploy folder into .crx file
chrome.exe --pack-extension=$PACKAGED --pack-extension-key=$PEMFILE
