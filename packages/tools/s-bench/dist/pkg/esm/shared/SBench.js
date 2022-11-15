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
        // init ipc communication if needed
        if (!this.constructor._ipc) {
            this.constructor._ipc = new __nodeIpc.IPC();
            this.constructor._ipc.config.id = `ipc-s-bench-${process.pid}`;
            this.constructor._ipc.config.retry = 1500;
            this.constructor._ipc.config.silent = true;
            if (__isChildProcess()) {
                this.constructor._ipc.connectTo(`ipc-s-bench-${process.ppid}`, () => {
                    // console.log('UPC ready', process.ppid);
                });
            }
            else {
                this.constructor._ipc.serve(() => {
                    this.constructor._ipc.server.on('message', (data, socket) => {
                        if (!this.constructor._globalSteps[data.id]) {
                            this.constructor._globalSteps[data.id] = {
                                duration: 0,
                                steps: [],
                            };
                        }
                        if (this.constructor._globalSteps[data.id].steps
                            .length >= 2) {
                            this.constructor._globalSteps[data.id].duration +=
                                this.constructor._globalSteps[data.id].steps.at(-1).time -
                                    this.constructor._globalSteps[data.id].steps.at(-2).time;
                        }
                        this.constructor._globalSteps[data.id].steps.push(data.data);
                    });
                });
                this.constructor._ipc.server.start();
                // log the stats at process exit
                __onProcessExit(() => {
                    this.constructor.stats();
                });
                // some usefull hotkeys
                __hotkey('shift+c').on('press', () => {
                    // reseting the current global stats
                    console.log(`<yellow>[clear]</yellow> Clearing global gathered benches data...`);
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
    static filter(benchId) {
        var _a;
        let currentBenchs = (_a = __SEnv.get('s-bench-filtered-ids')) !== null && _a !== void 0 ? _a : [];
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
    static filtered() {
        var _a;
        return (_a = __SEnv.get('s-bench-filtered-ids')) !== null && _a !== void 0 ? _a : [];
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
    static isBenchActive(benchId) {
        if (this.filtered().indexOf('*') !== -1)
            return true;
        for (let i = 0; i < this.filtered().length; i++) {
            const filteredId = this.filtered()[i];
            if (__minimatch(benchId, filteredId))
                return true;
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
    static getBenchInstanceById(id) {
        const instance = this._benchInstancesById[id];
        if (!instance)
            throw new Error(`<red>[bench]</red> Sorry but the requested SBench instance with the id "<yellow>${id}</yellow>" does not exists... Make sure to initiate it correctly using "<cyan>SBench.start('${id}');</cyan>"`);
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
    static start(id) {
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
    static step(id, stepId, description = '') {
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
    static end(id, settings) {
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
    static log(id, settings) {
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
    static stats(id, settings) {
        let sortedBenches = __sort(this._globalSteps, (a, b) => {
            if (a.duration > b.duration)
                return -1;
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
        const logsAr = [];
        for (let [benchId, benchObj] of Object.entries(sortedBenches)) {
            logsAr.push(' ');
            logsAr.push(`<yellow>${'-'.repeat(process.stdout.columns)}</yellow>`);
            let repeat = logsAr.push(`<yellow>${benchId}</yellow>${' '.repeat(__clamp(20 - benchId.length, 0, 9999))} Executed <cyan>${benchObj.times}</cyan> time${benchObj.times > 1 ? 's' : ''} - Total duration: <yellow>${__formatDuration(benchObj.duration)}</yellow>`);
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
                    stepsStats[stepId].durations.push(step.time - stepsStats[stepId].times.at(-1));
                }
                stepsStats[stepId].times.push(step.time);
            });
            for (let [type, obj] of Object.entries(stepsStats)) {
                if (!obj.id) {
                    continue;
                }
                logsAr.push(`<cyan>${obj.id}</cyan>${' '.repeat(__clamp(20 - obj.id.length, 0, 999))}${obj.durations
                    .map((d) => `${' '.repeat(__clamp(4 - `${d}`.length, 0, 999))}${d >= 1000
                    ? `<red>${d}</red>`
                    : d >= 100
                        ? `<yellow>${d}</yellow>`
                        : `${d}`}`)
                    .join(' ')}`);
            }
            logsAr.push(' ');
        }
        console.log(logsAr.join('\n'));
    }
    /**
     * Emit some data through the IPC connection
     */
    static _emit(id, data) {
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
    isActive() {
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
    start(settings) {
        if (!this.isActive())
            return this;
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
    step(id, description = '') {
        if (!this.isActive())
            return this;
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
    end(settings) {
        if (!this.isActive())
            return this;
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
    log(settings) {
        if (!this.isActive())
            return this;
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
SBench._globalSteps = {};
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
SBench._benchInstancesById = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUF1RGpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFFBQVE7SUF1VXhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLFFBQW1DO1FBQ3ZELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRTthQUNMO1lBQ0QsdUVBQXVFO1lBQ3ZFLHNDQUFzQztZQUN0QywrQ0FBK0M7U0FDbEQsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTdWTjs7Ozs7Ozs7O1dBU0c7UUFDSyxXQUFNLEdBQWtCLEVBQUUsQ0FBQztRQXFWL0IsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMs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