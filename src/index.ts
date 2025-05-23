import { closeSync, openSync } from 'fs'

import { SPIConfiguration, TransferSettings } from './config'
import { spiDevNode } from './spidev'
import { encode } from './config/encode'
import { decode } from './config/decode'

function isError(v: number | [number, number, number]): v is number {
    return typeof v === 'number' && Number.isInteger(v)
}

export class SPIDev {
    private readonly fd: number

    public constructor(path: string, configuration?: Partial<SPIConfiguration>) {
        this.fd = openSync(path, 'r+', 0)

        if (configuration) {
            this.setConfiguration(configuration)
        }
    }

    public transfer(size: number, data: Uint8Array = Uint8Array.from([]), settings: Partial<TransferSettings> = {}) {
        const { bits_per_word = 0, delay_usecs = 0, cs_change = 0, speed_hz = 0 } = settings

        const output = spiDevNode.spi_transfer(this.fd, size, data, bits_per_word, delay_usecs, cs_change, speed_hz)
        if (Number.isInteger(output)) {
            throw new Error('Transfer error: ' + output)
        }

        return Uint8Array.from(output)
    }

    private setConfiguration(configuration: Partial<SPIConfiguration>): void {
        const err = spiDevNode.spi_set_configuration(this.fd, ...encode(configuration))
        if (err) {
            throw new Error('SPI device configuration error: ' + err)
        }
    }

    public getConfiguration(): SPIConfiguration {
        const config = spiDevNode.spi_get_configuration(this.fd)
        if (isError(config)) {
            throw new Error('Error reading SPI configuration: ' + config)
        }
        const [mode, bitsPerWord, maxSpeedHz] = config
        return decode(mode, bitsPerWord, maxSpeedHz)
    }

    public close() {
        closeSync(this.fd)
    }
}
