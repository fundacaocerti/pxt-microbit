# Servo-calibrador

Utiliza este programa para calibrar los ángulos de un servomotor.
Presiona `A` para reducir el ángulo en 5 grados y `B` para
aumentarlo en 5.

El ángulo actual es presentado en el display
continuamente en un loop.

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