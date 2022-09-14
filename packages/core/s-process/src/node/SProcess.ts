import __SDuration from '@coffeekraken/s-duration';
import __SEventEmitter, { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import type { ISLog } from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SStdio from '@coffeekraken/s-stdio';
import { __buildCommandLine } from '@coffeekraken/sugar/cli';
import { __dirname } from '@coffeekraken/sugar/fs';
import {
    __isChildProcess,
    __isClass,
    __isPlainObject,
} from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import __extendsStack from '@coffeekraken/sugar/shared/class/getExtendsStack';
import { __toString } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __path from 'path';
import __stackTrace from 'stack-trace';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface';
import {
    ISCommandProcessParams,
    ISCommandProcessSettings,
    ISProcessInternal,
    ISProcessParams,
    ISProcessProcessObj,
    ISProcessResultObject,
    ISProcessSettings,
} from './ISProcess';

/**
 * @name                SProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SEventEmitter
 * @status              wip
 *
 * This class represent an SProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SProcess extends __SEventEmitter implements ISProcessInternal {
    /**
     * @name      params
     * @type      String
     * @get
     *
     * Access the process params
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _params?: Record<string, unknown>;
    get params() {
        return this._params;
    }

    /**
     * @name      stdio
     * @type      SProcessOutput
     *
     * Access the stdio class initiated if exists
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    stdio = undefined;

    /**
     * @name      state
     * @type      String
     *
     * Access the process state like 'idle', 'ready', 'running', 'killed', 'error', 'success'
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _state = 'idle';

    /**
     * @name      executionsStack
     * @type      ISProcessProcessObj[]
     *
     * This array store each executions informations in separated objects
     * that store the duration, startTime, endTime, state, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    executionsStack: ISProcessProcessObj[] = [];

    /**
     * @name     currentExecutionObj
     * @type      ISProcessProcessObj
     *
     * Store the current execution object info like startTime, endTime, duration, state, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    currentExecutionObj?: ISProcessProcessObj;

    /**
     * @name      paramsInterface
     * @type      Object
     *
     * Store the parameters interface to apply on the params object and on the initialParams object.
     * Can come from the static ```interfaces.params``` property or the ```settings.interface``` one.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    paramsInterface: any;

    /**
     * @name      initialParams
     * @type      Object
     * @private
     *
     * Store the initial params passed in the constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    initialParams: Record<string, unknown>;

    /**
     * @name      _processPromise
     * @type      ISPromise
     * @private
     *
     * Store the current process promise returned by the ```spawn``` function
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _processPromise?: __SPromise;

    /**
     * @name					from
     * @type 					Function
     * @static
     * @async
     *
     * This static method allows you to pass arguments like:
     * - file path: Will require it, check what's returned from and instanciate an SProcess depending on that
     * - command string: Will instanciate a new SCommandProcess instance and returns it for you to run it
     * - function: Will execute the function and instanciate the proper SPromise instance type depending on the returned value
     * - SPromise instance: Will simply wrap the SPromise  instance inside an SProcess one and returns you this new SProcess instance
     * - SProcess based class: This make not so much sens but at least you can rely on this method to instanciate event an SProcess based class
     * Once you get the proper instance back, you can use it the same as an SProcess based class instance and use the ```run``` method to
     * execute your process
     *
     * @param         {string|function|SPromise|SProcess}       what      The value with which you want to get an SProcess based instance back
     * @param         {Partial<ISProcessSettings>}      [settings={}]     Some settings to configure your new SProcess based class instance
     * @return        {SProcess}              An SProcess based class instance that you can use to execute your process
     *
     * @since
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static async from(
        what: string | Function | Promise<any> | __SPromise | SProcess,
        settings?: Partial<ISProcessSettings>,
    ): Promise<SProcess> {
        if (__isClass(what) && __extendsStack(what)['SProcess']) {
            // @ts-ignore
            return new what({}, settings);
        }
        if (what instanceof SProcess) {
            return what;
        }
        if (what instanceof Promise) {
            class SPromiseProcess extends SProcess {
                constructor() {
                    super({}, settings);
                }
                process(): Promise<any> {
                    // @ts-ignore
                    what.catch((e) => {}); // eslint-disable-line
                    return <Promise<any>>what;
                }
            }
            return new SPromiseProcess();
        }
        if (typeof what === 'function') {
            class SFunctionProcess extends SProcess {
                constructor() {
                    super(
                        {},
                        {
                            ...settings,
                        },
                    );
                }
                process(
                    params: Partial<ISProcessParams>,
                    settings: Partial<ISProcessSettings>,
                ): Promise<any> {
                    // @ts-ignore
                    return <Promise<any>>what(params, settings ?? {});
                }
            }
            return new SFunctionProcess();
        }
        if (typeof what === 'string') {
            let potentialPath = __path.resolve(what);
            if (!potentialPath.match(/\.js$/)) potentialPath += '.js';

            if (__fs.existsSync(potentialPath)) {
                const requireValue = (await import(potentialPath))?.default;
                if (requireValue) {
                    const pro = await this.from(
                        requireValue,
                        __deepMerge(settings, {
                            processPath: potentialPath,
                        }),
                    );

                    return pro;
                }
            } else {
                // considere the passed string as a command
                const __SCommandProcess = (await import('./SCommandProcess'))
                    ?.default;
                const commandProcess = new __SCommandProcess(
                    {
                        command: what,
                    },
                    __deepMerge(settings, {
                        processPath: __path.resolve('./SCommandProcess.js'),
                    }),
                );
                return commandProcess;
            }
        }
        throw new Error(
            [
                `<red>[SProcess.from]</red> Sorry but the passed "<magenta>what</magenta>" argument must be either:`,
                `- A <green>command string</green> like "<cyan>ls -la</cyan>"`,
                `- A valid <green>file path</green> that exports <green>one of these accepted types</green>`,
                `- A <yellow>function</yellow> that return a valid <green>Promise</green> instance or a valid <green>SPromise</green> instance`,
                `- A <green>Promise</green> or <green>SPromise</green> instance`,
                `- An <green>SProcess</green> based class`,
            ].join('\n'),
        );
    }

    /**
     * @name					fromCommand
     * @type 					Function
     * @static
     * @async
     *
     * Initialize an SCommandProcess instance on which you can call the standard "run" method
     * and execute a command by passing inside the params object the ```command``` prop.
     *
     * @param         {Partial<ISCommandProcessParams>}     [initialParams={}]    Some initial params for your command process instance
     * @param         {Partial<ISCommandProcessSettings>}     [settings={}]     Some settings to instanciate your command process as you want
     * @return       {SCommandProcess}               An instance of the SCommandProcess class
     *
     * @since 				2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static async fromCommand(
        initialParams: Partial<ISCommandProcessParams> = {},
        settings?: Partial<ISCommandProcessSettings>,
    ): Promise<SProcess> {
        const { default: __SCommandProcess } = await import(
            './SCommandProcess'
        ); // eslint-disable-line
        return new __SCommandProcess(initialParams, settings);
    }

    /**
     * @name            run
     * @type            Function
     * @static
     * @async
     *
     * Static "run" function to use as a shortcut of the new, and run call
     *
     * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
     * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static async run(
        paramsOrStringArgs: string | Partial<ISProcessParams> = {},
        settings: Partial<ISProcessSettings> = {},
    ) {
        const instance = new this({});
        return instance.run(paramsOrStringArgs, settings);
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        initialParams?: Partial<ISProcessParams>,
        settings?: Partial<ISProcessSettings>,
    ) {
        super(
            __deepMerge(
                // @ts-ignore
                __SProcessSettingsInterface.defaults(),
                settings ?? {},
            ),
        );

        // save initial params
        this.initialParams = Object.assign({}, initialParams ?? {});

        // get the definition from interface or settings
        // this.paramsInterface = this.settings.interface;
        // if (!this.paramsInterface) {
        //     this.paramsInterface =
        //         (<any>this).constructor.interface ??
        //         this.getInterface('params');
        // }

        // handle process exit
        __onProcessExit(async (state) => {
            this.state(state);
        });

        if (!this.settings.processPath) {
            for (const callSite of __stackTrace.get()) {
                if (callSite.getFunctionName() === this.constructor.name) {
                    this.settings.processPath = callSite.getFileName();
                    break;
                }
            }
        }
        if (!this.settings.processPath) {
            throw new Error(
                `An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`,
            );
        }
    }

    /**
     * @name        lastExecutionObj
     * @type        ISProcessProcessObj
     *
     * Get the last execution object
     *
     * @since       2.0.0
     *
     */
    get lastExecutionObj(): ISProcessProcessObj | -1 {
        if (!this.executionsStack.length) return -1;
        return <ISProcessProcessObj>(
            this.executionsStack[this.executionsStack.length - 1]
        );
    }

    /**
     * @name        process
     * @type        Function
     * @abstract
     *
     * This is the method you have to implement in you SProcess class. It will be called
     * when you call the ```run``` method with the params, etc...
     * You have to return an SPromise instance in order that the SProcess class is able to keep
     * track of your process state, logs, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */

    /**
     * @name      ready
     * @type      Function
     *
     * This method allows you to set the process in the "ready" state.
     * This will make the stdio initialize, etc...
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ready() {
        if (this.state() === 'ready') return;
        this.state('ready');
    }

    /**
     * @name      run
     * @type      Function
     * @async
     *
     * Run the process by calling the ```process``` method implemented on your
     * SProcess class (if exists).
     * Take care of starting timers for duration tracking, etc...
     *
     * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
     * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _duration: any;
    run(
        paramsOrStringArgs: string | Partial<ISProcessParams> = {},
        settings: Partial<ISProcessSettings> = {},
    ) {
        const processSettings = <ISProcessSettings>(
            __deepMerge(this.settings, settings)
        );

        if (this.currentExecutionObj !== undefined) {
            if (processSettings.throw === true) {
                throw new Error(
                    `Sorry but you can not execute multiple process of the "<yellow>${
                        this.metas.name ||
                        this.metas.id ||
                        this.constructor.name
                    }</yellow>" SProcess instance...`,
                );
            }
            return;
        }

        if (
            process.env.NODE_ENV !== 'test' &&
            !__isChildProcess() &&
            processSettings.stdio &&
            !this.stdio
        ) {
            this.stdio = __SStdio.existingOrNew(
                'default',
                this,
                processSettings.stdio,
                {},
            );
        }

        this._duration = new __SDuration();

        // init the currentExecution object
        // @ts-ignore
        this.currentExecutionObj = {
            state: 'idle',
            stdout: [],
            stderr: [],
            settings: Object.assign({}, settings),
        };
        if (this.currentExecutionObj) {
            this.currentExecutionObj.stdout.toString = () => {
                if (!this.currentExecutionObj) return '';
                return this.currentExecutionObj.stdout
                    .map((item) => {
                        return __toString(item);
                    })
                    .join('\n');
            };
            this.currentExecutionObj.stderr.toString = () => {
                if (!this.currentExecutionObj) return '';
                return this.currentExecutionObj.stderr
                    .map((item) => {
                        return __toString(item);
                    })
                    .join('\n');
            };
        }

        // @ts-ignore
        let paramsObj: Partial<ISProcessParams> = __isPlainObject(
            paramsOrStringArgs,
        )
            ? paramsOrStringArgs
            : {};

        // save current process params
        this._params = Object.assign(
            {},
            __deepMerge(this.initialParams ?? {}, paramsObj),
        );

        // add params in the current execution object
        // @ts-ignore
        this.currentExecutionObj.params = Object.assign({}, this._params);

        // update state
        this.state('running');

        // before callback
        processSettings.before?.(this);

        if (processSettings.runAsChild && !__isChildProcess()) {
            // build the command to run depending on the passed command in the constructor and the params
            const commandToRun = __buildCommandLine(
                `node --experimental-specifier-resolution=node ${__path.resolve(
                    __dirname(),
                    'runAsChild.cli.js',
                )} [arguments]`,
                {
                    ...this._params,
                    settings: processSettings,
                },
                {
                    keepFalsy: true,
                },
            );

            // run child process
            this._processPromise = __spawn(commandToRun, [], {
                silent: processSettings.silent,
                ...(processSettings.spawnSettings || {}),
            });
        } else {
            // run the actual process using the "process" method
            this._processPromise = (<any>this).process(
                this._params,
                processSettings,
            );

            if (
                !processSettings.silent &&
                __isChildProcess() &&
                this._processPromise &&
                this._processPromise.pipeTo
            ) {
                this._processPromise.pipeTo(process, {
                    exclude: [],
                });
            }
        }

        // handle SPromise based processes
        if (this._processPromise instanceof __SPromise) {
            // this._processPromise.on('*', (data, metas) => {
            //     console.log('D', data, metas);
            // });

            if (!processSettings.silent) {
                this.pipe(<ISEventEmitter>(<unknown>this._processPromise), {});
            }

            // listen for "data" and "log" events
            this._processPromise &&
                processSettings.collectStdout &&
                this._processPromise.on('log', (data, metas) => {
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stdout.push(
                            data.value ?? data.toString(),
                        );
                    }
                });
            // listen for errors
            this._processPromise &&
                processSettings.collectStderr &&
                this._processPromise.on('error,reject', (data, metas) => {
                    if (this.currentExecutionObj) {
                        this.currentExecutionObj.stderr.push(
                            data.value ?? data.toString(),
                        );
                    }
                    if (!this.settings.killOnError && metas.event === 'error')
                        return;
                });

            // updating state when needed
            this._processPromise.on(
                [
                    'resolve:1',
                    'reject:1',
                    'cancel:1',
                    'error:1',
                    'success:1',
                    'close.success:1',
                    'close.error:1',
                    'close.killed:1',
                ].join(','),
                (data, metas) => {
                    if (
                        metas.event === 'resolve' ||
                        metas.event === 'close.success'
                    )
                        this.state('success');
                    else if (
                        metas.event === 'reject' ||
                        metas.event === 'error' ||
                        metas.event === 'close.error'
                    )
                        this.state('error');
                    else if (
                        metas.event === 'cancel' ||
                        metas.event === 'close.killed'
                    )
                        this.state('killed');
                    else this.state('idle');
                },
            );

            this._processPromise &&
                this._processPromise.on('finally', () => {
                    // @ts-ignore
                    if (this.settings.exitAtEnd === true) {
                        process.exit();
                    }
                    // after callback
                    processSettings.after?.(this);
                });

            // register some proxies
            this._processPromise?.registerProxy('resolve,reject', (value) => {
                if (value && value.value !== undefined) value = value.value;
                return <ISProcessResultObject>{
                    ...this.executionsStack[this.executionsStack.length - 1],
                    value,
                };
            });

            // return the promise
            return this._processPromise;
        }

        // handle simple Promise processes
        // @ts-ignore
        if (this._processPromise instanceof Promise) {
            // @ts-ignore
            this._processPromise.catch((e) => {}); // eslint-disable-line
            return new __SPromise(({ resolve }) => {
                // @ts-ignore
                this._processPromise
                    .then((value) => {
                        this.state('success');
                        resolve(<ISProcessResultObject>{
                            ...this.executionsStack[
                                this.executionsStack.length - 1
                            ],
                            value,
                        });
                        // after callback
                        processSettings.after?.(this);
                    })
                    .catch((error) => {
                        this.state('error');
                        resolve(<ISProcessResultObject>{
                            ...this.executionsStack[
                                this.executionsStack.length - 1
                            ],
                            error,
                        });
                        // after callback
                        processSettings.after?.(this);
                    });
            });
        }

        // returned process function value MUST be either an SPromise instance or a simple Promise one
        throw new Error(
            `<red>[${this.constructor.name}.run]</red> Sorry but the returned value of the "<yellow>process</yellow>" method MUST be either an <yellow>SPromise</yellow> instance or a simple <yellow>Promise</yellow> instance`,
        );
    }

    state(value?: string) {
        if (!value) return this._state;
        if (
            ['idle', 'ready', 'running', 'killed', 'error', 'success'].indexOf(
                value,
            ) === -1
        ) {
            throw new Error(
                `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
                    value,
                )}</magenta>" of your "<cyan>${
                    this.constructor.name
                }</cyan>" class can contain only one of these values: ${[
                    'idle',
                    'running',
                    'killed',
                    'error',
                    'success',
                ]
                    .map((i) => {
                        return `"<green>${i}</green>"`;
                    })
                    .join(', ')}`,
            );
        }

        // emit an event
        this.emit(`state.${value}`, undefined);
        this.emit('state', value);
        this._state = value;
        this._onStateChange(value);
        return this._state;
    }

    /**
     * @name      kill
     * @type      Function
     *
     * This method will simply kill the process and call the "cancel" method
     * on the SPromise super instance as well as on the passed "promise" instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    kill(data) {
        // call the cancel method on the parent SPromise instance
        this.cancel(data);
    }

    /**
     * @name        cancel
     * @type        Function
     *
     *
     * This method allows you to cancel the process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    cancel(data) {
        if (this.state() === 'running') this.state('killed');
        // cancel the passed promise
        if (this._processPromise && this._processPromise.cancel) {
            this._processPromise.cancel(data);
            setTimeout(() => {
                this.emit('error', data);
            }, 50);
        }
    }

    /**
     * @name        _onStateChange
     * @type        Function
     * @private
     *
     * This method is called each tie the state change to reflect
     * this in the console feed
     *
     * @param     {String}        state       The new state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _onStateChange(state) {
        // update the current execution state
        if (!this.currentExecutionObj) return;

        this.currentExecutionObj.state = state;

        // check if is the end of the process
        if (state === 'killed' || state === 'error' || state === 'success') {
            this.currentExecutionObj = {
                ...this.currentExecutionObj,
                ...this._duration.end(),
            };
        }

        if (state === 'success' || state === 'killed' || state === 'error') {
            // push the currentExecutionObj into the execution stack
            this.executionsStack.push(
                Object.assign({}, this.currentExecutionObj),
            );
            // reset the currentExecutionObj
            this.currentExecutionObj = undefined;
        }
    }

    /**
     * @name          isRunning
     * @type          Function
     *
     * This method allows you to check if the process is currently running or not
     *
     * @return      {Boolean}         true if is running, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isRunning() {
        return this.state() === 'running';
    }

    /**
     * @name          isIdle
     * @type          Function
     *
     * This method allows you to check if the process is currently idle or not
     *
     * @return      {Boolean}         true if is idle, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isIdle() {
        return this.state() === 'idle';
    }

    /**
     * @name          isReady
     * @type          Function
     *
     * This method allows you to check if the process is currently ready or not
     *
     * @return      {Boolean}         true if is ready, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isReady() {
        return this.state() !== 'idle';
    }

    /**
     * @name          isKilled
     * @type          Function
     *
     * This method allows you to check if the process has been killed or not
     *
     * @return      {Boolean}         true if is killed, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isKilled() {
        return this.state() === 'killed';
    }

    /**
     * @name          isError
     * @type          Function
     *
     * This method allows you to check if the process is in error state or not
     *
     * @return      {Boolean}         true if is in error state, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isError() {
        return this.state() === 'error';
    }

    /**
     * @name          isSuccess
     * @type          Function
     *
     * This method allows you to check if the process is in success state or not
     *
     * @return      {Boolean}         true if is in success state, false if not
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isSuccess() {
        return this.state() === 'success';
    }

    /**
     * @name          log
     * @type          Function
     *
     * This method allows you to log a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to log
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(...logs: ISLog[]) {
        logs.forEach((log) => {
            // @ts-ignore
            if (this.currentExecutionObj && this.settings.collectStdout) {
                this.currentExecutionObj.stdout.push(
                    log.value || log.toString(),
                );
            }
            this.emit('log', log);
        });
    }

    /**
     * @name          error
     * @type          Function
     *
     * This method allows you to error a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to error
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    error(...errors: ISLog[]) {
        errors.forEach((error) => {
            if (this.currentExecutionObj && this.settings.collectStderr) {
                this.currentExecutionObj.stderr.push(
                    error.value || error.toString(),
                );
            }
            this.emit('error', error);
        });
    }
}

export default SProcess;
