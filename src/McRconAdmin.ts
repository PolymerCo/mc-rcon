import { GameRuleName, McRconOptions, PlayerTargetSelector } from './types'
import { ListPlayerEntry } from './types/ListPlayerEntry'
import { McRcon } from './McRcon'
import { TargetSelector } from './types/TargetSelector'
import { TimeAction } from './types/TimeAction'
import { TimeQueryTarget } from './types/TimeQueryTarget'
import {
  Advancement,
  GameRule,
  Give,
  Kill,
  List,
  Say,
  Seed,
  Stop,
  Time,
  SaveAll,
} from "./commands";

/**
 * Extends the base `McRcon` class and adds Minecraft admin tooling.
 */
export class McRconAdmin extends McRcon {
  /**
   * Creates a new `McRconAdmin` instance.
   * @param options options for the Minecraft RCON connection.
   */
  public constructor(options: Partial<McRconOptions>) {
    super(options);
  }

  /**
   * Gives or takes an advancement from one or more players.
   * @param operation specifies whether to add or remove the to-be-specified advancement(s).
   * @param target specifies one player or more. Must be a player name, a target selector or a UUID.
   * @param scope defines the scope of the modification.
   * ```ts
   * 'everything' // Adds or removes all loaded advancements.
   * 'only' // Adds or removes a single advancement or criterion.
   * 'from' // Adds or removes an advancement and all its children advancements.
   * 'through' // Specifies an advancement, and adds or removes all its parent advancements, and all its children advancements.
   * 'until' // Adds or removes an advancement and all its parent advancements until the root for addition/removal.
   * ```
   * @param advancement specifies a valid namespaced id of the advancement to target. Must be a resource location.
   * @param criterion specifies a valid criterion of the advancement to manipulate. The command defaults to the entire advancement.
   * @throws if the command was unsuccessful.
   * @see https://minecraft.fandom.com/wiki/Commands/advancement
   */
  public advancement(
    operation: "grant" | "revoke",
    target: string | PlayerTargetSelector,
    scope: "everything" | "only" | "from" | "through" | "until",
    advancement: string,
    criterion?: string
  ): Promise<void> {
    return new Advancement()
      .prepare(this, operation, target, scope, advancement, criterion)
      .execute();
  }

  public attribute() {
    throw "error 99: not implemented";
  }

  public ban() {
    throw "error 99: not implemented";
  }

  public banIp() {
    throw "error 99: not implemented";
  }

  public banList() {
    throw "error 99: not implemented";
  }

  public bossBar() {
    throw "error 99: not implemented";
  }

  public cameraShake() {
    throw "error 99: not implemented";
  }

  public changeSetting() {
    throw "error 99: not implemented";
  }

  public clear() {
    throw "error 99: not implemented";
  }

  public clone() {
    throw "error 99: not implemented";
  }

  public data() {
    throw "error 99: not implemented";
  }

  public dataPack() {
    throw "error 99: not implemented";
  }

  public debug() {
    throw "error 99: not implemented";
  }

  public defaultGameMode() {
    throw "error 99: not implemented";
  }

  public deOp() {
    throw "error 99: not implemented";
  }

  public difficulty() {
    throw "error 99: not implemented";
  }

  public effect() {
    throw "error 99: not implemented";
  }

  public enchant() {
    throw "error 99: not implemented";
  }

  public execute() {
    throw "error 99: not implemented";
  }

  public experience() {
    throw "error 99: not implemented";
  }

  public fill() {
    throw "error 99: not implemented";
  }

  public forceLoad() {
    throw "error 99: not implemented";
  }

  public function() {
    throw "error 99: not implemented";
  }

  public gameMode() {
    throw "error 99: not implemented";
  }

  /**
   * Sets or queries a game rule value.
   * @param rule specifies the game rule to set or query. Must be one of the predefined game rules; @see https://minecraft.fandom.com/wiki/Game_rule
   * @param value specifies the value to set the game rule to. If not specified, queries the value of the game rule instead of setting it.
   * @returns the current value of the gamerule if no `value` parameter specified.
   * @see https://minecraft.fandom.com/wiki/Commands/gamerule
   */
  public gameRule(
    rule: GameRuleName,
    value?: number | boolean
  ): Promise<null | number | boolean> {
    return new GameRule().prepare(this, rule, value).execute();
  }

  /**
   * Gives an item to one or more players.
   * @param target specifies the target(s) to give item(s) to. Must be a player name, a target selector or a UUID‌.
   * @param item specifies the item to give. Must be in form of item_id{data_tags}(accepts item and block tags), in which data tags can be omitted when they are not needed.
   * @param count specifies the number of items to give. Default `1`.
   * @see https://minecraft.fandom.com/wiki/Commands/give
   */
  public give(
    target: string | PlayerTargetSelector,
    item: string,
    count?: number
  ): Promise<void> {
    return new Give().prepare(this, target, item, count).execute();
  }

  public help() {
    throw "error 99: not implemented";
  }

  public item() {
    throw "error 99: not implemented";
  }

