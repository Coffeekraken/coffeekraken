"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const parseAndFormatLog_1 = __importDefault(require("@coffeekraken/sugar/shared/log/parseAndFormatLog"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const class_1 = __importDefault(require("@coffeekraken/sugar/shared/is/class"));
const path_1 = __importDefault(require("@coffeekraken/sugar/node/is/path"));
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
class SStdio extends s_class_1.default {
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
        super(deepMerge_1.default({
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
                    '*.error'
                    // 'reject',
                    // '*.reject',
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
        if (!Array.isArray(sources))
            sources = [sources];
        let stdioInstance;
        if (class_1.default(stdio)) {
            stdioInstance = new stdio(sources, settings);
        }
        else if (node_1.default() && path_1.default(stdio, true)) {
            // if (!__isNode())
            //   throw new Error(
            //     `<yellow>[SStdio.new]</<yellow> Sorry but to use a path based stdio, you must be in a <magenta>node</magenta> context...`
            //   );
            // @ts-ignore
            let Cls = require(stdio).default; // eslint-disable-line
            Cls = Cls.default || Cls;
            stdioInstance = new Cls(sources, settings);
        }
        else if (typeof stdio === 'string') {
            switch (stdio) {
                case 'inherit':
                    if (node_1.default()) {
                        const __STerminalStdio = require('../node/terminal/STerminalStdio')
                            .default; // eslint-disable-line
                        stdioInstance = new __STerminalStdio(sources, settings);
                    }
                    else {
                        throw new Error(`<red>[SStdio.new]</red> Sorry but the "<yellow>SConsoleStdio</yellow>" class is not yet implemented...`);
                    }
                    break;
                case 'terminal':
                    if (!node_1.default())
                        throw new Error(`<yellow>[SStdio.new]</<yellow> Sorry but to use the "<yellow>STerminalStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const __STerminalStdio = require('../node/terminal/STerminalStdio')
                        .default; // eslint-disable-line
                    stdioInstance = new __STerminalStdio(sources, settings);
                    break;
                case 'blessed':
                    if (!node_1.default())
                        throw new Error(`<yellow>[SStdio.new]</<yellow> Sorry but to use the "<yellow>SBlessedStdio</yellow>" output, you must be in a <magenta>node</magenta> context...`);
                    const __SBlessedStdio = require('../node/terminal/SBlessedStdio')
                        .default; // eslint-disable-line
                    stdioInstance = new __SBlessedStdio(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                    break;
                default:
                    break;
            }
        }
        return stdioInstance;
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
        const set = (deepMerge_1.default(this._settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {}));
        // subscribe to data
        source.on((set.events || []).join(','), (data, metas) => {
            if (data === undefined || data === null)
                return;
            // // handle the type depending on the passed stack
            // const types = Object.keys(set.mapTypesToEvents);
            // for (let i = 0; i < types.length; i++) {
            //   const stacks = set.mapTypesToEvents[types[i]];
            //   const stacksGlob =
            //     Array.isArray(stacks) && stacks.length
            //       ? `*(${stacks.join('|')})`
            //       : stacks;
            //   if (stacksGlob.length && __minimatch(metas.event, stacksGlob)) {
            //     if (typeof data !== 'object') {
            //       data = {
            //         type: types[i],
            //         value: data
            //       };
            //     } else if (!data.type) {
            //       data.type = types[i];
            //     }
            //     break;
            //   }
            // }
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
            log = parseAndFormatLog_1.default(log);
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
exports.default = SStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQXNFO0FBR3RFLG9FQUEwRDtBQUUxRCx5R0FBbUY7QUFDbkYsOEVBQTBEO0FBQzFELGdGQUE0RDtBQUM1RCw0RUFBd0Q7QUFxQ3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sTUFBTyxTQUFRLGlCQUFRO0lBMEwzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLE9BQTBDLEVBQzFDLFdBQWdDLEVBQUU7UUFFbEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixXQUFXLEVBQUUsQ0FBQztnQkFDZCxNQUFNLEVBQUU7b0JBQ04sS0FBSztvQkFDTCxPQUFPO29CQUNQLE1BQU07b0JBQ04sUUFBUTtvQkFDUixPQUFPO29CQUNQLFNBQVM7b0JBQ1QsWUFBWTtvQkFDWixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsY0FBYztpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsS0FBSyxFQUFFO3dCQUNMLE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixVQUFVO3FCQUNYO29CQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7aUJBQzVCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztpQkFDWjthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBdk5KOzs7Ozs7Ozs7V0FTRztRQUNILGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRXpCOzs7Ozs7Ozs7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