                    var regex = /\/[a-z]*.html/;
                    var url = window.location.href.split(regex)[0];

                    if(options.url.indexOf("api/translations") > -1) {
                        var lang = "en";
                        // Extract language and file name from url
                        var regexTranslation = /lang=\s*(.*?)\s*&filename/g;
                        var result = regexTranslation.exec(options.url);
                        if(result != null) {
                            lang = result[1];
                        }
                        regexTranslation = /filename=\s*(.*?)\s*&approved/g;
                        result = regexTranslation.exec(options.url);
                        result = result[1];
                        var file = result.replace(/%2F/i,"/");
                        options.url = url + "/api/translations/" + lang + "/" + file;
                    }

                    if (options.url.indexOf("docs/examples.md") > -1){
                        // When open Projects -> Examples
                        options.url = url + options.url.split("/.")[1].replace("docs","api/md/microbit/examples/" + pxt.Util.userLanguage());
                    } else if (options.url.indexOf("docs//examples") > -1) {
                        // When click to open one example
                        options.url = url + options.url.split("/.")[1].replace("docs//examples","api/md/microbit/examples/" + pxt.Util.userLanguage());
                    }

                    if (options.url.indexOf("tutorials/getting-started") > -1){
                        if(options.url.indexOf("./docs/") > -1){
                            // When click Help -> Getting started
                            options.url = url + options.url.split(".io")[1].split("./docs/")[0] + "tutorials/" + pxt.Util.userLanguage() + "/getting-started.md";
                        } else {
                            // When click on orange button Getting started
                            options.url = url + options.url.split(".io")[1].split("?")[0].replace("getting-started", pxt.Util.userLanguage() + "/getting-started.md");
                        }
                    } else {
                        if (options.url == "/./docs/projects.md"){
                            // When open Projects -> Projects
                            options.url = "https://www.pxt.io/api/md/microbit/projects?targetVersion=0.0.0&lang=" + pxt.Util.userLanguage() + "&live=1";
                        } else {
                            // When click to open any help link remove docs and .html from the URL
                            if (options.url.indexOf("./docs/") > -1){
                                options.url = options.url.replace("./docs/", "").replace(".html", "");
                            }
                        }
                    }

                    if(options.url.indexOf("/targetconfig") > -1 ) {
                        options.url = url + "/targetconfig.json";
                    }

                    if(options.url.indexOf("/clientconfig") > -1) {
                        options.url = url + "/clientconfig.json";
                    }

                    if(options.url == "/./compile/extension") {
                        options.url = "https://makecode.microbit.org/api/compile/extension";
                    }

                    if (options.url.indexOf("pxt.azureedge.net/compile/") > -1 || options.url.indexOf("makecode.com/compile/") > -1) {
                        var sha = options.url.split("compile/")[1];
                        if (sha == "5d5e2e22ca1bce1f846610591cf03b087e1ce616b8bd6f5dba5156cba034594c.hex" ||
                          sha == "6ae9791a36ed347d3f49c1ea7e6c88aa3026fa060156fb5760c41715feee1aba.hex" ||
                          sha == "7fe7504afbb61271efd7e9a2367b5d6e281a3c8670b6fbaf0aed5b2d70c154b5.hex" ||
                          sha == "9de0b9d6edbde57717c63ec8c3c97f591464a41dbeddf167d916f1def38694fe.hex" ||
                          sha == "49b00e145698c1b11a27ebbf2d32a20cf020cc73d84c89b0688ad093baffb9b2.hex" ||
                          sha == "57b704532f5f2dbccc176e23b00775540223bbfca61ea052a8fc8e101c651de4.hex" ||
                          sha == "622bbf72b6cba388ff39d61870333a8065a16481a05d1ecc90e88edc475cd141.hex" ||
                          sha == "2346ac59b9f57fd973d9af21f1a76f26549cf8498227943cde53cc769b99b02f.hex" ||
                          sha == "15241636e0fdd0a063d3e2acf96add498ab09d38097791c231e1609a447b266b.hex" ||
                          sha == "95007735e7d19a32b8634ec3ded0acf4329382362e8d02c7bbb8fb1f5b6ad94f.hex" ||
                          sha == "a981a1dfdf24ab05635d2895674e57cd437b5612c95e743a65853fa17a08de53.hex" ||
                          sha == "c58363d19bde166fdc3c00ca6086d84ddd5fb60baa14e031aa512d4ed73831a7.hex" ||
                          sha == "d0eafb9ada4e4c2759253cc0e93abe16b7915edc24449a5b2a832cd67e4c6979.hex" ||
                          sha == "f40baa30b7d7778cfdda9fc2df790834a072e8bbe52ad6689b1c5f11f980c802.hex" ) {
                            options.url = url + "/api/compile/" + sha;
                        }
                    }

                    if(options.url == "https://www.pxt.io/api/gh/microsoft/pxt-neopixel/v0.4.1/text") {
                        options.url = url + "/api/pxt-neopixel-text.json";
                    }

                    if(options.url == "https://www.pxt.io/api/gh/microsoft/pxt-neopixel") {
                        options.url = url + "/api/pxt-neopixel.json";
                    }

                    if(options.url == "https://www.pxt.io/api/gh/seeed-studio/pxt-grove/v0.1.0/text") {
                        options.url = url + "/api/pxt-grove-text.json";
                    }

                    if(options.url == "https://www.pxt.io/api/gh/seeed-studio/pxt-grove") {
                        options.url = url + "/api/pxt-grove.json";
                    }

                    // Share project url
                    if(options.url == "/./scripts"){
                        options.url =  "https://makecode.microbit.org/api/scripts";
                    }

