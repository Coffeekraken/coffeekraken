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
import __require from '@coffeekraken/sugar/node/esm/require';
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
        // @ts-ignore
        if (this._instanciatedStdio[id])
            return this._instanciatedStdio[id];
        return this.new(id, sources, stdio, settings);
    }
    /**
     * @name            new
     * @type            Function
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
     * SStdio.new('default', proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(id, sources, stdio = 'inherit', settings = {}) {
        // @ts-ignore
        const n = __require('./new').default;
        // const { default: n } = await import('./new');
        return n(id, sources, stdio, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUkxRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSxzQ0FBc0MsQ0FBQztBQXVEN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxNQUFPLFNBQVEsUUFBUTtJQThNekI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsV0FBZ0MsRUFBRTtRQUVsQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7aUJBQ2I7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsS0FBSyxFQUFFO3dCQUNILE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixVQUFVO3FCQUNiO29CQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7aUJBQzlCO2dCQUNELEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDdEMsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxL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