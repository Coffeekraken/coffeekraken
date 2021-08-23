var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __minimatch from 'minimatch';
import __SClass from '@coffeekraken/s-class';
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
class SStdio extends __SClass {
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
                maxItems: -1,
                spaceBetween: 0,
                spaceAround: 0,
                globalEvents: true,
                events: [
                    'log',
                    '*.log',
                    'warn',
                    '*.warn',
                    'error',
                    '*.error',
                    'reject',
                    '*.reject',
                    // 'resolve',
                    // '*.resolve'
                ],
                mapTypesToEvents: {
                    heading: [],
                    error: ['error', '*.error', 'reject', '*.reject', 'cancel', '*.cancel'],
                    warning: ['warn', '*.warn'],
                },
                types: __SugarConfig.get('log.types'),
                metas: {
                    time: false,
                },
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
        this.registeredComponents[this.name][as || component.id || 'default'] = {
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
    static existingOrNew(id, sources, stdio = 'inherit', settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            if (this._instanciatedStdio[id])
                return this._instanciatedStdio[id];
            return this.new(id, sources, stdio, settings);
        });
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
     * - terminal: STerminalStdio (node only)
     * - console: SConsoleStdio (browser only)
     * - blessed: SBlessedStdio (node only)
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
     * await SStdio.new('default', proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(id, sources, stdio = 'inherit', settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: n } = yield import('./new');
            return n(id, sources, stdio, settings);
        });
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
        const set = __deepMerge(this._settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {});
        // subscribe to data
        // "ask" event
        this.sources.forEach((source) => {
            source.on('ask', (askObj, metas, answer) => __awaiter(this, void 0, void 0, function* () {
                // console.log(askObj);
                const res = yield this.ask(askObj);
                answer === null || answer === void 0 ? void 0 : answer(res);
            }));
        });
        source.on((set.events || []).join(','), (data, metas) => {
            if (data === undefined || data === null)
                return;
            // handle the type depending on the passed stack
            const types = Object.keys(set.mapTypesToEvents);
            for (let i = 0; i < types.length; i++) {
                const stacks = set.mapTypesToEvents[types[i]];
                const stacksGlob = Array.isArray(stacks) && stacks.length ? `*(${stacks.join('|')})` : stacks;
                // @ts-ignore
                if (stacksGlob.length && __minimatch(metas.event, stacksGlob)) {
                    if (typeof data !== 'object') {
                        data = {
                            type: types[i],
                            value: data,
                        };
                    }
                    else if (!data.type) {
                        data.type = types[i];
                    }
                    break;
                }
            }
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
        for (let i = 0; i < logObj.length; i++) {
            let log = __deepMerge(this.stdioSettings.defaultLogObj, logObj[i]);
            // filter by type
            if (log.type && this.stdioSettings.types.indexOf(log.type.toLowerCase()) === -1)
                continue;
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
                // console.log('CLEAR', log.type);
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
            const componentObj = this.constructor.registeredComponents[this.constructor.name][log.type || 'default'];
            if (!componentObj)
                throw new Error(`Sorry but the requested "<yellow>${log.type || 'default'}</yellow>" in the "<cyan>${this.constructor.name}</cyan>" stdio class does not exists...`);
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
            let ask = __deepMerge(this.stdioSettings.defaultAskObj, askObj);
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
export default SStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLFFBQXFCLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFrRHpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sTUFBTyxTQUFRLFFBQVE7SUFvTXpCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLE9BQTBDLEVBQUUsV0FBZ0MsRUFBRTtRQUNsRyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO2lCQUNqQjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDZCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztvQkFDdkUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDOUI7Z0JBQ0QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUNyQyxLQUFLLEVBQUU7b0JB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