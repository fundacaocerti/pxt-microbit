# Panel de control de la radio

```typescript
/**
 * Panel de control de la radio
 *
 * Cada uno de los radio-clientes es representado por un punto en el display.
 * Cuando un cliente se registra, quedará en el mismo píxel
 * siempre.
 *
 * Los radio-clientes sólo pueden enviar un número (entre 0 y 255) en el grupo 4.
 * Deben transmitir su número de serie utilizando ``radio.setTransmitSerialNumber(true)``
 *
 * El número recibido es utilizado para definir el brillo del LED de ese cliente.
 *
 * Si el paquete de una radio no fuese recibido cada 10 seg, su LED comenzará a parpadear.
 */
const tiempoLimitePing = 20000;
const pingPerdido = 10000;

interface Cliente {
    // número de serie del cliente
    id: number;
    // sprite en la pantalla
    sprite: game.LedSprite;
    // último ping recibido
    ping: number;
}

const clientes: Cliente[] = [];

/* asignación tardía de sprite */
function getCliente(id: number): Cliente {
    // es necesario un número para rastrear la identidad del radio-cliente
    if (!id)
        return undefined;

    // busca clientes registrados
    for (const cliente of clientes)
        if (cliente.id == id)
            return cliente;
    const n = clientes.length;
    if (n == 24) // sin espacio en el display 
        return undefined;
    const cliente: Cliente = {    
        id: id,
        sprite: game.createSprite(n % 5, n / 5),
        ping: input.runningTime()
    }
    clientes.push(cliente);
    return cliente;
}

// almacena datos recibidos de cada cliente
radio.onDataPacketReceived(packet => {
    const cliente = getCliente(packet.serial);
    if (!cliente)
        return;

    cliente.ping = input.runningTime()
    cliente.sprite.setBrightness(Math.max(1, packet.receivedNumber & 0xff));
})

// monitorea los sprites y comienza a parpadear cuando no recibe paquete
basic.forever(() => {
    const ahora = input.runningTime()
    for (const cliente of clientes) {
        // comienza a parpadear cuando pierde la señal
        const ultimoPing = ahora - cliente.ping;
        if (ultimoPing > tiempoLimitePing) {
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

// configura la radio e inicia!
radio.setGroup(4)
game.addScore(1)
```

```package
radio
```