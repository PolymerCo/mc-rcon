/**
 * Defines all the player target selectors.
 * @see https://minecraft.fandom.com/wiki/Target_selectors
 */
export type PlayerTargetSelector = '@p' | '@r' | '@a'

/**
 * Defines all the entity target selectors.
 * @see https://minecraft.fandom.com/wiki/Target_selectors
 */
export type EntityTargetSelector = '@e' | '@s'

/**
 * Defines all the available target selectors.
 * @see https://minecraft.fandom.com/wiki/Target_selectors
 */
export type TargetSelector = PlayerTargetSelector | EntityTargetSelector
