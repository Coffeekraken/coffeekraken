#!/usr/bin/env -S node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SLog from '@coffeekraken/s-log';
import __SStdio, { __SStdioBasicAdapter, __SStdioConsoleSource, __SStdioEventEmitterSource, __SStdioNotificationAdapter, } from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __sugarBanner } from '@coffeekraken/sugar/ascii';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __dirname, __readJsonSync, __writeFileSync, } from '@coffeekraken/sugar/fs';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit, __processSugar, __spawn, } from '@coffeekraken/sugar/process';
import __chalk from 'chalk';
import __dotenv from 'dotenv';
import * as __Enquirer from 'enquirer';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __path from 'path';
import __replaceCommandTokens from '../node/replaceCommandTokens';
import __SSugarCliParamsInterface from './interface/SSugarCliParamsInterface';
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
const cliParams = __SSugarCliParamsInterface.apply(process.argv.slice(2).join(' '));
if (!cliParams.bench) {
    __SBench.disable();
}
global._console = {};
['log', 'warn', 'debug', 'info'].forEach((key) => {
    global._console[key] = console[key];
});
if (!__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
    console.log(`The log preset "${cliParams.logPreset}" does not exists... Here's the list of available presets:\n${__SLog.PRESETS.map((preset) => {
        return `- ${preset}\n`;
    }).join('')}`);
    cliParams.logPreset = 'default';
}
__SLog.filter(__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]);
// dotenv
__dotenv.config();
export default class SSugarCli {
    static getAvailableCli() {
        return __awaiter(this, void 0, void 0, function* () {
            const cli = yield SSugarCli.init();
            return cli._availableCli;
        });
    }
    static isLocked() {
        console.log('is locked', this._lockFilePath);
        try {
            const processId = parseInt(__fs.readFileSync(this._lockFilePath).toString());
            if (processId !== process.pid) {
                console.log('locked!!!');
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    static _checkIfWeAreInPackage() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if a packageRootDir exist
            // if not, we are not in a package folder...
            if (!__packageRootDir()) {
                // ask the user if he want to continue at his own risk...
                const result = yield __Enquirer.default.prompt({
                    type: 'confirm',
                    name: 'question',
                    default: false,
                    message: [
                        `${__chalk.bold(__chalk.yellow('!!! SUGAR   !!!'))}`,
                        `${__chalk.bold(__chalk.red('  !!! WARNING !!!'))}`,
                        `${__chalk.bold(__chalk.red('  !!!'))} It seems that ${__chalk.cyan('you are not in a package folder')}...`,
                        `${__chalk.bold(__chalk.red('  !!!'))} Would you like to continue at your own risk?`,
                        `${__chalk.bold(__chalk.red('  !!! WARNING !!!'))}`,
                    ].join('\n'),
                });
                if (!result.question) {
                    return process.exit(0);
                }
            }
            // all is find
            return true;
        });
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
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            // singleton
            if (global._sugarCli)
                return global._sugarCli;
            global._sugarCli = SSugarCli;
            // make sure we are in a package
            yield this._checkIfWeAreInPackage();
            // listen for ctrl+c
            __hotkey('ctrl+c').on('press', () => {
                process.emit('SIGINT');
            });
            this._bench = new __SBench('sugar.cli', {
                bubbles: false,
            });
            if (process.env.TREAT_AS_MAIN) {
                this._treatAsMain = true;
                process.env.TREAT_AS_MAIN = false;
            }
            this.packageJson = __packageJsonSync();
            this.cliPackageJson = __packageJsonSync(__dirname());
            this.args = this._parseArgs(process.argv);
            this._setNodeEnv();
            this._bench.step('beforeLoadConfig');
            yield __wait(10);
            // load the sugar config
            const config = yield __SSugarConfig.load({
                cache: true,
            });
            // console.log('LOADED');
            // console.log(__SSugarConfig.get('viewRenderer'));
            // return;
            // check the "sugar.lock" file in the tmp folder
            // only if we are in a package scope
            if (this.packageJson) {
                this._lockFilePath = `${__SSugarConfig.get('storage.package.tmpDir')}/sugar.lock`;
                if (!__fs.existsSync(this._lockFilePath)) {
                    __writeFileSync(this._lockFilePath, `${process.pid}`);
                    __onProcessExit(() => {
                        if (!this.isLocked()) {
                            __fsExtra.emptyDirSync(__SSugarConfig.get('storage.package.tmpDir'));
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
            this._sugarJsons = yield sugarJsonInstance.read();
            this._bench.step('afterLoadSugarJson');
            this._bench.step('beforeLoadAvailableCli');
            // init available cli
            yield this._getAvailableCli();
            this._bench.step('afterLoadAvailableCli');
            // help
            if (this.args.isHelp) {
                this._displayHelp(this.args.stack, this.args.action);
                return;
            }
            // interactive
            // if (!this.args.stack && !this.args.action && !this.args.params) {
            //     this._interactivePrompt();
            //     return;
            // }
            this._bench.step('beforeProcess');
            this._bench.end();
            // normal process
            yield this._process();
            this._bench.step('afterProcess');
        });
    }
    static _setNodeEnv() {
        // do not touch if is jest
        if (process.env.JEST_WORKER_ID)
            return;
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
                    throw new Error(`<red>[sugar]</red> Sorry but the passed env "<yellow>${this.args.params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`);
                    break;
            }
        }
        else {
            process.env.NODE_ENV = 'development';
        }
    }
    static _parseArgs(argv = process.argv) {
        var _a, _b;
        const args = {};
        args.command = argv && argv[2] ? argv[2].split(' ')[0] : '';
        args.stack = args.command.split('.')[0];
        if (!((_a = args.stack) === null || _a === void 0 ? void 0 : _a.match(/^[a-zA-Z0-9]+$/)))
            args.stack = undefined;
        args.action = args.command.split('.')[1] || null;
        if (!((_b = args.action) === null || _b === void 0 ? void 0 : _b.match(/^[a-zA-Z0-9]+$/)))
            args.action = undefined;
        const a = argv
            .slice(3)
            .map((arg) => {
            // @todo      support for command with 1 sub param like: --something "--else"
            if (arg.includes(' ')) {
                return `"${arg}"`;
            }
            else if (arg.slice(0, 2) !== '--' &&
                arg.slice(0, 1) !== '-' &&
                arg.split(' ').length > 1) {
                return `"${arg}"`;
            }
            return arg;
        })
            .join(' ') || '';
        args.args = a;
        args.params = __parseArgs(a);
        args.isHelp = false;
        if (!args.stack && !args.action)
            args.isHelp = true;
        const lastArg = argv.slice(-1)[0];
        if (lastArg.match(/\s?(-h$|--help$)/))
            args.isHelp = true;
        return args;
    }
    static _proxyConsole() {
        // do not proxy text environment
        if (process.env.NODE_ENV === 'test')
            return;
        // hooking the consoles methods to parse html at output
        const originalConsole = {};
        ['log'].forEach((method) => {
            originalConsole[method] = console[method];
            console[method] = (...args) => {
                args = args.filter((log) => {
                    // sorry node-ipc but I don't want a heart to be displayed at each launch
                    // of the sugar CLI... Of course, war is bad!
                    // https://www.npmjs.com/package/peacenotwar
                    if (log === '♥')
                        return false;
                    return true;
                });
                if (!args.length)
                    return;
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
                this._stdio = new __SStdio('default', [
                    new __SStdioEventEmitterSource(this._eventEmitter),
                    new __SStdioConsoleSource(),
                ], [
                    new __SStdioBasicAdapter(),
                    new __SStdioNotificationAdapter(),
                ]);
            }
        }
    }
    static _isStdioNeeded() {
        return true;
        // return !__isChildProcess() || this._treatAsMain;
    }
    static _getCliObj() {
        var _a, _b;
        const defaultStackAction = this._availableCli.defaultByStack[this.args.stack];
        if (!this._availableCli.endpoints[`${this.args.stack}.${(_a = this.args.action) !== null && _a !== void 0 ? _a : defaultStackAction}`]) {
            this._displayHelpAfterError();
            process.exit(0);
        }
        let cliObj = this._availableCli.endpoints[`${this.args.stack}.${(_b = this.args.action) !== null && _b !== void 0 ? _b : defaultStackAction}`];
        return cliObj;
    }
    static _process() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
            // if (!__isChildProcess()) {
            //     console.log('START');
            //     await __spawn('sugard postcss.build');
            //     console.log('End sugar');
            // } else {
            //     const answer = await console.ask({
            //         type: 'confirm',
            //         message: 'Is that ok??',
            //     });
            //     console.log('answer', answer);
            //     console.log('Hello child');
            // }
            // process.exit();
            // return;
            // @ts-ignore
            if (cliObj.processPath) {
                const { default: processFn, sugarCliSettings } = yield import(cliObj.processPath);
                // init stdio
                this._initStdio(true);
                yield __wait(100);
                if (!__isChildProcess()) {
                    this._newStep();
                }
                let args = this.args.args;
                if (cliObj.interfacePath) {
                    const { default: int } = yield import(cliObj.interfacePath);
                    args = int.apply(this.args.args);
                }
                // @ts-ignore
                const proPromise = processFn(args);
                // this._eventEmitter.pipe(proPromise, {});
                (_a = proPromise.on) === null || _a === void 0 ? void 0 : _a.call(proPromise, 'chdir', (directory) => {
                    if (!__fs.existsSync(directory))
                        return;
                    proPromise.emit('log', {
                        value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`,
                    });
                    process.chdir(directory);
                });
                yield proPromise;
                yield __wait(1000);
                process.exit(0);
            }
            else if (cliObj.command) {
                // init stdio
                this._initStdio(true);
                const promise = __spawn(__replaceCommandTokens(cliObj.command), [], {});
                // this._eventEmitter.pipe(promise);
                yield promise;
                process.exit(0);
            }
        });
    }
    static _getAvailableCli() {
        return __awaiter(this, void 0, void 0, function* () {
            // loop on each filtered files to build the this._availableCli stack
            for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
                const packageName = Object.keys(this._sugarJsons)[i];
                const sugarJson = this._sugarJsons[packageName];
                const packageJson = __readJsonSync(sugarJson.metas.path.replace('/sugar.json', '/package.json'));
                if (!sugarJson.cli)
                    continue;
                sugarJson.cli.forEach((cliObj) => {
                    if (!cliObj.actions) {
                        throw new Error(`The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`);
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
                            throw new Error(`The action "<yellow>${action}</yellow>" seems to have some spaces in his id... Please correct that.`);
                        }
                        const actionObj = cliObj.actions[action];
                        let processPath, command;
                        if (actionObj.command && !actionObj.process) {
                            command = __replaceCommandTokens(actionObj.command);
                        }
                        else {
                            processPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                            if (!__fs.existsSync(processPath)) {
                                throw new Error(`[sugar.cli] Sorry but the references cli file "${processPath}" does not exists...`);
                            }
                        }
                        let interfacePath;
                        if (actionObj.interface) {
                            interfacePath = __path.resolve(sugarJson.metas.folderPath, actionObj.interface);
                        }
                        if (!this.args.action &&
                            cliObj.defaultAction &&
                            action === cliObj.defaultAction) {
                            this._availableCli.defaultByStack[cliObj.stack] =
                                action;
                        }
                        this._availableCli.endpoints[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath,
                            command,
                            interfacePath });
                    });
                });
            }
            return this._availableCli;
        });
    }
    static ask(askObj) {
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
        this._eventEmitter.emit('log', Object.assign({}, log));
    }
    static _run(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = __spawn(command, [], {
                shell: true,
            });
            const res = yield promise;
            return res;
        });
    }
    static _newStep() {
        const packageRootDir = __packageRootDir(), monoPackageRootDir = __packageRootDir(process.cwd(), {
            highest: true,
        });
        [
            ...__sugarBanner({
                borders: false,
                marginLeft: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${this.cliPackageJson.version}</cyan>`,
            }).split('\n'),
            `Environment            : ${process.env.NODE_ENV === 'production'
                ? '<green>production</green>'
                : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'}`,
            `Package directory      : <cyan>${packageRootDir}</cyan>`,
            packageRootDir !== monoPackageRootDir
                ? `Monorepo directory     : <cyan>${monoPackageRootDir}</cyan>`
                : '',
            `Environment variables  : <magenta>dotenv</magenta>`,
            `Devscut                : ${process.env.DEVS_CUT
                ? `<green>true</green>`
                : `<red>false</red>`}`,
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
    static writeLog(log) {
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
    static safeExec(command, settings) {
        const promise = __spawn(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        return promise;
    }
    static exec(command, settings) {
        const promise = __spawn(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        this._eventEmitter.pipe(promise);
        return promise;
    }
    static _displayHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            // init stdop
            this._initStdio(true);
            yield __wait(500);
            this._newStep();
            if (this.args.stack && this.args.action) {
                const commandObj = this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];
                console.log(``);
                console.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
                console.log(`Action <cyan>${this.args.stack}.${this.args.action}</cyan>`);
                console.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
                console.log(``);
                console.log(`${commandObj.description}`);
                console.log(`Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
                console.log(``);
                console.log(`<yellow>█</yellow>  <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`);
                console.log(``);
                // console.log('com', commandObj);
                if (commandObj.interfacePath) {
                    const { default: int } = yield import(commandObj.interfacePath);
                    Object.entries(int.definition).forEach(([arg, argObj]) => {
                        var _a;
                        console.log(`   <cyan>${arg}</cyan> ${argObj.alias
                            ? `(<magenta>-${argObj.alias}</magenta>)`
                            : ''} {<yellow>${(_a = argObj.type.type) !== null && _a !== void 0 ? _a : argObj.type}</yellow>}`);
                        console.log(`   ${argObj.description}`);
                        if (argObj.default !== undefined) {
                            console.log(`   Default: <magenta>${argObj.default}</magenta>`);
                        }
                        console.log(``);
                    });
                }
                yield __wait(1000);
                process.exit(0);
            }
            const sortedByStack = {};
            Object.keys(this._availableCli.endpoints).forEach((stackAction) => {
                const _stack = stackAction.split('.')[0];
                const _action = stackAction.split('.')[1];
                if (this.args.stack && _stack !== this.args.stack)
                    return;
                if (!sortedByStack[_stack])
                    sortedByStack[_stack] = {};
                sortedByStack[_stack][_action] =
                    this._availableCli.endpoints[stackAction];
            });
            console.log(``);
            console.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
            console.log(`<yellow>Stacks</yellow> and <cyan>actions</cyan> list`);
            console.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
            console.log(``);
            Object.keys(sortedByStack).forEach((stack) => {
                const stackObj = sortedByStack[stack];
                console.log(`<cyan>${stack}</cyan>`);
                Object.keys(stackObj).forEach((action) => {
                    var _a;
                    const actionObj = stackObj[action];
                    if (this._availableCli.defaultByStack[stack] === action) {
                        actionObj.default = true;
                    }
                    console.log(`  <magenta>${action}</magenta>${' '.repeat(20 - action.length >= 0 ? 20 - action.length : 2)} ${' '.repeat(7 - actionObj.scope.length)}<grey>${(_a = actionObj.scope) !== null && _a !== void 0 ? _a : 'package'}</grey> : ${actionObj.description}`);
                });
            });
            yield __wait(1000);
            process.exit(0);
        });
    }
    static _displayHelpAfterError() {
        var _a;
        const logArray = [];
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${this.args.stack}.${(_a = this.args.action) !== null && _a !== void 0 ? _a : 'default'}</cyan>" command does not exists...`);
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        logArray.push(' ');
        console.log(logArray.join('\n'));
        this._displayHelp();
    }
}
SSugarCli._availableCli = {
    defaultByStack: {},
    endpoints: {},
};
SSugarCli._availableInteractiveCli = {};
// instanciate the cli only once and not for test environment
if (process.env.NODE_ENV !== 'test') {
    SSugarCli.init();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFFekMsT0FBTyxRQUFRLEVBQUUsRUFDYixvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLDBCQUEwQixFQUMxQiwyQkFBMkIsR0FDOUIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUNILFNBQVMsRUFDVCxjQUFjLEVBQ2QsZUFBZSxHQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsZUFBZSxFQUNmLGNBQWMsRUFDZCxPQUFPLEdBQ1YsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1B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