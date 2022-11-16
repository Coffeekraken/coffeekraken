var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __formatDuration, __utcTime } from '@coffeekraken/sugar/datetime';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __clamp } from '@coffeekraken/sugar/math';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import { __countLine } from '@coffeekraken/sugar/string';
import __micromatch from 'micromatch';
import __nodeIpc from 'node-ipc';
export default class SBench extends __SClass {
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
    constructor(id, settings) {
        super(__deepMerge({
            metas: {
                id,
            },
            bubbles: true,
            filters: {},
            // do not use interface directly to avoir circular dependency with JEST
            // @todo        find a way to fix this
            // bench: __SBenchSettingsInterface.defaults(),
        }, settings !== null && settings !== void 0 ? settings : {}));
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
        this._steps = [];
        if (this.constructor.isDisabled()) {
            return;
        }
        // init ipc communication if needed
        if (!this.constructor._ipc) {
            this.constructor._ipc = new __nodeIpc.IPC();
            this.constructor._ipc.config.id = `ipc-s-bench-${process.pid}`;
            this.constructor._ipc.config.retry = 1500;
            this.constructor._ipc.config.silent = true;
            if (__isChildProcess()) {
                this.constructor._ipc.connectTo(`ipc-s-bench-${process.ppid}`, () => {
                    // console.log('UPC ready', process.ppid);
                    // start when IPC is ready
                    this.start();
                });
            }
            else {
                // start our IPC server
                this.constructor._ipc.serve(() => {
                    this.constructor._ipc.server.on('message', (data, socket) => {
                        if (!this.constructor._benches[data.id]) {
                            this.constructor._benches[data.id] = {
                                id: data.id,
                                benches: [],
                            };
                        }
                        this.constructor._benches.push(data);
                    });
                });
                this.constructor._ipc.server.start();
                // log the stats at process exit
                __onProcessExit(() => {
                    this.constructor.stats(this.settings.filters);
                });
                // some usefull hotkeys
                __hotkey('shift+c').on('press', () => {
                    // reseting the current global stats
                    console.log(`<yellow>[clear]</yellow> Clearing global gathered benches data...`);
                    this.constructor._benches = [];
                });
                __hotkey('shift+s').on('press', () => {
                    // loging actual data
                    this.constructor.stats(this.settings.filters);
                });
                __hotkey('shift+f').on('press', () => __awaiter(this, void 0, void 0, function* () {
                    // loging actual data
                    this.constructor.stats(this.settings.filters, {
                        compact: true,
                    });
                }));
                // start our bench
                this.start();
            }
        }
        else {
            // start bench directly
            this.start();
        }
    }
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
    static stats(filters = {}, displaySettings = {}) {
        var _a;
        if (this.isDisabled()) {
            return;
        }
        displaySettings = __deepMerge({
            compact: false,
        }, displaySettings);
        filters = __deepMerge((_a = __SSugarConfig.get('bench.filters')) !== null && _a !== void 0 ? _a : {}, filters);
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
            if (a.duration > b.duration)
                return -1;
            return 1;
        });
        const logsAr = [];
        sortedBenches.forEach((benchObj) => {
            const globalColor = benchObj.duration <= 200
                ? 'green'
                : benchObj.duration <= 1000
                    ? 'yellow'
                    : 'red';
            if (!displaySettings.compact) {
                logsAr.push(' ');
                logsAr.push(`<yellow>${'-'.repeat(process.stdout.columns)}</yellow>`);
            }
            const metas = `${!displaySettings.compact ? 'Total duration: ' : ''}<${globalColor}>${__formatDuration(benchObj.duration)}</${globalColor}>`, title = `<${globalColor}>${benchObj.id}</${globalColor}>`;
            logsAr.push(`${title}${' '.repeat(__clamp(process.stdout.columns -
                __countLine(title) -
                __countLine(metas), 0, 9999))}${metas}`);
            if (!displaySettings.compact) {
                logsAr.push(`<grey>${'-'.repeat(process.stdout.columns)}</grey>`);
                logsAr.push(' ');
                const idMaxLength = 20, columns = process.stdout.columns - idMaxLength;
                benchObj.stats.forEach((stat) => {
                    // const stepId = `${step.type}-${step.description}`;
                    let timelineStr = '';
                    if (stat.percent <= 0) {
                        return;
                    }
                    const color = stat.duration <= 50
                        ? 'green'
                        : stat.duration <= 200
                            ? 'yellow'
                            : 'red';
                    timelineStr = `${stat.id}${' '.repeat(__clamp(idMaxLength - stat.id.length, 0, 999))}`;
                    timelineStr += `${' '.repeat(Math.floor((columns / 100) * stat.startPercent))}`;
                    timelineStr += `<${color}>${'#'.repeat((columns / 100) * stat.percent)}</${color}>`;
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
    static _emit(benchResult) {
        if (this.isDisabled()) {
            return;
        }
        if (!__isChildProcess()) {
            return;
        }
        // @ts-ignore
        this._ipc.of[`ipc-s-bench-${process.ppid}`].emit('message', Object.assign({}, benchResult));
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
    start(settings) {
        if (this.constructor.isDisabled()) {
            return this;
        }
        const finalSettings = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
        // reset potential old bench
        this._steps.push({
            id: 'start',
            type: 'start',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Starting bench session at <magenta>${__utcTime()}</magenta>`,
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
    step(id, description = '') {
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
                `<yellow>[bench.${this.metas.id}]</yellow> ${description
                    ? `${description} | <cyan>${duration / 1000}s</cyan>`
                    : `Step "<yellow>${id}</yellow>" completed in <cyan>${duration / 1000}s</cyan>`}`,
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
    end(settings) {
        if (this.constructor.isDisabled()) {
            return this;
        }
        const finalSettings = (__deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {}));
        const startTime = this._steps[0].time;
        this._steps.push({
            id: 'end',
            type: 'end',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Ending bench session at <magenta>${__utcTime()}</magenta>`,
                `<green>[bench.${this.metas.id}]</green> Complete bench session has taken <cyan>${(Date.now() - startTime) / 1000}s</cyan>`,
            ],
        });
        const benchResult = {
            id: this.metas.id,
            duration: this._steps.at(-1).time - this._steps[0].time,
            steps: this._steps,
            stats: [],
        };
        this._steps.forEach((step, i) => {
            if (i <= 0) {
                return;
            }
            let startTime = this._steps[i - 1].time, endTime = step.time, duration = step.time - this._steps[i - 1].time, startPercent = i === 1 ? 0 : benchResult.stats.at(-1).endPercent, percent = Math.floor((100 / benchResult.duration) *
                (step.time - this._steps[i - 1].time)), endPercent = startPercent + percent;
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
        }
        else {
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
    log(settings) {
        if (this.constructor.isDisabled()) {
            return this;
        }
        const finalSettings = (__deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {}));
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
    toString(settings) {
        const finalSettings = (__deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {}));
        let logsAr = [
            '<magenta>-------------------- SBench --------------------</magenta>',
        ];
        if (finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.title) {
            logsAr.push(`<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.title}`);
        }
        if (finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.body) {
            logsAr.push(`<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.body}`);
        }
        Object.keys(this._steps).forEach((stepId) => {
            const stepObj = this._steps[stepId];
            logsAr = [...logsAr, ...stepObj.logs];
        });
        logsAr.push('<magenta>------------------------------------------------</magenta>');
        return logsAr.join('\n');
    }
}
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
SBench._benches = [];
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
SBench._disabled = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFrRmpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFFBQVE7SUErTnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLFFBQW1DO1FBQ3ZELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRTthQUNMO1lBQ0QsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLHVFQUF1RTtZQUN2RSxzQ0FBc0M7WUFDdEMsK0NBQStDO1NBQ2xELEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF2UE47Ozs7Ozs7OztXQVNHO1FBQ0ssV0FBTSxHQUFrQixFQUFFLENBQUM7UUErTy9CLElBQUksSUFBSSxDQUFDLFdB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