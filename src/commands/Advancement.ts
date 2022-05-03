import { Command } from './Command'
import { McRcon } from '../McRcon'
import { PlayerTargetSelector } from '../types'

type AdvancementOperation = 'grant' | 'revoke'

type AdvancementScope = 'everything' | 'only' | 'from' | 'through' | 'until'

/**
 * Defines the operation of the `advancement` command.
 */
export class Advancement extends Command {
  private _operation?: AdvancementOperation
  private _target?: string | PlayerTargetSelector
  private _scope?: AdvancementScope
  private _advancement?: string
  private _criterion?: string

  public prepare(
    rcon: McRcon,
    operation: AdvancementOperation,
    target: string | PlayerTargetSelector,
    scope: AdvancementScope,
    advancement: string,
    criterion?: string
  ): Advancement {
    super.prepare(rcon)

    this._operation = operation
    this._target = target
    this._scope = scope
    this._advancement = advancement
    this._criterion = criterion

    return this
  }

  public async execute() {
    if (!this.rcon) throw this.notPrepared

    let command = `advancement ${this._operation} ${this._target} ${this._scope}`

    if (this._scope != 'everything') {
      command += ` ${this._advancement}`

      if (this._criterion) {
        command += `/${this._criterion}`
      }
    }

    const response = await this.rcon.command(command)

    if (response.startsWith('No player was found')) {
      throw 'advancement: no player was found.'
    }
  }
}
