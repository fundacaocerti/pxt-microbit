# Servo-calibrador

Use este programa para calibrar os ângulos de um servomotor.
Pressione `A` para reduzir o ângulo em 5 graus e `B` para
aumentá-lo em 5.

O ângulo atual é apresentado no display
continuamente em um loop.

```blocks
let angulo = 90
input.onButtonPressed(Button.A, () => {
    angulo -= Math.max(0, 5)
    pins.servoWritePin(AnalogPin.P0, angulo)
    led.stopAnimation()
})
input.onButtonPressed(Button.B, () => {
    angulo += Math.min(180, 5)
    pins.servoWritePin(AnalogPin.P0, angulo)
    led.stopAnimation()
})
basic.forever(() => {
    basic.showNumber(angulo)
})
pins.servoWritePin(AnalogPin.P0, angulo)
```