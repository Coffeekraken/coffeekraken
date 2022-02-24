import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
        return (_a = this._logObj.margin) !== null && _a !== void 0 ? _a : {
            top: 0, bottom: 0
        };
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
SLog.TYPES = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_VERBOSE, SLog.TYPE_VERBOSER, SLog.TYPE_SUMMARY, SLog.TYPE_DECORATOR, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESET_DEFAULT = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_SUMMARY, SLog.TYPE_DECORATOR, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESET_WARN = [SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESET_ERROR = [SLog.TYPE_ERROR, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESET_VERBOSE = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_VERBOSE, SLog.TYPE_DECORATOR, SLog.TYPE_SUMMARY, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESET_VERBOSER = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_VERBOSE, SLog.TYPE_VERBOSER, SLog.TYPE_DECORATOR, SLog.TYPE_SUMMARY, SLog.TYPE_CHILD_PROCESS];
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
SLog.PRESETS = ['silent', 'default', 'warn', 'error', 'verbose', 'verboser'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUE2RHRFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQXFVckI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFzQjs7UUFDOUIsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxvR0FBb0csQ0FDckksQ0FBQztTQUNMO1FBRUQsa0NBQWtDO1FBQ2xDLGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FDdEI7WUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLEtBQUs7U0FDZDtRQUNELGFBQWE7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWM7UUFDL0IsYUFBYTtRQUNiLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksTUFBTSxDQUMzQixDQUFDO0lBQ04sQ0FBQztJQXRHRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWtCO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsWUFBWTtRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFnQkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQXNCO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFF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