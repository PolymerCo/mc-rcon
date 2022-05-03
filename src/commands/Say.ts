import { Command } from './Command'
import { McRcon } from '../McRcon'

/**
 * Defines the operation of the `say` command.
 */
export class Say extends Command {
  private _message?: string

  public prepare(rcon: McRcon, message: string): Say {
    super.prepare(rcon)

    if (message == '') {
      throw 'say: Message must not be an empty string.'
    }

    this._message = message

    return this
  }

  public async execute(): Promise<void> {
    if (!this.rcon) throw this.notPrepared

    await this.rcon.command(`say ${this._message}`)
  }
}
