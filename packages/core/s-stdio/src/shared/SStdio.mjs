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
            // if (this._isCleared && logObj.clear) delete logObj.clear;
            // this._isCleared = false;
            // put in buffer if not displayed
            if (!this.isDisplayed() || this._isClearing) {
                this._logsBuffer.push(log);
                continue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXN0ZGlvL3NyYy9zaGFyZWQvU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLFFBQXFCLE1BQU0sdUJBQXVCLENBQUM7QUFNMUQsT0FBTyxNQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBb0NuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLE1BQU8sU0FBUSxRQUFRO0lBcUkzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFdBQWdDLEVBQUU7UUFFbEMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE1BQU0sRUFBRTtvQkFDTixLQUFLO29CQUNMLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsU0FBUztvQkFDVCxRQUFRO29CQUNSLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxLQUFLLEVBQUU7d0JBQ0wsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixRQUFRO3dCQUNSLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDNUI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFB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