                        url = url.includes("./docs") ? "https://makecode.microbit.org" + url.replace("./docs/", "").replace(".html", "") : "https://makecode.microbit.org/" + url;
                        chrome.tabs.create({
                            "url": url
                        });