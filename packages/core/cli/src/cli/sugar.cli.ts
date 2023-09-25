#!/usr/bin/env -S node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SLog from '@coffeekraken/s-log';
import type { ISStdio } from '@coffeekraken/s-stdio';
import __SStdio, {
    __SStdioBasicAdapter,
    __SStdioConsoleSource,
    __SStdioEventEmitterSource,
    __SStdioNotificationAdapter,
} from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __sugarBanner } from '@coffeekraken/sugar/ascii';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __wait } from '@coffeekraken/sugar/datetime';
import {
    __dirname,
    __readJsonSync,
    __writeFileSync,
} from '@coffeekraken/sugar/fs';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import {
    __onProcessExit,
    __processSugar,
    __spawn,
} from '@coffeekraken/sugar/process';
import __chalk from 'chalk';
import __dotenv from 'dotenv';
import * as __Enquirer from 'enquirer';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __path from 'path';
import __replaceCommandTokens from '../node/replaceCommandTokens.js';
import __SSugarCliParamsInterface from './interface/SSugarCliParamsInterface.js';

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

/**
 * @name            sugar.cli
 * @namespace           cli
 * @type            File
 *
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 *
 * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

// process sugar
__processSugar();

const cliParams = __SSugarCliParamsInterface.apply(
    process.argv.slice(2).join(' '),
);

if (!cliParams.bench) {
    __SBench.disable();
}

global._console = {};
['log', 'warn', 'debug', 'info'].forEach((key) => {
    global._console[key] = console[key];
});

if (!__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
    console.log(
        `The log preset "${
            cliParams.logPreset
        }" does not exists... Here's the list of available presets:\n${__SLog.PRESETS.map(
            (preset) => {
                return `- ${preset}\n`;
            },
        ).join('')}`,
    );
    cliParams.logPreset = 'default';
}

__SLog.filter(__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]);

// dotenv
__dotenv.config();

export interface ISSugarCliArgs {
    command: string;
    stack: string;
    action: string;
    isHelp: boolean;
    params: Record<string, any>;
}

export default class SSugarCli {
    static _stdio: ISStdio;
    static _websocketStdio: ISStdio;
    static _eventEmitter: __SEventEmitter;
    static _treatAsMain: boolean;
    static _sugarJsons: any;
    static _bench: __SBench;

    static args: ISSugarCliArgs;

    static _availableCli: ISSugarCliAvailableCli = {
        defaultByStack: {},
        endpoints: {},
    };
    static _availableInteractiveCli: Record<string, any> = {};
    static _lockFilePath: string;

    static async getAvailableCli() {
        const cli = await SSugarCli.init();
        return cli._availableCli;
    }

    static isLocked() {
        console.log('is locked', this._lockFilePath);

        try {
            const processId = parseInt(
                __fs.readFileSync(this._lockFilePath).toString(),
            );
            if (processId !== process.pid) {
                console.log('locked!!!');
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    static async _checkIfWeAreInPackage() {
        // check if a packageRootDir exist
        // if not, we are not in a package folder...
        if (!__packageRootDir()) {
            // ask the user if he want to continue at his own risk...
            const result = await __Enquirer.default.prompt({
                type: 'confirm',
                name: 'question',
                default: false,
                message: [
                    `${__chalk.bold(__chalk.yellow('!!! SUGAR   !!!'))}`,
                    `${__chalk.bold(__chalk.red('  !!! WARNING !!!'))}`,
                    `${__chalk.bold(
                        __chalk.red('  !!!'),
                    )} It seems that ${__chalk.cyan(
                        'you are not in a package folder',
                    )}...`,
                    `${__chalk.bold(
                        __chalk.red('  !!!'),
                    )} Would you like to continue at your own risk?`,
                    `${__chalk.bold(__chalk.red('  !!! WARNING !!!'))}`,
                ].join('\n'),
            });
            if (!result.question) {
                return process.exit(0);
            }
        }

        // all is find
        return true;
    }

    /**
     * @name           init
     * @type            Function
     * @static
     *
     * Init cli
     *
     * @since       2.0.0
     * @author      Olivier Bossel <olivier.bossel@gmail.com>
     */
    static async init() {
        // listen for ctrl+c
        __hotkey('ctrl+c')?.on('press', () => {
            process.emit('custom_exit');
            process.emit('SIGINT');
        });

        // singleton
        if (global._sugarCli) return global._sugarCli;
        global._sugarCli = SSugarCli;

        // parse arguments
        this.args = this._parseArgs(process.argv);

        // set node environment (MUST be before config loading)
        this._setNodeEnv();

        // make sure we are in a package
        await this._checkIfWeAreInPackage();

        // load the sugar config
        await __SSugarConfig.load({
            cache: true,
        });

        // console.log('LOADED');
        // console.log(__SSugarConfig.get('storage.src.jsDir'));
        // return;

        this._bench = new __SBench('sugar.cli', {
            bubbles: false,
        });

        if (process.env.TREAT_AS_MAIN) {
            this._treatAsMain = true;
            process.enrestav.TREAT_AS_MAIN = false;
        }

        this.packageJson = __packageJsonSync();
        this.cliPackageJson = __packageJsonSync(__dirname());

        this._bench.step('beforeLoadConfig');

        // check the "sugar.lock" file in the tmp folder
        // only if we are in a package scope
        if (this.packageJson) {
            this._lockFilePath = `${__SSugarConfig.get(
                'storage.package.tmpDir',
            )}/sugar.lock`;
            if (!__fs.existsSync(this._lockFilePath)) {
                __writeFileSync(this._lockFilePath, `${process.pid}`);
                __onProcessExit(() => {
                    if (!this.isLocked()) {
                        __fsExtra.emptyDirSync(
                            __SSugarConfig.get('storage.package.tmpDir'),
                        );
                    }
                });
            }
        }

        this._bench.step('afterLoadConfig');

        this._bench.step('beforeClearTmpDir');
        this._bench.step('afterClearTmpDir');

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

        this._bench.step('beforeLoadSugarJson');

        // reading sugarJsons
        const sugarJsonInstance = new __SSugarJson();
        this._sugarJsons = await sugarJsonInstance.read();

        this._bench.step('afterLoadSugarJson');

        this._bench.step('beforeLoadAvailableCli');

        // init available cli
        await this._getAvailableCli();

        this._bench.step('afterLoadAvailableCli');

        // help
        if (this.args.isHelp) {
            this._displayHelp(this.args.stack, this.args.action);
            return;
        }

        this._bench.step('beforeProcess');
        this._bench.end();

        // normal process
        await this._process();

        this._bench.step('afterProcess');
    }

    static _setNodeEnv() {
        // do not touch if is jest
        if (process.env.JEST_WORKER_ID) return;

        // devsCut
        if (!process.env.DEVS_CUT && this.args.params.devsCut) {
            process.env.DEVS_CUT = true;
        }

        // verbose
        if (!process.env.VERBOSE && this.args.params.verbose) {
            process.env.VERBOSE = 'true';
        }

        // target
        if (!process.env.TARGET && this.args.params.target) {
            process.env.TARGET = this.args.params.target;
        }

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

    static _parseArgs(argv = process.argv): ISSugarCliArgs {
        const args: ISSugarCliArgs = {};

        args.command = argv && argv[2] ? argv[2].split(' ')[0] : '';

        args.stack = args.command.split('.')[0];
        if (!args.stack?.match(/^[a-zA-Z0-9]+$/)) args.stack = undefined;
        args.action = args.command.split('.')[1] || null;
        if (!args.action?.match(/^[a-zA-Z0-9]+$/)) args.action = undefined;

        const a =
            argv
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
        if (!args.stack && !args.action) args.isHelp = true;
        const lastArg = argv.slice(-1)[0];
        if (lastArg.match(/\s?(-h$|--help$)/)) args.isHelp = true;

        return args;
    }

    static _proxyConsole() {
        // do not proxy text environment
        if (process.env.NODE_ENV === 'test') return;
        // hooking the consoles methods to parse html at output
        const originalConsole = {};
        ['log'].forEach((method) => {
            originalConsole[method] = console[method];
            console[method] = (...args) => {
                args = args.filter((log) => {
                    // sorry node-ipc but I don't want a heart to be displayed at each launch
                    // of the sugar CLI... Of course, war is bad!
                    // https://www.npmjs.com/package/peacenotwar
                    if (log === '♥') return false;
                    return true;
                });

                if (!args.length) return;

                args.forEach((value, i) => {
                    if (typeof value === 'string') {
                        args[i] = __parseHtml(args[i]);
                    }
                });

                originalConsole[method](...args);
            };
        });
    }

    static async _initStdio(def = true) {
        if (this._isStdioNeeded()) {
            if (def) {
                this._stdio = new __SStdio(
                    'default',
                    [
                        new __SStdioEventEmitterSource(this._eventEmitter),
                        new __SStdioConsoleSource(),
                    ],
                    [
                        new __SStdioBasicAdapter(),
                        new __SStdioNotificationAdapter(),
                    ],
                );
                await __wait();
            }
        }
    }

    static _isStdioNeeded() {
        return true;
        // return !__isChildProcess() || this._treatAsMain;
    }

    static _getCliObj() {
        const defaultStackAction =
            this._availableCli.defaultByStack[this.args.stack];

        if (
            !this._availableCli.endpoints[
                `${this.args.stack}.${this.args.action ?? defaultStackAction}`
            ]
        ) {
            this._displayHelpAfterError();
            process.exit(0);
        }
        let cliObj =
            this._availableCli.endpoints[
                `${this.args.stack}.${this.args.action ?? defaultStackAction}`
            ];

        return cliObj;
    }

    static async _process() {
        // get cli object for current args
        let cliObj = this._getCliObj();

        let argv = [process.argv[0], process.argv[1], process.argv[2]];

        // handle sugar inception
        if (cliObj.command && cliObj.command.match(/^sugard?\s/)) {
            const p = __parseArgs(cliObj.command);
            argv[2] = p['1'];

            argv = [...argv.slice(0, 3), ...process.argv.slice(2)];

            this.args = this._parseArgs(argv);
            cliObj = this._getCliObj();
        }

        // protect from executing command package scoped outside of a package
        if (cliObj.scope === 'package' && !this.packageJson) {
            console.error(`This command has to be uesed inside a package...`);
            process.exit();
        }

        // @ts-ignore
        if (cliObj.processPath) {
            const { default: processFn, sugarCliSettings } = await import(
                cliObj.processPath
            );

            // init stdio
            await this._initStdio(true);

            if (!__isChildProcess()) {
                this._newStep();
            }

            let args = this.args.args;

            if (cliObj.interfacePath) {
                const { default: int } = await import(cliObj.interfacePath);
                args = int.apply(this.args.args);
            }

            // @ts-ignore
            const proPromise = processFn(args);

            await proPromise;

            process.exit(0);
        } else if (cliObj.command) {
            // init stdio
            await this._initStdio(true);
            const promise = __spawn(
                __replaceCommandTokens(cliObj.command),
                [],
                {},
            );
            await promise;
            process.exit(0);
        }
    }

    static async _getAvailableCli() {
        // loop on each filtered files to build the this._availableCli stack
        for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
            const packageName = Object.keys(this._sugarJsons)[i];
            const sugarJson = this._sugarJsons[packageName];

            const packageJson = __readJsonSync(
                sugarJson.metas.path.replace('/sugar.json', '/package.json'),
            );

            if (!sugarJson.cli) continue;
            sugarJson.cli.forEach((cliObj) => {
                if (!cliObj.actions) {
                    throw new Error(
                        `The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`,
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
                        command = __replaceCommandTokens(actionObj.command);
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

        return this._availableCli;
    }

    static ask(askObj: ISLogAsk): Promise<any> {
        return this._eventEmitter.emit('ask', askObj);
    }

    static log(log) {
        if (log === '') {
            this._eventEmitter.emit('log', {
                value: ' ',
            });
            return;
        }

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

    static async _run(command: string): string {
        const promise = __spawn(command, [], {
            shell: true,
        });
        const res = await promise;
        return res;
    }

    static _newStep() {
        const packageRootDir = __packageRootDir(),
            monoPackageRootDir = __packageRootDir(process.cwd(), {
                highest: true,
            });

        [
            ...__sugarBanner({
                borders: false,
                marginLeft: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${this.cliPackageJson.version}</cyan>`,
            }).split('\n'),
            `Environment            : ${
                process.env.NODE_ENV === 'production'
                    ? '<green>production</green>'
                    : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'
            }`,
            `Package directory      : <cyan>${packageRootDir}</cyan>`,
            packageRootDir !== monoPackageRootDir
                ? `Monorepo directory     : <cyan>${monoPackageRootDir}</cyan>`
                : '',
            `Environment variables  : <magenta>dotenv</magenta>`,
            `Devscut                : ${
                process.env.DEVS_CUT
                    ? `<green>true</green>`
                    : `<red>false</red>`
            }`,
            ' ',
        ]
            .filter((l) => l !== '')
            .forEach((l) => {
                console.log({
                    clear: false,
                    decorators: false,
                    value: l,
                });
            });
    }

    static writeLog(log: string) {
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

    static safeExec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        return promise;
    }

    static exec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        this._eventEmitter.pipe(promise);
        return promise;
    }

    static async _displayHelp(stack?, action?) {
        // init stdop
        await this._initStdio(true);

        this._newStep();

        if (stack && action) {
            const commandObj =
                this._availableCli.endpoints[`${stack}.${action}`];

            console.log(``);
            console.log(
                `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
            );
            console.log(
                `Action <cyan>${this.args.stack}.${this.args.action}</cyan>`,
            );
            console.log(
                `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
            );

            console.log(``);
            console.log(`${commandObj.description}`);
            console.log(
                `Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`,
            );

            console.log(``);

            console.log(
                `<yellow>█</yellow>  <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`,
            );

            console.log(``);

            if (commandObj.interfacePath) {
                const { default: int } = await import(commandObj.interfacePath);
                Object.entries(int.definition).forEach(([arg, argObj]) => {
                    console.log(
                        `   <cyan>${arg}</cyan> ${
                            argObj.alias
                                ? `(<magenta>-${argObj.alias}</magenta>)`
                                : ''
                        } {<yellow>${
                            argObj.type?.type ?? argObj.type
                        }</yellow>}`,
                    );
                    console.log(`   ${argObj.description}`);
                    if (argObj.default !== undefined) {
                        console.log(
                            `   Default: <magenta>${argObj.default}</magenta>`,
                        );
                    }
                    console.log(``);
                });
            }

            process.exit(0);
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

        console.log(``);
        console.log(
            `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
        );
        console.log(`<yellow>Stacks</yellow> and <cyan>actions</cyan> list`);
        console.log(
            `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
        );
        console.log(``);

        Object.keys(sortedByStack).forEach((stack) => {
            const stackObj = sortedByStack[stack];

            console.log(`<cyan>${stack}</cyan>`);

            Object.keys(stackObj).forEach((action) => {
                const actionObj = stackObj[action];
                if (this._availableCli.defaultByStack[stack] === action) {
                    actionObj.default = true;
                }

                console.log(
                    `  <magenta>${action}</magenta>${' '.repeat(
                        20 - action.length >= 0 ? 20 - action.length : 2,
                    )} ${' '.repeat(7 - actionObj.scope.length)}<grey>${
                        actionObj.scope ?? 'package'
                    }</grey> : ${actionObj.description}`,
                );
            });
        });

        process.exit(0);
    }

    static _displayHelpAfterError() {
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
        console.log(logArray.join('\n'));
        this._displayHelp();
    }
}

// instanciate the cli only once and not for test environment
if (process.env.NODE_ENV !== 'test') {
    SSugarCli.init();
}
