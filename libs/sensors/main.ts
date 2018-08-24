enum AllPins {
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    P6 = 6,
    P7 = 7,
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

enum BuzzerPins {
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    P6 = 6,
    P7 = 7,
    //% block="internal buzzer"
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

enum InitialPins {
    P0 = 0,
    P1 = 1,
    P2 = 2
}

enum ServoPins {
    P13 = 13,
    P14 = 14,
    P15 = 15
}

enum OperationStatus {
    //% block="on"
    on = 1,
    //% block="off"
    off = 0
}

enum PotentiometerReturnType {
    //% block="angle"
    angle,
    //% block="number"
    number
}

enum LightSensorRange {
    //% block="very clear"
    veryClear,
    //% block="clear"
    clear,
    //% block="shadow"
    shadow,
    //% block="dark"
    dark,
    //% block="very dark"
    veryDark
}

enum MoistureSensorRange {
    //% block="dry"
    dry,
    //% block="wet"
    wet,
    //% block="saturated"
    saturated
}

enum JoystickPosition {
    //% block="none"
    none,
    //% block="up"
    up,
    //% block="down"
    down,
    //% block="right"
    right,
    //% block="left"
    left,
    //% block="up-right"
    upRight,
    //% block="down-right"
    downRight,
    //% block="up-left"
    upLeft,
    //% block="down-left"
    downLeft
}

//% color=#f19f03 icon="\uf1e6"
namespace sensors {

    //Neopixel blocks

    /**
     * Set the brightness of a NeoPixel strip from 0 (off) to 50 (full bright).
     * @param brightness a measure of LED brightness in 0-50. eg: 50
     * @param strip a NeoPixel strip.
     */
    //% blockId="sensors_set_neopixel_brightness"
    //% block="%x=variables_get|set brightness %brightness"
    //% brightness.max=50, brightness.min=0
    //% weight=50 blockGap=8
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
    //% blockId="sensors_get_neopixel_brightness"
    //% block="%x=variables_get|get brightness"
    //% weight=49 blockGap=25
    export function getBrightness(strip: neopixel.Strip): number {
        return strip.brightness;
    }

    //Servo blocks

    /**
     * Servomotor block of pin 13 that receives a direction value (right or left) and a speed value of 0 to 100%
     * @param direction turning direction, eg: Direction.Right
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_13"
    //% block="servo continuos in pin 13 turn|to %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=40 blockGap=8
    export function continuousServoWritePin13(direction: Direction, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P13, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P13, 90);
            pins.digitalReadPin(DigitalPin.P13);
            pins.pulseIn(DigitalPin.P13, PulseValue.Low);
        }
    }

    /**
     * Servomotor block of pin 14 that receives a direction value (right or left) and a speed value of 0 to 100%
     * @param direction turning direction, eg: Direction.Right
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_14"
    //% block="servo continuos in pin 14 turn|to %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=39 blockGap=8
    export function continuousServoWritePin14(direction: Direction, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P14, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P14, 90);
            pins.digitalReadPin(DigitalPin.P14);
            pins.pulseIn(DigitalPin.P14, PulseValue.Low);
        }
    }

    /**
     * Servomotor block of pin 15 that receives a direction value (right or left) and a speed value of 0 to 100%
     * @param direction turning direction, eg: Direction.Right
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_15"
    //% block="servo continuos in pin 15 turn|to %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=38 blockGap=25
    export function continuousServoWritePin15(direction: Direction, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P15, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P15, 90);
            pins.digitalReadPin(DigitalPin.P15);
            pins.pulseIn(DigitalPin.P15, PulseValue.Low);
        }
    }

    //Turn on/off blocks

    /**
     * Set a LED status to either on or off.
     * @param pin pin to read and write on
     * @param status status of the Led, eg: OperationStatus.on
     */
    //% blockId="sensors_turn_on_off_led"
    //% block="led %pin| turn %status"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=30 blockGap=8
    export function turnOnOffLed(pin: DigitalPin, status: OperationStatus): void {
        pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalWritePin(pin, status);
    }

    /**
     * Returns the state of a button, true for pressed and false for unpressed.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_button_pressed"
    //% block="read button on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=29 blockGap=8
    export function isButtonPressed(pin: DigitalPin): boolean {
        let buttonPressed = isOnOffSensorsReadPin(pin);
        return isOnOffButton(buttonPressed);
    }

    /**
     * Returns the state of touch sensor, true for on and false for off.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_touch_sensor_on"
    //% block="read touch sensor on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=28 blockGap=8
    export function isTouchSensorOn(pin: DigitalPin): boolean {
        return isOnOffSensorsReadPin(pin);
    }

    /**
     * Returns the state of motion sensor, true for on and false for off.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_motion_sensor_on"
    //% block="read motion sensor on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=27 blockGap=8
    export function isMotionSensorOn(pin: DigitalPin): boolean {
        return isOnOffSensorsReadPin(pin);
    }

    /**
     * Returns the state of line follower, true for on and false for off.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_line_follower_on"
    //% block="read line follower on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=26 blockGap=25
    export function isLineFollowerOn(pin: DigitalPin): boolean {
        return isOnOffSensorsReadPin(pin);
    }

    //Grove blocks

    /**
     * Create a new driver of Grove - Ultrasonic Sensor to measure distances in cm
     * @param pin signal pin of ultrasonic ranger module
     */
    //% blockId="sensors_ultrasonic_centimeters"
    //% block="Ultrasonic Sensor (in cm) at|%pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=25 blockGap=8
    export function measureInCentimeters(pin: DigitalPin): number {
        return grove.measureInCentimeters(pin);
    }

    /**
     * Do something when a gesture is detected by Sensors - Gesture
     * @param gesture type of gesture to detect
     * @param handler code to run
     */
    //% blockId="sensors_gesture_create_event"
    //% block="on Gesture|%gesture"
    //% weight=24 blockGap=25
    export function onGesture(gesture: GroveGesture, handler: Action) {
        grove.onGesture(gesture, handler);
    }

    //Other blocks

    /**
     * Turn on/off the buzzer
     * @param status received value on or off, eg: OperationStatus.on
     * @param pin received pin, eg: BuzzerPins.P8
     */
    //% blockId="sensors_turn_on_off_buzzer"
    //% block="buzzer|in %pin| status %status"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=23 blockGap=8
    export function turnOnOffBuzzer(pin: BuzzerPins, status: OperationStatus): void {
        const analogPin = pinConverterAnalog(pin);
        const digitalPin = pinConverterDigital(pin);
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
     * @param pin the pin available for potentiometer, availables ports are P0, P1, P2
     * @param t the type that should read, the options are angle or number
     */
    //% blockId="sensors_read_potentiometer"
    //% block="read potentiometer on pin %pin| in %t"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=22 blockGap=8
    export function readPotentiometer(pin: InitialPins, t: PotentiometerReturnType): number {
        const analogPin = pinConverterAnalog(pin);
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

    /**
     * Read value of moisture sensor and return if it is in range selected by user
     * @param pin the pin available for Moisture Sensor, availables ports are P0, P1, P2
     * @param range the range available for moisture sensor
     */
    //% blockId="sensors_moisture_sensor"
    //% block="moisture on pin %pin| is %range |?"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=21 blockGap=8
    export function moistureSensor(pin: InitialPins, range: MoistureSensorRange): boolean {
        const analogPin = pinConverterAnalog(pin);
        return moistureValueToRange(pins.analogReadPin(analogPin)) == range;
    }

    /**
     * Read value of light sensor and return if it is in the range selected by the user
     * @param pin the pin available for light sensor, availables ports are P0, P1, P2
     * @param range the range available for light sensor
     */
    //% blockId="sensors_light_sensor_range"
    //% block="light on pin %pin| is %range |?"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=20 blockGap=25
    export function lightSensorRange(pin: InitialPins, range: LightSensorRange): boolean {
        const analogPin = pinConverterAnalog(pin);
        return lightValueToRange(pins.analogReadPin(analogPin)) == range;
    }

    /**
     * two-way joystick block that works similarly to the Cartesian coordinate system (where the first pin is the X axis and the second the Y axis)
     * @param pinX pin regarding the X axis, eg: InitialPins.P0
     * @param pinY pin regarding the Y axis, eg: InitialPins.P1
     * @param direction position of joystick 
     */
    //% blockId="sensors_joystick"
    //% block="joystick in pins %pinX| and %pinY| is %direction |?"
    //% pinX.fieldEditor="gridpicker" pinX.fieldOptions.columns=1
    //% pinY.fieldEditor="gridpicker" pinY.fieldOptions.columns=1
    //% pinX.fieldOptions.width="100"
    //% pinY.fieldOptions.width="100"
    //% weight=22 blockGap=8
    export function joystick(pinX: InitialPins, pinY: InitialPins, direction: JoystickPosition): boolean {
        const analogPinX = pinConverterAnalog(pinX);
        const analogPinY = pinConverterAnalog(pinY);
        let x = pins.analogReadPin(analogPinX);
        let y = pins.analogReadPin(analogPinY);

        return convertJoystick(x, y) == direction;
    }

    /**
     * Converts a number (between 0 and 1023) to a joystick direction coordinate
     */
    function convertJoystick(x: number, y: number): JoystickPosition{
        if (y < 400 && x < 400) {
            return JoystickPosition.downLeft;
        } else if(y < 400 && x > 624) {
            return JoystickPosition.downRight;
        } else if(y > 624 && x < 400) {
            return JoystickPosition.upLeft;
        } else if(y > 624 && x > 624) {
            return JoystickPosition.upRight;
        } else if((y > 400 && y < 624) && x < 400) {
            return JoystickPosition.left;
        } else if((y >= 400 && y <= 624) && x > 624) {
            return JoystickPosition.right;
        } else if(y < 400 && (x >= 400 && x <= 624)) {
            return JoystickPosition.down;
        } else if(y > 624 && (x >= 400 && x <= 624)) {
            return JoystickPosition.up;
        } else {
            return JoystickPosition.none;
        }
    }

    /**
     * Converts number to DigitalPin
     */
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
            default: return DigitalPin.P16; // pin 16 is not in use on the shield
        }
    }

    /**
     * Converts number to AnalogPin
     */
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
            default: return AnalogPin.P16; // pin 16 is not in use on the shield
        }
    }

    /**
     * Converts number from 0-100 to speed ranges
     */
    function speedRanges(value: number): number {
        if (value < 15) return 3;
        if (value >= 15 && value < 30) return 5;
        if (value >= 30 && value < 45) return 10;
        if (value >= 45 && value < 60) return 15;
        if (value >= 60 && value < 80) return 20;
        return 100;
    }

    /**
    * Converts number from 0-950 to moisture sensor ranges
    */
    function moistureValueToRange(value: number): MoistureSensorRange {
        if (value >= 0 && value <= 300) return MoistureSensorRange.dry;
        if (value > 300 && value <= 700) return MoistureSensorRange.wet;
        if (value > 700 && value <= 950) return MoistureSensorRange.saturated;
        return null;
    }

    /**
     * Return if is on/off
     */
    function isOnOffSensorsReadPin(pin: DigitalPin): boolean {
        const readPin = pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullNone);
        return readPin == 0 ? false : true;
    }

    /**
     * The button is active-low (0 = pressed, 1 = unpressed), while on simulator it is active-high
     * Micro:bit implementation is in sensors.cpp
     */
    //% shim=sensors::isOnOffButton
    function isOnOffButton(value: boolean): boolean {
        // Fake function for simulator
        return value;
    }

    /**
     * Converts number from 0-1023 to light sensor range
     */
    function lightValueToRange(value: number): LightSensorRange {
        if (value >= 0 && value <= 102) return LightSensorRange.veryClear;
        if (value > 102 && value <= 409) return LightSensorRange.clear;
        if (value > 409 && value <= 613) return LightSensorRange.shadow;
        if (value > 613 && value <= 920) return LightSensorRange.dark;
        if (value > 920 && value <= 1023) return LightSensorRange.veryDark;
        return null;
    }
    
    /**
     * Function that converts the steering parameters (right / left) and speed (0 to 100) into a value in degrees that is understood by the continuous servo motor
     */
    function servoMotorController(value: number, direction: Direction): number {
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
        let range = speedRanges(value);
        value = ((range * 90) / 100);
        value = 90 + (value * direction);
        return speedServoMotor(value, direction);
    }
    
    /**
     * Function used for simulator servomotor continuos, actual implementation is in sensors.cpp
     */
    //% shim=sensors::speedServoMotor
    function speedServoMotor(value: number, direction: number): number {
        //"180 * direction" is the equivalent of the first complete rotation
        //"360" is the value equivalent to one rotation
        //"3"   is the equivalent of the number of turns
        return ((180 * direction) + 360 * 3) * direction;
    }
}
