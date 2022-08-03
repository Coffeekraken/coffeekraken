import __SClass from '@coffeekraken/s-class';
import __utcTime from '@coffeekraken/sugar/shared/date/utcTime';
import __env from '@coffeekraken/sugar/shared/env/env';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __minimatch from 'minimatch';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hFLE9BQU8sS0FBSyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQThDcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQTJMeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsUUFBbUM7UUFDdkQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFO2FBQ0w7WUFDRCx1RUFBdUU7WUFDdkUsc0NBQXNDO1lBQ3RDLCtDQUErQztTQUNsRCxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBak5OOzs7Ozs7Ozs7V0FTRztRQUNLLFdBQU0sR0FBa0IsRUFBRSxDQUFDO0lBd01uQyxDQUFDO0lBMUxEOzs7Ozs7O09BT0c7SUFFSDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQTBCOztRQUNwQyxJQUFJLGFBQWEsR0FBRyxNQUFBLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDeEQsYUFBYSxHQUFHLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0QsS0FBSyxDQUFDLHNCQUFzQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxRQUFROztRQUNYLE9BQU8sTUFBQSxLQUFLLENBQUMsc0JBQXNC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