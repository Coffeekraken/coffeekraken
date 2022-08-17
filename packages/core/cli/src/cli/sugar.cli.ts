#!/usr/bin/env -S node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SLog from '@coffeekraken/s-log';
import type { ISStdio } from '@coffeekraken/s-stdio';
import __SStdio from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import '@coffeekraken/sugar/node/index';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __dotenv from 'dotenv';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __path from 'path';
import __replaceCommandTokens from '../node/replaceCommandTokens';
import __SSugarCliParamsInterface from './interface/SSugarCliParamsInterface';

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

const cliParams = __SSugarCliParamsInterface.apply(
    process.argv.slice(2).join(' '),
);

if (cliParams.bench) {
    __SBench.filter(cliParams.bench === true ? '*' : cliParams.bench);
}

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
                console.log('lockec!!!');
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
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
        // singleton
        if (global._sugarCli) return global._sugarCli;
        global._sugarCli = SSugarCli;

        // hook base console functions
        this._proxyConsole();

        __SBench.start('sugar.cli');

        if (process.env.TREAT_AS_MAIN) {
            this._treatAsMain = true;
            process.env.TREAT_AS_MAIN = false;
        }

        this.packageJson = __packageJsonSync();
        this.cliPackageJson = __packageJsonSync(__dirname());

        this.args = this._parseArgs(process.argv);

        this._setNodeEnv();

        __SBench.step('sugar.cli', 'beforeLoadConfig');

        await __wait(10);

        // load the sugar config
        const config = await __SSugarConfig.load({
            cache: true,
        });
        // console.log('LOADED');
        // console.log(__SSugarConfig.get('themeDefaultLight'));
        // return;

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

        __SBench.step('sugar.cli', 'afterLoadConfig');

        __SBench.step('sugar.cli', 'beforeClearTmpDir');
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
    }

    static _setNodeEnv() {
        // do not touch if is jest
        if (process.env.JEST_WORKER_ID) return;

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

    static _initStdio(def = true) {
        if (this._isStdioNeeded()) {
            if (def) {
                this._stdio = __SStdio.existingOrNew(
                    'default',
                    this._eventEmitter,
                    __SStdio.NO_UI,
                );
            }
        }
    }

    static _isStdioNeeded() {
        return !__isChildProcess() || this._treatAsMain;
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
            console.log(`This command has to be uesed inside a package...`);
            process.exit();
        }

        // @ts-ignore
        if (cliObj.processPath) {
            const { default: processFn, sugarCliSettings } = await import(
                cliObj.processPath
            );

            // init stdio
            this._initStdio(true, true);

            await __wait(100);

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
            this._eventEmitter.pipe(proPromise, {});

            proPromise.on('chdir', (directory) => {
                if (!__fs.existsSync(directory)) return;
                proPromise.emit('log', {
                    value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`,
                });
                process.chdir(directory);
            });

            await proPromise;
            await __wait(1000);
            // if (!__isChildProcess()) {
            process.exit(0);
            // }
        } else if (cliObj.command) {
            // init stdio
            this._initStdio(true, true);

            const promise = __spawn(
                __replaceCommandTokens(cliObj.command),
                [],
                {},
            );
            this._eventEmitter.pipe(promise);
            const res = await promise;
            // if (!__isChildProcess()) {
            process.exit(0);
            // }
        }
    }

    static async _getAvailableCli() {
        // loop on each filtered files to build the this._availableCli stack
        for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
            const packageName = Object.keys(this._sugarJsons)[i];
            const sugarJson = this._sugarJsons[packageName];
            const packageJson = (
                await import(
                    sugarJson.metas.path.replace(
                        '/sugar.json',
                        '/package.json',
                    ),
                    {
                        assert: { type: 'json' },
                    }
                )
            ).default;
            if (!sugarJson.cli) continue;
            sugarJson.cli.forEach((cliObj) => {
                if (!cliObj.actions) {
                    throw new Error(
                        `The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`,
                    );
                }

                // if (cliObj.interactive) {
                //     Object.keys(cliObj.interactive).forEach(
                //         (interactiveName) => {
                //             const interactiveObj =
                //                 cliObj.interactive[interactiveName];

                //             // skip cli that are scoped in package when not in a package
                //             if (
                //                 interactiveObj.scope === 'package' &&
                //                 !__SEnv.packageJson
                //             ) {
                //                 return;
                //             }

                //             const cliPath = __path.resolve(
                //                 sugarJson.metas.path.replace(
                //                     /\/sugar\.json$/,
                //                     '',
                //                 ),
                //                 interactiveObj.process,
                //             );

                //             let interfacePath;
                //             if (interactiveObj.interface) {
                //                 interfacePath = __path.resolve(
                //                     sugarJson.metas.path.replace(
                //                         /\/sugar\.json$/,
                //                         '',
                //                     ),
                //                     interactiveObj.interface,
                //                 );
                //             }

                //             if (!__fs.existsSync(cliPath))
                //                 throw new Error(
                //                     `[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`,
                //                 );

                //             this._availableInteractiveCli[
                //                 `${cliObj.stack}.${interactiveName}`
                //             ] = {
                //                 ...interactiveObj,
                //                 processPath: cliPath,
                //                 interfacePath,
                //             };
                //         },
                //     );
                // }

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
        promise.on('*', (data) => {
            this.log(data.value);
        });

        const res = await promise;
        return res;
    }

    static _newStep() {
        [
            ...__sugarBanner({
                borders: false,
                marginLeft: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${this.cliPackageJson.version}</cyan>`,
            }).split('\n'),
            `This process is running in the ${
                process.env.NODE_ENV === 'production'
                    ? '<green>production</green>'
                    : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'
            } environment`,
            `<cyan>ENV</cyan> variable(s) loaded using <magenta>dotenv</magenta>`,
            ' ',
        ]
            .filter((l) => l !== '')
            .forEach((l) => {
                this.log({
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

    static async _displayHelp() {
        // init stdop
        this._initStdio(true, false);

        await __wait(100);

        this._newStep();

        if (this.args.stack && this.args.action) {
            const commandObj =
                this._availableCli.endpoints[
                    `${this.args.stack}.${this.args.action}`
                ];

            this.log(``);
            this.log(
                `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
            );
            this.log(
                `Action <cyan>${this.args.stack}.${this.args.action}</cyan>`,
            );
            this.log(
                `<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`,
            );

            this.log(``);
            this.log(`${commandObj.description}`);
            this.log(
                `Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`,
            );

            this.log(``);

            this.log(
                `<yellow>█</yellow>  <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`,
            );

            this.log(``);

            // console.log('com', commandObj);

            if (commandObj.interfacePath) {
                const { default: int } = await import(commandObj.interfacePath);
                Object.entries(int.definition).forEach(([arg, argObj]) => {
                    this.log(
                        `   <cyan>${arg}</cyan> ${
                            argObj.alias
                                ? `(<magenta>-${argObj.alias}</magenta>)`
                                : ''
                        } {<yellow>${
                            argObj.type.type ?? argObj.type
                        }</yellow>}`,
                    );
                    this.log(`   ${argObj.description}`);
                    if (argObj.default !== undefined) {
                        this.log(
                            `   Default: <magenta>${argObj.default}</magenta>`,
                        );
                    }
                    this.log(``);
                });
            }

            await __wait(1000);

            // if (!__isChildProcess()) {
            process.exit(0);
            // }
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

        this.log(``);
        this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
        this.log(`<yellow>Stacks</yellow> and <cyan>actions</cyan> list`);
        this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
        this.log(``);

        Object.keys(sortedByStack).forEach((stack) => {
            const stackObj = sortedByStack[stack];

            this.log(`<cyan>${stack}</cyan>`);

            Object.keys(stackObj).forEach((action) => {
                const actionObj = stackObj[action];
                if (this._availableCli.defaultByStack[stack] === action) {
                    actionObj.default = true;
                }

                this.log(
                    `  <magenta>${action}</magenta>${' '.repeat(
                        20 - action.length >= 0 ? 20 - action.length : 2,
                    )} ${' '.repeat(7 - actionObj.scope.length)}<grey>${
                        actionObj.scope ?? 'package'
                    }</grey> : ${actionObj.description}`,
                );
            });
        });

        await __wait(1000);

        // if (!__isChildProcess()) {
        process.exit(0);
        // }
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
        this.log(logArray.join('\n'));
        this._displayHelp();
    }
}

// instanciate the cli only once and not for test environment
if (process.env.NODE_ENV !== 'test') {
    SSugarCli.init();
}
