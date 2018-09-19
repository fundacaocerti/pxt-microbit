# Jogo da vida

O [Jogo da vida](https://pt.wikipedia.org/wiki/Jogo_da_vida) simula a vida em um mundo-tabuleiro (bidimensional). Cada célula no tabuleiro pode estar no estado "viva" ou "morta". O jogo começa com uma população de células distribuídas em um determinado padrão do tabuleiro. Executa-se uma simulação e, de acordo com algumas regras simples de vida e de morte, as células continuam a viver, morrem ou se reproduzem.

## Regras da vida

As regras da vida no tabuleiro são:

1. Uma célula viva com menos de duas células vivas vizinhas a ela irá morrer. Trata-se de subpopulação, sem suporte social.
2. Uma célula viva com duas ou três células vivas vizinhas a ela continua a viver. É uma população saudável.
3. Uma célula viva com mais de três células vivas vizinhas a ela irá morrer. Trata-se de superpopulação, recursos escassos.
4. Uma célula morta com três células vivas vizinhas a ela transforma-se em uma célula viva. Trata-se de reprodução.

Dependendo da distribuição das células vivas no início do jogo, algumas simulações de populações podem sobreviver por mais tempo do que outras.

## Simulação do Jogo da Vida nos LEDs

Uma simulação da vida na matriz de LEDs. Use o botão `A` para a próxima iteração do jogo da vida e use o botão `B` para reiniciar.

```blocks
//https://pt.wikipedia.org/wiki/Jogo_da_vida
let graficoDaVida: Image = null

//Use o botão A para a próxima iteração do jogo da vida
input.onButtonPressed(Button.A, () => {
    jogoDaVida();
    exibir();
})

//Use o botão B para reiniciar em um estado inicial aleatório
input.onButtonPressed(Button.B, () => {
    reiniciar();
    exibir();
})

graficoDaVida = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)

//Estado mantém a informação sobre o pixel, se está vivo ou morto
//false significa morto, true significa vivo.
let estado = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false]

//get & set em um array
function getEstado(arr: boolean[], x: number, y: number): boolean {
    return arr[x * 5 + y];
}
function setEstado(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * 5 + y] = value;
}

//Gera um estado inicial aleatório.
function reiniciar() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            setEstado(estado, x, y, Math.randomBoolean());
        }
    }
}

//Exibe o graficoDaVida de acordo com o estado
function exibir() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            graficoDaVida.setPixel(x, y, getEstado(estado, x, y));
        }
    }
    graficoDaVida.plotImage(0);
}

//Função principal
function jogoDaVida() {
    let resultado: boolean[] = [];
    let contador = 0;

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            contador = 0;

            //Conta as células vivas na próxima linha
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

            //Conta as células vivas na linha anterior
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

            //Conta as células vivas na linha atual, excluindo a da posição atual.
            if ((y - 1 >= 0) && getEstado(estado, x, y - 1)) {
                contador++;
            }
            if ((y + 1 < 5) && getEstado(estado, x, y + 1)) {
                contador++;
            }

            // Alterna as células vivas/mortas, de acordo com a contagem.
            // Qualquer célula viva com menos de duas vizinhas vivas morre, por conta da subpopulação.
            // Qualquer célula com duas ou três vizinhas vivas vive até a próxima geração.
            // Qualquer célula morta com exatamente três vizinhas vivas torna-se uma célula viva, como se fosse por reprodução
            // Qualquer célula viva com mais de três vizinhas vivas morre, por conta da superpopulação.
            switch (contador) {
                case 0: setEstado(resultado, x, y, false); break;
                case 1: setEstado(resultado, x, y, false); break;
                case 2: setEstado(resultado, x, y, getEstado(estado, x, y)); break;
                case 3: setEstado(resultado, x, y, true); break;
                default: setEstado(resultado, x, y, false); break;
            }
        }
    }
    //Atualiza o estado
    estado = resultado;
}
//Reinicia e exibe
reiniciar();
exibir();
```