//% weight=100 color=#ff5950 icon="\uf001"

namespace sensors {
    /**
     * função teste
     * @param frase descreva o parâmetro aqui, eg: "CERTI"
     */
    //% block
    //% weight=100 color=#ff5950 icon="\uf001"
    export function CERTI(frase: string): void {
        basic.showString(frase)
        basic.showIcon(IconNames.Heart)
    }
}
