# Introducción

## Paso 1

Bienvenidos! Encaja el bloque ``||basic:muestra string||`` (con tu nombre) en el espacio ``||basic:al iniciar||`` para ver tu nombre moviéndose en el display. Substituye el texto ``"Hello!"`` por tu nombre. Lo estás viendo moverse?

```blocks
basic.showString("Micro!")
```

## Paso 2

Conecta un cable USB a la @boardname@ y pincha en ``|Download|``. Salva el programa en tu unidad **@drivename@**. Así transferirás tu código para la @boardname@!

## Paso 3

Tu texto paró de correr en el display. Encaja el bloque ``||basic:muestra string||`` en el espacio ``||basic:cuando el botón sea presionado||`` para mostrar tu nombre cuando el botón **A** sea presionado.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

## Paso 4

Pincha en ``|Download|`` para salvar y transferir tu código de nuevo y, después, presiona el botón **A** para ver tu texto moviéndose en el display.

## Paso 5

Ordena los bloques para exhibir una sonrisa cuando el botón **B** sea presionado.

###   

Utiliza el menú en el espacio ``||cuando el botón sea presionado||`` para encontrar el ``B``!

```block
input.onButtonPressed(Button.B, () => {
    basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
})
```

## Paso 6

Encaja los bloques ``||basic:muestra número||`` y ``||Math:número aleatorio||`` 
en el espacio ``||input:cuando se agita||`` para crear un dato.

###   

Cuando se agite la @boardname@, aparecerá un número aleatorio entre ``0`` y ``6``
en el display.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.random(7))
})
```

## Paso 7

Muy bien! Completaste tu primer actividad en el Microsoft MakeCode.

