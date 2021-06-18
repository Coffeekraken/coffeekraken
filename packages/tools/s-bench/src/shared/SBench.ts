import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise, { ISPromiseSettings } from '@coffeekraken/s-promise';
import __utcTime from '@coffeekraken/sugar/shared/date/utcTime';

/**
 * @name            SBench
 * @namespace       shared
 * @type            Class
 * @extends         SPromise
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISBenchCtorSettings {
    bench: Partial<ISBenchSettings>
    promise: Partial<ISPromiseSettings>
}

export interface ISBenchSettings {

}

export interface ISBenchStep {
    id: string;
    type: 'start' | 'end' | 'step';
    description: string;
    time: number;
    logs: string[];
}

export default class SBench extends __SPromise {

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
    private _steps: ISBenchStep[] = [];

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
    private static _benchInstancesById: Record<string, SBench> = {};

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
    static getBenchInstanceById(id: string): SBench {
        const instance = this._benchInstancesById[id];
        if (!instance) throw new Error(`<red>[bench]</red> Sorry but the requested SBench instance with the id "<yellow>${id}</yellow>" does not exists... Make sure to initiate it correctly using "<cyan>SBench.start('${id}');</cyan>"`);
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
    static start(id: string): SBench {
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
    static step(id: string, stepId: string, description = ''): SBench {
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
    static end(id: string): SBench {
        const instance = this.getBenchInstanceById(id);
        instance.end();
        return instance;
    }

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
    constructor(id: string, settings?: Partial<ISBenchCtorSettings>) {
        super(__deepMerge({
            metas: {
                id
            },
            bench: {},
            promise: {}
        }, settings ?? {}));
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
    start(): void {

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
    step(id:string, description = ''): void {

        const keys = Object.keys(this._steps);

        const lastTime = !keys.length ? this._startTime : this._steps[keys.pop()].time;
        const duration = Date.now() - lastTime;

        this._steps.push({
            id,
            type: 'step',
            description,
            time: Date.now(),
            logs: [
                `<yellow>[bench.${this.metas.id}]</yellow> ${ description ? `${description} | <cyan>${duration / 1000}s</cyan>` : `Step "<yellow>${id}</yellow>" completed in <cyan>${duration / 1000}s</cyan>`}`
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
    end(): void {

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

        let logsAr: stringn[] = [];
        Object.keys(this._steps).forEach(stepId => {
            const stepObj = this._steps[stepId];
            logsAr = [...logsAr, ...stepObj.logs];
        });
        logsAr.forEach(log => {
            this.emit('log', {
                value: log
            });
        });

        this.resolve(this);
    }

}