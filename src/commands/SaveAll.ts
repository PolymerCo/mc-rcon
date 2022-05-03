import { Command } from './Command'
import { McRcon } from '../McRcon'

export class SaveAll extends Command {
  private _flush?: boolean

  public prepare(rcon: McRcon, flush: boolean = false): SaveAll {
    super.prepare(rcon)

    this._flush = flush

    return this
  }

  public async execute(): Promise<void> {
    if (!this.rcon) throw this.notPrepared

    let command = 'save-all'

    if (this._flush) {
      command += ' flush'
    }

    const result = await this.rcon.command(command)

    if (!result.includes('Saved the game')) {
      throw 'stop: unable to save the game.'
    }
  }
}
