import { Command } from './Command'
import { McRcon } from '../McRcon'
import { TargetSelector } from '../types/TargetSelector'

/**
 * Defines the operation for the `kill` command.
 */
export class Kill extends Command {
  /** Target selector */
  private _target?: string | TargetSelector

  public prepare(rcon: McRcon, target: TargetSelector | string): Kill {
    super.prepare(rcon)

    this._target = target
    return this
  }

  public async execute(): Promise<void> {
    if (!this.rcon) throw this.notPrepared

    const result = await this.rcon.command(`kill ${this._target}`)

    if (
      result.startsWith('An entity is required to run this command here') ||
      result.startsWith('No entity was found')
    ) {
      throw 'kill: no entity was found.'
    }
  }
}
