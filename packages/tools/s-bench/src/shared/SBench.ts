import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __formatDuration, __utcTime } from '@coffeekraken/sugar/datetime';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import { __clamp } from '@coffeekraken/sugar/math';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __countLineChars } from '@coffeekraken/sugar/string';
import __micromatch from 'micromatch';

// import __SBenchSettingsInterface from './interface/SBenchSettingsInterface.js';

/**
 * @name            SBench
 * @namespace       shared
 * @type            Class
 * @extends         SClass
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class allows you to perform some simple benchmarking actions
 * like dividing a process into multiple "steps" and track the timing
 * between these, etc...
 *
 * @feature         Add "steps" into your processes and get back a performance report from that
 *
 * @snippet          __SBench($1)
 * const bench = new __SBench($1);
 * // ...
 * bench.step($2);
 * // ..
 * bench.end().log();
 *
 * @example         js
 * import __SBench from '@coffeekraken/s-bench';
 * const bench = new __SBench('myCoolProcess');
 * // something...
 * bench.step('afterSomething');
 * // something else...
 * bench.end().log();
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISBenchSettings {
    filters: Partial<ISBenchFilters>;
    bubbles: boolean;
}

export interface ISBenchResult {
    id: string;
    duration: number;
    steps: ISBenchStep[];
    stats: ISBenchResultStat[];
}

export interface ISBenchFilters {
    id: string;
    min: number;
    max: number;
}

export interface ISBenchStatsDisplaySettings {
    compact: boolean;
}

export interface ISBenchResultStat {
    id: string;
    startTime: number;
    endTime: number;
    duration: number;
    startPercent: number;
    endPercent: number;
    percent: number;
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
    private static _benches: ISBenchResult[] = [];

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
     * @name        disable
     * @type        Function
     * @static
     *
     * This method allows you to disable the bench in you process
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private static _disabled = false;
    static disable() {
        this._disabled = true;
    }

    /**
     * @name        isDisabled
     * @type        Function
     * @static
     *
     * This method allows you to check if the bench are disabled in your process or not
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDisabled() {
        return this._disabled;
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
    static stats(
        filters: Partial<ISBenchFilters> = {},
        displaySettings: Partial<ISBenchStatsDisplaySettings> = {},
    ): SBench {
        if (this.isDisabled()) {
            return;
        }

        displaySettings = __deepMerge(
            {
                compact: false,
            },
            displaySettings,
        );

        filters = __deepMerge(
            __SSugarConfig.get('bench.filters') ?? {},
            filters,
        );

        let filteredBenches = this._benches.filter((benchResult) => {
            if (filters.id) {
                if (!__micromatch.isMatch(benchResult.id, filters.id)) {
                    return false;
                }
            }
            if (filters.min) {
                if (benchResult.duration < filters.min) {
                    return false;
                }
            }
            if (filters.max) {
                if (benchResult.duration > filters.max) {
                    return false;
                }
            }

            return true;
        });

        let sortedBenches = filteredBenches.sort((a, b) => {
            if (a.duration > b.duration) return -1;
            return 1;
        });

        const logsAr: string[] = [];

        sortedBenches.forEach((benchObj) => {
            const globalColor =
                benchObj.duration <= 200
                    ? 'green'
                    : benchObj.duration <= 1000
                    ? 'yellow'
                    : 'red';

            if (!displaySettings.compact) {
                logsAr.push(' ');
                logsAr.push(
                    `<yellow>${'-'.repeat(process.stdout.columns)}</yellow>`,
                );
            }
            const metas = `${
                    !displaySettings.compact ? 'Total duration: ' : ''
                }<${globalColor}>${__formatDuration(
                    benchObj.duration,
                )}</${globalColor}>`,
                title = `<${globalColor}>${benchObj.id}</${globalColor}>`;

            logsAr.push(
                `${title}${' '.repeat(
                    __clamp(
                        process.stdout.columns -
                            __countLineChars(title) -
                            __countLineChars(metas),
                        0,
                        9999,
                    ),
                )}${metas}`,
            );

            if (!displaySettings.compact) {
                logsAr.push(
                    `<grey>${'-'.repeat(process.stdout.columns)}</grey>`,
                );
                logsAr.push(' ');

                const idMaxLength = 20,
                    columns = process.stdout.columns - idMaxLength;

                benchObj.stats.forEach((stat) => {
                    // const stepId = `${step.type}-${step.description}`;
                    let timelineStr = '';

                    if (stat.percent <= 0) {
                        return;
                    }

                    const color =
                        stat.duration <= 50
                            ? 'green'
                            : stat.duration <= 200
                            ? 'yellow'
                            : 'red';

                    timelineStr = `${stat.id}${' '.repeat(
                        __clamp(idMaxLength - stat.id.length, 0, 999),
                    )}`;
                    timelineStr += `${' '.repeat(
                        Math.floor((columns / 100) * stat.startPercent),
                    )}`;
                    timelineStr += `<${color}>${'#'.repeat(
                        (columns / 100) * stat.percent,
                    )}</${color}>`;

                    logsAr.push(timelineStr);
                });

                logsAr.push(' ');
            }
        });

        console.log(logsAr.join('\n'));
    }

    /**
     * Emit some data through the IPC connection
     */
    static _emit(benchResult: ISBenchResult): void {
        if (this.isDisabled()) {
            return;
        }

        if (!__isChildProcess()) {
            return;
        }

        // @ts-ignore
        this._ipc.of[`ipc-s-bench-${process.ppid}`].emit('message', {
            ...benchResult,
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
                    bubbles: true,
                    filters: {},
                    // do not use interface directly to avoir circular dependency with JEST
                    // @todo        find a way to fix this
                    // bench: __SBenchSettingsInterface.defaults(),
                },
                settings ?? {},
            ),
        );

        if (this.constructor.isDisabled()) {
            return;
        }

        // init ipc communication if needed
        // if (!this.constructor._ipc) {
        //     this.constructor._ipc = new __nodeIpc.IPC();
        //     this.constructor._ipc.config.id = `ipc-s-bench-${process.pid}`;
        //     this.constructor._ipc.config.retry = 1500;
        //     this.constructor._ipc.config.silent = true;
        //     this.constructor._ipc.config.logger = () => {};

        //     if (__isChildProcess()) {
        //         this.constructor._ipc.connectTo(
        //             `ipc-s-bench-${process.ppid}`,
        //             () => {
        //                 // console.log('UPC ready', process.ppid);
        //                 // start when IPC is ready
        //                 this.start();
        //             },
        //         );
        //     } else {
        //         // start our IPC server
        //         this.constructor._ipc.serve(() => {
        //             this.constructor._ipc.server.on(
        //                 'message',
        //                 (data, socket) => {
        //                     if (!this.constructor._benches[data.id]) {
        //                         this.constructor._benches[data.id] = {
        //                             id: data.id,
        //                             benches: [],
        //                         };
        //                     }
        //                     this.constructor._benches.push(data);
        //                 },
        //             );
        //         });
        //         this.constructor._ipc.server.start();

        //         // log the stats at process exit
        //         __onProcessExit(() => {
        //             this.constructor.stats(this.settings.filters);
        //         });

        //         // some usefull hotkeys
        //         __hotkey('shift+c').on('press', () => {
        //             // reseting the current global stats
        //             console.log(
        //                 `<yellow>[clear]</yellow> Clearing global gathered benches data...`,
        //             );
        //             this.constructor._benches = [];
        //         });
        //         __hotkey('shift+s').on('press', () => {
        //             // loging actual data
        //             this.constructor.stats(this.settings.filters);
        //         });
        //         __hotkey('shift+f').on('press', async () => {
        //             // loging actual data
        //             this.constructor.stats(this.settings.filters, {
        //                 compact: true,
        //             });
        //         });

        //         // start our bench
        //         this.start();
        //     }
        // } else {
        // start bench directly
        this.start();
        // }
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
        if (this.constructor.isDisabled()) {
            return this;
        }

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
        if (this.constructor.isDisabled()) {
            return this;
        }

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
        if (this.constructor.isDisabled()) {
            return this;
        }

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

        const benchResult: ISBenchResult = {
            id: this.metas.id,
            duration: this._steps.at(-1).time - this._steps[0].time,
            steps: this._steps,
            stats: [],
        };

        this._steps.forEach((step, i) => {
            if (i <= 0) {
                return;
            }

            let startTime = this._steps[i - 1].time,
                endTime = step.time,
                duration = step.time - this._steps[i - 1].time,
                startPercent =
                    i === 1 ? 0 : benchResult.stats.at(-1).endPercent,
                percent = Math.floor(
                    (100 / benchResult.duration) *
                        (step.time - this._steps[i - 1].time),
                ),
                endPercent = startPercent + percent;

            benchResult.stats.push({
                id: step.id,
                startTime,
                endTime,
                duration,
                startPercent,
                endPercent,
                percent,
            });
        });

        // this.resolve(this);
        if (__isChildProcess() && this.settings.bubbles) {
            this.constructor._emit(benchResult);
        } else {
            this.constructor._benches.push(benchResult);
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
        if (this.constructor.isDisabled()) {
            return this;
        }

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
