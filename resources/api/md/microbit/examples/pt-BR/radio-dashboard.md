# Painel de controle do rádio

```typescript
/**
 * Painel de controle do rádio
 *
 * Cada um dos rádios-cliente é representado por um ponto no display.
 * Quando um cliente se registra, ficará no mesmo pixel
 * sempre.
 *
 * Os rádios-cliente só podem enviar um número (entre 0 e 255) no grupo 4.
 * Devem transmitir seu número de série usando ``radio.setTransmitSerialNumber(true)``
 *
 * O número recebido é usado para definir o brilho do LED daquele cliente.
 *
 * Se o pacote de um rádio não for recebido a cada 10 seg, seu LED começará a piscar.
 */
const tempoLimitePing = 20000;
const pingPerdido = 10000;

interface Cliente {
    // número de série do cliente
    id: number;
    // sprite na tela
    sprite: game.LedSprite;
    // último ping recebido
    ping: number;
}

const clientes: Cliente[] = [];

/* alocação tardia de sprite */
function getCliente(id: number): Cliente {
    // é necessário um número para rastrear a identidade do rádio-cliente
    if (!id)
        return undefined;

    // procura clientes registrados
    for (const cliente of clientes)
        if (cliente.id == id)
            return cliente;
    const n = clientes.length;
    if (n == 24) // sem espaço no display 
        return undefined;
    const cliente: Cliente = {    
        id: id,
        sprite: game.createSprite(n % 5, n / 5),
        ping: input.runningTime()
    }
    clientes.push(cliente);
    return cliente;
}

// armazena dados recebidos de cada cliente
radio.onDataPacketReceived(packet => {
    const cliente = getCliente(packet.serial);
    if (!cliente)
        return;

    cliente.ping = input.runningTime()
    cliente.sprite.setBrightness(Math.max(1, packet.receivedNumber & 0xff));
})

// monitora os sprites e começa a piscar quando não recebe pacote
basic.forever(() => {
    const agora = input.runningTime()
    for (const cliente of clientes) {
        // começa a piscar quando perde o sinal
        const ultimoPing = agora - cliente.ping;
        if (ultimoPing > tempoLimitePing) {
            cliente.sprite.setBlink(0)
            cliente.sprite.setBrightness(0)
        }
        else if (ultimoPing > pingPerdido)
            cliente.sprite.setBlink(500)
        else
            cliente.sprite.setBlink(0)
    }
    basic.pause(500)
})

// configura o rádio e inicia!
radio.setGroup(4)
game.addScore(1)
```

```package
radio
```