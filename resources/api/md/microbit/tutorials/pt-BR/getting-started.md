# Introdução

## Passo 1

Bem-vindos! Encaixe o bloco ``||basic:mostre string||`` (com seu nome) no espaço ``||basic:ao iniciar||`` para ver seu nome correndo no display. Substitua o texto ``"Hello!"`` pelo seu nome. Você vê ele correndo?

```blocks
basic.showString("Micro!")
```

## Passo 2

Conecte um cabo USB à @boardname@ e clique em ``|Download|``. Salve o programa na sua unidade **@drivename@**. Assim, você transferirá seu código para a @boardname@!

## Passo 3

Seu texto parou de correr no display. Encaixe o bloco ``||basic:mostre string||`` no espaço ``||basic:quando o botão for pressionado||`` para mostrar seu nome quando o botão **A** for pressionado.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

## Passo 4

Clique em ``|Download|`` para salvar e transferir seu código de novo e, depois, pressione o botão **A** para ver seu texto correr no display.

## Passo 5

Arrume os blocos para exibir um sorriso quando o botão **B** for pressionado.

###   

Use o menu no espaço ``||quando o botão for pressionado||`` para encontrar o ``B``!

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

## Passo 6

Encaixe os blocos ``||basic:mostre número||`` e ``||Math:número aleatório||`` 
no espaço ``||input:quando agitar||`` para criar um dado.

###   

Quando a @boardname@ for agitada, um número aleatório entre ``0`` and ``6`` aparecerá
no display.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.random(7))
})
```

## Passo 7

Muito bem! Você completou sua primeira atividade no Microsoft MakeCode.

