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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
/**
 * @name          SStdio
 * @namespace     sugar.node.stdio
 * @type          Class
 * @status              wip
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioCtorSettings}     [settings={}]       Some settings to configure your Stdio
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(id, sources, settings = {}) {
        super(__deepMerge({
            stdio: {
                filter: null,
                processor: null,
                metas: {
                    time: false,
                },
                ui: SStdio.NO_UI,
                defaultLogObj: {
                    decorators: true,
                },
            },
        }, settings));
        /**
         * @name      _logsBuffer
         * @type      ISLog[]
         * @private
         *
         * Store the logs that does not have been displayed yet
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._id = '';
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isClearing = false;
        this._hashBuffer = [];
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static existingOrNew(id, sources, stdio = SStdio.NO_UI, settings = {}) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(id, sources, stdio, settings = {}) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const __new = (yield import('./new')).default;
            // @ts-ignore
            return __new(id, sources, stdio, settings);
        }));
    }
    /**
     * @name      stdioSettings
     * @type      ISStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get stdioSettings() {
        return this._settings.stdio;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hide() {
        this._isDisplayed = false;
    }
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerSource(source, settings) {
        const set = (__deepMerge(this._settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {}));
        // subscribe to data
        // "ask" event
        source.on('ask', (askObj, metas, answer) => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.ask(askObj);
            answer === null || answer === void 0 ? void 0 : answer(res);
        }));
        source.on('log', (data, metas) => {
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
            if (!log.hash) {
                const hash = __objectHash({ value: log.value, type: log.type });
                log.hash = hash;
            }
            if (this._hashBuffer.includes(log.hash))
                return;
            this._hashBuffer.push(log.hash);
            setTimeout(() => {
                this._hashBuffer.shift();
            }, 1000);
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
            // if (!componentObj)
            //     throw new Error(
            //         `Sorry but the requested "<yellow>${
            //             log.type || 'default'
            //         }</yellow>" in the "<cyan>${
            //             this.constructor.name
            //         }</cyan>" stdio class does not exists...`,
            //     );
            if (!componentObj) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // _isCleared = true;
    ask(askObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let ask = (__deepMerge(this.stdioSettings.defaultAskObj, askObj));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SStdio.registeredComponents = {};
/**
 * @name      NO_UI
 * @type      ISStdioUi
 * @static
 *
 * Represent the "no" ui
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SStdio.NO_UI = -1;
/**
 * @name      UI_TERMINAL
 * @type      ISStdioUi
 * @static
 *
 * Represent the "terminal" ui
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SStdio.UI_TERMINAL = 'terminal';
/**
 * @name      UI_CONSOLE
 * @type      ISStdioUi
 * @static
 *
 * Represent the "console" ui
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SStdio.UI_CONSOLE = 'console';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUsxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUl0RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQTJDeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQXFQeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsV0FBZ0MsRUFBRTtRQUVsQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsS0FBSztpQkFDZDtnQkFDRCxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQ2hCLGFBQWEsRUFBRTtvQkFDWCxVQUFVLEVBQUUsSUFBSTtpQkFDbkI7YUFDSjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQWhNTjs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUUxQjs7Ozs7Ozs7O1dBU0c7UUFDSyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQTJIN0I7Ozs7Ozs7OztXQVNHO1FBQ0gsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQXFKakI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUE1SHZCLFVBQVU7UUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVkLGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxD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