declare module 'bindings' {
  /**
   * Load a compiled .node and return its exports.
   * When you pass exactly "spidev.node", we know its shape:
   */
  function bindings(name: 'spidev.node'): {
    /**
     * Issue a full‐duplex SPI transfer.
     * @param fd          open file descriptor of /dev/spidevX.Y
     * @param length      how many bytes to transfer
     * @param txBuf       Uint8Array (or Buffer) with up to `length` bytes
     * @param bitsPerWord number of bits per word (usually 8)
     * @param delayUsecs  inter‐byte delay in µs
     * @param csChange    chip‐select toggle flag (0 or 1)
     * @param speedHz     clock speed in Hz
     * @returns           an Array<number> of length `length` with the read bytes,
     *                     or a negative errno on failure
     */
    spi_transfer(
      fd: number,
      length: number,
      txBuf: Uint8Array,
      bitsPerWord: number,
      delayUsecs: number,
      csChange: number,
      speedHz: number
    ): number[];

    /**
     * Set SPI mode/bits/maxSpeed.
     * @returns 0 on success or a negative errno on failure
     */
    spi_set_configuration(
      fd: number,
      mode: number,
      bitsPerWord: number,
      maxSpeedHz: number
    ): number;

    /**
     * Read back the SPI configuration.
     * @returns [mode, bitsPerWord, maxSpeedHz] or a negative errno on failure
     */
    spi_get_configuration(
      fd: number
    ): [mode: number, bitsPerWord: number, maxSpeedHz: number] | number;
  };

  // fallback for any other module name
  function bindings(name: string, opts?: any): any;

  export = bindings;
}
