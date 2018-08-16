enum LedStatus {
    on = 1,
    off = 0
}

/**
 * Available PINS
 */
enum DigitalPins {
    P1 = 1,
    P2 = 2,
    P3 = 3
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
     * @param direction turning direction, eg:1
     * @param value speed value from 0 to 100%, eg:100
     */
    //% blockId=servoWritePinContinuos block="servo continuos in pin P0| turn to %direction| with speed %value %"
    //% value.min=0 value.max=100
    //% direction.min=-1 direction.max=1
    export function servoWritePinContinuos(direction: number, value: number): void {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        if (direction != 0 && value != 0) {
            direction=direction/Math.abs(direction);
            value = ((value * 90) / 100);
            value = 90 + (value * direction);
            pins.servoWritePin(AnalogPin.P0, value);
        } else {
            pins.digitalReadPin(DigitalPin.P0);
            pins.pulseIn(DigitalPin.P0, PulseValue.Low);
        }
    }

    /**
     * Set a LED status to either on or off.
     * @param pin pin to read and write on, eg: DigitalPin.P1
     * @param status status of the Led, eg: LedStatus.on
     */
    //% blockId="digital_write_led" block="Led %pin| turn %status"
    //% weight=59
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=2
    //% pin.fieldOptions.tooltips="false"pin.fieldOptions.width="300"
    export function digitalWriteLed(pin: DigitalPin, status: LedStatus): void {
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
    export function readButton(pin: DigitalPins): boolean {
        const digitalPin = pinConverter(pin);
        const readPin = pins.digitalReadPin(digitalPin);
        pins.setPull(digitalPin, PinPullMode.PullNone);
        return readPin == 1 ? true : false;
    }

    /**
    * Convets DigitalPins into DigitalPin
    */
    function pinConverter(pin: DigitalPins): DigitalPin {
        switch(pin) {
            case 1: return DigitalPin.P1;
            case 2: return DigitalPin.P2;
            case 3: return DigitalPin.P3;
            default: return DigitalPin.P1;
        }
    }
}
