import __SClass from '@coffeekraken/s-class';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SStdioSettingsInterface from './interface/SStdioSettingsInterface';
import type { ISStdioAdapter } from './SStdioAdapter';
import type { ISStdioSource } from './SStdioSource';

export interface ISStdioSettings {
    filter: typeof Function;
    processor: typeof Function;
    defaultLogObj: Partial<ISLog>;
    defaultAskObj: Partial<ISLogAsk>;
}

export interface ISStdioLogFn {
    (...logObj: ISLog[]): void;
}

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
     * @name      sources
     * @type      ISStdioSource[]
     * @private
     *
     * Store sources passed in the contructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    sources: ISStdioSource[];

    /**
     * @name      adapters
     * @type      ISStdioAdapter[]
     * @private
     *
     * Store adapters passed in the contructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    adapters: ISStdioAdapter[];


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
    static _instanciatedStdio = {};

    /**
     * @name      _lastLogObj
     * @type      ISLog
     * @private
     *
     * Store the last log object logged
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _lastLogObj?: ISLog;

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
    _logsBuffer: ISLog[] = [];

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
    private _isDisplayed = false;

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
    static existingOrNew(
        id: string,
        sources: ISStdioSource[],
        adapters: ISStdioAdapter[],
        settings = {},
    ) {
        // @ts-ignore
        if (this._instanciatedStdio[id]) return this._instanciatedStdio[id];
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
    static new(id: string, sources: ISStdioSource[], adapters: ISStdioAdapter, settings: Partial<ISStdioSettings> = {}) {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const __new = (await import('./new')).default;
            // @ts-ignore
            return __new(id, sources, adapters, settings);
        });
    }

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
    _id: string = '';
    get id(): string {
        return this._id;
    }

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
    constructor(
        id: string,
        sources: ISStdioSource[],
        adapters: ISStdioAdapter[],
        settings?: Partial<ISStdioSettings>,
    ) {
        super(
            __deepMerge(
                // @ts-ignore
                __SStdioSettingsInterface.defaults(),
                settings ?? {},
            ),
        );

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
            throw new Error(
                `<red>${this.constructor.name}</red> Sorry but a instance of the SStdio class already exists with the id "<yellow>${this.id}</yellow>"`,
            );
        }
        // @ts-ignore)
        this.constructor._instanciatedStdio[this.id] = this;

        this.sources.forEach((s) => {
            // subscribe to the process
            this.registerSource(s);
        });
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
    registerSource(source: ISStdioSource) {
        // listen for logs

        
        source.on('log', this.log.bind(this));
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
    _applyOnAdapters(callback: Function): void {
        this.adapters.forEach(adapter => {
            callback(adapter);
        });
    }

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
    _isClearing = false;
    log(...logObj: ISLog[]) {

        for (let i = 0; i < logObj.length; i++) {
            let log = <ISLog>logObj[i];

            if (!log.active) continue;

            // put in buffer if not displayed
            if (!this.isDisplayed() || this._isClearing) {
                this._logsBuffer.push(log);
                continue;
            }

            if (this._lastLogObj && this._lastLogObj.temp) {
                // @ts-ignore
                if (!this.clearLast || typeof this.clearLast !== 'function')
                    throw new Error(
                        `You try to clear the last log but it does not implements the "<cyan>clearLast</cyan>" method`,
                    );
                (async () => {
                    // @ts-ignore
                    if (!this.clearLast) return;

                    this._applyOnAdapters(adapter => {
                        adapter.clearLast?.();
                    })

                    // @ts-ignore
                    this._logBuffer();
                })();
            }

            if (log.clear === true) {
                this._isClearing = true;
                // @ts-ignore
                if (!this.clear || typeof this.clear !== 'function')
                    throw new Error(
                        `You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`,
                    );
                (async () => {
                    this._applyOnAdapters(adapter => {
                        adapter.clear?.();
                    });
                    this._isClearing = false;
                    this._logBuffer();
                })();
            }

            const e = new Error();
            let formattedError = e.stack.toString().split('\n').filter(str => str.trim().match(/^at\s/));

            if (!log.group) {
                log.group = 'Sugar ♥';
            }

            // actual log through adapter
            this._applyOnAdapters(adapter => {
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
    async ask(askObj: Partial<ISLogAsk>) {
        let ask = <ISLogAsk>__deepMerge(this.settings.defaultAskObj, askObj);

        // @ts-ignore
        const answer = await this._ask(ask);
        return answer;
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
