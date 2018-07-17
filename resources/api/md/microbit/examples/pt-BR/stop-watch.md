# Cronômetro

Pressione `A` para iniciar o cronômetro. Pressione `A` outra vez para parar e mostrar o tempo decorrido.

```blocks
let ms = 0
let segundos = 0
let fim = 0
let d = 0
let inicio = 0
input.onButtonPressed(Button.A, () => {
    if (!(inicio)) {
        inicio = input.runningTime()
        fim = 0
    } else {
        d = input.runningTime() - inicio
        inicio = 0
        basic.clearScreen()
        basic.pause(1000)
        segundos = d / 1000
        ms = d % 1000
        basic.showString("" + segundos + "." + ms)
    }
})
basic.forever(() => {
    if (inicio) {
        led.toggle(Math.random(5), Math.random(5))
    }
})
```