  public jfr() {
    throw "error 99: not implemented";
  }

  public kick() {
    throw "error 99: not implemented";
  }

  /**
   * Kills entities (players, mobs, items, etc.).
   * @param target specifies the target(s) to kill. Must be a player name, a target selector or a UUID‌.
   * @see https://minecraft.fandom.com/wiki/Commands/kill
   */
  public kill(target: TargetSelector | string): Promise<void> {
    return new Kill().prepare(this, target).execute();
  }

  /**
   * Lists players on the server.
   * @param uuids player UUIDs are included. Default `true`.
   * @return an array of `ListPlayerEntry`s
   * @see https://minecraft.fandom.com/wiki/Commands/list
   */
  public list(uuids: boolean = true): Promise<ListPlayerEntry[]> {
    return new List().prepare(this, uuids).execute();
  }

  public locate() {
    throw "error 99: not implemented";
  }

  public locateBiome() {
    throw "error 99: not implemented";
  }

  public loot() {
    throw "error 99: not implemented";
  }

  public me() {
    throw "error 99: not implemented";
  }

  public msg() {
    throw "error 99: not implemented";
  }

  public op() {
    throw "error 99: not implemented";
  }

  public pardon() {
    throw "error 99: not implemented";
  }

  public pardonIp() {
    throw "error 99: not implemented";
  }

  public particle() {
    throw "error 99: not implemented";
  }

  public perf() {
    throw "error 99: not implemented";
  }

  public placeFeature() {
    throw "error 99: not implemented";
  }

  public playSound() {
    throw "error 99: not implemented";
  }

  public publish() {
    throw "error 99: not implemented";
  }

  public recipe() {
    throw "error 99: not implemented";
  }

  public reload() {
    throw "error 99: not implemented";
  }

  /**
   * These commands manage server saves. Saves the server to the data storage device. They are saved over time until all are flushed to the data storage device.
   * @param flush all the chunks are saved to the data storage device immediately, freezing the server for a short time.
   * @see https://minecraft.fandom.com/wiki/Commands/save
   */
  public saveAll(flush: boolean = false): Promise<void> {
    return new SaveAll().prepare(this, flush).execute();
  }

  public saveOff() {
    throw "error 99: not implemented";
  }

  public saveOn() {
    throw "error 99: not implemented";
  }

  /**
   * Displays a message to multiple players. `@here` can be used to mention all players.
   * @param text specifies the message to say.
   * @see https://minecraft.fandom.com/wiki/Commands/say#Syntax
   */
  public say(message: string): Promise<void> {
    return new Say().prepare(this, message).execute();
  }

  public schedule() {
    throw "error 99: not implemented";
  }

  public scoreboard() {
    throw "error 99: not implemented";
  }

  /**
   * Returns the world seed.
   * @returns the world seed.
   */
  public seed(): Promise<string> {
    return new Seed().prepare(this).execute();
  }

  public setBlock() {
    throw "error 99: not implemented";
  }

  public setIdleTimeout() {
    throw "error 99: not implemented";
  }

  public setWorldSpawn() {
    throw "error 99: not implemented";
  }

  public spawnPoint() {
    throw "error 99: not implemented";
  }

  public spectate() {
    throw "error 99: not implemented";
  }

  public spreadPlayers() {
    throw "error 99: not implemented";
  }

  /**
   * Stops a server.
   * @see https://minecraft.fandom.com/wiki/Commands/stop
   */
  public stop(): Promise<void> {
    return new Stop().prepare(this).execute();
  }

  public stopSound() {
    throw "error 99: not implemented";
  }

  public summon() {
    throw "error 99: not implemented";
  }

  public tag() {
    throw "error 99: not implemented";
  }

  public team() {
    throw "error 99: not implemented";
  }

  public teamMsg() {
    throw "error 99: not implemented";
  }

  public teleport() {
    throw "error 99: not implemented";
  }

  public tell() {
    throw "error 99: not implemented";
  }

  public tellRaw() {
    throw "error 99: not implemented";
  }

  /**
   * Changes or queries the world's game time.
   * @param action specifies to either query, add or set the time.
   * @param target either specifies the time to add or set, or specifies the time to query.
   * @returns the current time if querying, otherwise `null`.
   * @see https://minecraft.fandom.com/wiki/Commands/time
   */
  public time(
    action: TimeAction,
    target: number | TimeQueryTarget
  ): Promise<number | null> {
    return new Time().prepare(this, action, target).execute();
  }

  public title() {
    throw "error 99: not implemented";
  }

  public tm() {
    throw "error 99: not implemented";
  }

  public tp() {
    throw "error 99: not implemented";
  }

  public trigger() {
    throw "error 99: not implemented";
  }

  public w() {
    throw "error 99: not implemented";
  }

  public weather() {
    throw "error 99: not implemented";
  }

  public whitelist() {
    throw "error 99: not implemented";
  }

  public worldBorder() {
    throw "error 99: not implemented";
  }

  public xp() {
    throw "error 99: not implemented";
  }
}
