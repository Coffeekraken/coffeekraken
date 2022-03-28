import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import type { ISLogMargin, ISLogType } from './ISLog';
import ISLog from './ISLog';

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
 *    type: __SLog.TYPE_WARN
 * });
 *
 * // Or thgouth an SPromise emit
 * import __SPromise from '@coffeekraken/s-promise';
 * new __SPromise(({resolve, reject, emit}) => {
 *      emit('log', {
 *          value: 'Hello world',
 *          type: __SLog.TYPE_ERROR
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
    type: (
        | 'log'
        | 'info'
        | 'warn'
        | 'error'
        | 'verbose'
        | 'verboser'
        | 'decorator'
        | 'summary'
        | 'child_process'
    )[];
    as: string | string[];
}

export default class SLog {
    /**
     * @name            TYPE_LOG
     * @type            ISLogType[]
     * @static
     *
     * This static constant tells a log that it is of type "LOG"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_LOG: ISLogType = 'log';

    /**
     * @name            TYPE_INFO
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "INFO"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_INFO: ISLogType = 'info';

    /**
     * @name            TYPE_WARN
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "WARN"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_WARN: ISLogType = 'warn';

    /**
     * @name           TYPE_ERROR
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "ERROR"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_ERROR: ISLogType = 'error';

    /**
     * @name            TYPE_VERBOSE
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "VERBOSE"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_VERBOSE: ISLogType = 'verbose';

    /**
     * @name            TYPE_VERBOSER
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "VERBOSER"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_VERBOSER: ISLogType = 'verboser';

    /**
     * @name            TYPE_DECORATOR
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "DECORATOR"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_DECORATOR: ISLogType = 'decorator';

    /**
     * @name            TYPE_SUMMARY
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "SUMMARY"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_SUMMARY: ISLogType = 'summary';

    /**
     * @name            TYPE_CHILD_PROCESS
     * @type            ISLogType
     * @static
     *
     * This static constant tells a log that it is of type "CHILD_PROCESS"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPE_CHILD_PROCESS: ISLogType = 'child_process';

    /**
     * @name            TYPES
     * @type            ISLogType[]
     * @static
     *
     * This static constant store all the log types available
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static TYPES: ISLogType[] = [
        SLog.TYPE_LOG,
        SLog.TYPE_INFO,
        SLog.TYPE_WARN,
        SLog.TYPE_ERROR,
        SLog.TYPE_VERBOSE,
        SLog.TYPE_VERBOSER,
        SLog.TYPE_SUMMARY,
        SLog.TYPE_DECORATOR,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESET_SILENT
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "silent" that display nothing
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_SILENT: ISLogType[] = [];

    /**
     * @name            PRESET_DEFAULT
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "default" that display:
     * - LOG
     * - INFO
     * - WARN
     * - ERROR
     * - DECORATOR
     * - SUMMARY
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_DEFAULT: ISLogType[] = [
        SLog.TYPE_LOG,
        SLog.TYPE_INFO,
        SLog.TYPE_WARN,
        SLog.TYPE_ERROR,
        SLog.TYPE_SUMMARY,
        SLog.TYPE_DECORATOR,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESET_WARN
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "warn" that display:
     * - WARN
     * - ERROR
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_WARN: ISLogType[] = [
        SLog.TYPE_WARN,
        SLog.TYPE_ERROR,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESET_ERROR
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "error" that display:
     * - ERROR
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_ERROR: ISLogType[] = [
        SLog.TYPE_ERROR,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESET_VERBOSE
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "verbose" that display:
     * - LOG
     * - INFO
     * - WARN
     * - ERROR
     * - VERBOSE
     * - DECORATOR
     * - SUMMARY
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_VERBOSE: ISLogType[] = [
        SLog.TYPE_LOG,
        SLog.TYPE_INFO,
        SLog.TYPE_WARN,
        SLog.TYPE_ERROR,
        SLog.TYPE_VERBOSE,
        SLog.TYPE_DECORATOR,
        SLog.TYPE_SUMMARY,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESET_VERBOSER
     * @type            ISLogType[]
     * @static
     *
     * This static constant define a log preset called "verboser" that display:
     * - LOG
     * - INFO
     * - WARN
     * - ERROR
     * - VERBOSE
     * - VERBOSER
     * - DECORATOR
     * - SUMMARY
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESET_VERBOSER: ISLogType[] = [
        SLog.TYPE_LOG,
        SLog.TYPE_INFO,
        SLog.TYPE_WARN,
        SLog.TYPE_ERROR,
        SLog.TYPE_VERBOSE,
        SLog.TYPE_VERBOSER,
        SLog.TYPE_DECORATOR,
        SLog.TYPE_SUMMARY,
        SLog.TYPE_CHILD_PROCESS,
    ];

    /**
     * @name            PRESETS
     * @type            String[]
     * @static
     *
     * This static constant store all the log presets available
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static PRESETS: String[] = [
        'silent',
        'default',
        'warn',
        'error',
        'verbose',
        'verboser',
    ];

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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _filteredTypes: ISLogType[] = [];
    static filter(types: ISLogType[]): void {
        this._filteredTypes = types;
    }

    /**
     * @name            clearFilters
     * @type            Function
     * @static
     *
     * This static method allows you to reset all the filters applied
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static clearFilters(): void {
        this._filteredTypes = [];
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _defaultLogObj: Partial<ISLog> = {};
    static setDefaultLogObj(logObj: Partial<ISLog>): void {
        this._defaultLogObj = logObj;
    }

    /**
     * @name            isTypeEnabled
     * @type            Function
     * @static
     *
     * This static method allows you Check if a particular log type is enabled or not.
     * You can pass as well multiple log types as an array.
     *
     * @param       {ISLogType|ISLogType[]}             types      The log type(s) you want to check
     * @return      {Boolean}                              True if the log type is enabled, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isTypeEnabled(types: ISLogType | ISLogType[]): boolean {
        if (!Array.isArray(types)) types = [types];
        for (const type of types) {
            if (!this._filteredTypes.includes(type)) return false;
        }
        return true;
    }

    /**
     * @name            _logObj
     * @type            ISLog
     * @private
     *
     * Store the logObj passed in constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                type: SLog.TYPE_LOG,
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get type(): string {
        // @ts-ignore
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get active(): boolean {
        // logs that does not have types are always active
        if (!this._logObj.type) return true;

        // check type
        // @ts-ignore
        if (!this.constructor._filteredTypes.includes(this._logObj.type))
            return false;

        // active by default
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get decorators(): boolean {
        // @ts-ignore
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get time(): boolean {
        // @ts-ignore
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get timestamp(): number {
        // @ts-ignore
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get clear(): boolean {
        // @ts-ignore
        return this._logObj.clear;
    }

    /**
     * @name        margin
     * @type        ISLogMargin
     * @get
     *
     * Access the "margin" property of the SLog object.
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get margin(): ISLogMargin {
        // @ts-ignore
        return (
            this._logObj.margin ?? {
                top: 0,
                bottom: 0,
            }
        );
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get temp(): boolean {
        // @ts-ignore
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get as(): string {
        // @ts-ignore
        return this._logObj.as;
    }
}
