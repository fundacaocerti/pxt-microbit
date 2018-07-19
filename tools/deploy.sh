#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )" #absolute root dir

DEPLOY=$DIR"/deploy"
PACKAGED=$DEPLOY"/microbit"      #static html packaged abs path
PACKAGED_API=$PACKAGED"/api"
PACKAGED_COMPILE=$PACKAGED"/api/compile"
BUILT=$DIR"/built"
BUILT_HEX_CACHE=$BUILT/hexcache
RESOURCES=$DIR"/resources"
RESOURCES_API=$DIR"/resources/api"
RESOURCES_EXTENSION=$DIR"/resources/chrome"
PEMFILE=$RESOURCES_EXTENSION"/microbit.pem"    #pem file abs path
SHA_BLOCKSPRJ=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/blocksprj/built/yt/buildcache.json )
SHA_TSPRJ=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/tsprj/built/yt/buildcache.json )

rm -rf $DEPLOY
rm -rf $BUILT
pxt staticpkg
mkdir -p $DEPLOY
cp -r $BUILT/packaged $PACKAGED
mkdir -p $PACKAGED_COMPILE

#iterate over the sha's and save it in deploy
declare -a arr=($SHA_BLOCKSPRJ $SHA_TSPRJ)
for sha in "${arr[@]}"
do
    cp $BUILT_HEX_CACHE/$sha.hex $PACKAGED_COMPILE
    cp $BUILT_HEX_CACHE/$sha.hex $PACKAGED_COMPILE/$sha.json

    #converts .hex into .json file
    sed -i '1s;^;{"enums":[],"functions":[],"hex":";' $PACKAGED_COMPILE/$sha.json
    sed -i '$s/$/\\r\\n"}/' $PACKAGED_COMPILE/$sha.json
    sed -i ':a;N;$!ba;s/\n/\\r\\n/g' $PACKAGED_COMPILE/$sha.json
done

#copy resources api folder to deploy
cp -r $RESOURCES_API $PACKAGED

#copy aditional resources for offline compatibility
cp $PACKAGED_API/clientconfig $PACKAGED/clientconfig.json

#copy extension required files
cp -r $RESOURCES_EXTENSION/* $PACKAGED

#change availableLocales in target.js to just use 3 languages: en, es-ES, pt-BR
sed -i 's/\(\"availableLocales\": \[\)/"availableLocales": [\n\t\t\t"en",\n\t\t\t"es-ES",\n\t\t\t"pt-BR"\n\t\t],\n\t\t"allAvailableLocales": [/g' $PACKAGED/target.js

#change isStatic to false to redirect the urls to the correct file according to the translation
sed -i 's/\(\"isStatic\": true\)/"isStatic": false/g' $PACKAGED/index.html

#change isStatic to false to redirect the help urls correctly
sed -i 's/\(\"isStatic\": true\)/"isStatic": false/g' $PACKAGED/embed.js

#change popout to redirect to the correct url
sed -i 's/window.open(url, \"_blank\");/url = url.includes(".\/docs") ? "https:\/\/makecode.microbit.org" + url.replace(".\/docs\/", "").replace(".html", "") : "https:\/\/makecode.microbit.org\/" + url;\n\t\t\t\t\t\twindow.open(url, "_blank");/g' $PACKAGED/pxtrunner.js

#change Download/help to redirect to the correct url
sed -i 's/\"usbDocs\": \"\/device\/usb\"/\"usbDocs\": \"https:\/\/makecode.microbit.org\/device\/usb\"/g' $PACKAGED/target.js

#change Logo micro:bit to redirect to the correct url
sed -i 's/\"logoUrl\": \"\/.\/\"/\"logoUrl\": \"https:\/\/microbit.org\/code\/\"/g' $PACKAGED/target.js

#do not set _isOnline false and Cloud.onOffline(), with that it will always try to open a request instead of just fail with the offline message
sed -i 's/if (e.statusCode == 0) {/return Promise.reject(e);\n\t\t\t\tif (e.statusCode == 0) {/g' $PACKAGED/pxtlib.js

#set weatherbit version
sed -i 's/\"weatherbit\": \"\*\"/\"weatherbit\": \"github:sparkfun\/pxt-weather-bit#v0.0.10\"/g' $PACKAGED/target.js

#set neopixel version
sed -i 's/\"neopixel\": \"\*\"/\"neopixel\": \"github:microsoft\/pxt-neopixel#v0.6.7\"/g' $PACKAGED/target.js

#set grove version
sed -i 's/\"Grove\": \"\*\"/\"Grove\": \"github:seeed-studio\/pxt-grove#v0.1.0\"/g' $PACKAGED/target.js

#change "Add package.../?" to redirect to the correct url
sed -i 's/helpUrl: \"\/packages\"/helpUrl: \"https:\/\/makecode.microbit.org\/packages\"/g' $PACKAGED/main.js


#pack deploy folder into .crx file
chrome.exe --pack-extension=$PACKAGED --pack-extension-key=$PEMFILE