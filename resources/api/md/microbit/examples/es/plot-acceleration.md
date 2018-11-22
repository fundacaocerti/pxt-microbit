# Gráfico Aceleración

Traza el gráfico de la aceleración sobre el eje ``x`` en los LEDs.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        1023
    )
})
```