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
const cliParams = __SSugarCliParamsInterface.apply(process.argv.slice(2).join(' '));
if (cliParams.bench) {
    __SBench.filter(cliParams.bench === true ? '*' : cliParams.bench);
}
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
                console.log('lockec!!!');
                return true;
            }
            return false;
        }
        catch (e) {
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
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            // singleton
            if (global._sugarCli)
                return global._sugarCli;
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
            yield __wait(10);
            // load the sugar config
            const config = yield __SSugarConfig.load({
                cache: true,
            });
            // console.log('LOADED');
            // console.log(__SSugarConfig.get('themeDefaultLight'));
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
            this._sugarJsons = yield sugarJsonInstance.read();
            __SBench.step('sugar.cli', 'afterLoadSugarJson');
            __SBench.step('sugar.cli', 'beforeLoadAvailableCli');
            // init available cli
            yield this._getAvailableCli();
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
            yield this._process();
            __SBench.step('sugar.cli', 'afterProcess');
        });
    }
    static _setNodeEnv() {
        // do not touch if is jest
        if (process.env.JEST_WORKER_ID)
            return;
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
                this._stdio = __SStdio.existingOrNew('default', this._eventEmitter, __SStdio.NO_UI);
            }
        }
    }
    static _isStdioNeeded() {
        return !__isChildProcess() || this._treatAsMain;
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
            // @ts-ignore
            if (cliObj.processPath) {
                const { default: processFn, sugarCliSettings } = yield import(cliObj.processPath);
                // init stdio
                this._initStdio(true, true);
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
                this._eventEmitter.pipe(proPromise, {});
                proPromise.on('chdir', (directory) => {
                    if (!__fs.existsSync(directory))
                        return;
                    proPromise.emit('log', {
                        value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`,
                    });
                    process.chdir(directory);
                });
                yield proPromise;
                yield __wait(1000);
                // if (!__isChildProcess()) {
                process.exit(0);
                // }
            }
            else if (cliObj.command) {
                // init stdio
                this._initStdio(true, true);
                const promise = __spawn(__replaceCommandTokens(cliObj.command), [], {});
                this._eventEmitter.pipe(promise);
                const res = yield promise;
                // if (!__isChildProcess()) {
                process.exit(0);
                // }
            }
        });
    }
    static _getAvailableCli() {
        return __awaiter(this, void 0, void 0, function* () {
            // loop on each filtered files to build the this._availableCli stack
            for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
                const packageName = Object.keys(this._sugarJsons)[i];
                const sugarJson = this._sugarJsons[packageName];
                const packageJson = (yield import(sugarJson.metas.path.replace('/sugar.json', '/package.json'), {
                    assert: { type: 'json' },
                })).default;
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
            promise.on('*', (data) => {
                this.log(data.value);
            });
            const res = yield promise;
            return res;
        });
    }
    static _newStep() {
        [
            ...__sugarBanner({
                borders: false,
                marginLeft: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${this.cliPackageJson.version}</cyan>`,
            }).split('\n'),
            `This process is running in the ${process.env.NODE_ENV === 'production'
                ? '<green>production</green>'
                : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'} environment`,
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
            this._initStdio(true, false);
            yield __wait(100);
            this._newStep();
            if (this.args.stack && this.args.action) {
                const commandObj = this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];
                this.log(``);
                this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
                this.log(`Action <cyan>${this.args.stack}.${this.args.action}</cyan>`);
                this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
                this.log(``);
                this.log(`${commandObj.description}`);
                this.log(`Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
                this.log(``);
                this.log(`<yellow>█</yellow>  <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`);
                this.log(``);
                // console.log('com', commandObj);
                if (commandObj.interfacePath) {
                    const { default: int } = yield import(commandObj.interfacePath);
                    Object.entries(int.definition).forEach(([arg, argObj]) => {
                        var _a;
                        this.log(`   <cyan>${arg}</cyan> ${argObj.alias
                            ? `(<magenta>-${argObj.alias}</magenta>)`
                            : ''} {<yellow>${(_a = argObj.type.type) !== null && _a !== void 0 ? _a : argObj.type}</yellow>}`);
                        this.log(`   ${argObj.description}`);
                        if (argObj.default !== undefined) {
                            this.log(`   Default: <magenta>${argObj.default}</magenta>`);
                        }
                        this.log(``);
                    });
                }
                yield __wait(1000);
                // if (!__isChildProcess()) {
                process.exit(0);
                // }
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
            this.log(``);
            this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
            this.log(`<yellow>Stacks</yellow> and <cyan>actions</cyan> list`);
            this.log(`<yellow>${'-'.repeat(process.stdout.columns - 4)}</yellow>`);
            this.log(``);
            Object.keys(sortedByStack).forEach((stack) => {
                const stackObj = sortedByStack[stack];
                this.log(`<cyan>${stack}</cyan>`);
                Object.keys(stackObj).forEach((action) => {
                    var _a;
                    const actionObj = stackObj[action];
                    if (this._availableCli.defaultByStack[stack] === action) {
                        actionObj.default = true;
                    }
                    this.log(`  <magenta>${action}</magenta>${' '.repeat(20 - action.length >= 0 ? 20 - action.length : 2)} ${' '.repeat(7 - actionObj.scope.length)}<grey>${(_a = actionObj.scope) !== null && _a !== void 0 ? _a : 'package'}</grey> : ${actionObj.description}`);
                });
            });
            yield __wait(1000);
            // if (!__isChildProcess()) {
            process.exit(0);
            // }
        });
    }
    static _displayHelpAfterError() {
        var _a;
        const logArray = [];
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${this.args.stack}.${(_a = this.args.action) !== null && _a !== void 0 ? _a : 'default'}</cyan>" command does not exists...`);
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        logArray.push(' ');
        this.log(logArray.join('\n'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxPQUFPLE1BQU0sd0NBQXdDLENBQUM7QUFDN0QsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFDekUsT0FBTyxXQUFXLE1BQU0sMENBQTBDLENBQUM7QUFDbkUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFDakMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sc0JBQXNCLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQWM5RTs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFNBQVMsR0FB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