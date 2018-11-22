# Aleatorio

Genera una coordenada aleatoria y preséntala en el display de LEDs.

```blocks
basic.forever(() => {
    led.toggle(Math.random(5), Math.random(5))
})
```