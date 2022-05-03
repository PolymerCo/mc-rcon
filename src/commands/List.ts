import { Command } from './Command'
import { ListPlayerEntry } from '../types'
import { McRcon } from '../McRcon'

/**
 * Defines the operation for the `list` command.
 */
export class List extends Command {
  /** If uuids should be included in the result */
  private _uuids?: boolean

  public prepare(rcon: McRcon, uuids?: boolean): Command {
    super.prepare(rcon)
    this._uuids = uuids

    return this
  }

  public async execute(): Promise<ListPlayerEntry[]> {
    if (!this.rcon) throw this.notPrepared

    let command = `list`

    if (this._uuids) {
      command += ' uuids'
    }

    const result = await this.rcon.command(command)

    if (result.startsWith('There are 0 of a max')) {
      return []
    }

    const splitString = result.split(':')[1].split(',')
    const players: ListPlayerEntry[] = []

    splitString.forEach(player => {
      if (this._uuids) {
        let items = /(\w+).+\(([\w-]+)\)/.exec(player)

        if (items && items.length > 0) {
          players.push({
            name: items[1],
            uuid: items[2]
          })
        }
      } else {
        let items = /(\w+)/.exec(player)

        if (items && items.length > 0) {
          players.push({
            name: items[1]
          })
        }
      }
    })

    return players
  }
}
