import { Command } from './Command'
import { McRcon } from '../McRcon'

/**
 * Defines the operation of the `stop` command.
 */
export class Stop extends Command {
  public prepare(rcon: McRcon): Stop {
    super.prepare(rcon)

    return this
  }

  public async execute(): Promise<void> {
    if (!this.rcon) throw this.notPrepared

    const command = 'stop'
    const result = await this.rcon.command(command)

    if (!result.startsWith('Stopping the server')) {
      throw 'stop: unable to stop server.'
    }
  }
}
