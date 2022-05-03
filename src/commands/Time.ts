import { Command } from './Command'
import { McRcon } from '../McRcon'
import { TimeAction, TimeQueryTarget } from '../types'

/**
 * Defines the operation of the `time` command.
 */
export class Time extends Command {
  private _action?: TimeAction
  private _target?: number | TimeQueryTarget

  public prepare(rcon: McRcon, action: TimeAction, target: number | TimeQueryTarget): Time {
    super.prepare(rcon)

    this._action = action
    this._target = target

    if (this._action == 'query') {
      if (typeof target == 'number') {
        throw 'time: target must be `TimeQueryTarget` if performing query.'
      }
    } else {
      if (!(typeof target == 'number')) {
        throw 'time: target must be `number` if performing `set`/`add` operation.'
      }
    }

    return this
  }

  public async execute(): Promise<number | null> {
    if (!this.rcon) throw this.notPrepared

    const command = `time ${this._action} ${this._target}`
    const response = await this.rcon.command(command)

    if (this._action == 'query') {
      if (!response.startsWith('The time is')) {
        throw 'time: unable to retrieve time'
      }

      const matches = /\d+$/.exec(response)

      if (!matches || matches.length == 0) {
        throw `time: unable to retrieve time`
      }

      const time = matches[0]

      return Number.parseInt(time)
    } else {
      if (!response.startsWith('Set the time to')) {
        throw `time: unable to ${this._action} time ${this._target}`
      }
    }

    return null
  }
}
