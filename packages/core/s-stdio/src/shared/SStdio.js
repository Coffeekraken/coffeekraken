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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "minimatch", "@coffeekraken/s-class", "@coffeekraken/s-log"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const minimatch_1 = __importDefault(require("minimatch"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
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
            const set = (deepMerge_1.default(this._settings.stdio || {}, settings !== null && settings !== void 0 ? settings : {}));
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
                    if (stacksGlob.length && minimatch_1.default(metas.event, stacksGlob)) {
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
                log = s_log_1.default.parseAndFormatLog(log);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N0ZGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNEZBQXNFO0lBQ3RFLDBEQUFvQztJQUVwQyxvRUFBMEQ7SUFNMUQsZ0VBQW1EO0lBb0NuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxNQUFNLE1BQU8sU0FBUSxpQkFBUTtRQXFJM0I7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFDRSxPQUEwQyxFQUMxQyxXQUFnQyxFQUFFO1lBRWxDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsSUFBSTtvQkFDWixPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNaLFlBQVksRUFBRSxDQUFDO29CQUNmLFdBQVcsRUFBRSxDQUFDO29CQUNkLE1BQU0sRUFBRTt3QkFDTixLQUFLO3dCQUNMLE9BQU87d0JBQ1AsTUFBTTt3QkFDTixRQUFRO3dCQUNSLE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixjQUFjO3FCQUNmO29CQUNELGdCQUFnQixFQUFFO3dCQUNoQixPQUFPLEVBQUUsRUFBRTt3QkFDWCxLQUFLLEVBQUU7NEJBQ0wsT0FBTzs0QkFDUCxTQUFTOzRCQUNULFFBQVE7NEJBQ1IsVUFBVTs0QkFDVixRQUFROzRCQUNSLFVBQVU7eUJBQ1g7d0JBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztxQkFDNUI7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxLQUFLO3FCQUNaO2lCQUNGO2FBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBbEtKOzs7Ozs7Ozs7ZUFTRztZQUNILGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBRXpCOzs7Ozs7Ozs7ZUFTRztZQUNLLGlCQUFZ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