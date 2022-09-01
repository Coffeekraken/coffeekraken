#!/usr/bin/env -S node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
require("@coffeekraken/sugar/node/index");
const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
const sugarBanner_1 = __importDefault(require("@coffeekraken/sugar/shared/ascii/sugarBanner"));
const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const replaceCommandTokens_1 = __importDefault(require("../node/replaceCommandTokens"));
const SSugarCliParamsInterface_1 = __importDefault(require("./interface/SSugarCliParamsInterface"));
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
const cliParams = SSugarCliParamsInterface_1.default.apply(process.argv.slice(2).join(' '));
if (cliParams.bench) {
    s_bench_1.default.filter(cliParams.bench === true ? '*' : cliParams.bench);
}
if (!s_log_1.default[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
    console.log(`The log preset "${cliParams.logPreset}" does not exists... Here's the list of available presets:\n${s_log_1.default.PRESETS.map((preset) => {
        return `- ${preset}\n`;
    }).join('')}`);
    cliParams.logPreset = 'default';
}
s_log_1.default.filter(s_log_1.default[`PRESET_${cliParams.logPreset.toUpperCase()}`]);
// dotenv
dotenv_1.default.config();
class SSugarCli {
    static getAvailableCli() {
        return __awaiter(this, void 0, void 0, function* () {
            const cli = yield SSugarCli.init();
            return cli._availableCli;
        });
    }
    static isLocked() {
        console.log('is locked', this._lockFilePath);
        try {
            const processId = parseInt(fs_1.default.readFileSync(this._lockFilePath).toString());
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
            s_bench_1.default.start('sugar.cli');
            if (process.env.TREAT_AS_MAIN) {
                this._treatAsMain = true;
                process.env.TREAT_AS_MAIN = false;
            }
            this.packageJson = (0, jsonSync_1.default)();
            this.cliPackageJson = (0, jsonSync_1.default)((0, dirname_1.default)());
            this.args = this._parseArgs(process.argv);
            this._setNodeEnv();
            s_bench_1.default.step('sugar.cli', 'beforeLoadConfig');
            yield (0, wait_1.default)(10);
            // load the sugar config
            const config = yield s_sugar_config_1.default.load({
                cache: true,
            });
            // console.log('LOADED');
            // console.log(__SSugarConfig.get('themeDefaultLight'));
            // return;
            // check the "sugar.lock" file in the tmp folder
            // only if we are in a package scope
            if (this.packageJson) {
                this._lockFilePath = `${s_sugar_config_1.default.get('storage.package.tmpDir')}/sugar.lock`;
                if (!fs_1.default.existsSync(this._lockFilePath)) {
                    (0, writeFileSync_1.default)(this._lockFilePath, `${process.pid}`);
                    (0, onProcessExit_1.default)(() => {
                        if (!this.isLocked()) {
                            fs_extra_1.default.emptyDirSync(s_sugar_config_1.default.get('storage.package.tmpDir'));
                        }
                    });
                }
            }
            s_bench_1.default.step('sugar.cli', 'afterLoadConfig');
            s_bench_1.default.step('sugar.cli', 'beforeClearTmpDir');
            s_bench_1.default.step('sugar.cli', 'afterClearTmpDir');
            // init stdio and event emitter
            this._eventEmitter = new s_event_emitter_1.default({
                metas: {
                    id: 'Sugar',
                },
            });
            if ((0, childProcess_1.default)()) {
                this._eventEmitter.pipeTo(process);
            }
            // writeLog event
            this._eventEmitter.on('writeLog', (logObj) => {
                this.writeLog(logObj.value);
            });
            s_bench_1.default.step('sugar.cli', 'beforeLoadSugarJson');
            // reading sugarJsons
            const sugarJsonInstance = new s_sugar_json_1.default();
            this._sugarJsons = yield sugarJsonInstance.read();
            s_bench_1.default.step('sugar.cli', 'afterLoadSugarJson');
            s_bench_1.default.step('sugar.cli', 'beforeLoadAvailableCli');
            // init available cli
            yield this._getAvailableCli();
            s_bench_1.default.step('sugar.cli', 'afterLoadAvailableCli');
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
            s_bench_1.default.step('sugar.cli', 'beforeProcess');
            s_bench_1.default.end('sugar.cli', {
                log: true,
            });
            // normal process
            yield this._process();
            s_bench_1.default.step('sugar.cli', 'afterProcess');
        });
    }
    static _setNodeEnv() {
        // do not touch if is jest
        if (process.env.JEST_WORKER_ID)
            return;
        if (!process.env.DEVS_CUT && this.args.params.devsCut) {
            console.log('SET');
            process.env.DEVS_CUT = true;
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
        args.params = (0, parseArgs_1.default)(a);
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
                        args[i] = (0, parseHtml_1.default)(args[i]);
                    }
                });
                originalConsole[method](...args);
            };
        });
    }
    static _initStdio(def = true) {
        if (this._isStdioNeeded()) {
            if (def) {
                this._stdio = s_stdio_1.default.existingOrNew('default', this._eventEmitter, s_stdio_1.default.NO_UI);
            }
        }
    }
    static _isStdioNeeded() {
        return !(0, childProcess_1.default)() || this._treatAsMain;
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
                const p = (0, parseArgs_1.default)(cliObj.command);
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
                const { default: processFn, sugarCliSettings } = yield Promise.resolve().then(() => __importStar(require(cliObj.processPath)));
                // init stdio
                this._initStdio(true, true);
                yield (0, wait_1.default)(100);
                if (!(0, childProcess_1.default)()) {
                    this._newStep();
                }
                let args = this.args.args;
                if (cliObj.interfacePath) {
                    const { default: int } = yield Promise.resolve().then(() => __importStar(require(cliObj.interfacePath)));
                    args = int.apply(this.args.args);
                }
                // @ts-ignore
                const proPromise = processFn(args);
                this._eventEmitter.pipe(proPromise, {});
                proPromise.on('chdir', (directory) => {
                    if (!fs_1.default.existsSync(directory))
                        return;
                    proPromise.emit('log', {
                        value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`,
                    });
                    process.chdir(directory);
                });
                yield proPromise;
                yield (0, wait_1.default)(1000);
                // if (!__isChildProcess()) {
                process.exit(0);
                // }
            }
            else if (cliObj.command) {
                // init stdio
                this._initStdio(true, true);
                const promise = (0, spawn_1.default)((0, replaceCommandTokens_1.default)(cliObj.command), [], {});
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
                const packageJson = (yield Promise.resolve().then(() => __importStar(require(sugarJson.metas.path.replace('/sugar.json', '/package.json'))))).default;
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
                            command = (0, replaceCommandTokens_1.default)(actionObj.command);
                        }
                        else {
                            processPath = path_1.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                            if (!fs_1.default.existsSync(processPath)) {
                                throw new Error(`[sugar.cli] Sorry but the references cli file "${processPath}" does not exists...`);
                            }
                        }
                        let interfacePath;
                        if (actionObj.interface) {
                            interfacePath = path_1.default.resolve(sugarJson.metas.folderPath, actionObj.interface);
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
            const promise = (0, spawn_1.default)(command, [], {
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
            ...(0, sugarBanner_1.default)({
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
        if (fs_1.default.existsSync(`${process.cwd()}/sugar.log`)) {
            currentLog = fs_1.default
                .readFileSync(`${process.cwd()}/sugar.log`, 'utf8')
                .toString();
            currentLog += '\n\n';
        }
        currentLog += log;
        fs_1.default.writeFileSync(`${process.cwd()}/sugar.log`, currentLog);
    }
    static safeExec(command, settings) {
        const promise = (0, spawn_1.default)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        return promise;
    }
    static exec(command, settings) {
        const promise = (0, spawn_1.default)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        this._eventEmitter.pipe(promise);
        return promise;
    }
    static _displayHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            // init stdop
            this._initStdio(true, false);
            yield (0, wait_1.default)(100);
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
                    const { default: int } = yield Promise.resolve().then(() => __importStar(require(commandObj.interfacePath)));
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
                yield (0, wait_1.default)(1000);
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
            yield (0, wait_1.default)(1000);
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
exports.default = SSugarCli;
SSugarCli._availableCli = {
    defaultByStack: {},
    endpoints: {},
};
SSugarCli._availableInteractiveCli = {};
// instanciate the cli only once and not for test environment
if (process.env.NODE_ENV !== 'test') {
    SSugarCli.init();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsZ0VBQXlDO0FBRXpDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELGtGQUE0RDtBQUM1RCw4RkFBd0U7QUFDeEUsMENBQXdDO0FBQ3hDLDRGQUF3RTtBQUN4RSx5RkFBMEU7QUFDMUUsbUdBQTZFO0FBQzdFLG1GQUE2RDtBQUM3RCwrRkFBeUU7QUFDekUseUZBQW1FO0FBQ25FLDZGQUF1RTtBQUN2RSxnRkFBMEQ7QUFDMUQsb0RBQThCO0FBQzlCLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0RBQTBCO0FBQzFCLHdGQUFrRTtBQUNsRSxvR0FBOEU7QUFjOUU7Ozs7Ozs7OztHQVNHO0FBRUgsTUFBTSxTQUFTLEdBQUcsa0NBQTBCLENBQUMsS0FBSyxDQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2xDLENBQUM7QUFFRixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7SUFDakIsaUJBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3JFO0FBRUQsSUFBSSxDQUFDLGVBQU0sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUJBQ0ksU0FBUyxDQUFDLFNBQ2QsK0RBQStELGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM3RSxDQUFDLE1BQU0sRUFB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