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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
                ],
                mapTypesToEvents: {
                    heading: [],
                    error: [
                        'error',
                        '*.error',
                        'reject',
                        '*.reject',
                        'cancel',
                        '*.cancel',
                    ],
                    warning: ['warn', '*.warn'],
                },
                types: __SSugarConfig.get('log.types'),
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
        const set = (__deepMerge(this._settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {}));
        // subscribe to data
        // "ask" event
        this.sources.forEach((source) => {
            source.on('ask', (askObj, metas, answer) => __awaiter(this, void 0, void 0, function* () {
                // console.log(askObj);
                const res = yield this.ask(askObj);
                answer === null || answer === void 0 ? void 0 : answer(res);
            }));
        });
        source.on('log', (data, metas) => {
            if (data === undefined || data === null)
                return;
            // // handle the type depending on the passed stack
            // const types = Object.keys(set.mapTypesToEvents);
            // for (let i = 0; i < types.length; i++) {
            //     const stacks = set.mapTypesToEvents[types[i]];
            //     const stacksGlob = Array.isArray(stacks) && stacks.length ? `*(${stacks.join('|')})` : stacks;
            //     // @ts-ignore
            //     if (stacksGlob.length && __minimatch(metas.event, stacksGlob)) {
            //         if (typeof data !== 'object') {
            //             data = {
            //                 type: types[i],
            //                 value: data,
            //             };
            //         } else if (!data.type) {
            //             data.type = types[i];
            //         }
            //         break;
            //     }
            // }
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
            let log = logObj[i];
            if (!log.active)
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
            const componentObj = this.constructor.registeredComponents[this.constructor.name][log.as || 'default'];
            if (!componentObj)
                throw new Error(`Sorry but the requested "<yellow>${log.as || 'default'}</yellow>" in the "<cyan>${this.constructor.name}</cyan>" stdio class does not exists...`);
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
export default SStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUkxRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQXVEdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxNQUFPLFNBQVEsUUFBUTtJQW1OekI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsV0FBZ0MsRUFBRTtRQUVsQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7aUJBQ2I7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsS0FBSyxFQUFFO3dCQUNILE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixVQUFVO3FCQUNiO29CQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7aUJBQzlCO2dCQUNELEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDdEMsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxLQUFLO2lCQUNkO2dCQUNELGFBQWEsRUFBRTtvQkFDWCxV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