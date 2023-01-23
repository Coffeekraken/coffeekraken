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
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface';
/**
 * @name          SStdio
 * @namespace     sugar.node.stdio
 * @type          Class
 * @status              wip
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioSettings}     [settings={}]       Some settings to configure your Stdio
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _nativeLog = console.log;
export default class SStdio extends __SClass {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(id, sources, adapters, settings) {
        super(__deepMerge(
        // @ts-ignore
        __SStdioSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name      _logsBuffer
         * @type      ISLog[]
         * @private
         *
         * Store the logs that does not have been displayed yet
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._id = '';
        /**
         * @name      log
         * @type      Function
         *
         * This method is the one called to log something.
         * It will call the ```log``` method on each registered adapters
         *
         * @param         {ISLog[]}        ...logObj      The log object(s) you want to log
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._isClearing = false;
        // // proxy console.log to filter empty logs
        // const _nativeLog = console.log;
        // console.log = (...args) => {
        //     args = args
        //         .filter((log) => {
        //             if (!log) {
        //                 return false;
        //             }
        //             if (typeof log === 'string' && log.trim?.() === '') {
        //                 return false;
        //             }
        //             return true;
        //         })
        //         .map((log) => {
        //             if (typeof log === 'string') {
        //                 return log.trim().replace(/\\n$/, '');
        //             }
        //             return log;
        //         });
        //     _nativeLog(...args);
        // };
        // save id
        this._id = id;
        // save adapters
        this.adapters = Array.isArray(adapters) ? adapters : [adapters];
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static existingOrNew(id, sources, adapters, settings = {}) {
        // @ts-ignore
        if (this._instanciatedStdio[id])
            return this._instanciatedStdio[id];
        return this.new(id, sources, adapters, settings);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static new(id, sources, adapters, settings = {}) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const __new = (yield import('./new')).default;
            // @ts-ignore
            return __new(id, sources, adapters, settings);
        }));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    display() {
        // update the status
        this._isDisplayed = true;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    registerSource(source) {
        // listen for logs
        source.on('log', this.log.bind(this));
        source.on('ask', this.ask.bind(this));
        source.on('ready', () => {
            this.display();
        });
        // subscribe to data
        // // "ask" event
        // source.on('ask', async (askObj: ISLogAsk, metas, answer) => {
        //     // @ts-ignore
        //     askObj.metas = metas;
        //     const res = await this.ask(askObj);
        //     answer?.(res);
        // });
        // source.on(
        //     'log',
        //     (data, metas) => {
        //         // @TODO        find why some logs are printed x times... It seems that it's linked to number of actions theirs in a recipe in the SKitchen class...
        //         if (this._tmpPrintedLogs.includes(data.value)) {
        //             return;
        //         }
        //         this._tmpPrintedLogs.push(data.value);
        //         setTimeout(() => {
        //             this._tmpPrintedLogs.splice(
        //                 this._tmpPrintedLogs.indexOf(data.value),
        //                 1,
        //             );
        //         }, 100);
        //         if (data === undefined || data === null) return;
        //         // save metas into logObj
        //         data.metas = metas;
        //         this.log(data);
        //     },
        //     {
        //         filter: set.filter,
        //         processor: set.processor,
        //     },
        // );
    }
    /**
     * Apply a callback function on each adapters
     */
    _applyOnAdapters(callback) {
        this.adapters.forEach((adapter) => {
            callback(adapter);
        });
    }
    log(...logObj) {
        for (let i = 0; i < logObj.length; i++) {
            let log = logObj[i];
            if (!log || !log.active)
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
                    this._applyOnAdapters((adapter) => {
                        var _a;
                        (_a = adapter.clearLast) === null || _a === void 0 ? void 0 : _a.call(adapter);
                    });
                    // @ts-ignore
                    this._logBuffer();
                }))();
            }
            if (log.clear === true) {
                this._isClearing = true;
                // @ts-ignore
                if (!this.clear || typeof this.clear !== 'function')
                    throw new Error(`You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`);
                (() => __awaiter(this, void 0, void 0, function* () {
                    this._applyOnAdapters((adapter) => {
                        var _a;
                        (_a = adapter.clear) === null || _a === void 0 ? void 0 : _a.call(adapter);
                    });
                    this._isClearing = false;
                    this._logBuffer();
                }))();
            }
            if (!log.group) {
                log.group = 'Sugar ♥';
            }
            // actual log through adapter
            this._applyOnAdapters((adapter) => {
                adapter.log(log);
            });
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // _isCleared = true;
    ask(askObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let ask = __deepMerge(this.settings.defaultAskObj, askObj);
            // @ts-ignore
            const answer = yield this.adapters[0].ask(ask);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SStdio._instanciatedStdio = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBZTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQW1LeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBd0IsRUFDeEIsUUFBMEIsRUFDMUIsUUFBbUM7UUFFbkMsS0FBSyxDQUNELFdBQVc7UUFDUCxhQUFhO1FBQ2IseUJBQXlCLENBQUMsUUFBUSxFQUFFLEVBQ3BDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBeElOOzs7Ozs7Ozs7V0FTRztRQUNILGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBRTFCOzs7Ozs7Ozs7V0FTRztRQUNLLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBNkU3Qjs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFHLEdBQVcsRUFBRSxDQUFDO1FBK0xqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBOUtoQiw0Q0FBNEM7UUFDNUMsa0NBQWtDO1FBQ2xDLCtCQUErQjtRQUMvQixrQkFBa0I7UUFDbEIsNkJBQTZCO1FBQzdCLDBCQUEwQjtRQUMxQixnQ0FBZ0M7UUFDaEMsZ0JBQWdCO1FBQ2hCLG9FQUFvRTtRQUNwRSxnQ0FBZ0M7UUFDaEMsZ0JBQWdCO1FBQ2hCLDJCQUEyQjtRQUMzQixhQUFhO1FBQ2IsMEJBQTBCO1FBQzFCLDZDQUE2QztRQUM3Qyx5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