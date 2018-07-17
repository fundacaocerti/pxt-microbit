# Primeiros passos

## Step 1

Bem-vindos! Encaixe o bloco ``||basic:show string||`` (com seu nome) no espaço ``||basic:on start||`` para ver seu nome correndo no display. Substitua o texto ``"Oi!"`` pelo seu nome. Você vê ele correndo?

```blocks
basic.showString("Micro!")
```

## Step 2

Conect um cabo USB à @boardname@ e clique em ``|Download|``. Salve o programa na sua unidade **@drivename@**. Assim, você transferirá seu código para a @boardname@!

## Step 3

Seu texto parou de correr no display. Encaixe o bloco ``||basic:show string||`` no espaço ``||input:on button pressed||`` para mostrar seu nome quando o botão **A** for pressionado.

```block
input.onButtonPressed(Button.A, () => {
    basic.showString("Micro!")
});
```

## Step 4

Clique em ``|Download|`` para salvar e transferir seu código de novo e, depois, pressione o botão **A** para ver seu texto correr no display.

## Step 5

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

## Step 6

Encaixe os blocos ``||basic:show number||`` e ``||Math:pick random||`` 
no espaço ``||input:on shake||`` para criar um dado.

###   

Quando a @boardname@ for agitada, um número aleatório entre ``0`` and ``6`` aparecerá
no display.

```block
input.onGesture(Gesture.Shake, () => {
    basic.showNumber(Math.random(7))
})
```

## Step 7

Muito bem! Você completou sua primeira atividade no Microsoft MakeCode.

