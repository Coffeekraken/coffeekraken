"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const is_1 = require("@coffeekraken/sugar/is");
const math_1 = require("@coffeekraken/sugar/math");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const micromatch_1 = __importDefault(require("micromatch"));
class SBench extends s_class_1.default {
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
        displaySettings = (0, object_1.__deepMerge)({
            compact: false,
        }, displaySettings);
        filters = (0, object_1.__deepMerge)((_a = s_sugar_config_1.default.get('bench.filters')) !== null && _a !== void 0 ? _a : {}, filters);
        let filteredBenches = this._benches.filter((benchResult) => {
            if (filters.id) {
                if (!micromatch_1.default.isMatch(benchResult.id, filters.id)) {
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
            const metas = `${!displaySettings.compact ? 'Total duration: ' : ''}<${globalColor}>${(0, datetime_1.__formatDuration)(benchObj.duration)}</${globalColor}>`, title = `<${globalColor}>${benchObj.id}</${globalColor}>`;
            logsAr.push(`${title}${' '.repeat((0, math_1.__clamp)(process.stdout.columns -
                (0, string_1.__countLineChars)(title) -
                (0, string_1.__countLineChars)(metas), 0, 9999))}${metas}`);
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
                    timelineStr = `${stat.id}${' '.repeat((0, math_1.__clamp)(idMaxLength - stat.id.length, 0, 999))}`;
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
        if (!(0, is_1.__isChildProcess)()) {
            return;
        }
        // @ts-ignore
        this._ipc.of[`ipc-s-bench-${process.ppid}`].emit('message', Object.assign({}, benchResult));
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
    constructor(id, settings) {
        super((0, object_1.__deepMerge)({
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
    start(settings) {
        if (this.constructor.isDisabled()) {
            return this;
        }
        const finalSettings = (0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {});
        // reset potential old bench
        this._steps.push({
            id: 'start',
            type: 'start',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Starting bench session at <magenta>${(0, datetime_1.__utcTime)()}</magenta>`,
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
        const finalSettings = ((0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
        const startTime = this._steps[0].time;
        this._steps.push({
            id: 'end',
            type: 'end',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Ending bench session at <magenta>${(0, datetime_1.__utcTime)()}</magenta>`,
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
        if ((0, is_1.__isChildProcess)() && this.settings.bubbles) {
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
        const finalSettings = ((0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
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
        const finalSettings = ((0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
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
exports.default = SBench;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwyREFBMkU7QUFDM0UsK0NBQTBEO0FBQzFELG1EQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsdURBQThEO0FBQzlELDREQUFzQztBQXVGdEMsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBa0R4QyxNQUFNLENBQUMsT0FBTztRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FDUixVQUFtQyxFQUFFLEVBQ3JDLGtCQUF3RCxFQUFFOztRQUUxRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFFRCxlQUFlLEdBQUcsSUFBQSxvQkFBVyxFQUN6QjtZQUNJLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLEVBQ0QsZUFBZSxDQUNsQixDQUFDO1FBRUYsT0FBTyxHQUFHLElBQUEsb0JBQVcsRUFDakIsTUFBQSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsbUNBQUksRUFBRSxFQUN6QyxPQUFPLENBQ1YsQ0FBQztRQUVGLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDbkQsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FB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