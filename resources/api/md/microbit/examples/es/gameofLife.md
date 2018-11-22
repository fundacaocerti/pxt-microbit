# Juego de la vida

El [Juego de la vida](https://es.wikipedia.org/wiki/Juego_de_la_vida) simula la vida en un mundo-tablero (bidimensional). Cada célula en el tablero puede estar en estado "viva" o "muerta". El juego comienza con una población de células distribuídas en un determinado patrón del tablero. Se ejecuta una simulación y, según algunas reglas simples de vida y de muerte, las células continúan viviendo, mueren o se reproducen.

## Reglas de la vida

Las reglas de la vida en el tablero son:

1. Una célula viva con menos de dos células vivas vecinas a ella morirá. Se trata de subpoblación, sin soporte social.
2. Una célula viva con dos o tres células vivas vecinas a ella continúa viviendo. Es una población saludable.
3. Una célula viva con más de tres células vivas vecinas a ella morirá. Se trata de sobrepoblación, recursos escasos.
4. Una célula muerta con tres células vivas vecinas a ella se transforma en una célula viva. Se trata de reproducción.

Dependiendo de la distribución de las células vivas al iniciar el juego, algunas simulaciones de poblaciones pueden sobrevivir más tiempo que otras.

## Simulación del Juego de la Vida en los LEDs

Una simulación de la vida en la matriz de LEDs. Utiliza el botón ``A`` para la próxima repetición del juego de la vida y utiliza el botón ``B`` para reiniciar.

```blocks
//https://es.wikipedia.org/wiki/Juego_de_la_vida
let graficoDeLaVida: Image = null

//Utiliza el botón A para la próxima repetición del juego de la vida
input.onButtonPressed(Button.A, () => {
    juegoDeLaVida();
    exhibir();
})

//Utiliza el botón B para reiniciar en un estado inicial aleatorio
input.onButtonPressed(Button.B, () => {
    reiniciar();
    exhibir();
})

graficoDeLaVida = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

//Estado mantiene la información sobre el píxel, si está vivo o muerto
//false significa muerto, true significa vivo.
let estado = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false]

//get & set en un array
function getEstado(arr: boolean[], x: number, y: number): boolean {
    return arr[x * 5 + y];
}
function setEstado(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * 5 + y] = value;
}

//Genera un estado inicial aleatorio.
function reiniciar() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            setEstado(estado, x, y, Math.randomBoolean());
        }
    }
}

//Exhibe el gráfico de la Vida según el estado
function exhibir() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            graficoDeLaVida.setPixel(x, y, getEstado(estado, x, y));
        }
    }
    graficoDeLaVida.plotImage(0);
}

//Función principal
function juegoDeLaVida() {
    let resultado: boolean[] = [];
    let contador = 0;

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            contador = 0;

            //Cuenta las células vivas en la próxima línea
            if ((x + 1) < 5) {
                if (getEstado(estado, x + 1, y)) {
                    contador++;
                }
                if ((y + 1 < 5) && getEstado(estado, x + 1, y + 1)) {
                    contador++;
                }
                if ((y - 1 >= 0) && getEstado(estado, x + 1, y - 1)) {
                    contador++;
                }
            }

            //Cuenta las células vivas en la línea anterior
            if ((x - 1) >= 0) {
                if (getEstado(estado, x - 1, y)) {
                    contador++;
                }
                if ((y + 1 < 5) && getEstado(estado, x - 1, y + 1)) {
                    contador++;
                }
                if ((y - 1 >= 0) && getEstado(estado, x - 1, y - 1)) {
                    contador++;
                }
            }

            //Cuenta las células vivas en la línea actual, excluyendo la de la posición actual.
            if ((y - 1 >= 0) && getEstado(estado, x, y - 1)) {
                contador++;
            }
            if ((y + 1 < 5) && getEstado(estado, x, y + 1)) {
                contador++;
            }

            // Alterna las células vivas/muertas, según el conteo.
            // Cualquier célula viva con menos de dos vecinas vivas muere, por la subpoblación.
            // Cualquier célula con dos o tres vecinas vivas vive hasta la próxima generación.
            // Cualquier célula muerta con exactamente tres vecinas vivas se torna una célula viva, como si fuese por reproducción
            // Cualquier célula viva con más de tres vecinas vivas muere, por sobrepoblación.
            switch (contador) {
                case 0: setEstado(resultado, x, y, false); break;
                case 1: setEstado(resultado, x, y, false); break;
                case 2: setEstado(resultado, x, y, getEstado(estado, x, y)); break;
                case 3: setEstado(resultado, x, y, true); break;
                default: setEstado(resultado, x, y, false); break;
            }
        }
    }
    //Actualiza el estado
    estado = resultado;
}
//Reinicia y exhibe
reiniciar();
exhibir();
```
