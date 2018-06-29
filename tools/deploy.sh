#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )" #absolute root dir

DEPLOY=$DIR"/deploy"
PACKAGED=$DEPLOY"/microbit"      #static html packaged abs path
PACKAGED_COMPILE=$PACKAGED"/api/compile"
BUILT=$DIR"/built"
RESOURCES=$DIR"/resources"
PEMFILE=$RESOURCES"/chrome/microbit.pem"    #pem file abs path
SHA=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/blocksprj/built/yt/buildcache.json )

rm -rf $DEPLOY
rm -rf $BUILT
pxt staticpkg
mkdir -p $DEPLOY
cp -r $BUILT/packaged $PACKAGED
mkdir -p $PACKAGED_COMPILE

cp $BUILT/hexcache/$SHA.hex $PACKAGED_COMPILE
cp $BUILT/hexcache/$SHA.hex $PACKAGED_COMPILE/$SHA.json

#converts .hex into .json file
sed -i '1s;^;{"enums":[],"functions":[],"hex":";' $PACKAGED_COMPILE/$SHA.json
sed -i '$s/$/\\r\\n"}/' $PACKAGED_COMPILE/$SHA.json
sed -i ':a;N;$!ba;s/\n/\\r\\n/g' $PACKAGED_COMPILE/$SHA.json

#copy translations to deploy folder
cp -r $RESOURCES/api/translations $PACKAGED/api/

#copy some files to ensure compatibility with chrome extension
cp $PACKAGED_COMPILE/$SHA.json $PACKAGED_COMPILE/$SHA

#copy chrome extension required files
cp $RESOURCES/chrome/background.js $PACKAGED
cp $RESOURCES/chrome/icon-microbit-128.png $PACKAGED
cp $RESOURCES/chrome/manifest.json $PACKAGED

#copy aditional resources for offline compatibility
cp -r $RESOURCES/api/md $PACKAGED/api/
cp $RESOURCES/api/clientconfig $PACKAGED/

#change availableLocales in target.js to just use 3 languages: en, es-ES, pt-BR
sed -i 's/\(\"availableLocales\": \[\)/"availableLocales": [\n\t\t\t"en",\n\t\t\t"es-ES",\n\t\t\t"pt-BR"\n\t\t],\n\t\t"allAvailableLocales": [/g' $PACKAGED/target.js

#change isStatic to false to redirect the urls to the correct file according to the translation
sed -i 's/\(\"isStatic\": true\)/"isStatic": false/g' $PACKAGED/index.html

#pack deploy folder into .crx file
chrome.exe --pack-extension=$PACKAGED --pack-extension-key=$PEMFILE