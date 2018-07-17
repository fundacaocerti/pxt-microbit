# Gráfico Aceleração

Trace o gráfico da aceleração sobre o eixo `x` nos LEDs.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        1023
    )
})
```