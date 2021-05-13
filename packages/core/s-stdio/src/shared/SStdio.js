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
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SLog from '@coffeekraken/s-log';
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
                process: null,
                maxItems: -1,
                spaceBetween: 0,
                spaceAround: 0,
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
                types: __sugarConfig('log.types'),
                metas: {
                    time: false
                }
            }
        }, settings));
        /**
         * @name      _logsBuffer
         * @type      ILog[]
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
         * @param         {ILog[]}        ...logObj      The log object(s) you want to log
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isClearing = false;
        this.sources = Array.isArray(sources) ? sources : [sources];
        this.sources.forEach((s) => {
            // subscribe to the process
            this.registerSource(s);
        });
        // this.expose(
        //   new __SEventEmitter({
        //     id: this.id
        //   }),
        //   {
        //     as: 'eventEmitter',
        //     props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo']
        //   }
        // );
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
     * SStdio.new(proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(sources, stdio = 'inherit', settings = {}) {
        const n = require('./new').default;
        return n(sources, stdio, settings);
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
            let log = logObj[i];
            // filter by type
            if (log.type &&
                this.stdioSettings.types.indexOf(log.type.toLowerCase()) === -1)
                continue;
            // if (this._isCleared && logObj.clear) delete logObj.clear;
            // this._isCleared = false;
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
            log = __SLog.parseAndFormatLog(log);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLFFBQXFCLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsT0FBTyxNQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBcUNuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLE1BQU8sU0FBUSxRQUFRO0lBaUozQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFdBQWdDLEVBQUU7UUFFbEMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE1BQU0sRUFBRTtvQkFDTixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxLQUFLLEVBQUU7d0JBQ0wsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixRQUFRO3dCQUNSLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDNUI7Z0JBQ0QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUM7Z0JBQ2pDLEtBQUssRUFBRTtvQkFD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