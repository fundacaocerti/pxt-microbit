# Gráfico Intensidad de la luz

Muestra la intensidad de la luz actual como un gráfico de barras.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        255
    )
})
```