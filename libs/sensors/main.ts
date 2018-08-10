//% weight=100 color=#ff5950 icon="\uf001"

namespace sensors {
    /**
     * função teste
     * @param frase descreva o parâmetro aqui, eg: "CERTI"
     */
    //% block
    //% weight=100 color=#ff5950 icon="\uf001"
    export function CERTI(frase: string): void {
        basic.showString(frase);
        basic.showIcon(IconNames.Heart);
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
        if(value > 100){
            value = 100;
        }
        if(value < 0){
            value = 0;
        }
        if(direction != 0 && value != 0){
            direction=direction/Math.abs(direction);  
            value = ((value * 90) / 100);
            value = 90 + (value * direction);
            pins.servoWritePin(AnalogPin.P0, value);
        }else{
            pins.digitalReadPin(DigitalPin.P0);
            pins.pulseIn(DigitalPin.P0, PulseValue.Low);
        }
        
    }

}
