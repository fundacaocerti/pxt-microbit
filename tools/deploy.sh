#!/bin/bash

cd ..
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" #absolute root dir

PACKAGED=$DIR"/deploy/microbit"      #static html packaged abs path
RESOURCES=$DIR"/resources"
PEMFILE=$RESOURCES"/chrome/microbit.pem"    #pem file abs path
SHA=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/blocksprj/built/yt/buildcache.json )

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

cp ../built/hexcache/$SHA.hex ../deploy/microbit/api/compile/
cp ../built/hexcache/$SHA.hex ../deploy/microbit/api/compile/$SHA.json
cd ../deploy/microbit/api/compile
#converts .hex into json file
sed -i '1s;^;{"enums":[],"functions":[],"hex":";' $SHA.json
sed -i '$s/$/\\r\\n"}/' $SHA.json
sed -i ':a;N;$!ba;s/\n/\\r\\n/g' $SHA.json
cd $DIR/tools

#copy translations to deploy folder
cp -r $RESOURCES/api/translations ../deploy/microbit/api/

#copy targetconfig to deploy folder
mkdir -p ../deploy/microbit/api/config/microbit
cp $RESOURCES/api/config/microbit/* ../deploy/microbit/api/config/microbit/

#copy some files to ensure compatibility with chrome extension
cp ../deploy/microbit/api/compile/$SHA.json ../deploy/microbit/api/compile/$SHA

#copy chrome extension required files
cp $RESOURCES/chrome/background.js ../deploy/microbit/
cp $RESOURCES/chrome/icon-microbit-128.png ../deploy/microbit/
cp $RESOURCES/chrome/manifest.json ../deploy/microbit/

#copy aditional resources for offline compatibility
cp -r $RESOURCES/api/md  		 ../deploy/microbit/api/
cp $RESOURCES/api/clientconfig ../deploy/microbit/api

#pack deploy folder into .crx file
chrome.exe --pack-extension=$PACKAGED --pack-extension-key=$PEMFILE
