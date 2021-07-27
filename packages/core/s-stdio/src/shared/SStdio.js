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
    constructor(sources, settings = {}) {
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
                    '*.reject'
                    // 'resolve',
                    // '*.resolve'
                ],
                mapTypesToEvents: {
                    heading: [],
                    error: [
                        'error',
                        '*.error',
                        'reject',
                        '*.reject',
                        'cancel',
                        '*.cancel'
                    ],
                    warning: ['warn', '*.warn']
                },
                types: __SugarConfig.get('log.types'),
                metas: {
                    time: false
                },
                defaultLogObj: {
                    decorators: true
                }
            }
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
        this.sources = Array.isArray(sources) ? sources : [sources];
        // if (this.stdioSettings.globalEvents) {
        //   this.sources.push(__SEventEmitter.global);
        // }
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
            as
        };
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
     * @param         {SProcess}          proc        The process to display Stdio for
     * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import SStdio from '@coffeekraken/s-stdio';
     * import spawn from '@coffeekraken/sugar/node/process/spawn';
     * const proc = spawn('ls -la');
     * await SStdio.new(proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(sources, stdio = 'inherit', settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: n } = yield import('./new');
            return n(sources, stdio, settings);
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
        // console.log('REG', source, set.events);
        // "ask" event
        this.sources.forEach((source) => {
            source.on('ask', (askObj, metas, answer) => __awaiter(this, void 0, void 0, function* () {
                // switch (askObj.type.toLowerCase()) {
                //   case 'boolean':
                //     const res = await __inquirer.prompt({
                //       ...askObj,
                //       type: 'confirm',
                //       name: 'value'
                //     });
                //     return res.value;
                //     break;
                // }
                // console.log(askObj);
                const res = yield this.ask(askObj);
                answer(res);
            }));
        });
        source.on((set.events || []).join(','), (data, metas) => {
            if (data === undefined || data === null)
                return;
            // handle the type depending on the passed stack
            const types = Object.keys(set.mapTypesToEvents);
            for (let i = 0; i < types.length; i++) {
                const stacks = set.mapTypesToEvents[types[i]];
                const stacksGlob = Array.isArray(stacks) && stacks.length
                    ? `*(${stacks.join('|')})`
                    : stacks;
                // @ts-ignore
                if (stacksGlob.length && __minimatch(metas.event, stacksGlob)) {
                    if (typeof data !== 'object') {
                        data = {
                            type: types[i],
                            value: data
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
            processor: set.processor
        });
    }
    // _isCleared = true;
    log(...logObj) {
        for (let i = 0; i < logObj.length; i++) {
            let log = __deepMerge(this.stdioSettings.defaultLogObj, logObj[i]);
            // filter by type
            if (log.type &&
                this.stdioSettings.types.indexOf(log.type.toLowerCase()) === -1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLFFBQXFCLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFpRHpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sTUFBTyxTQUFRLFFBQVE7SUFrSjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsT0FBMEMsRUFDMUMsV0FBZ0MsRUFBRTtRQUVsQyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxLQUFLLEVBQUU7d0JBQ0wsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixRQUFRO3dCQUNSLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDNUI7Z0JBQ0QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUNyQyxLQUFLLEVBQUU7b0JBQ0ws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