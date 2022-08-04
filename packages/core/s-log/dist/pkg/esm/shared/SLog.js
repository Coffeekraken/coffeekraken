import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
 *          type: __SLog.TYPE_ERROR,
 *          value: 'Hello world'
 *      });
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SLog {
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
    constructor(logObj) {
        var _a;
        // @ts-ignore
        if (!(logObj === null || logObj === void 0 ? void 0 : logObj.value) && !logObj._logObj) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot instanciate a new SLog without a "<yellow>value</yellow>" property...`);
        }
        // extend with the default log obj
        // @ts-ignore
        this._logObj = __deepMerge({
            type: SLog.TYPE_LOG,
            timestamp: Date.now(),
            decorators: true,
            time: false,
        }, 
        // @ts-ignore
        this.constructor._defaultLogObj, 
        // @ts-ignore
        (_a = logObj._logObj) !== null && _a !== void 0 ? _a : logObj);
    }
    static filter(types) {
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
    static clearFilters() {
        this._filteredTypes = [];
    }
    static setDefaultLogObj(logObj) {
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
    static isTypeEnabled(types) {
        if (!Array.isArray(types))
            types = [types];
        for (const type of types) {
            if (!this._filteredTypes.includes(type))
                return false;
        }
        return true;
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
    get value() {
        return this._logObj.value;
    }
    set value(value) {
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
    get type() {
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
    get active() {
        // logs that does not have types are always active
        if (!this._logObj.type)
            return true;
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
    get decorators() {
        // @ts-ignore
        return this._logObj.decorators;
    }
    set decorators(value) {
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
    get time() {
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
    get timestamp() {
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
    get clear() {
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
    get margin() {
        var _a;
        // @ts-ignore
        return ((_a = this._logObj.margin) !== null && _a !== void 0 ? _a : {
            top: 0,
            bottom: 0,
        });
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
    get temp() {
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
    get as() {
        // @ts-ignore
        return this._logObj.as;
    }
}
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
SLog.TYPE_LOG = 'log';
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
SLog.TYPE_INFO = 'info';
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
SLog.TYPE_WARN = 'warn';
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
SLog.TYPE_ERROR = 'error';
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
SLog.TYPE_VERBOSE = 'verbose';
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
SLog.TYPE_VERBOSER = 'verboser';
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
SLog.TYPE_DECORATOR = 'decorator';
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
SLog.TYPE_SUMMARY = 'summary';
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
SLog.TYPE_CHILD_PROCESS = 'child_process';
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
SLog.TYPES = [
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
SLog.PRESET_SILENT = [];
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
SLog.PRESET_DEFAULT = [
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
SLog.PRESET_WARN = [
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
SLog.PRESET_ERROR = [
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
SLog.PRESET_VERBOSE = [
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
SLog.PRESET_VERBOSER = [
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
SLog.PRESETS = [
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
 * @param       {ISLogType[]}           types               The types you want to keep
 *
 * @example         js
 * SLog.filter([SLog.TYPE_WARN, SLog.TYPE_ERROR]);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SLog._filteredTypes = [];
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
SLog._defaultLogObj = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBS3RFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLElBQUk7SUFrWHJCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksTUFBc0I7O1FBQzlCLGFBQWE7UUFDYixJQUFJLENBQUMsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksb0dBQW9HLENBQ3JJLENBQUM7U0FDTDtRQUVELGtDQUFrQztRQUNsQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQ3RCO1lBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3JCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLElBQUksRUFBRSxLQUFLO1NBQ2Q7UUFDRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjO1FBQy9CLGFBQWE7UUFDYixNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLE1BQU0sQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUF0R0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFrQjtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLFlBQVk7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBZ0JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFzQjtR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