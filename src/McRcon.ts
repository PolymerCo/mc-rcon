import { defaultMcRconOptions, McRconOptions } from './types'
import { Deferred } from './Deferred'
import { RconError } from './RconError'
import { Sleep } from './Utility'
const Rcon = require("rcon");

/**
 * Provides an interface for communication to a Minecraft server.
 */
export class McRcon {
  /** Options for the Minecraft RCON connection. */
  private _options: McRconOptions;

  /** RCON connection. */
  private _cnx?: any;

  /** If the RCON connection is currently connected. */
  private _connected: boolean = false;

  /** Default timeout for responses. */
  private _defaultTimeout: number = 5000;

  /** Map of the current event callbacks. */
  private _eventListeners?: {
    auth: Deferred<void>[];
    response: Deferred<string | null>[];
    error: Deferred<string | null>[];
    end: Deferred<void>[];
  };

  /**
   * Creates a new `McRcon` instance.
   * @param options options for the Minecraft RCON connection.
   */
  public constructor(options: Partial<McRconOptions>) {
    this._options = { ...defaultMcRconOptions(), ...options };
  }

  /**
   * Connects to the Minecraft server.
   */
  public async connect() {
    this._cnx = new Rcon(
      this._options.host,
      this._options.port,
      this._options.password,
      {
        tcp: true,
        challenge: false,
      }
    );

    this._setupEvents();
    this._cnx.setTimeout(() => {
      console.log("timed out");
    }, this._defaultTimeout);
    this._cnx.connect();

    await this._nextOnAuth();
  }

  /**
   * Sends a command to the server and returns the response.
   * @param command command to send.
   * @returns the response from the server.
   */
  public async command(command: string): Promise<string> {
    this.send(command);

    const response = await this._nextOnResponse();

    if (response == null) {
      throw new RconError("Error -1: no response message.");
    }

    if (
      response.startsWith("Unknown or incomplete command, see below for error")
    ) {
      throw new RconError(
        `Error 2: unknown or incomplete command '${command}'`
      );
    }

    if (response.startsWith("Incorrect argument for command")) {
      throw new RconError(`Error 3: incorrect argument for command ${command}`);
    }

    return response;
  }

  /**
   * Disconnect from the RCON server.
   */
  public async disconnect(): Promise<void> {
    if (!this._cnx || !this._connected) {
      return;
    }

    this._cnx.disconnect();
  }

  /**
   * Sends a message to the server
   * @param message message to send
   */
  protected async send(message: string) {
    if (!this._cnx || !this._connected) {
      throw new Error("Unable to connect as connection not yet established.");
    }

    this._cnx.send(message);
  }

  /**
   * Sets up the events for the RCON connection.
   */
  private _setupEvents() {
    this._eventListeners = {
      auth: [],
      response: [],
      error: [],
      end: [],
    };

    this._cnx
      .on("auth", this._onAuth.bind(this))
      .on("response", this._onResponse.bind(this))
      .on("error", this._onError.bind(this))
      .on("end", this._onEnd.bind(this));
  }

  /**
   * A promise that will resolve on the next `auth` event.
   * @param timeout longest time to wait for a response. Default `5000`.
   */
  protected _nextOnAuth(timeout: number = this._defaultTimeout): Promise<void> {
    const listeners = this._eventListeners?.auth;

    if (!listeners) {
      throw new Error("Connection has not been properly configured.");
    }

    const deferral = new Deferred<void>();
    listeners.push(deferral);

    return Promise.race([
      deferral.promise,
      Sleep.for(timeout).then(() => {
        throw new RconError(
          'Timeout reached when waiting for next "auth" response.'
        );
      }),
    ]);
  }

  /**
   * Method to run when the connection fires the `auth` event.
   */
  private _onAuth() {
    if (this._eventListeners) {
      this._eventListeners.auth.forEach((deferral) => deferral.resolve());
      this._eventListeners.auth.length = 0;
    }

    this._connected = true;
  }

  /**
   * A promise that will resolve on the next `response` event and return it's result.
   * @param timeout longest time to wait for a response. Default `5000`.
   */
  protected _nextOnResponse(
    timeout: number = this._defaultTimeout
  ): Promise<string | null | void> {
    const listeners = this._eventListeners?.response;

    if (!listeners) {
      throw new Error("Connection has not been properly configured.");
    }

    const deferral = new Deferred<string | null>();
    listeners.push(deferral);

    return Promise.race([
      deferral.promise,
      Sleep.for(timeout).then(() => {
        throw new RconError(
          'Timeout reached when waiting for next "response" response.'
        );
      }),
    ]);
  }

  /**
   * Method to run when the connection fires the `response` event.
   */
  private _onResponse(response: string) {
    if (this._eventListeners) {
      this._eventListeners.response.forEach((deferral) =>
        deferral.resolve(response)
      );
      this._eventListeners.response.length = 0;
    }
  }

  /**
   * A promise that will resolve on the next `error` event and return it's result.
   * @param timeout longest time to wait for a response. Default `5000`.
   */
  protected _nextOnError(
    timeout: number = this._defaultTimeout
  ): Promise<string | null | void> {
    const listeners = this._eventListeners?.error;

    if (!listeners) {
      throw new Error("Connection has not been properly configured.");
    }

    const deferral = new Deferred<string | null>();
    listeners.push(deferral);

    return Promise.race([
      deferral.promise,
      Sleep.for(timeout).then(() => {
        throw new RconError(
          'Timeout reached when waiting for next "error" response.'
        );
      }),
    ]);
  }

  /**
   * Method to run when the connection fires the `error` event.
   */
  private _onError(error: string) {
    if (this._eventListeners) {
      this._eventListeners.error.forEach((deferral) => deferral.resolve(error));
      this._eventListeners.error.length = 0;
    }

    throw new RconError(error);
  }

  /**
   * A promise that will resolve on the next `end` event and return it's result.
   * @param timeout longest time to wait for a response. Default `5000`.
   */
  protected _nextOnEnd(timeout: number = this._defaultTimeout): Promise<void> {
    const listeners = this._eventListeners?.end;

    if (!listeners) {
      throw new Error("Connection has not been properly configured.");
    }

    const deferral = new Deferred<void>();
    listeners.push(deferral);

    return Promise.race([
      deferral.promise,
      Sleep.for(timeout).then(() => {
        throw new RconError(
          'Timeout reached when waiting for next "error" response.'
        );
      }),
    ]);
  }

  /**
   * Method to run when the connection fires the `end` event.
   * @throws a `"socket: disconnected"` to short circuit the logic.
   */
  private _onEnd() {
    if (this._eventListeners) {
      this._eventListeners.end.forEach((deferral) => deferral.resolve());
      this._eventListeners.end.length = 0;
    }
  }
}
