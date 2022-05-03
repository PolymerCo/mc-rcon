/**
 * Wrapper class for a `Promise` in order to define deferred actions.
 */
export class Deferred<T> {
  /** Internal promise reference. */
  private _promise: Promise<T>

  /**
   * Creates a new Deferred instance.
   */
  public constructor() {
    this._promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  /**
   * The promise on this Deferred instance.
   */
  public get promise(): Promise<T> {
    return this._promise
  }

  /**
   * Resolve the promise.
   */
  public resolve!: (value: T | PromiseLike<T>) => void

  /**
   * Reject the promise.
   */
  public reject!: (reason?: any) => void
}
