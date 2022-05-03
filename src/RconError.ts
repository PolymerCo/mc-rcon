/**
 * Is thrown when an RCON error has occurred.
 */
export class RconError extends Error {
  constructor(m: string) {
    super(m)
    RangeError
    Object.setPrototypeOf(this, RconError.prototype)
  }
}
