/**
 * Options interface for a connection.
 */
export interface McRconOptions {
  /**
   * Host IP address of the Minecraft server. Default `"127.0.0.1"`.
   */
  host: string

  /**
   * RCON port of the Minecraft server. Default `25575`.
   */
  port: number

  /**
   * Password of the Minecraft server. Default `""`
   */
  password: string
}

/**
 * Provides the default options for the `McConnectionOptions` interface.
 */
export function defaultMcRconOptions(): McRconOptions {
  return {
    host: '127.0.0.1',
    port: 25575,
    password: ''
  }
}
