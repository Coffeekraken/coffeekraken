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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            type: SLog.LOG,
            timestamp: Date.now(),
            decorators: true,
            time: false,
        }, 
        // @ts-ignore
        this.constructor._defaultLogObj, 
        // @ts-ignore
        (_a = logObj._logObj) !== null && _a !== void 0 ? _a : logObj);
    }
    static filter(filterObj, name = 'default') {
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
    static clearFilters() {
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
    static removeFilter(name) {
        delete this._appliedFilters[name];
    }
    static setDefaultLogObj(logObj) {
        this._defaultLogObj = logObj;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get type() {
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
    get active() {
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
                    if (filterItem.indexOf(this[filterId]) === -1)
                        return false;
                }
                else if (filterItem !== this[filterId]) {
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
    get decorators() {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get time() {
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
    get timestamp() {
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
    get clear() {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get temp() {
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
    get as() {
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog.PRESET_DEFAULT = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_SUMMARY, SLog.TYPE_DECORATOR];
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog.PRESET_WARN = [SLog.TYPE_WARN, SLog.TYPE_ERROR];
/**
 * @name            PRESET_ERROR
 * @type            ISLogType[]
 * @static
 *
 * This static constant define a log preset called "error" that display:
 * - ERROR
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog.PRESET_ERROR = [SLog.TYPE_ERROR];
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog.PRESET_VERBOSE = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_VERBOSE, SLog.TYPE_DECORATOR, SLog.TYPE_SUMMARY];
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog.PRESET_VERBOSER = [SLog.TYPE_LOG, SLog.TYPE_INFO, SLog.TYPE_WARN, SLog.TYPE_ERROR, SLog.TYPE_VERBOSE, SLog.TYPE_VERBOSER, SLog.TYPE_DECORATOR, SLog.TYPE_SUMMARY];
/**
 * @name            PRESETS
 * @type            String[]
 * @static
 *
 * This static constant store all the log presets available
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SLog._appliedFilters = {};
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
SLog._defaultLogObj = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUE2RHRFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQTZUckI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxNQUFzQjs7UUFDOUIsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxvR0FBb0csQ0FDckksQ0FBQztTQUNMO1FBRUQsa0NBQWtDO1FBQ2xDLGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FDdEI7WUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDZCxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsS0FBSztTQUNkO1FBQ0QsYUFBYTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYztRQUMvQixhQUFhO1FBQ2IsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxNQUFNLENBQzNCLENBQUM7SUFDTixDQUFDO0lBOUZELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBa0MsRUFBRSxJQUFJLEdBQUcsU0FBUztRQUM5RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLFlBQVk7UUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFZO1FB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