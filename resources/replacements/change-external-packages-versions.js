            var packageVersion = "*";
            if (scr.name == "Grove") {
                packageVersion = "github:seeed-studio/pxt-grove#v0.1.0";
            }
            else if (scr.name == "weatherbit") {
                packageVersion = "github:sparkfun/pxt-weather-bit#v0.0.10";
            }
            else if (scr.name == "neopixel") {
                packageVersion = "github:microsoft/pxt-neopixel#v0.6.7";
            }
            addDepIfNoConflict(scr, packageVersion)
