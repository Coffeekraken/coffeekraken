"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const is_1 = require("@coffeekraken/sugar/is");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const math_1 = require("@coffeekraken/sugar/math");
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const string_1 = require("@coffeekraken/sugar/string");
const micromatch_1 = __importDefault(require("micromatch"));
const node_ipc_1 = __importDefault(require("node-ipc"));
class SBench extends s_class_1.default {
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
        if (!this.constructor._ipc) {
            this.constructor._ipc = new node_ipc_1.default.IPC();
            this.constructor._ipc.config.id = `ipc-s-bench-${process.pid}`;
            this.constructor._ipc.config.retry = 1500;
            this.constructor._ipc.config.silent = true;
            if ((0, is_1.__isChildProcess)()) {
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
                (0, process_1.__onProcessExit)(() => {
                    this.constructor.stats(this.settings.filters);
                });
                // some usefull hotkeys
                (0, keyboard_1.__hotkey)('shift+c').on('press', () => {
                    // reseting the current global stats
                    console.log(`<yellow>[clear]</yellow> Clearing global gathered benches data...`);
                    this.constructor._benches = [];
                });
                (0, keyboard_1.__hotkey)('shift+s').on('press', () => {
                    // loging actual data
                    this.constructor.stats(this.settings.filters);
                });
                (0, keyboard_1.__hotkey)('shift+f').on('press', () => __awaiter(this, void 0, void 0, function* () {
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
                (0, string_1.__countLine)(title) -
                (0, string_1.__countLine)(metas), 0, 9999))}${metas}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwyREFBMkU7QUFDM0UsK0NBQTBEO0FBQzFELDJEQUF3RDtBQUN4RCxtREFBbUQ7QUFDbkQsdURBQXlEO0FBQ3pELHlEQUE4RDtBQUM5RCx1REFBeUQ7QUFDekQsNERBQXNDO0FBQ3RDLHdEQUFpQztBQWdGakMsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBK054Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEVBQVUsRUFBRSxRQUFtQztRQUN2RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUU7YUFDTDtZQUNELE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCx1RUFBdUU7WUFDdkUsc0NBQXNDO1lBQ3RDLCtDQUErQztTQUNsRCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBdlBOOzs7Ozs7Ozs7V0FTRztRQUNLLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBK08vQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNWO1FBRUQsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLGtCQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxlQUFlLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxH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