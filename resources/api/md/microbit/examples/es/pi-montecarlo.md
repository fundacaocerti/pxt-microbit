# Pi Monte Carlo

Estime el valor de **pi** usando tu @boardname@!

## Reflexiones...

Imaginemos un círculo inscripto en un cuadrado, o sea, cuyo contorno toca los lados internos del cuadrado. Se decimos que el radio, llamado de `r`, del círculo es `1`, entonces el largo de cada lado del cuadrado e `2`, o `2r`. El área del círculo es `pi * (r ** 2)` y el área del cuadrado es `(r * 2) ** 2`. No sabemos el valor de `pi`, entonces podemos establecer una relación entre el área del círculo y el área del cuadrado para encontrar el valor de `pi`.

### Círculo y cuadrado

Hay una relación interesante entre el círculo y el cuadrado, en la que el área del círculo dividida por el área del cuadrado es:

`razón de las áreas = (pi * (r ** 2)) / ((r * 2) ** 2) = pi / 4

Bueno, si sabemos tanto el área del círculo como la del cuadrado podremos descubrir el valor de `pi`! Es simplemente:

    pi = (área del círculo) / (área del cuadrado) * 4

de forma tal que...

    razón de las áreas = (área del círculo) / (área del cuadrado)
    pi = (razón del área) * 4

Sin embargo hay un problema. Sabemos el área del cuadrado, que seguro es `4`, pero, cuál es el área del círculo?

Este es el dilema! Precisamos saber el área del círculo para encontrar el valor de `pi` y precisamos el valor de `pi` para saber el área del círculo!

### Puntos, montones de puntos

Y si tuviésemos un montón de puntos minúsculos con los que pudiésemos completar el interior del círculo y de las partes del cuadrado no cubertas por el círculo? Vamos a intentar cubrir el área las dos formas geométricas con tantos puntos como sea possível.

Si contamos el número de puntos colocados en el círculo y en el cuadrado, podremos encontrar la `razón de las áreas` entre las dos formas. Y, si tuviésemos esta razón, podremos descubrir `pi` en la ecuación mostrada arriba. La `razón de las áreas` es:

`razón de las áreas = (puntos en el círculo) / ((puntos en el círculo) + (puntos sólo en el cuadrado))

Claro que no podemos completar completamente el área de las dos formas con puntos, pero podríamos colocar en en ellas puntos suficientes para tener una buena idea de la razón entre el área del círculo y la del cuadrado.

### Creación y conteo de puntos

Para crear los "puntos", podemos generar aleatoriamente un valor y verificar si se encaja como una coordenada dentro de la forma que estamos intentando completar. Si encaja, cuenta un punto más e intenta crear más puntos por un tiempo. Cuanto más puntos creados, más preciso será el valor de la `razón de las áreas`.

### Método de Monte Carlo

Este método de completar con puntos, contarlos y usar la diferencia o razón de las cuentas se denomina Método o Estimativa de *Monte Carlo*.

## Estimativa de *pi* de Monte Carlo

```blocks
let pir = 0
let pid = 0
let y = 0
let pin = 0
let x = 0
let r2 = 0
let r = 0
let dentro = 0
let n = 0

// Una sencilla simulación de Monte Carlo para estimar Pi.
//
// número de puntos
n = 1000000
//
// radio del círculo
r = 4000
//
// radio al cuadrado
r2 = r * r
//
basic.forever(() => {
    dentro = 0
    for (let i = 0; i < n; i++) {
        // genera un punto dentro del cuadrado
        x = Math.random(r + 1)
        y = Math.random(r + 1)
        // prueba si el punto está dentro del círculo
        // sqrt(x**2 + y**2) < r ==> x**2 + y**2 < r**2
        if (x * x + y * y < r2) {
            dentro += 1
        }
    }
    // superficie de un cuadrado: 4 * r * r superficie de un círculo:
    // r * r * pi => dentro / n ~= (r*r*pi) / (4*r*r) ~=
    // pi / 4 pi = dentro / n * 4
    //
    pin = dentro * 4
    // sólo aritmética entera aquí...
    pid = pin / n
    pir = pin % n
    // muestra resultados
    basic.showLeds(`
        # # # # #
        . # . # .
        . # . # .
        . # . # .
        . # . . #
        `)
    basic.showString(" " + pid + "." + pir)
})
```