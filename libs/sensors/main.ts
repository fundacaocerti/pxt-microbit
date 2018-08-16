enum OperationStatus{
    //% block="on"
    on = 1,
    //% block="off"
    off = 0
}

enum BuzzerPins {
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    P6 = 6,
    P7 = 7,
    //%block="internal buzzer"
    P8 = 8,
    P9 = 9,
    P10 = 10,
    P11 = 11,
    P12 = 12,
    P13 = 13,
    P14 = 14,
    P15 = 15,
    P16 = 16,
    P19 = 19,
    P20 = 20
}

enum ServoContinuosPins {
    P13 = 13,
    P14 = 14,
    P15 = 15
}

enum PotentiometerPins {
    P0 = 0,
    P1 = 1,
    P2 = 2
}

enum PotentiometerReturnType {
    //% block=angle
    angle,
    //% block=number
    number
}

//% weight=100 color=#ff5950 icon="\uf001"
namespace sensors {

    /**
     * Set the brightness of a NeoPixel strip from 0 (off) to 50 (full bright).
     * @param brightness a measure of LED brightness in 0-50. eg: 50
     * @param strip a NeoPixel strip.
     */
    //% blockId="set_neopixel_brightness" block="%x=variables_get|set brightness %brightness" blockGap=8
    //% brightness.max=50, brightness.min=0
    //% weight=59
    export function setBrightness(strip: neopixel.Strip, brightness: number): void {
        if (brightness > 50) {
            strip.setBrightness(50);
        } else if (brightness < 0) {
            strip.setBrightness(0);
        } else {
            strip.setBrightness(brightness);
        }
    }

    /**
     * Get the brightness of a NeoPixel strip from 0 (off) to 50 (full bright).
     * @param strip a NeoPixel strip.
     */
    //% blockId="get_neopixel_brightness" block="%x=variables_get|get brightness" blockGap=8
    //% weight=59
    export function getBrightness(strip: neopixel.Strip): number {
        return strip.brightness;
    }

    /**
     * Create block that receives a direction value (1 for clockwise and -1 counter-clockwise) and a speed value from 0 to 100%
     * @param port analog port that the continuous servomotor will connect, eg: ServoContinuosPins.P13
     * @param direction turning direction, eg:Direction.Right
     * @param value speed value from 0 to 100%, eg:100
     */    
    //% blockId=servoWritePinContinuos block="servo continuos in|port %port| turn to %direction| with speed %value %"
    //% value.min=0 value.max=100
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% port.fieldOptions.tooltips="false"
    export function servoWritePinContinuos(port: ServoContinuosPins, direction: Direction, value: number): void {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        if (direction == Direction.Right) {
            direction = 1;
        } else {
            direction = -1;
        }
        const analogPin = pinConverterAnalog(port);
        const digitalPin = pinConverterDigital(port);
        let range = speedRanges(value);
        if (value != 0) {
            direction = direction / Math.abs(direction);
            value = ((range * 90) / 100);
            value = 90 + (value * direction);
            pins.servoWritePin(analogPin, value);
        } else {
            pins.servoWritePin(analogPin, 90);
            pins.digitalReadPin(digitalPin);
            pins.pulseIn(digitalPin, PulseValue.Low);
        }
    }

    /**
     * Set a LED status to either on or off.
     * @param pin pin to read and write on, eg: DigitalPin.P1
     * @param status status of the Led, eg: OperationStatus.on
     */
    //% blockId="digital_write_led" block="Led %pin| turn %status"
    //% weight=59
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=2
    //% pin.fieldOptions.tooltips="false"pin.fieldOptions.width="300"
    export function digitalWriteLed(pin: DigitalPin, status: OperationStatus): void {
        pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalWritePin(pin, status);
    }

