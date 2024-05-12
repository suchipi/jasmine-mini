import jasmine from "jasmine";

declare namespace JasmineMini {
  export interface TestInterface {
    /**
     * Create a group of specs (often called a suite).
     * @param description Textual description of the group
     * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
     */
    describe(description: string, specDefinitions: () => void): void;

    /**
     * A focused `describe`. If suites or specs are focused, only those that are focused will be executed.
     * @param description Textual description of the group
     * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
     */
    fdescribe(description: string, specDefinitions: () => void): void;

    /**
     * A temporarily disabled `describe`. Specs within an xdescribe will be marked pending and not executed.
     * @param description Textual description of the group
     * @param specDefinitions Function for Jasmine to invoke that will define inner suites a specs
     */
    xdescribe(description: string, specDefinitions: () => void): void;

    /**
     * Define a single spec. A spec should contain one or more expectations that test the state of the code.
     * A spec whose expectations all succeed will be passing and a spec with any failures will fail.
     * @param expectation Textual description of what this spec is checking
     * @param assertion Function that contains the code of your test. If not provided the test will be pending.
     * @param timeout Custom timeout for an async spec.
     */
    it(
      expectation: string,
      assertion?: jasmine.ImplementationCallback,
      timeout?: number
    ): void;

    /**
     * A focused `it`. If suites or specs are focused, only those that are focused will be executed.
     * @param expectation Textual description of what this spec is checking
     * @param assertion Function that contains the code of your test. If not provided the test will be pending.
     * @param timeout Custom timeout for an async spec.
     */
    fit(
      expectation: string,
      assertion?: jasmine.ImplementationCallback,
      timeout?: number
    ): void;

    /**
     * A temporarily disabled `it`. The spec will report as pending and will not be executed.
     * @param expectation Textual description of what this spec is checking
     * @param assertion Function that contains the code of your test. If not provided the test will be pending.
     * @param timeout Custom timeout for an async spec.
     */
    xit(
      expectation: string,
      assertion?: jasmine.ImplementationCallback,
      timeout?: number
    ): void;

    /**
     * Mark a spec as pending, expectation results will be ignored.
     * If you call the function pending anywhere in the spec body, no matter the expectations, the spec will be marked pending.
     * @param reason Reason the spec is pending.
     */
    pending(reason?: string): void;

    /**
     * Sets a user-defined property that will be provided to reporters as
     * part of the properties field of SpecResult.
     * @since 3.6.0
     */
    setSpecProperty(key: string, value: unknown): void;

    /**
     * Sets a user-defined property that will be provided to reporters as
     * part of the properties field of SuiteResult.
     * @since 3.6.0
     */
    setSuiteProperty(key: string, value: unknown): void;

    /**
     * Run some shared setup before each of the specs in the describe in which it is called.
     * @param action Function that contains the code to setup your specs.
     * @param timeout Custom timeout for an async beforeEach.
     */
    beforeEach(action: jasmine.ImplementationCallback, timeout?: number): void;

    /**
     * Run some shared teardown after each of the specs in the describe in which it is called.
     * @param action Function that contains the code to teardown your specs.
     * @param timeout Custom timeout for an async afterEach.
     */
    afterEach(action: jasmine.ImplementationCallback, timeout?: number): void;

    /**
     * Run some shared setup once before all of the specs in the describe are run.
     * Note: Be careful, sharing the setup from a beforeAll makes it easy to accidentally leak state between your specs so that they erroneously pass or fail.
     * @param action Function that contains the code to setup your specs.
     * @param timeout Custom timeout for an async beforeAll.
     */
    beforeAll(action: jasmine.ImplementationCallback, timeout?: number): void;

    /**
     * Run some shared teardown once after all of the specs in the describe are run.
     * Note: Be careful, sharing the teardown from a afterAll makes it easy to accidentally leak state between your specs so that they erroneously pass or fail.
     * @param action Function that contains the code to teardown your specs.
     * @param timeout Custom timeout for an async afterAll
     */
    afterAll(action: jasmine.ImplementationCallback, timeout?: number): void;

    /**
     * Create an expectation for a spec.
     * @checkReturnValue see https://tsetse.info/check-return-value
     * @param spy
     */
    expect<T extends jasmine.Func>(
      spy: T | jasmine.Spy<T>
    ): jasmine.FunctionMatchers<T>;

    /**
     * Create an expectation for a spec.
     * @checkReturnValue see https://tsetse.info/check-return-value
     * @param actual
     */
    expect<T>(actual: ArrayLike<T>): jasmine.ArrayLikeMatchers<T>;

    /**
     * Create an expectation for a spec.
     * @checkReturnValue see https://tsetse.info/check-return-value
     * @param actual Actual computed value to test expectations against.
     */
    expect<T>(actual: T): jasmine.Matchers<T>;

    /**
     * Create an expectation for a spec.
     */
    expect(): jasmine.NothingMatcher;

