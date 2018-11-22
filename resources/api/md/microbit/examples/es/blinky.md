# Parpadea

Parpadea una figura en los LEDs.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .`
        );
})
```