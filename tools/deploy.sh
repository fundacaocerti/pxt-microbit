#!/bin/bash

# Copyright (C) 2018 Fundação CERTI

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )" #absolute root dir

if [ "$1" == "edge" ]; then
    BROSWER="edge"
    DEPLOY=$DIR"/deploy-edge"
    RESOURCES_EXTENSION=$DIR"/resources/edge"
else
    BROSWER="chrome"
    DEPLOY=$DIR"/deploy"
    RESOURCES_EXTENSION=$DIR"/resources/chrome"
fi
echo "deploying for: " $BROSWER

PACKAGED=$DEPLOY"/microbit"      #static html packaged abs path
PACKAGED_API=$PACKAGED"/api"
PACKAGED_COMPILE=$PACKAGED"/api/compile"
BUILT=$DIR"/built"
BUILT_HEX_CACHE=$BUILT/hexcache
RESOURCES=$DIR"/resources"
RESOURCES_API=$DIR"/resources/api"
RESOURCES_LOGOS=$DIR"/resources/logos"
PEMFILE=$RESOURCES_EXTENSION"/microbit.pem"    #pem file abs path
SHA_BLOCKSPRJ=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/blocksprj/built/yt/buildcache.json )
SHA_TSPRJ=$( sed -n 's/.*"sha": "\(.*\)",/\1/p' libs/tsprj/built/yt/buildcache.json )

rm -rf $DEPLOY
rm -rf $BUILT
pxt staticpkg
mkdir -p $DEPLOY
cp -r $BUILT/packaged $PACKAGED
mkdir -p $PACKAGED_COMPILE

cp $BUILT_HEX_CACHE/* $PACKAGED_COMPILE

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

#copy resources api and logos folders to deploy
cp -r $RESOURCES_API $PACKAGED
cp -r $RESOURCES_LOGOS $PACKAGED

#copy aditional resources for offline compatibility
cp $PACKAGED_API/clientconfig $PACKAGED/clientconfig.json

#copy extension required files
cp -r $RESOURCES_EXTENSION/* $PACKAGED

#change availableLocales in target.js to just use 3 languages: en, es-ES, pt-BR
sed -i 's/\(\"availableLocales\": \[\)/"availableLocales": [\n\t\t\t"en",\n\t\t\t"es-ES",\n\t\t\t"pt-BR"\n\t\t],\n\t\t"allAvailableLocales": [/g' $PACKAGED/target.js

#change isStatic to false to redirect the help urls correctly
sed -i 's/\(\"isStatic\": true\)/"isStatic": false/g' $PACKAGED/embed.js

#check if broswer is Chrome or Edge and change popout to redirect to the correct url.
if [ "$BROSWER" == "edge" ]; then
    sed -i -e "/window.open(url, \"_blank\");/r./resources\/replacements\/change-docs-url-pxtrunner-edge.js" -e "s/window.open(url, \"_blank\");//" $PACKAGED/pxtrunner.js
else
    sed -i -e "/window.open(url, \"_blank\");/r./resources\/replacements\/change-docs-url-pxtrunner-chrome.js" -e "s/window.open(url, \"_blank\");//" $PACKAGED/pxtrunner.js
fi

#change Download/help to redirect to the correct url
sed -i 's/\"usbDocs\": \"\/device\/usb\"/\"usbDocs\": \"https:\/\/makecode.microbit.org\/device\/usb\"/g' $PACKAGED/target.js

#change Logo micro:bit to redirect to the correct url
sed -i 's/\"logoUrl\": \"\/.\/\"/\"logoUrl\": \"https:\/\/microbit.org\/code\/\"/g' $PACKAGED/target.js

#do not set _isOnline false and Cloud.onOffline(), with that it will always try to open a request instead of just fail with the offline message
sed -i 's/if (e.statusCode == 0) {/if(options.url.indexOf(\"\/api\/scripts\") > -1) {\n\t\t\t\t\te.message = (Util.lf(\"Cannot access {0} while offline\", options.url))\;\n\t\t\t\t}\n\t\t\t\treturn Promise.reject(e);\n\t\t\t\tif (e.statusCode == 0) {/g' $PACKAGED/pxtlib.js

#set weatherbit version
sed -i 's/\"weatherbit\": \"\*\"/\"weatherbit\": \"github:sparkfun\/pxt-weather-bit#v0.0.10\"/g' $PACKAGED/target.js

#set neopixel version
sed -i 's/\\"neopixel\\": \\"\*\\"/\\"neopixel\\": \\"github:microsoft\/pxt-neopixel#v0.4.1\\"/g' $PACKAGED/target.js

#set grove version
sed -i 's/\"Grove\": \"\*\"/\"Grove\": \"github:seeed-studio\/pxt-grove#v0.1.0\"/g' $PACKAGED/target.js

#change "Add package.../?" to redirect to the correct url
sed -i 's/helpUrl: \"\/packages\"/helpUrl: \"https:\/\/makecode.microbit.org\/packages\"/g' $PACKAGED/main.js

#change neopixel, grove and weatherbit versions when they are added by 'Add package' button
sed -i -e '/addDepIfNoConflict(scr, "\*")/r./resources\/replacements\/change-external-packages-versions.js' -e 's/addDepIfNoConflict(scr, "\*")//' $PACKAGED/main.js

#add code to change the urls to redirect to local files or to the correct external file
sed -i '/var headers = pxtc.Util.clone(options.headers) || {};/r./resources\/replacements\/change-url-pxtlib.js' $PACKAGED/pxtlib.js

#add the missing ports to the servomotor (this has already been implemented in pxt-microbit/sim/dalboard.ts in makecode.microbit.org version: 0.14.45) 
sed -i -e '/\"P2\": 9 \/\* MICROBIT_ID_IO_P2 \*\//r./resources\/replacements\/add-servo-ports-sim.js' -e 's/\"P3\": 10 \/\* MICROBIT_ID_IO_P3 \*\///' $PACKAGED/sim.js

#add code to change url to the correct external files path
sed -i -e "/window.open(url, 'docs');/r./resources\/replacements\/change-url-main.js" -e "s/window.open(url, 'docs');//" $PACKAGED/main.js

#add code to change url to the correct help files path on external packages
sed -i "/+ m\[2\];/r./resources\/replacements\/change-help-url-main.js" $PACKAGED/main.js