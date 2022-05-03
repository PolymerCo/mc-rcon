/**
 * Contains multiple small utility classes.
 */

/**
 * Contains sleep Utility methods.
 */
export class Sleep {
  /**
   * Sleeps for a given number of milliseconds and will resolve the promise when complete.
   * @param ms number of milliseconds to wait.
   * @returns a promise.
   */
  public static for(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
  }
}
