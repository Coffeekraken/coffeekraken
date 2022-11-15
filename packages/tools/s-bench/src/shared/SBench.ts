import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import { __formatDuration, __utcTime } from '@coffeekraken/sugar/datetime';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __clamp } from '@coffeekraken/sugar/math';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __minimatch from 'minimatch';
import __nodeIpc from 'node-ipc';

// import __SBenchSettingsInterface from './interface/SBenchSettingsInterface';

/**
 * @name            SBench
 * @namespace       shared
 * @type            Class
 * @extends         SClass
 * @platform        js
 * @platform        node
 * @status          alpha
 *
 * This class allows you to perform some simple benchmarking actions
 * like dividing a process into multiple "steps" and track the timing
 * between these, etc...
 *
 * @feature         Add "steps" into your processes and get back a performance report from that
 *
 * @example         js
 * import SBench from '@coffeekraken/s-bench';
 *
 * SBench.start('myCoolProcess');
 * // some code...
 * SBench.step('myCoolProcess', 'Before compilation');
 * // compilation code...
 * SBench.step('myCoolProcess', 'After compilation');
 * SBench.end('myCoolProcess');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISBenchSettings {
    title: string;
    body: string;
}

export interface ISBenchGlobalStepsBench {
    duration: number;
    steps: ISBenchStep[];
}

export interface ISBenchGlobalSteps {
    [id: string]: ISBenchGlobalStepsBench;
}

export interface ISBenchStep {
    id: string;
    type: 'start' | 'end' | 'step';
    description: string;
    time: number;
    logs: string[];
}

export default class SBench extends __SClass {
    /**
     * @name        _steps
     * @type        ISBenchStep[]
     * @private
     *
     * Store the steps of this particular instance
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _steps: ISBenchStep[] = [];

    /**
     * @name        _steps
     * @type        ISBenchStep[]
     * @private
     * @static
     *
     * Store the steps of the whole benches, even child process
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private static _globalSteps: ISBenchGlobalSteps = {};

    /**
     * @name            _benchInstancesById
     * @type            Record<string, SBench>
     * @private
     *
     * Store all the instances started using a static methods
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private static _benchInstancesById: Record<string, SBench> = {};

    /**
     * @name            benchEnv
     * @type            Function
     * @static
     *
     * This static method allows you to get the current bench environment
     * the process is running in. The bench environment
     */

    /**
     * @name        _ipc
     * @type        NodeIpc
     * @static
     * @private
     *
     * Store the node ipc instance server or client
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private static _ipc;

    /**
     * @name        filter
     * @type        Function
     * @static
     *
     * This method allows you to activate a list of bench id(s).
     * You can specify "*" for wildcard
     *
     * @param           {String|String[]}           benchId         One or more bench id(s) to activate
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static filter(benchId: string | string[]): void {
        let currentBenchs = __SEnv.get('s-bench-filtered-ids') ?? [];
        currentBenchs = [...currentBenchs, ...Array.from(benchId)];
        __SEnv.set('s-bench-filtered-ids', currentBenchs);
    }

    /**
     * @name        filtered
     * @type        Function
     * @static
     *
     * This method allows you to get back the list of activated bench(s)
     *
     * @return      {String[]}          The list of activated bench id(s)
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static filtered(): string[] {
        return __SEnv.get('s-bench-filtered-ids') ?? [];
    }

    /**
     * @name        isBenchActive
     * @type        Function
     * @static
     *
     * This method allows you to check if a particular bench id is active
     *
     * @param        {String}               benchId             The bench id to check
     * @return      {Boolean}           true if is active, false if not
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isBenchActive(benchId: string): boolean {
        if (this.filtered().indexOf('*') !== -1) return true;
        for (let i = 0; i < this.filtered().length; i++) {
            const filteredId = this.filtered()[i];
            if (__minimatch(benchId, filteredId)) return true;
        }
    }

    /**
     * @name            getBenchInstanceById
     * @type            Function
     * @static
     *
     * This static method allows you to get back a current SBench instance by it's id,
     * or get back a new instance that you can use directly
     *
     * @param       {String}            id          The id of the instance you want to get back
     * @return      {SBench}                        A current SBench instance or a new one to use
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getBenchInstanceById(id: string): SBench {
        const instance = this._benchInstancesById[id];
        if (!instance)
            throw new Error(
                `<red>[bench]</red> Sorry but the requested SBench instance with the id "<yellow>${id}</yellow>" does not exists... Make sure to initiate it correctly using "<cyan>SBench.start('${id}');</cyan>"`,
            );
        return instance;
    }

    /**
     * @name            start
     * @type            Function
     * @static
     *
     * This method allows you to start a new bench "session"
     *
     * @param       {String}        id          The "bench" id to use during the whole benchmark
     * @return      {SBench}                    The SBench instance for this bench
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static start(id: string): SBench {
        this._benchInstancesById[id] = new this(id);

        const instance = this._benchInstancesById[id];
        return instance.start();
    }

    /**
     * @name            step
     * @type            Function
     * @static
     *
     * This method allows you to step a new bench "session"
     *
     * @param       {String}        id          The "bench" id to use during the whole benchmark
     * @return      {SBench}                    The SBench instance for this bench
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static step(id: string, stepId: string, description = ''): SBench {
        const instance = this.getBenchInstanceById(id);
        return instance.step(stepId, description);
    }

    /**
     * @name            end
     * @type            Function
     * @static
     *
     * This method allows you to end a new bench "session"
     *
     * @param       {String}        id          The "bench" id to use during the whole benchmark
     * @return      {SBench}                    The SBench instance for this bench
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static end(id: string, settings?: Partial<ISBenchSettings>): SBench {
        const instance = this.getBenchInstanceById(id);
        return instance.end(settings);
    }

    /**
     * @name            log
     * @type            Function
     * @static
     *
     * This method allows you to log a new bench "session" if this one is active
     *
     * @param       {String}        id          The "bench" id to use during the whole benchmark
     * @return      {SBench}                    The SBench instance for this bench
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static log(id: string, settings?: Partial<ISBenchSettings>): SBench {
        const instance = this.getBenchInstanceById(id);
        return instance.log();
    }

    /**
     * @name            stats
     * @type            Function
     * @static
     *
     * This method allows you to log some stats about the gathered benches
     *
     * @param       {String}        id          The "bench" id to use during the whole benchmark
     * @return      {SBench}                    The SBench instance for this bench
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static stats(id: string, settings?: Partial<ISBenchSettings>): SBench {
        let sortedBenches = __sort(this._globalSteps, (a, b) => {
            if (a.duration > b.duration) return -1;
            return 1;
        });

        for (let [benchId, benchObj] of Object.entries(sortedBenches)) {
            benchObj.times = 0;
            benchObj.steps.forEach((step) => {
                if (step.type === 'start') {
                    benchObj.times++;
                }
            });
        }

        const logsAr: string[] = [];

        for (let [benchId, benchObj] of Object.entries(sortedBenches)) {
            logsAr.push(' ');
            logsAr.push(
                `<yellow>${'-'.repeat(process.stdout.columns)}</yellow>`,
            );
            let repeat = logsAr.push(
                `<yellow>${benchId}</yellow>${' '.repeat(
                    __clamp(20 - benchId.length, 0, 9999),
                )} Executed <cyan>${benchObj.times}</cyan> time${
                    benchObj.times > 1 ? 's' : ''
                } - Total duration: <yellow>${__formatDuration(
                    benchObj.duration,
                )}</yellow>`,
            );
            logsAr.push(`<grey>${'-'.repeat(process.stdout.columns)}</grey>`);
            logsAr.push(' ');

            const stepsStats = {};

            benchObj.steps.forEach((step) => {
                const stepId = `${step.type}-${step.description}`;

                if (!stepsStats[stepId]) {
                    stepsStats[stepId] = {
                        type: step.type,
                        id: step.id,
                        times: [],
                        durations: [],
                    };
                }
                if (stepsStats[stepId].times.length) {
                    stepsStats[stepId].durations.push(
                        step.time - stepsStats[stepId].times.at(-1),
                    );
                }
                stepsStats[stepId].times.push(step.time);
            });

            for (let [type, obj] of Object.entries(stepsStats)) {
                if (!obj.id) {
                    continue;
                }

                logsAr.push(
                    `<cyan>${obj.id}</cyan>${' '.repeat(
                        __clamp(20 - obj.id.length, 0, 999),
                    )}${obj.durations
                        .map(
                            (d) =>
                                `${' '.repeat(
                                    __clamp(4 - `${d}`.length, 0, 999),
                                )}${
                                    d >= 1000
                                        ? `<red>${d}</red>`
                                        : d >= 100
                                        ? `<yellow>${d}</yellow>`
                                        : `${d}`
                                }`,
                        )
                        .join(' ')}`,
                );
            }

            logsAr.push(' ');
        }

        console.log(logsAr.join('\n'));
    }

    /**
     * Emit some data through the IPC connection
     */
    static _emit(id: string, data: any): void {
        if (!__isChildProcess()) {
            return;
        }

        // @ts-ignore
        this._ipc.of[`ipc-s-bench-${process.ppid}`].emit('message', {
            id,
            data,
        });
    }

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(id: string, settings?: Partial<ISBenchSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id,
                    },
                    // do not use interface directly to avoir circular dependency with JEST
                    // @todo        find a way to fix this
                    // bench: __SBenchSettingsInterface.defaults(),
                },
                settings ?? {},
            ),
        );

        // init ipc communication if needed
        if (!this.constructor._ipc) {
            this.constructor._ipc = new __nodeIpc.IPC();
            this.constructor._ipc.config.id = `ipc-s-bench-${process.pid}`;
            this.constructor._ipc.config.retry = 1500;
            this.constructor._ipc.config.silent = true;

            if (__isChildProcess()) {
                this.constructor._ipc.connectTo(
                    `ipc-s-bench-${process.ppid}`,
                    () => {
                        // console.log('UPC ready', process.ppid);
                    },
                );
            } else {
                this.constructor._ipc.serve(() => {
                    this.constructor._ipc.server.on(
                        'message',
                        (data, socket) => {
                            if (!this.constructor._globalSteps[data.id]) {
                                this.constructor._globalSteps[data.id] = {
                                    duration: 0,
                                    steps: [],
                                };
                            }
                            if (
                                this.constructor._globalSteps[data.id].steps
                                    .length >= 2
                            ) {
                                this.constructor._globalSteps[
                                    data.id
                                ].duration +=
                                    this.constructor._globalSteps[
                                        data.id
                                    ].steps.at(-1).time -
                                    this.constructor._globalSteps[
                                        data.id
                                    ].steps.at(-2).time;
                            }
                            this.constructor._globalSteps[data.id].steps.push(
                                data.data,
                            );
                        },
                    );
                });
                this.constructor._ipc.server.start();

                // log the stats at process exit
                __onProcessExit(() => {
                    this.constructor.stats();
                });

                // some usefull hotkeys
                __hotkey('shift+c').on('press', () => {
                    // reseting the current global stats
                    console.log(
                        `<yellow>[clear]</yellow> Clearing global gathered benches data...`,
                    );
                    this.constructor._globalSteps = {};
                });
                __hotkey('shift+s').on('press', () => {
                    // loging actual data
                    this.constructor.stats();
                });
            }
        }
    }

    /**
     * @name            isActive
     * @type            Function
     *
     * This method allows you to check if the current bench is active or not.
     *
     * @return          {Boolean}           true if is active, false if not
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isActive(): boolean {
        // @ts-ignore
        return this.constructor.isBenchActive(this.metas.id);
    }

    /**
     * @name            start
     * @type            Function
     *
     * This method allows you to start a new bench "session"
     *
     * @return  {SBench}                                The instance to maintain chainability
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(settings?: Partial<ISBenchSettings>): SBench {
        if (!this.isActive()) return this;

        const finalSettings = __deepMerge(this.settings, settings ?? {});

        // reset potential old bench
        this._steps.push({
            id: 'start',
            type: 'start',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${
                    this.metas.id
                }]</yellow> Starting bench session at <magenta>${__utcTime()}</magenta>`,
            ],
        });

        if (__isChildProcess()) {
            this.constructor._emit(this.metas.id, this._steps.at(-1));
        }

        return this;
    }

    /**
     * @name            step
     * @type            Function
     *
     * This method allows you to declare a new step in your bench.
     * A step is simple a point in your code like "after compilation", etc.
     * It will keep track of each steps and display the time it has taken
     * from the last step.
     *
     * @param       {String}        id              The step id
     * @param       {String}        [description='']   The step description
     * @return  {SBench}                                The instance to maintain chainability
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    step(id: string, description = ''): SBench {
        if (!this.isActive()) return this;

        const keys = Object.keys(this._steps);

        // @ts-ignore
        const lastTime = !keys.length
            ? this._startTime
            : // @ts-ignore
              this._steps[keys.pop()].time;
        const duration = Date.now() - lastTime;

        this._steps.push({
            id,
            type: 'step',
            description,
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> ${
                    description
                        ? `${description} | <cyan>${duration / 1000}s</cyan>`
                        : `Step "<yellow>${id}</yellow>" completed in <cyan>${
                              duration / 1000
                          }s</cyan>`
                }`,
            ],
        });

        if (__isChildProcess()) {
            this.constructor._emit(this.metas.id, this._steps.at(-1));
        }

        return this;
    }

    /**
     * @name            end
     * @type            Function
     *
     * This method allows you to end a bencvh "session"
     *
     * @param   {Boolean}           [log=false]         Specify if you want to log the result directly or not
     * @return  {SBench}                                The instance to maintain chainability
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    end(settings?: Partial<ISBenchSettings>): SBench {
        if (!this.isActive()) return this;

        const finalSettings = <ISBenchSettings>(
            __deepMerge(this.settings, settings ?? {})
        );

        const startTime = this._steps[0].time;

        this._steps.push({
            id: 'end',
            type: 'end',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${
                    this.metas.id
                }]</yellow> Ending bench session at <magenta>${__utcTime()}</magenta>`,
                `<green>[bench.${
                    this.metas.id
                }]</green> Complete bench session has taken <cyan>${
                    (Date.now() - startTime) / 1000
                }s</cyan>`,
            ],
        });

        // this.resolve(this);
        if (__isChildProcess()) {
            this.constructor._emit(this.metas.id, this._steps.at(-1));
        }

        return this;
    }

    /**
     * @name            log
     * @type            Function
     *
     * This method allows you to log the summary if this bench is active
     *
     * @return  {SBench}                                The instance to maintain chainability
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(settings?: Partial<ISBenchSettings>): SBench {
        if (!this.isActive()) return this;
        const finalSettings = <ISBenchSettings>(
            __deepMerge(this.settings, settings ?? {})
        );
        console.log(this.toString(finalSettings));
        return this;
    }

    /**
     * @name            toString
     * @type            Function
     *
     * This method allows you to print the bench in string format
     *
     * @return      {String}                The bench in string format
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(settings?: Partial<ISBenchSettings>): string {
        const finalSettings = <ISBenchSettings>(
            __deepMerge(this.settings, settings ?? {})
        );

        let logsAr = [
            '<magenta>-------------------- SBench --------------------</magenta>',
        ];

        if (finalSettings?.title) {
            logsAr.push(
                `<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.title}`,
            );
        }
        if (finalSettings?.body) {
            logsAr.push(
                `<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.body}`,
            );
        }

        Object.keys(this._steps).forEach((stepId) => {
            const stepObj = this._steps[stepId];
            logsAr = [...logsAr, ...stepObj.logs];
        });
        logsAr.push(
            '<magenta>------------------------------------------------</magenta>',
        );
        return logsAr.join('\n');
    }
}
