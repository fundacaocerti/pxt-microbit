            var packageVersion = "*";
            if (scr.name == "weatherbit") {
                packageVersion = "github:sparkfun/pxt-weather-bit#v0.0.10";
            }
            addDepIfNoConflict(scr, packageVersion)
