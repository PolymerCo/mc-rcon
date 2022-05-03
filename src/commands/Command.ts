import { McRcon } from '../McRcon'

/**
 * Defines the basic structure for a command
 */
export abstract class Command {
  /**
   * The `McRcon` instance.
   */
  private _rcon?: McRcon

  /**
   * Message to throw when this command has not been prepared before execution.
   */
  protected get notPrepared() {
    return `Unable to execute command that has not been prepared!`
  }

  /**
   * The `McRcon` instance.
   */
  protected get rcon() {
    return this._rcon
  }

  /**
   * Prepare the command with arguments.
   * @param args argument(s) passed to the command.
   */
  public prepare(rcon: McRcon, ..._: any): Command {
    this._rcon = rcon
    return this
  }

  /**
   * Executes the command and returns a result, if any.
   * @returns a result if one is present.
   */
  public abstract execute(): Promise<any | void>
}
