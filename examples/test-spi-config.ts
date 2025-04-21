import fs from 'fs'
import { SPIDev } from '../src'

const spi = new SPIDev('/dev/spidev0.0');
const config = spi.getConfiguration();
console.log(config);