# Carrera del Huevo en la cuchara

La carrera del [Huevo en la cuchara](https://en.wikipedia.org/wiki/Egg-and-spoon_race) es un juego en el que el jugador carga un objeto (como un huevo) a lo largo de determinada distância, sin dejarlo caer del recipiente en el que está. En el caso del Huevo en la cuchara, el jugador debe andar cuidadosamente con un huevo en una cuchara. El huevo debe permanecer en la cuchara hasta que el jugador cruce la línea de llegada. El huevo puede desplazarse para afuera de la cuchara, por lo tanto, el jugador precisa tener habilidad y paciencia para equilibrar el huevo hasta finalizar la carrera.
Es posible programar tu @boardname@ para que el huevo y tu mano la cuchara. Si te mueves muy rápido o tambaleando mientras sostienes la @boardname@, puedes "derrumbar el huevo!". Intenta mantener el punto de equilibrio en el centro del display.

```blocks
let accY = 0
let accX = 0
let y = 0
let x = 0
basic.forever(() => {
    led.plot(x, y)
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
    if (accX < -150 && x > 0) {
        x += -1
    } else if (accX > 150 && x < 4) {
        x += 1
    }
    if (accY < -150 && y > 0) {
        y += -1
    } else if (accY > 150 && y < 4) {
        y += 1
    }
    basic.pause(500)
    basic.clearScreen()
})
x = 2
y = 2
```

