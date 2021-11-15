import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import ISLog, { ISLogType } from './ISLog';

/**
 * @name            SLog
 * @namespace       shared
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class represent a log that can be make across the application using the "emit"
 * function of an SPromise instance for example. It has as goal to centralize and harmonize
 * what a log can be and can do.
 * Each log is specified by some characteristic like a "type" that can be something like "SLog.LOG" or "SLog.WARN".
 * It has also the possibility to unactivate some logs depending on different cisronstances like for example the
 * fact to set the `SLog.filter([SLog.WARN, SLog.ERROR])` to only let the warn and error logs
 * activated.
 *
 * @param           {ISLog}         logObj          A log object to init
 *
 * @example         js
 * import __SLog from '@coffeekraken/s-log';
 * const myLog = new __SLog({
 *    value: 'Hello world',
 *    type: __SLog.WARN
 * });
 *
 * // Or thgouth an SPromise emit
 * import __SPromise from '@coffeekraken/s-promise';
 * new __SPromise(({resolve, reject, emit}) => {
 *      emit('log', {
 *          value: 'Hello world',
 *          type: __SLog.ERROR
 *      });
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISLogFilterObj {
    decorators: boolean;
    time: boolean;
    clear: boolean;
    temp: boolean;
    type: ('log' | 'info' | 'warn' | 'error' | 'verbose' | 'child_process')[];
    as: string | string[];
}

export default class SLog {
    /**
     * @name            LOG
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "LOG"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static LOG: ISLogType = 'log';

    /**
     * @name            INFO
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "INFO"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static INFO: ISLogType = 'info';

    /**
     * @name            WARN
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "WARN"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static WARN: ISLogType = 'warn';

    /**
     * @name            ERROR
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "ERROR"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static ERROR: ISLogType = 'error';

    /**
     * @name            VERBOSE
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "VERBOSE"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static VERBOSE: ISLogType = 'verbose';

    /**
     * @name            SUMMARY
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "SUMMARY"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static SUMMARY: ISLogType = 'summary';

    /**
     * @name            CHILD_PROCESS
     * @type            String
     * @static
     *
     * This static constant tells a log that it is of type "CHILD_PROCESS"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static CHILD_PROCESS: ISLogType = 'child_process';

    /**
     * @name            filter
     * @type            Function
     * @static
     *
     * This static method allows you to filter the logs across your entire app
     * at once. To do this, simply name your filter and pass an object describing
     * what you want to apply as filter.
     * These filters will have as consequence to set the "active" property of each logs to
     * true or false.
     *
     * @param       {ISLogFilterObj}            filterObj       The filter object you want to apply
     * @param       {String}                [name="default"]        The name of your filter to be able to remove it later
     *
     * @example         js
     * SLog.filter({
     *      type: [SLog.WARN, SLog.ERROR], // display only the warnings and the errors
     *      decorators: false           // only the logs that does not want decorators
     *      // etc...
     * });
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static _appliedFilters = {};
    static filter(filterObj: Partial<ISLogFilterObj>, name = 'default'): void {
        this._appliedFilters[name] = filterObj;
    }

    /**
     * @name            clearFilters
     * @type            Function
     * @static
     *
     * This static method allows you to reset all the filters applied
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static clearFilters(): void {
        this._appliedFilters = {};
    }

    /**
     * @name            removeFilter
     * @type            Function
     * @static
     *
     * This static method allows you to remove a particular filter by its name
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static removeFilter(name: string): void {
        delete this._appliedFilters[name];
    }

    /**
     * @name            setDefaultLogObj
     * @type            Function
     * @static
     *
     * This static method allows you to set a default log object
     * above every others will be extended.
     *
     * @param       {Partial<ISLog>}        defaultLogObj       Your default log object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static _defaultLogObj: Partial<ISLog> = {};
    static setDefaultLogObj(logObj: Partial<ISLog>): void {
        this._defaultLogObj = logObj;
    }

    /**
     * @name            _logObj
     * @type            ISLog
     * @private
     *
     * Store the logObj passed in constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _logObj: ISLog;

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(logObj: Partial<ISLog>) {
        // @ts-ignore
        if (!logObj?.value && !logObj._logObj) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> Sorry but you cannot instanciate a new SLog without a "<yellow>value</yellow>" property...`,
            );
        }

        // extend with the default log obj
        // @ts-ignore
        this._logObj = __deepMerge(
            {
                type: SLog.LOG,
                timestamp: Date.now(),
                decorators: true,
                time: false,
            },
            // @ts-ignore
            this.constructor._defaultLogObj,
            // @ts-ignore
            logObj._logObj ?? logObj,
        );
    }

    /**
     * @name        value
     * @type        Any
     * @get
     * @set
     *
     * Access the "value" property of the SLog object
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    public get value(): any {
        return this._logObj.value;
    }
    public set value(value: any) {
        this._logObj.value = value;
    }

    /**
     * @name        type
     * @type        String
     * @get
     *
     * Access the "type" property of the SLog object
     * This specify which type if the log. LOG, INFO, WARN, ERROR or VERBODE
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get type(): string {
        return this._logObj.type;
    }

    /**
     * @name        active
     * @type        Boolean
     * @get
     *
     * Access the "active" property of the SLog object
     * This specify if the log is active depending on parameters like `SLog.filter`.
     * Check the documentation of this static method for more info.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get active(): boolean {
        // @ts-ignore
        const keys = Object.keys(this.constructor._appliedFilters);

        for (let i = 0; i < keys.length; i++) {
            // @ts-ignore
            const filterObj = this.constructor._appliedFilters[keys[i]];
            for (let j = 0; j < Object.keys(filterObj).length; j++) {
                const filterId = Object.keys(filterObj)[j];
                const filterItem = filterObj[filterId];
                if (this[filterId] === undefined) {
                    continue;
                }
                if (Array.isArray(filterItem)) {
                    if (filterItem.indexOf(this[filterId]) === -1) return false;
                } else if (filterItem !== this[filterId]) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @name        decorators
     * @type        Boolean
     * @get
     * @set
     *
     * Access the "decorators" property of the SLog object.
     * This specify if the log has to be printed with decorators or not
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get decorators(): boolean {
        return this._logObj.decorators;
    }
    set decorators(value: boolean) {
        this._logObj.decorators = value;
    }

    /**
     * @name        time
     * @type        Boolean
     * @get
     *
     * Access the "time" property of the SLog object.
     * This specify if the log has to be printed with his time or not
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get time(): boolean {
        return this._logObj.time;
    }

    /**
     * @name        timestamp
     * @type        String
     * @get
     *
     * Access the "timestamp" property of the SLog object
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get timestamp(): number {
        return this._logObj.timestamp;
    }

    /**
     * @name        clear
     * @type        Boolean
     * @get
     *
     * Access the "clear" property of the SLog object.
     * This specify if the previous logs have to be cleared before printing this one
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get clear(): boolean {
        return this._logObj.clear;
    }

    /**
     * @name        temp
     * @type        Boolean
     * @get
     *
     * Access the "temp" property of the SLog object.
     * This specify if this log is a temporary one and if it has to be deleted
     * when the next log appear.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get temp(): boolean {
        return this._logObj.temp;
    }

    /**
     * @name        as
     * @type        String
     * @get
     *
     * Access the "as" property of the SLog object.
     * This specify the optimal way the log has to be displayed.
     * This depends on the logger you use and how it can display logs.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get as(): string {
        return this._logObj.as;
    }
}
