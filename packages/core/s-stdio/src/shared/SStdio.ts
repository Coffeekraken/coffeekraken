import __SClass, { ISClass } from '@coffeekraken/s-class';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import { ISPromise } from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export interface ISStdioCtorSettings {
    stdio?: ISStdioSettings;
}

export interface ISStdioSettingsMetas {
    time: boolean;
}

export interface ISStdioSettings {
    id: string;
    maxItems: number;
    events: string[];
    spaceBetween: number;
    spaceAround: number;
    globalEvents: boolean;
    filter: typeof Function;
    processor: typeof Function;
    types: string[];
    metas: ISStdioSettingsMetas;
    mapTypesToEvents: Record<string, string[]>;
    defaultLogObj: Partial<ISLog>;
    defaultAskObj: Partial<ISLogAsk>;
}

export interface ISStdioCtor {
    new (sources: ISPromise | ISPromise[], settings: ISStdioSettings): ISStdio;
}

export interface ISStdioRegisteredComponents {
    [key: string]: ISStdioComponent;
}
export interface ISStdioComponent {
    id: string;
    render(logObj: ISLog, settings: any);
}

export interface ISStdioLogFn {
    (...logObj: ISLog[]): void;
}

export interface ISStdio extends ISClass {
    sources: ISEventEmitter[];
    log: ISStdioLogFn;
}

export interface ISStdioTypes {
    LOG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
    VERBOSE: number;
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
export default class SStdio extends __SClass implements ISStdio {
    /**
     * @name      sources
     * @type      Array<SPromise>
     * @private
     *
     * Store sources passed in the contructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sources: ISEventEmitter[];

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
    static _instanciatedStdio = {};

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
    static registeredComponents: ISStdioRegisteredComponents = {};

    /**
     * @name      _lastLogObj
     * @type      ISLog
     * @private
     *
     * Store the last log object logged
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _isDisplayed = false;

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
    static registerComponent(
        component: ISStdioComponent,
        settings?: any,
        as?: string,
    ) {
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
    static existingOrNew(
        id: string,
        sources,
        stdio: any = 'inherit',
        settings = {},
    ) {
        // @ts-ignore
        if (this._instanciatedStdio[id]) return this._instanciatedStdio[id];
        return this.new(id, sources, stdio, settings);
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
     * SStdio.new('default', proc);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static new(id: string, sources, stdio: any = 'inherit', settings = {}) {
        return new Promise(async (resolve) => {
            const __new = (await import('./new')).default;
            // @ts-ignore
            return __new(id, sources, stdio, settings);
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
    get stdioSettings(): ISStdioSettings {
        return (<any>this)._settings.stdio;
    }

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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(
        id: string,
        sources: ISEventEmitter | ISEventEmitter[],
        settings: ISStdioCtorSettings = {},
    ) {
        super(
            __deepMerge(
                {
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
                },
                settings,
            ),
        );

        // save id
        this._id = id;

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
    registerSource(source, settings?: Partial<ISStdioSettings>) {
        const set = (<ISStdioSettings>(
            __deepMerge(this._settings.stdio || {}, settings ?? {})
        )) as ISStdioSettings;
        // subscribe to data

        // "ask" event
        this.sources.forEach((source) => {
            source.on('ask', async (askObj: ISLogAsk, metas, answer) => {
                // console.log(askObj);
                const res = await this.ask(askObj);
                answer?.(res);
            });
        });

        source.on(
            'log',
            (data, metas) => {
                if (data === undefined || data === null) return;
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
            },
            {
                filter: set.filter,
                processor: set.processor,
            },
        );
    }

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
    _isClearing = false;
    // _isCleared = true;
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
                    // @ts-ignore
                    await this.clearLast();
                    this._logBuffer();
                })();
            }

            if (log.clear === true) {
                this._isClearing = true;
                // console.log('CLEAR', log.type);
                // @ts-ignore
                if (!this.clear || typeof this.clear !== 'function')
                    throw new Error(
                        `You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`,
                    );
                // this._logsBuffer.push(log);
                (async () => {
                    // @ts-ignore
                    if (!this.clear) return;
                    // @ts-ignore
                    await this.clear();
                    this._isClearing = false;
                    // this._isCleared = true;
                    this._logBuffer();
                })();
            } else {
                // console.log(log.type);
            }

            // get the correct component to pass to the _log method
            const componentObj = (<any>this).constructor.registeredComponents[
                this.constructor.name
            ][log.as || 'default'];
            if (!componentObj)
                throw new Error(
                    `Sorry but the requested "<yellow>${
                        log.as || 'default'
                    }</yellow>" in the "<cyan>${
                        this.constructor.name
                    }</cyan>" stdio class does not exists...`,
                );

            if (typeof componentObj.component.render !== 'function') {
                throw new Error(
                    `Your "<yellow>${componentObj.component.id}</yellow>" stdio "<cyan>${this.constructor.name}</cyan>" component does not expose the required function "<magenta>render</magenta>"`,
                );
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
    async ask(askObj: Partial<ISLogAsk>) {
        let ask = <ISLogAsk>(
            __deepMerge(this.stdioSettings.defaultAskObj, askObj)
        );

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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    isDisplayed() {
        return this._isDisplayed;
    }
}
