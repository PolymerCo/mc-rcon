import { Command } from './Command'
import { McRcon } from '../McRcon'

/**
 * Defines the operation of the `seed` command.
 */
export class Seed extends Command {
  public prepare(rcon: McRcon): Seed {
    super.prepare(rcon)
    return this
  }

  public async execute(): Promise<string> {
    if (!this.rcon) throw this.notPrepared

    const result = await this.rcon.command('seed')
    const seed = /(?<=\[)-?\d+(?=\])/.exec(result)

    if (seed == null || seed.length == 0) {
      throw 'seed: Unable to get seed from server.'
    }

    return seed[0]
  }
}
