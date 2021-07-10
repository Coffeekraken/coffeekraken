import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __utcTime from '@coffeekraken/sugar/shared/date/utcTime';
import __SBenchEnv from './SBenchEnv';
import __globalEventEmitter from '@coffeekraken/sugar/node/event/globalEventEmitter';
export default class SBench extends __SPromise {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(id, settings) {
        super(__deepMerge({
            metas: {
                id
            },
            bench: {},
            promise: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        _stepsTime
         * @type        ISBenchStep[]
         * @private
         *
         * Store the steps times
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static start(id) {
        this._benchInstancesById[id] = new SBench(id);
        const instance = this._benchInstancesById[id];
        instance.start();
        return instance;
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static step(id, stepId, description = '') {
        const instance = this.getBenchInstanceById(id);
        instance.step(stepId, description);
        return instance;
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static end(id) {
        const instance = this.getBenchInstanceById(id);
        instance.end();
        return instance;
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isActive() {
        // @ts-ignore
        return this.constructor.env.isBenchActive(this.metas.id);
    }
    /**
     * @name            start
     * @type            Function
     *
     * This method allows you to start a new bench "session"
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start() {
        if (!this.isActive())
            return;
        // reset potential old bench
        this._steps.push({
            id: 'start',
            type: 'start',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Starting bench session at <magenta>${__utcTime()}</magenta>`
            ]
        });
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
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    step(id, description = '') {
        if (!this.isActive())
            return;
        const keys = Object.keys(this._steps);
        // @ts-ignore
        const lastTime = !keys.length ? this._startTime : this._steps[keys.pop()].time;
        const duration = Date.now() - lastTime;
        this._steps.push({
            id,
            type: 'step',
            description,
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> ${description ? `${description} | <cyan>${duration / 1000}s</cyan>` : `Step "<yellow>${id}</yellow>" completed in <cyan>${duration / 1000}s</cyan>`}`
            ]
        });
    }
    /**
     * @name            end
     * @type            Function
     *
     * This method allows you to end a bencvh "session"
     *
     * @since           2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    end() {
        if (!this.isActive())
            return;
        const startTime = this._steps[0].time;
        this._steps.push({
            id: 'end',
            type: 'end',
            description: '',
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> Ending bench session at <magenta>${__utcTime()}</magenta>`,
                `<green>[bench.${this.metas.id}]</green> Complete bench session has taken <cyan>${(Date.now() - startTime) / 1000}s</cyan>`
            ]
        });
        let logsAr = [];
        Object.keys(this._steps).forEach(stepId => {
            const stepObj = this._steps[stepId];
            logsAr = [...logsAr, ...stepObj.logs];
        });
        __globalEventEmitter.emit('log', {
            value: '-------------------- SBench --------------------'
        });
        logsAr.forEach(log => {
            __globalEventEmitter.emit('log', {
                id: this.metas.id,
                value: log
            });
        });
        __globalEventEmitter.emit('log', {
            value: '------------------------------------------------'
        });
        this.resolve(this);
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toString() {
        let logsAr = ['-------------------- SBench --------------------'];
        Object.keys(this._steps).forEach(stepId => {
            const stepObj = this._steps[stepId];
            logsAr = [...logsAr, ...stepObj.logs];
        });
        logsAr.push('------------------------------------------------');
        return logsAr.join('\n');
    }
}
/**
 * @name        env
 * @type        SBenchEnv
 * @static
 * @get
 *
 * Access the SBenchEnv object to check activated bench, etc...
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBench.env = __SBenchEnv;
/**
 * @name            _benchInstancesById
 * @type            Record<string, SBench>
 * @private
 *
 * Store all the instances started using a static methods
 *
 * @since           2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBench._benchInstancesById = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JlbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0JlbmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBaUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRSxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxvQkFBb0IsTUFBTSxtREFBbUQsQ0FBQztBQWdEckYsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsVUFBVTtJQThIMUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsUUFBdUM7UUFDM0QsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNkLEtBQUssRUFBRTtnQkFDSCxFQUFFO2FBQ0w7WUFDRCxLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBaEl4Qjs7Ozs7Ozs7O1dBU0c7UUFDSyxXQUFNLEdBQWtCLEVBQUUsQ0FBQztJQXVIbkMsQ0FBQztJQXpHRDs7Ozs7OztPQU9HO0lBRUg7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFVO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUZBQW1GLEVBQUUsK0ZBQStGLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcE8sT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBVTtRQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEdB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