    /**
     * Create an asynchronous expectation for a spec. Note that the matchers
     * that are provided by an asynchronous expectation all return promises
     * which must be either returned from the spec or waited for using `await`
     * in order for Jasmine to associate them with the correct spec.
     * @checkReturnValue see https://tsetse.info/check-return-value
     * @param actual Actual computed value to test expectations against.
     */
    expectAsync<T, U>(actual: T | PromiseLike<T>): jasmine.AsyncMatchers<T, U>;

    /**
     * Explicitly mark a spec as failed.
     * @param e Reason for the failure
     */
    fail(e?: any): void;

    /**
     * Install a spy onto an existing object.
     * @param object The object upon which to install the `Spy`.
     * @param method The name of the method to replace with a `Spy`.
     */
    spyOn<T, K extends keyof T = keyof T>(
      object: T,
      method: T[K] extends Function ? K : never
    ): jasmine.Spy<
      T[K] extends jasmine.Func
        ? T[K]
        : T[K] extends { new (...args: infer A): infer V }
          ? (...args: A) => V
          : never
    >;

    /**
     * Install a spy on a property installed with `Object.defineProperty` onto an existing object.
     * @param object The object upon which to install the `Spy`.
     * @param property The name of the property to replace with a `Spy`.
     * @param accessType The access type (get|set) of the property to `Spy` on.
     */
    spyOnProperty<T, K extends keyof T = keyof T>(
      object: T,
      property: K,
      accessType?: "get"
    ): jasmine.Spy<(this: T) => T[K]>;
    spyOnProperty<T, K extends keyof T = keyof T>(
      object: T,
      property: K,
      accessType: "set"
    ): jasmine.Spy<(this: T, value: T[K]) => void>;

    /**
     * Installs spies on all writable and configurable properties of an object.
     * @param object The object upon which to install the `Spy`s.
     * @param includeNonEnumerable Whether or not to add spies to non-enumerable properties.
     */
    spyOnAllFunctions<T>(
      object: T,
      includeNonEnumerable?: boolean
    ): jasmine.SpyObj<T>;
  }

  export interface Core {
    boot(core: Core): jasmine.Jasmine;
    version(): string;
  }

  export interface CompletionReporter extends jasmine.CustomReporter {
    onComplete(callback: () => void): void;
    isComplete(): boolean;
  }

  export interface TimerConstructor {
    new (options?: { now?: () => number }): Timer;
    prototype: Timer;
  }
  export interface Timer {
    start(): void;
    elapsed(): number;
  }

  export interface ConsoleReporterOptions {
    timer?: Timer;
    print?: (...args: any) => void;
    showColors?: boolean;
    jasmineCorePath?: string;
  }
  export interface ConsoleReporter extends jasmine.CustomReporter {
    setOptions?(options: ConsoleReporterOptions): void;
  }
}

declare class JasmineMini {
  constructor(options?: { jasmineCore?: JasmineMini.Core });

  jasmine: jasmine.Jasmine;
  specDir: string;
  env: jasmine.Env;
  reportersCount: number;
  completionReporter: JasmineMini.CompletionReporter;
  onCompleteCallbackAdded: boolean;
  showingColors: boolean;
  reporter: JasmineMini.ConsoleReporter;
  defaultReporterConfigured: boolean;
  jasmineCorePath?: string;

  /** Returns the version of jasmine-core in use. */
  coreVersion(): string;

  /** Enables or disables test order randomization. */
  randomizeTests(value: boolean): void;

  /** Sets the seed value used for test order randomization. */
  seed(value: string): void;

  /** Sets the `showingColors` property to `value`. */
  showColors(value: boolean): void;

  /** Add the specified test reporter to this suite. */
  addReporter(reporter: jasmine.CustomReporter): void;

  /** Clear all test reporters from this suite. */
  clearReporters(): void;

  /** Set the fallback reporter for this suite. */
  provideFallbackReporter(reporter: jasmine.CustomReporter): void;

  configureDefaultReporter(options: JasmineMini.ConsoleReporterOptions): void;

  addMatchers(matchers: jasmine.CustomMatcherFactories): void;

  loadConfig(config: {
    spec_dir?: string;
    stopSpecOnExpectationFailure?: boolean;
    stopOnSpecFailure?: boolean;
    random?: boolean;
  }): void;

  onComplete(onCompleteCallback: () => void): void;

  stopSpecOnExpectationFailure(value: boolean): void;

  stopOnSpecFailure(value: boolean): boolean;

  /**
   * Returns the would-be-globals for this suite.
   */
  getInterface(): JasmineMini.TestInterface;

  execute(filterString?: string): void;

  /**
   * Sets up a new `Jasmine` instance, configures it with the default reporter,
   * and runs it. Use the TestInterface provided in the callback to define your
   * tests.
   *
   * @param callback A function which is expected to synchronously call `describe`, `it`, etc.
   * @returns Promise which resolves with the output from the test reporter on suite success, or rejects with an error on suite failure. The rejected Error contains the output from the test reporter.
   */
  static run(
    callback: (interface: JasmineMini.TestInterface) => void
  ): Promise<string>;
}

export = JasmineMini;
