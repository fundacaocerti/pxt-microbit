# Gráfico Puerta analógica

Utiliza este programa para trazar un gráfico del valor analógico de la puerta ``P0``, ``P1`` o ``P2``. Presiona ``A`` para rodar el valor en el display.

```blocks
let reading = 0
basic.forever(() => {
    reading = pins.analogReadPin(AnalogPin.P0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```