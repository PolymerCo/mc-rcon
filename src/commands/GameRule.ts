import { Command } from './Command'
import { GameRuleName } from '../types'
import { McRcon } from '../McRcon'

/**
 * Defines the operation of the `gamerule` command.
 */
export class GameRule extends Command {
  /** Sets to `true` if the game rule is being set. */
  private _isSetting: boolean = false

  /** Gamerule to perform the operation on */
  private _rule?: GameRuleName

  /** Value to pass through to the command. */
  private _value?: string

  public prepare(rcon: McRcon, rule: GameRuleName, value?: number | boolean): GameRule {
    super.prepare(rcon)

    this._isSetting = value != null

    if (this._isSetting) {
      switch (rule) {
        case 'maxEntityCramming':
        case 'randomTickSpeed':
        case 'spawnRadius':
        case 'playersSleepingPercentage':
        case 'maxCommandChainLength':
          if (!(typeof value == 'number')) {
            throw `gamerule: '${rule}' must only be set to an integer.`
          }

          value = Math.round(value)
          break
        default:
          if (!(typeof value == 'boolean')) {
            throw `gamerule: '${rule}' must only be set to an boolean.`
          }
      }

      this._value = `${value}`
    }

    this._rule = rule

    return this
  }

  public async execute(): Promise<boolean | number | null> {
    if (!this.rcon) throw this.notPrepared

    let command = `gamerule ${this._rule}`
    let response: string

    if (this._isSetting) {
      command += ` ${this._value}`

      response = await this.rcon.command(command)

      if (!response.includes(`Gamerule ${this._rule} is now set to: ${this._value}`)) {
        throw `gamerule: '${this._rule}' not set to '${this._value}' successfully, response: ${response}`
      }

      return null
    } else {
      response = await this.rcon.command(command)
      const parsed = /(?<=\:).+/.exec(response)

      if (!response.includes(`Gamerule ${this._rule} is currently set to`) || !parsed || parsed.length == 0) {
        throw `gamerule: '${this._rule}' unable to get value from server, response: ${response}`
      }

      const result = (parsed[0] ?? '').trim()

      // check if bool response, else assume numeric
      if (/(true|false)/i.test(result)) {
        return result === 'true'
      } else {
        return Number.parseFloat(result)
      }
    }
  }
}
