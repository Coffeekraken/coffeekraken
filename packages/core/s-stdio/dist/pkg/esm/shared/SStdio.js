var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface';
/**
 * @name          SStdio
 * @namespace     sugar.node.stdio
 * @type          Class
 * @status              wip
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/s-stdio';
 * class MyCoolStdio extends SStdio {
 *    constructor(sources, settings = {}) {
 *      super(sources, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SStdio extends __SClass {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(id, sources, settings) {
        super(__deepMerge(
        // @ts-ignore
        __SStdioSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name      _logsBuffer
         * @type      ISLog[]
         * @private
         *
         * Store the logs that does not have been displayed yet
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._logsBuffer = [];
        /**
         * @name        _isDisplayed
         * @type        Boolean
         * @private
         *
         * Keep track of the display status
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._isDisplayed = false;
        /**
         * @name      id
         * @type      String
         * @get
         *
         * Access the stdio id
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._id = '';
        /**
         * @name          registerSource
         * @type          Function
         *
         * This method simply listen to the process and log the values getted
         * from it into the panel
         *
         * @param     {SPromise}      source        The source to register
         * @param     {ISBlessedStdioSettings}     [settings={}]
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._tmpPrintedLogs = [];
        /**
         * @name      log
         * @type      Function
         *
         * This method is the one called to log something.
         * It will call the ```_log``` method that each implementation of the
         * SStdio class MUST have
         *
         * @param         {ISLog[]}        ...logObj      The log object(s) you want to log
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._isClearing = false;
        this._hashBuffer = [];
        // proxy console.log to filter empty logs
        const _nativeLog = console.log;
        console.log = (...args) => {
            args = args.filter((log) => {
                if (typeof log === 'string' && log.trim() === '') {
                    return false;
                }
                return true;
            });
            _nativeLog(...args);
        };
        // save id
        this._id = id;
        // save sources
        this.sources = Array.isArray(sources) ? sources : [sources];
        // store this instance reference
        // @ts-ignore
        if (this.constructor._instanciatedStdio[this.id]) {
            throw new Error(`<red>${this.constructor.name}</red> Sorry but a instance of the SStdio class already exists with the id "<yellow>${this.id}</yellow>"`);
        }
        // @ts-ignore)
        this.constructor._instanciatedStdio[this.id] = this;
        this.sources.forEach((s) => {
            // subscribe to the process
            this.registerSource(s);
        });
    }
    /**
     * @name          registerComponent
     * @type          Function
     * @static
     *
     * This static method allows you to register a new Stdio component
     * that you will be able to use then through the "type" property of
     * the logObj passed to the STerminalStdio instance.
     *
     * @param     {ISStdioComponentCtor}      component     The component you want to register
     * @param     {string}      [as=null]           Specify the id you want to use for this component. Overrides the static "id" property of the component itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerComponent(component, settings, as) {
        // make sure this component has an "id" specified
        if (component.id === undefined && as === null) {
            throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
        }
        if (!this.registeredComponents[this.name])
            // @ts-ignore
            this.registeredComponents[this.name] = {};
        // save the component inside the stack
        this.registeredComponents[this.name][as || component.id || 'default'] =
            {
                component,
                settings: settings || {},
                as,
            };
    }
    /**
     * @name            existingOrNew
     * @type            Function
     * @async
     *
     * This static method allows you to get back either an existing stdio instance or a new one
     *
     * @param       {String}      id        The id of the instance you want to get back
     * @param         {SProcess}          proc        The process to display Stdio for
     * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
     * @return      {SStdio}            The existing or new stdio instance
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static existingOrNew(id, sources, stdio = SStdio.UI_BASIC, settings = {}) {
        // @ts-ignore
        if (this._instanciatedStdio[id])
            return this._instanciatedStdio[id];
        return this.new(id, sources, stdio, settings);
    }
    /**
     * @name            new
     * @type            Function
     * @async
     *
     * This static method is a sugar to instanciate an stdio by specifying some sources,
     * and either a path to a SStdio class, an SStdio class directly or a pre-registered
     * stdio id like:
     * - inherit: If is in node context, will fallback to STerminalStdio, if in browser, in SConsoleStdio
     * -
     * - terminal: STerminalStdio (node only)
     * - console: SConsoleStdio (browser only)
     *
     * @param     {String}          id          A unique id for your stdio instance
     * @param         {SProcess}          proc        The process to display Stdio for
     * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
     * @return        {SStdio}                      The newly created stdio instance
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import SStdio from '@coffeekraken/s-stdio';
     * import spawn from '@coffeekraken/sugar/node/process/spawn';
     * const proc = spawn('ls -la');
     * SStdio.new('default', proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static new(id, sources, stdio, settings = {}) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const __new = (yield import('./new')).default;
            // @ts-ignore
            return __new(id, sources, stdio, settings);
        }));
    }
    get id() {
        return this._id;
    }
    /**
     * @name          _logBuffer
     * @type          Function
     * @private
     *
     * This method simply take the buffered logs and log them in the feed
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _logBuffer() {
        this._logsBuffer = this._logsBuffer.filter((log) => {
            this.log(log);
            return false;
        });
    }
    /**
     * @name          display
     * @type          Function
     *
     * This method tells the stdio instance that it has been showned.
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    display() {
        // update the status
        this._isDisplayed = true;
        // if (this.isDisplayed()) return;
        // log the buffered logs
        this._logBuffer();
    }
    /**
     * @name          hide
     * @type          Function
     *
     * This method tells the stdio instance that it has been hided
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hide() {
        this._isDisplayed = false;
    }
    registerSource(source, settings) {
        const set = (__deepMerge(this.settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {}));
        // subscribe to data
        // "ask" event
        source.on('ask', (askObj, metas, answer) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            askObj.metas = metas;
            const res = yield this.ask(askObj);
            answer === null || answer === void 0 ? void 0 : answer(res);
        }));
        source.on('log', (data, metas) => {
            // @TODO        find why some logs are printed x times... It seems that it's linked to number of actions theirs in a recipe in the SKitchen class...
            if (this._tmpPrintedLogs.includes(data.value)) {
                return;
            }
            this._tmpPrintedLogs.push(data.value);
            setTimeout(() => {
                this._tmpPrintedLogs.splice(this._tmpPrintedLogs.indexOf(data.value), 1);
            }, 100);
            if (data === undefined || data === null)
                return;
            // save metas into logObj
            data.metas = metas;
            this.log(data);
        }, {
            filter: set.filter,
            processor: set.processor,
        });
    }
    // _isCleared = true;
    log(...logObj) {
        var _a;
        for (let i = 0; i < logObj.length; i++) {
            let log = logObj[i];
            if (!log.active)
                continue;
            // if (!log.hash) {
            //     const hash = __objectHash({ value: log.value, type: log.type });
            //     log.hash = hash;
            // }
            // if (this._hashBuffer.includes(log.hash)) return;
            // this._hashBuffer.push(log.hash);
            // setTimeout(() => {
            //     this._hashBuffer.shift();
            // }, 0);
            // put in buffer if not displayed
            if (!this.isDisplayed() || this._isClearing) {
                this._logsBuffer.push(log);
                continue;
            }
            if (this._lastLogObj && this._lastLogObj.temp) {
                // @ts-ignore
                if (!this.clearLast || typeof this.clearLast !== 'function')
                    throw new Error(`You try to clear the last log but it does not implements the "<cyan>clearLast</cyan>" method`);
                (() => __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    if (!this.clearLast)
                        return;
                    // @ts-ignore
                    yield this.clearLast();
                    this._logBuffer();
                }))();
            }
            if (log.clear === true) {
                this._isClearing = true;
                // @ts-ignore
                if (!this.clear || typeof this.clear !== 'function')
                    throw new Error(`You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`);
                // this._logsBuffer.push(log);
                (() => __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    if (!this.clear)
                        return;
                    // @ts-ignore
                    yield this.clear();
                    this._isClearing = false;
                    // this._isCleared = true;
                    this._logBuffer();
                }))();
            }
            else {
                // console.log(log.type);
            }
            // get the correct component to pass to the _log method
            let logType = log.type === 'log' ? 'default' : (_a = log.type) !== null && _a !== void 0 ? _a : 'default';
            let componentObj = this.constructor.registeredComponents[this.constructor.name][logType];
            if (!componentObj) {
                if (__SLog.isTypeEnabled([
                    __SLog.TYPE_VERBOSE,
                    __SLog.TYPE_VERBOSER,
                ])) {
                    // @ts-ignore
                    this._log({
                        type: __SLog.TYPE_VERBOSE,
                        metas: {},
                        group: this.constructor.name,
                        value: `The requested "<yellow>${log.type || 'default'}</yellow>" component in the "<cyan>${this.constructor.name}</cyan>" stdio class does not exists...`,
                    }, {
                        id: 'default',
                        render(logObj) {
                            return `⚠️  ${logObj.value}`;
                        },
                    });
                }
                componentObj = this.constructor.registeredComponents[this.constructor.name].default;
            }
            if (typeof componentObj.component.render !== 'function') {
                throw new Error(`Your "<yellow>${componentObj.component.id}</yellow>" stdio "<cyan>${this.constructor.name}</cyan>" component does not expose the required function "<magenta>render</magenta>"`);
            }
            // @ts-ignore
            this._log(log, componentObj.component);
            // save the last log object
            this._lastLogObj = log;
        }
    }
    /**
     * @name      ask
     * @type      Function
     * @async
     *
     * This method is the one called to ask something.
     * It will call the ```_ask``` method that each implementation of the
     * SStdio class MUST have
     *
     * @param         {ISLog[]}        ...logObj      The log object(s) you want to log
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // _isCleared = true;
    ask(askObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let ask = __deepMerge(this.settings.defaultAskObj, askObj);
            // @ts-ignore
            const answer = yield this._ask(ask);
            return answer;
        });
    }
    /**
     * @name        isDisplayed
     * @type        Boolean
     *
     * true if the stdio if actually displayed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isDisplayed() {
        return this._isDisplayed;
    }
}
/**
 * @name    _instanciatedStdio
 * @type    Record<string, SStdio>
 * @static
 *
 * Store all the instanciated stdio
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SStdio._instanciatedStdio = {};
/**
 * @name    registeredComponents
 * @type    ISStdioRegisteredComponents
 * @static
 *
 * Store the registered stdio components
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SStdio.registeredComponents = {};
/**
 * @name      UI_BASIC
 * @type      ISStdioUi
 * @static
 *
 * Represent the "basic" stdio
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SStdio.UI_BASIC = -1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBbUM1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBZ054Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEVBQVUsRUFDVixPQUEwQyxFQUMxQyxRQUFtQztRQUVuQyxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYix5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsRUFDcEMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF4S047Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFFMUI7Ozs7Ozs7OztXQVNHO1FBQ0ssaUJBQVksR0FBRyxLQUFLLENBQUM7UUE4RzdCOzs7Ozs7Ozs7V0FTRztRQUNILFFBQUcsR0FBVyxFQUFFLENBQUM7UUE2R2pCOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUE0Qy9COzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBdkp2Qix5Q0FBeUM7UUFDekMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxD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