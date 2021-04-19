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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/log/parseAndFormatLog"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const parseAndFormatLog_1 = __importDefault(require("@coffeekraken/sugar/shared/log/parseAndFormatLog"));
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
        // static new(sources, stdio: any = 'inherit', settings = {}) {
        //   const n = require('./new').default;
        //   return n(sources, stdio, settings);
        // }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNEZBQXNFO0lBR3RFLG9FQUEwRDtJQUUxRCx5R0FBbUY7SUF3Q25GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILE1BQU0sTUFBTyxTQUFRLGlCQUFRO1FBcUkzQjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUNFLE9BQTBDLEVBQzFDLFdBQWdDLEVBQUU7WUFFbEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxJQUFJO29CQUNaLE9BQU8sRUFBRSxJQUFJO29CQUNiLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ1osWUFBWSxFQUFFLENBQUM7b0JBQ2YsV0FBVyxFQUFFLENBQUM7b0JBQ2QsTUFBTSxFQUFFO3dCQUNOLEtBQUs7d0JBQ0wsT0FBTzt3QkFDUCxNQUFNO3dCQUNOLFFBQVE7d0JBQ1IsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixhQUFhO3dCQUNiLGNBQWM7cUJBQ2Y7b0JBQ0QsZ0JBQWdCLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRSxFQUFFO3dCQUNYLEtBQUssRUFBRTs0QkFDTCxPQUFPOzRCQUNQLFNBQVM7NEJBQ1QsUUFBUTs0QkFDUixVQUFVOzRCQUNWLFFBQVE7NEJBQ1IsVUFBVTt5QkFDWDt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO3FCQUM1QjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsSUFBSSxFQUFFLEtBQUs7cUJBQ1o7aUJBQ0Y7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7WUFsS0o7Ozs7Ozs7OztlQVNHO1lBQ0gsZ0JBQVcsR0FBVyxFQUFFLENBQUM7WUFFekI7Ozs7Ozs7OztlQVNHO1lBQ0ssaUJBQVksR0FBRyxLQUFLLENB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