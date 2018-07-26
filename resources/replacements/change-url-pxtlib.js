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

                    if(options.url.indexOf("www.pxt.io/api/compile/extension") > -1 ) {
                        options.url = url + "/api/compile/extension.json";
                    }
                    if (options.url.indexOf("pxt.azureedge.net/compile/") > -1 || options.url.indexOf("makecode.com/compile/") > -1) {
                        var sha = options.url.split("compile/")[1];
                        options.url = url + "/api/compile/" + sha;
                    }

                    // Share project url
                    if(options.url == "/./scripts"){
                        options.url =  "https://makecode.microbit.org/api/scripts";
                    }

