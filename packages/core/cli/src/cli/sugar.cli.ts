#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SEnv from '@coffeekraken/s-env';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SInterface from '@coffeekraken/s-interface';
import __SStdio, { STerminalStdio } from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import '@coffeekraken/sugar/node/index';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __SLog from '@coffeekraken/s-log';
import __childProcess from 'child_process';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import { Console } from 'console';

export interface ISSugarCliAvailableCliObj {
    packageJson: any;
    description: string;
    process: string;
    processPath: string;
}

export interface ISSugarCliAvailableCli {
    defaultByStack: Record<string, string>;
    endpoints: Record<string, ISSugarCliAvailableCliObj>;
}

class SSugarCliParamsInterface extends __SInterface {
    static get _definition() {
        return {
            bench: {
                type: {
                    type: 'Array<String> | Boolean',
                    splitChars: [','],
                },
                default: false,
                explicit: true,
            },
            logPreset: {
                type: 'String',
                values: __SLog.PRESETS,
                default: 'default',
                explicit: true,
            },
        };
    }
}

/**
 * @name            sugar.cli
 * @namespace           cli
 * @type            File
 *
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 *
 * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

const cliParams = SSugarCliParamsInterface.apply(
    process.argv.slice(2).join(' '),
);
if (cliParams.bench) {
    __SBench.env.activateBench(
        cliParams.bench === true ? '*' : cliParams.bench,
    );
}

if (!__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
    console.log(`The log preset "${cliParams.logPreset}" does not exists... Here's the list of available presets:\n${__SLog.PRESETS.map(preset => {
        return `- ${preset}\n`;
    }).join('')}`);
    cliParams.logPreset = 'default';
}

__SLog.filter({
    // type: [__SLog.TYPE_LOG, __SLog.TYPE_INFO, __SLog.TYPE_WARN, __SLog.TYPE_ERROR],
    type: __SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`],
});

export interface ISSugarCliArgs {
    command: string;
    stack: string;
    action: string;
    isHelp: boolean;
    params: Record<string, any>
}

export default class SSugarCli {
    _stdio: STerminalStdio;
    _eventEmitter: __SEventEmitter;
    _treatAsMain: boolean;
    _sugarJsons: any;

    args: ISSugarCliArgs;


    _availableCli: ISSugarCliAvailableCli = {
        defaultByStack: {},
        endpoints: {},
    };
    _availableInteractiveCli: Record<string, any> = {};

    /**
     * @name           command
     * @type            String
     * @static
     * @get
     *
     * Get the correct sugar or sugard commant depending on the environment in which the cli is running
     *
     * @since           2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com>
     */
    static get command(): string {
        const command = process.argv[1];
        return command.split('/').pop();
    }

    /**
     * @name           replaceTokens
     * @type            Function
     * @static
     *
     * Replace tokens in a passed command like:
     * - %sugar: Replaced by either "sugar" or "sugard" depending on the environment
     * - Support all the tokens supported by the "replaceTokens" function of the sugar package
     *
     * @param        {String} command The command to replace tokens in
     * @return       {String} The command with the replaced tokens
     *
     * @since           2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com>
     */
    static replaceTokens(command: string): string {
        command = __replaceTokens(command);
        command = command.replace(/%sugar/gm, SSugarCli.command);
        command = this.replaceSugarCommandForDev(command);
        return command;
    }

    /**
     * @name           replaceSugarCommandForDev
     * @type            Function
     * @static
     *
     * Replace the starting "sugar" by "sugard" in the command line when needed
     *
     * @param        {String} command The command to replace "sugar" in
     * @return       {String} The command with the replaced "sugar"
     *
     * @since           2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com>
     */
    static replaceSugarCommandForDev(command: string): string {
        if (!command.match(/^sugar\s/)) return command;
        return command.replace(/^sugar/, this.command);
    }

    /**
     * @name           constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor() {
        __SBench.start('sugar.cli');

        if (process.env.TREAT_AS_MAIN) {
            this._treatAsMain = true;
            process.env.TREAT_AS_MAIN = false;
        }

        this.args = this._parseArgs(process.argv);

        this._setNodeEnv();

        (async () => {
            __SBench.step('sugar.cli', 'beforeLoadConfig');

            // load the sugar config
            const config = await __SSugarConfig.load();
            // console.log(
            //     __SSugarConfig.get(
            //         'theme.themes.coffeekraken-dark.color.complementary.default',
            //     ),
            // );

            // hook base console functions
            this._proxyConsole();

            __SBench.step('sugar.cli', 'afterLoadConfig');

            __SBench.step('sugar.cli', 'beforeClearTmpDir');
            // clean som folders like tmp, etc...
            __fsExtra.emptyDirSync(
                __SSugarConfig.get('storage.package.tmpDir'),
            );
            __SBench.step('sugar.cli', 'afterClearTmpDir');

            // init stdio and event emitter
            this._eventEmitter = new __SEventEmitter({
                metas: {
                    id: 'Sugar',
                },
            });

            if (__isChildProcess()) {
                this._eventEmitter.pipeTo(process);
            }

            // writeLog event
            this._eventEmitter.on('writeLog', (logObj) => {
                this.writeLog(logObj.value);
            });

            __SBench.step('sugar.cli', 'beforeLoadSugarJson');

            // reading sugarJsons
            const sugarJsonInstance = new __SSugarJson();
            this._sugarJsons = await sugarJsonInstance.read();

            __SBench.step('sugar.cli', 'afterLoadSugarJson');

            __SBench.step('sugar.cli', 'beforeLoadAvailableCli');

            // init available cli
            await this._getAvailableCli();

            __SBench.step('sugar.cli', 'afterLoadAvailableCli');

            // help
            if (this.args.isHelp) {
                this._displayHelp(this.args.stack, this.args.action);
                return;
            }

            // interactive
            if (!this.args.stack && !this.args.action && !this.args.params) {
                this._interactivePrompt();
                return;
            }

            __SBench.step('sugar.cli', 'beforeProcess');
            __SBench.end('sugar.cli', {
                log: true,
            });

            // normal process
            await this._process();

            __SBench.step('sugar.cli', 'afterProcess');
        })();
    }

    _setNodeEnv() {
        if (this.args.params.env) {
            switch (this.args.params.env) {
                case 'dev':
                case 'development':
                    process.env.NODE_ENV = 'development';
                    break;
                case 'prod':
                case 'production':
                    process.env.NODE_ENV = 'production';
                    break;
                case 'test':
                    process.env.NODE_ENV = 'test';
                    break;
                default:
                    throw new Error(
                        `<red>[sugar]</red> Sorry but the passed env "<yellow>${this.args.params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`,
                    );
                    break;
            }
        } else {
            process.env.NODE_ENV = 'development';
        }
    }

    _parseArgs(argv = process.argv): ISSugarCliArgs {
        const args: ISSugarCliArgs = {};

        args.command =
            argv && argv[2]
                ? argv[2].split(' ')[0]
                : '';

        args.stack = args.command.split('.')[0];
        if (!args.stack?.match(/^[a-zA-Z0-9]+$/)) args.stack = undefined;
        args.action = args.command.split('.')[1] || null;
        if (!args.action?.match(/^[a-zA-Z0-9]+$/)) args.action = undefined;

        const a = argv
                .slice(3)
                .map((arg) => {
                    // @todo      support for command with 1 sub param like: --something "--else"
                    if (arg.includes(' ')) {
                        return `"${arg}"`;
                    } else if (
                        arg.slice(0, 2) !== '--' &&
                        arg.slice(0, 1) !== '-' &&
                        arg.split(' ').length > 1  
                    ) {
                        return `"${arg}"`;
                    }
                    return arg;
                })
                .join(' ') || '';
        args.args = a;
        args.params = __parseArgs(a);

        args.isHelp = false;
        const lastArg = argv.slice(-1)[0];
        if (lastArg.match(/\s?(-h$|--help$)/)) args.isHelp = true;

        return args;
    }

    _proxyConsole() {
        // hooking the consoles methods to parse html at output
        const originalConsole = {};
        ['log', 'warn', 'error', 'trace'].forEach((method) => {
            originalConsole[method] = console[method];
            console[method] = (...args) => {
                args.forEach((value, i) => {
                    if (typeof value === 'string') {
                        args[i] = __parseHtml(args[i]);
                    }
                });

                originalConsole[method](...args);
            };
        });
    }

    _isStdioNeeded() {
        return !__isChildProcess() || this._treatAsMain;
    }

    _getCliObj() {

        const defaultStackAction =
            this._availableCli.defaultByStack[this.args.stack];

        if (
            !this._availableCli.endpoints[
                `${this.args.stack}.${this.args.action ?? defaultStackAction}`
            ]
        ) {
            this._displayHelpAfterError();
            process.exit();
        }
        let cliObj =
            this._availableCli.endpoints[
                `${this.args.stack}.${this.args.action ?? defaultStackAction}`
            ];

        return cliObj;
    }

    async _process() {

        // get cli object for current args
        let cliObj = this._getCliObj();

        let argv = [
            process.argv[0],
            process.argv[1],
            process.argv[2],
        ];

        // handle sugar inception
        if (cliObj.command && cliObj.command.match(/^sugard?\s/)) {

            const p = __parseArgs(cliObj.command);
            argv[2] = p['1'];

            argv = [
                ...argv.slice(0,3),
                ...process.argv.slice(2)
            ]

            this.args = this._parseArgs(argv);
            cliObj = this._getCliObj();

        }


        // hook ctrl+c
        __hotkey('ctrl+c').on('press', (e) => {
            // @ts-ignore
            process.emit('SIGINT');
        });

        // @ts-ignore
        if (cliObj.processPath) {
            const { default: processFn, sugarCliSettings } = await import(
                cliObj.processPath
            );

            if (this._isStdioNeeded()) {
                this._stdio = __SStdio.existingOrNew(
                    'default',
                    this._eventEmitter,
                    __SStdio.NO_UI,
                    // sugarCliSettings?.stdio ?? null,
                );
            }

            await __wait(100);

            let args = this.args.args;

            if (cliObj.interfacePath) {
                const { default: int } = await import(cliObj.interfacePath);)
                args = int.apply(this.args.args);
            }

            // @ts-ignore
            const proPromise = processFn(args);
            this._eventEmitter.pipe(proPromise, {});
            await proPromise;
            await __wait(1000);
            if (!__isChildProcess()) {
                process.exit();
            }
        } else if (cliObj.command) {
            if (this._isStdioNeeded()) {
                this._stdio = __SStdio.existingOrNew(
                    'default',
                    this._eventEmitter,
                    // 'terminal',
                );
            }

            const promise = __spawn(
                SSugarCli.replaceTokens(cliObj.command),
                [],
                {},
            );
            this._eventEmitter.pipe(promise);
            const res = await promise;
            if (!__isChildProcess()) {
                process.exit();
            }
        }
    }

    async _getAvailableCli() {
        // loop on each filtered files to build the this._availableCli stack
        for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
            const packageName = Object.keys(this._sugarJsons)[i];
            const sugarJson = this._sugarJsons[packageName];
            const packageJson = (
                await import(
                    sugarJson.metas.path.replace('/sugar.json', '/package.json')
                )
            ).default;
            if (!sugarJson.cli) continue;
            sugarJson.cli.forEach((cliObj) => {
                if (!cliObj.actions) {
                    throw new Error(
                        `The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`,
                    );
                }

                if (cliObj.interactive) {
                    Object.keys(cliObj.interactive).forEach(
                        (interactiveName) => {
                            const interactiveObj =
                                cliObj.interactive[interactiveName];

                            // skip cli that are scoped in package when not in a package
                            if (
                                interactiveObj.scope === 'package' &&
                                !__SEnv.packageJson
                            ) {
                                return;
                            }

                            const cliPath = __path.resolve(
                                sugarJson.metas.path.replace(
                                    /\/sugar\.json$/,
                                    '',
                                ),
                                interactiveObj.process,
                            );

                            let interfacePath;
                            if (interactiveObj.interface) {
                                interfacePath = __path.resolve(
                                    sugarJson.metas.path.replace(
                                        /\/sugar\.json$/,
                                        '',
                                    ),
                                    interactiveObj.interface,
                                );
                            }

                            if (!__fs.existsSync(cliPath))
                                throw new Error(
                                    `[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`,
                                );

                            this._availableInteractiveCli[
                                `${cliObj.stack}.${interactiveName}`
                            ] = {
                                ...interactiveObj,
                                processPath: cliPath,
                                interfacePath,
                            };
                        },
                    );
                }

                Object.keys(cliObj.actions).forEach((action) => {
                    if (action.match(/\s/)) {
                        throw new Error(
                            `The action "<yellow>${action}</yellow>" seems to have some spaces in his id... Please correct that.`,
                        );
                    }

                    const actionObj = cliObj.actions[action];

                    let processPath, command;

                    if (actionObj.command && !actionObj.process) {
                        command = SSugarCli.replaceTokens(actionObj.command);
                    } else {
                        processPath = __path.resolve(
                            sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
                            actionObj.process,
                        );
                        if (!__fs.existsSync(processPath)) {
                            throw new Error(
                                `[sugar.cli] Sorry but the references cli file "${processPath}" does not exists...`,
                            );
                        }
                    }

                    let interfacePath;
                    if (actionObj.interface) {
                        interfacePath = __path.resolve(
                            sugarJson.metas.folderPath,
                            actionObj.interface,
                        );
                    }

                    if (
                        !this.args.action &&
                        cliObj.defaultAction &&
                        action === cliObj.defaultAction
                    ) {
                        this._availableCli.defaultByStack[cliObj.stack] =
                            action;
                    }

                    this._availableCli.endpoints[`${cliObj.stack}.${action}`] =
                        {
                            packageJson,
                            ...actionObj,
                            processPath,
                            command,
                            interfacePath,
                        };
                });
            });
        }

        return true;
    }

    ask(askObj: ISLogAsk): Promise<any> {
        return this._eventEmitter.emit('ask', askObj);
    }

    log(log) {
        if (typeof log === 'string') {
            this._eventEmitter.emit('log', {
                // type: __SLog.TYPE_INFO,
                value: log,
            });
            return;
        }

        this._eventEmitter.emit('log', {
            // type: __SLog.TYPE_INFO,
            ...log,
        });
    }

    async _run(command: string): string {
        const promise = __spawn(command, [], {
            shell: true,
        });
        promise.on('*', (data) => {
            this.log(data.value);
        });

        const res = await promise;
        return res;
    }

    _newStep() {
        const packageJson = __packageJson(__dirname());

        const logStr = [
            __sugarBanner({
                paddingTop: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${packageJson.version}</cyan>`,
            }),
            `<yellow>█</yellow> This process is running in the ${
                process.env.NODE_ENV === 'production'
                    ? '<green>production</green>'
                    : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'
            } environment`,
            !__SEnv.packageJson
                ? `<yellow>█</yellow> This process is running <yellow>outside of an existing package</yellow>.`
                : '',
            !__SEnv.packageJson
                ? `<yellow>█</yellow> Not all the features will be available...`
                : '',
            '<yellow>█</yellow>',
        ]
            .filter((l) => l !== '')
            .join('\n');

        this.log({
            clear: false,
            decorators: false,
            value: logStr,
        });
    }

    async _interactivePrompt() {
        if (this._isStdioNeeded()) {
            this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
        }

        await __wait(100);
        this._newStep();

        const choices: string[] = [];
        for (const [name, obj] of Object.entries(
            this._availableInteractiveCli,
        )) {
            choices.push(`> ${obj.title}`);
        }

        const res = await this.ask({
            type: 'autocomplete',
            message: 'What can Sugar do for you?',
            choices,
        });

        for (const [name, obj] of Object.entries(
            this._availableInteractiveCli,
        )) {
            if (res === `> ${obj.title}`) {
                const pro = (await import(obj.processPath)).default;

                let args = {};
                if (obj.interfacePath) {
                    const { default: int } = await import(obj.interfacePath);
                    args = int.apply({});
                }

                // this._newStep(true);
                const proPromise = pro(args);
                this._eventEmitter.pipe(proPromise, {
                    processor(value, metas) {
                        if (metas.event !== 'log') return value;
                        value.decorators = false;
                        return value;
                    },
                });
                break;
            }
        }
    }

    writeLog(log: string) {
        let currentLog = '';
        if (__fs.existsSync(`${process.cwd()}/sugar.log`)) {
            currentLog = __fs
                .readFileSync(`${process.cwd()}/sugar.log`, 'utf8')
                .toString();
            currentLog += '\n\n';
        }
        currentLog += log;
        __fs.writeFileSync(`${process.cwd()}/sugar.log`, currentLog);
    }

    safeExec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        return promise;
    }

    exec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        this._eventEmitter.pipe(promise);
        return promise;
    }

    async _displayHelp() {
        if (this._isStdioNeeded()) {
            this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
        }

        await __wait(100);

        this._newStep();

        if (this.args.stack && this.args.action) {
            const commandObj =
                this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];

            this.log(
                `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
            );
            this.log(
                `<yellow>█</yellow> Action <cyan>${this.args.stack}.${this.args.action}</cyan>`,
            );
            this.log(
                `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
            );

            this.log(`<yellow>█</yellow>`);
            this.log(`<yellow>█</yellow> ${commandObj.description}`);
            this.log(
                `<yellow>█</yellow> Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`,
            );

            this.log(`<yellow>█</yellow>`);

            this.log(
                `<yellow>████</yellow>   <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`,
            );

            this.log(`<yellow>█</yellow>`);

            if (commandObj.interfacePath) {
                const { default: int } = await import(commandObj.interfacePath);
                Object.entries(int.definition).forEach(([arg, argObj]) => {
                    this.log(
                        `<yellow>█</yellow>   <cyan>${arg}</cyan> ${
                            argObj.alias
                                ? `(<magenta>-${argObj.alias}</magenta>)`
                                : ''
                        }`,
                    );
                    this.log(`<yellow>█</yellow>   ${argObj.description}`);
                    if (argObj.default !== undefined) {
                        this.log(
                            `<yellow>█</yellow>   Default: <magenta>${argObj.default}</magenta>`,
                        );
                    }
                    this.log(`<yellow>█</yellow>`);
                });
            }

            await __wait(1000);

            if (!__isChildProcess()) {
                process.exit();
            }
        }

        const sortedByStack = {};

        Object.keys(this._availableCli.endpoints).forEach((stackAction) => {
            const _stack = stackAction.split('.')[0];
            const _action = stackAction.split('.')[1];

            if (this.args.stack && _stack !== this.args.stack) return;

            if (!sortedByStack[_stack]) sortedByStack[_stack] = {};

            sortedByStack[_stack][_action] =
                this._availableCli.endpoints[stackAction];
        });

        this.log(
            `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
        );
        this.log(`<yellow>█</yellow> Stacks and actions list:`);
        this.log(
            `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
        );

        Object.keys(sortedByStack).forEach((stack) => {
            const stackObj = sortedByStack[stack];

            this.log(`<yellow>█</yellow> <cyan>${stack}</cyan>`);

            Object.keys(stackObj).forEach((action) => {
                const actionObj = stackObj[action];
                if (this._availableCli.defaultByStack[stack] === action) {
                    actionObj.default = true;
                }

                this.log(
                    `<yellow>█</yellow>   <magenta>${action}</magenta>${' '.repeat(
                        20 - action.length,
                    )}: ${actionObj.description}`,
                );
            });
        });

        await __wait(1000);

        if (!__isChildProcess()) {
            process.exit();
        }
    }

    _displayHelpAfterError() {
        const logArray: string[] = [];
        logArray.push(
            `<red>Sorry</red> but the requested "<cyan>${this.args.stack}.${
                this.args.action ?? 'default'
            }</cyan>" command does not exists...`,
        );
        logArray.push(
            `Here's the list of <green>available commands</green> in your context:`,
        );
        logArray.push(' ');
        this.log(logArray.join('\n'));
        this._displayHelp();
    }
}

if (!global._sugarCli) {
    global._sugarCli = new SSugarCli();
}
