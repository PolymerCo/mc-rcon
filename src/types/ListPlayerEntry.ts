/**
 * Defines a player entry that is returned from the `list` command.
 */
export interface ListPlayerEntry {
  /**
   * The player name.
   */
  name: string

  /**
   * The player uuid.
   */
  uuid?: string
}