    /**
     * Returns the state of a button, true for pressed and false for unpressed.
     * @param pin pin to read from, eg: DigitalPin.P1
     */
    //% blockId="read_button" block="Read button %pin" blockGap=8
    //% weight=59
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=2
    //% pin.fieldOptions.tooltips="false"pin.fieldOptions.width="300"
    export function readButton(pin: DigitalPin): boolean {
        const readPin = pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullNone);
        return readPin == 1 ? false : true;
    }

    /**
     * Turn on/off the buzzer
     * @param status received value on or off, eg: OperationStatus.on
     * @param port received port, eg: BuzzerPins.P8
     */
    //% blockId=buzzerVariablePort block="Buzzer|in %port| status %status"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% port.fieldOptions.tooltips="false"
    export function buzzerVariablePort(port: BuzzerPins, status: OperationStatus): void {
        const analogPin = pinConverterAnalog(port);
        const digitalPin = pinConverterDigital(port);
        if (status == 1) {
            pins.analogSetPitchPin(analogPin);
        }
        if (status == 0) {
            music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.OnceInBackground);
            pins.digitalReadPin(digitalPin);
            pins.setPull(digitalPin, PinPullMode.PullDown);
        }
    }

    /**
     * Read number or angle using potentiometer
     * @param p the pin available for potentiometer, availables ports are P0, P1, P2
     * @param t the type that should read, the options are angle or number
     */
    //% blockId="read_potentiometer_sensors" block="read potentiometer on pin %p| in %t"
    export function readPotentiometer(p: PotentiometerPins, t: PotentiometerReturnType): number {
        const analogPin = pinConverterAnalog(p);
        if (t === PotentiometerReturnType.angle) {
            return pins.map(
                pins.analogReadPin(analogPin),
                0,
                1023,
                0,
                300
                )
        } else {
           return pins.analogReadPin(analogPin);
        }
    }

    function pinConverterDigital(pin: number): DigitalPin {
        switch(pin) {
            case 0: return DigitalPin.P0;
            case 1: return DigitalPin.P1;
            case 2: return DigitalPin.P2;
            case 3: return DigitalPin.P3;
            case 4: return DigitalPin.P4;
            case 5: return DigitalPin.P5;
            case 6: return DigitalPin.P6;
            case 7: return DigitalPin.P7;
            case 8: return DigitalPin.P8;
            case 9: return DigitalPin.P9;
            case 10: return DigitalPin.P10;
            case 11: return DigitalPin.P11;
            case 12: return DigitalPin.P12;
            case 13: return DigitalPin.P13;
            case 14: return DigitalPin.P14;
            case 15: return DigitalPin.P15;
            case 16: return DigitalPin.P16;
            case 19: return DigitalPin.P19;
            case 20: return DigitalPin.P20;
            default: return DigitalPin.P16; // port 16 is not in use on the shield
        }
    }

    function pinConverterAnalog(pin: number): AnalogPin {
        switch(pin) {
            case 0: return AnalogPin.P0;
            case 1: return AnalogPin.P1;
            case 2: return AnalogPin.P2;
            case 3: return AnalogPin.P3;
            case 4: return AnalogPin.P4;
            case 5: return AnalogPin.P5;
            case 6: return AnalogPin.P6;
            case 7: return AnalogPin.P7;
            case 8: return AnalogPin.P8;
            case 9: return AnalogPin.P9;
            case 10: return AnalogPin.P10;
            case 11: return AnalogPin.P11;
            case 12: return AnalogPin.P12;
            case 13: return AnalogPin.P13;
            case 14: return AnalogPin.P14;
            case 15: return AnalogPin.P15;
            case 16: return AnalogPin.P16;
            case 19: return AnalogPin.P19;
            case 20: return AnalogPin.P20;
            default: return AnalogPin.P16; // port 16 is not in use on the shield
        }
    }

    function speedRanges(pin: number): number {
        if (pin < 15) return 1;
        if (pin >= 15 && pin < 30) return 3;
        if (pin >= 30 && pin < 45) return 5;
        if (pin >= 45 && pin < 60) return 10;
        if (pin >= 60 && pin < 80) return 20;
        return 100;
    }
}
