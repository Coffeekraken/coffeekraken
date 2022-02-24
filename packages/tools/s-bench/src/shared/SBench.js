import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __utcTime from '@coffeekraken/sugar/shared/date/utcTime';
import __env from '@coffeekraken/sugar/shared/env/env';
import __minimatch from 'minimatch';
import __SBenchSettingsInterface from './interface/SBenchSettingsInterface';
export default class SBench extends __SPromise {
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
            bench: __SBenchSettingsInterface.defaults(),
            promise: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        _stepsTime
         * @type        ISBenchStep[]
         * @private
         *
         * Store the steps times
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._steps = [];
    }
    /**
     * @name            benchEnv
     * @type            Function
     * @static
     *
     * This static method allows you to get the current bench environment
     * the process is running in. The bench environment
     */
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
        let currentBenchs = (_a = __env('s-bench-filtered-ids')) !== null && _a !== void 0 ? _a : [];
        currentBenchs = [...currentBenchs, ...Array.from(benchId)];
        __env('s-bench-filtered-ids', currentBenchs);
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
        return (_a = __env('s-bench-filtered-ids')) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * @name        isBenchActive
     * @type        Function
     * @static
     *
     * This method allows you to check if a particular bench id is active
     *
     * @param        {String}               benchId             The bench id to check
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
        this._benchInstancesById[id] = new SBench(id);
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
     * @name        benchSettings
     * @type        ISBenchSettings
     * @get
     *
     * Access the bench settings
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get benchSettings() {
        return this._settings.bench;
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
        const finalSettings = __deepMerge(this.benchSettings, settings !== null && settings !== void 0 ? settings : {});
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
     * @param       {String}        [description='']   The step description
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
        const finalSettings = (__deepMerge(this.benchSettings, settings !== null && settings !== void 0 ? settings : {}));
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
        this.resolve(this);
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
        const finalSettings = (__deepMerge(this.benchSettings, settings !== null && settings !== void 0 ? settings : {}));
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
        const finalSettings = (__deepMerge(this.benchSettings, settings !== null && settings !== void 0 ? settings : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JlbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0JlbmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBaUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQztBQUdoRSxPQUFPLEtBQUssTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQWlENUUsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsVUFBVTtJQXlNMUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsUUFBdUM7UUFDM0QsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFO2FBQ0w7WUFDRCxLQUFLLEVBQUUseUJBQXlCLENBQUMsUUFBUSxFQUFFO1lBQzNDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlOTjs7Ozs7Ozs7O1dBU0c7UUFDSyxXQUFNLEdBQWtCLEVBQUUsQ0FBQztJQXFObkMsQ0FBQztJQXZNRDs7Ozs7OztPQU9HO0lBRUg7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUEwQjs7UUFDcEMsSUFBSSxhQUFhLEdBQUcsTUFBQSxLQUFLLENBQUMsc0JBQXNCLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ3hELGFBQWEsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09B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