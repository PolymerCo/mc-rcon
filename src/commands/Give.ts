import { Command } from './Command'
import { McRcon } from '../McRcon'
import { PlayerTargetSelector } from '../types/TargetSelector'

/**
 * Defines the operation of the `give` command.s
 */
export class Give extends Command {
  /** Target */
  private _target?: string | PlayerTargetSelector

  /** Item to give */
  private _item?: string

  /** Number of items to give */
  private _count?: number

  public prepare(rcon: McRcon, target: string | PlayerTargetSelector, item: string, count?: number): Give {
    super.prepare(rcon)

    this._target = target
    this._item = item
    this._count = count ?? 1

    return this
  }

  public async execute(): Promise<void> {
    if (!this.rcon) throw this.notPrepared

    const command = `give ${this._target} ${this._item} ${this._count}`
    const result = await this.rcon.command(command)

    if (result.startsWith('No player was found')) {
      throw `give: player ${this._target} not found.`
    }

    if (result.startsWith('Unknown item')) {
      throw `give: item ${this._item} not found.`
    }

    if (!result.startsWith('Gave')) {
      throw `give: ${result}`
    }
  }
}
