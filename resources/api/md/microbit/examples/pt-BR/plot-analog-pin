# Gráfico Pino analógico

Use este programa para traçar um gráfico do valor analógico do pino `P0`, `P1` ou `P2`. Pressione `A` para rolar o valor no display.

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