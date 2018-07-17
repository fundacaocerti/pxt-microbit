# Tartaruga: espiral

A tartaruga se move em espiral até o centro do display e retorna ao início.

```blocks
let indice = 0
turtle.setPosition(0, 0)
turtle.turnRight()
basic.forever(() => {
    for (let indice = 0; indice <= 4; indice++) {
        turtle.forward(4 - indice)
        turtle.turnRight()
    }
    for (let indice = 0; indice <= 4; indice++) {
        turtle.turnLeft()
        turtle.back(indice)
    }
})
```

```package
microturtle=github:Microsoft/pxt-microturtle#master
```