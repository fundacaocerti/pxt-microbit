            var packageVersion = "*";
            if (scr.name == "sensors") {
                packageVersion = "github:fundacaocerti/pxt-sensors#v0.1";
            }
            else if (scr.name == "weatherbit") {
                packageVersion = "github:sparkfun/pxt-weather-bit#v0.0.10";
            }
            addDepIfNoConflict(scr, packageVersion)