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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsZ0VBQXlDO0FBRXpDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELGtGQUE0RDtBQUM1RCw4RkFBd0U7QUFDeEUsMENBQXdDO0FBQ3hDLDRGQUF3RTtBQUN4RSx5RkFBMEU7QUFDMUUsbUdBQTZFO0FBQzdFLG1GQUE2RDtBQUM3RCwrRkFBeUU7QUFDekUseUZBQW1FO0FBQ25FLDZGQUF1RTtBQUN2RSxnRkFBMEQ7QUFDMUQsb0RBQThCO0FBQzlCLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0RBQTBCO0FBQzFCLHdGQUFrRTtBQUNsRSxvR0FBOEU7QUFjOUU7Ozs7Ozs7OztHQVNHO0FBRUgsTUFBTSxTQUFTLEdBQUcsa0NBQTBCLENBQUMsS0FBSyxDQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ2xDLENBQUM7QUFFRixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7SUFDakIsaUJBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3JFO0FBRUQsSUFBSSxDQUFDLGVBQU0sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUJBQ0ksU0FBUyxDQUFDLFNBQ2QsK0RBQStELGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM3RSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1AsT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDO0lBQzNCLENBQUMsQ0FDSixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNmLENBQUM7SUFDRixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztDQUNuQztBQUVELGVBQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLFVBQVUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVyRSxTQUFTO0FBQ1QsZ0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQVVsQixNQUFxQixTQUFTO0lBZ0IxQixNQUFNLENBQU8sZUFBZTs7WUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdDLElBQUk7WUFDQSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQ3RCLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNuRCxDQUFDO1lBQ0YsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQU8sSUFBSTs7WUFDYixZQUFZO1lBQ1osSUFBSSxNQUFNLENBQUMsU0FBUztnQkFBRSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDOUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFFN0IsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixpQkFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU1QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQ3JDO1lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFBLGtCQUFpQixHQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLGtCQUFpQixFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsaUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFL0MsTUFBTSxJQUFBLGNBQU0sRUFBQyxFQUFFLENBQUMsQ0FBQztZQUVqQix3QkFBd0I7WUFDeEIsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBYyxDQUFDLElBQUksQ0FBQztnQkFDckMsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsd0RBQXdEO1lBQ3hELFVBQVU7WUFFVixnREFBZ0Q7WUFDaEQsb0NBQW9DO1lBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUN0Qyx3QkFBd0IsQ0FDM0IsYUFBYSxDQUFDO2dCQUNmLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDdEMsSUFBQSx1QkFBZSxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDdEQsSUFBQSx1QkFBZSxFQUFDLEdBQUcsRUFBRTt3QkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTs0QkFDbEIsa0JBQVMsQ0FBQyxZQUFZLENBQ2xCLHdCQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQy9DLENBQUM7eUJBQ0w7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBRTlDLGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hELGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRS9DLCtCQUErQjtZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUkseUJBQWUsQ0FBQztnQkFDckMsS0FBSyxFQUFFO29CQUNILEVBQUUsRUFBRSxPQUFPO2lCQUNkO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFBLHNCQUFnQixHQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVILGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBRWxELHFCQUFxQjtZQUNyQixNQUFNLGlCQUFpQixHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVsRCxpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUVqRCxpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVyRCxxQkFBcUI7WUFDckIsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUU5QixpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUVwRCxPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyRCxPQUFPO2FBQ1Y7WUFFRCxjQUFjO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDNUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLE9BQU87YUFDVjtZQUVELGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM1QyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1lBRUgsaUJBQWlCO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXRCLGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsV0FBVztRQUNkLDBCQUEwQjtRQUMxQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztZQUFFLE9BQU87UUFFdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDdEIsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssYUFBYTtvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1YsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxZQUFZO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLE1BQU07b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO29CQUM5QixNQUFNO2dCQUNWO29CQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcscUdBQXFHLENBQ3BMLENBQUM7b0JBQ0YsTUFBTTthQUNiO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSTs7UUFDakMsTUFBTSxJQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUU1RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFFbkUsTUFBTSxDQUFDLEdBQ0gsSUFBSTthQUNDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNULDZFQUE2RTtZQUM3RSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUNyQjtpQkFBTSxJQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUk7Z0JBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQ3ZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDM0I7Z0JBQ0UsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLG1CQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUUxRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWE7UUFDaEIsZ0NBQWdDO1FBQ2hDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDNUMsdURBQXVEO1FBQ3ZELE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMzQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3ZCLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDdkIseUVBQXlFO29CQUN6RSw2Q0FBNkM7b0JBQzdDLDRDQUE0QztvQkFDNUMsSUFBSSxHQUFHLEtBQUssR0FBRzt3QkFBRSxPQUFPLEtBQUssQ0FBQztvQkFDOUIsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUV6QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtRQUN4QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFRLENBQUMsYUFBYSxDQUNoQyxTQUFTLEVBQ1QsSUFBSSxDQUFDLGFBQWEsRUFDbEIsaUJBQVEsQ0FBQyxLQUFLLENBQ2pCLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjO1FBQ2pCLE9BQU8sQ0FBQyxJQUFBLHNCQUFnQixHQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNwRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVU7O1FBQ2IsTUFBTSxrQkFBa0IsR0FDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2RCxJQUNJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQ3pCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sbUNBQUksa0JBQWtCLEVBQUUsQ0FDakUsRUFDSDtZQUNFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7UUFDRCxJQUFJLE1BQU0sR0FDTixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FDeEIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxtQ0FBSSxrQkFBa0IsRUFBRSxDQUNqRSxDQUFDO1FBRU4sT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU0sQ0FBTyxRQUFROztZQUNqQixrQ0FBa0M7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRS9CLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvRCx5QkFBeUI7WUFDekIsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUN0RCxNQUFNLENBQUMsR0FBRyxJQUFBLG1CQUFXLEVBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVqQixJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQzlCO1lBRUQscUVBQXFFO1lBQ3JFLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQjtZQUVELGFBQWE7WUFDYixJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsd0RBQzdDLE1BQU0sQ0FBQyxXQUFXLEdBQ3JCLENBQUM7Z0JBRUYsYUFBYTtnQkFDYixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxJQUFBLGNBQU0sRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFFbEIsSUFBSSxDQUFDLElBQUEsc0JBQWdCLEdBQUUsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtnQkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFMUIsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUN0QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLHdEQUFhLE1BQU0sQ0FBQyxhQUFhLEdBQUMsQ0FBQztvQkFDNUQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEM7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFeEMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDakMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO3dCQUFFLE9BQU87b0JBQ3hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNuQixLQUFLLEVBQUUsMERBQTBELFNBQVMsU0FBUztxQkFDdEYsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sVUFBVSxDQUFDO2dCQUNqQixNQUFNLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQiw2QkFBNkI7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUk7YUFDUDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUEsZUFBTyxFQUNuQixJQUFBLDhCQUFzQixFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDdEMsRUFBRSxFQUNGLEVBQUUsQ0FDTCxDQUFDO2dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFDMUIsNkJBQTZCO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJO2FBQ1A7UUFDTCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sZ0JBQWdCOztZQUN6QixvRUFBb0U7WUFDcEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sV0FBVyxHQUFHLENBQ2hCLHdEQUNJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDeEIsYUFBYSxFQUNiLGVBQWUsQ0FDbEIsR0FJSixDQUNKLENBQUMsT0FBTyxDQUFDO2dCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRztvQkFBRSxTQUFTO2dCQUM3QixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQ0FBK0MsV0FBVywrQ0FBK0MsQ0FDNUcsQ0FBQztxQkFDTDtvQkFFRCw0QkFBNEI7b0JBQzVCLCtDQUErQztvQkFDL0MsaUNBQWlDO29CQUNqQyxxQ0FBcUM7b0JBQ3JDLHVEQUF1RDtvQkFFdkQsMkVBQTJFO29CQUMzRSxtQkFBbUI7b0JBQ25CLHdEQUF3RDtvQkFDeEQsc0NBQXNDO29CQUN0QyxrQkFBa0I7b0JBQ2xCLDBCQUEwQjtvQkFDMUIsZ0JBQWdCO29CQUVoQiw4Q0FBOEM7b0JBQzlDLGdEQUFnRDtvQkFDaEQsd0NBQXdDO29CQUN4QywwQkFBMEI7b0JBQzFCLHFCQUFxQjtvQkFDckIsMENBQTBDO29CQUMxQyxpQkFBaUI7b0JBRWpCLGlDQUFpQztvQkFDakMsOENBQThDO29CQUM5QyxrREFBa0Q7b0JBQ2xELG9EQUFvRDtvQkFDcEQsNENBQTRDO29CQUM1Qyw4QkFBOEI7b0JBQzlCLHlCQUF5QjtvQkFDekIsZ0RBQWdEO29CQUNoRCxxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFFaEIsNkNBQTZDO29CQUM3QyxtQ0FBbUM7b0JBQ25DLG1IQUFtSDtvQkFDbkgscUJBQXFCO29CQUVyQiw2Q0FBNkM7b0JBQzdDLHVEQUF1RDtvQkFDdkQsb0JBQW9CO29CQUNwQixxQ0FBcUM7b0JBQ3JDLHdDQUF3QztvQkFDeEMsaUNBQWlDO29CQUNqQyxpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2IsU0FBUztvQkFDVCxJQUFJO29CQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUMzQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUJBQXVCLE1BQU0sd0VBQXdFLENBQ3hHLENBQUM7eUJBQ0w7d0JBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFFekMsSUFBSSxXQUFXLEVBQUUsT0FBTyxDQUFDO3dCQUV6QixJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFOzRCQUN6QyxPQUFPLEdBQUcsSUFBQSw4QkFBc0IsRUFBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3ZEOzZCQUFNOzRCQUNILFdBQVcsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUN4QixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEVBQ2xELFNBQVMsQ0FBQyxPQUFPLENBQ3BCLENBQUM7NEJBQ0YsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0NBQy9CLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0RBQWtELFdBQVcsc0JBQXNCLENBQ3RGLENBQUM7NkJBQ0w7eUJBQ0o7d0JBRUQsSUFBSSxhQUFhLENBQUM7d0JBQ2xCLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTs0QkFDckIsYUFBYSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzFCLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUMxQixTQUFTLENBQUMsU0FBUyxDQUN0QixDQUFDO3lCQUNMO3dCQUVELElBQ0ksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07NEJBQ2pCLE1BQU0sQ0FBQyxhQUFhOzRCQUNwQixNQUFNLEtBQUssTUFBTSxDQUFDLGFBQWEsRUFDakM7NEJBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQ0FDM0MsTUFBTSxDQUFDO3lCQUNkO3dCQUVELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQyxpQ0FFakQsV0FBVyxJQUNSLFNBQVMsS0FDWixXQUFXOzRCQUNYLE9BQU87NEJBQ1AsYUFBYSxHQUNoQixDQUFDO29CQUNWLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixLQUFLLEVBQUUsR0FBRzthQUNiLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDM0IsMEJBQTBCO2dCQUMxQixLQUFLLEVBQUUsR0FBRzthQUNiLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssb0JBRXRCLEdBQUcsRUFDUixDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBTyxJQUFJLENBQUMsT0FBZTs7WUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBQSxlQUFPLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWDtZQUNJLEdBQUcsSUFBQSxxQkFBYSxFQUFDO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFVBQVUsRUFBRSxDQUFDO2dCQUNiLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixPQUFPLEVBQUUsY0FBYyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sU0FBUzthQUM5RCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNkLGtDQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVk7Z0JBQ2pDLENBQUMsQ0FBQywyQkFBMkI7Z0JBQzdCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO29CQUNqQyxDQUFDLENBQUMsbUJBQW1CO29CQUNyQixDQUFDLENBQUMsOEJBQ1YsY0FBYztZQUNkLHFFQUFxRTtZQUNyRSxHQUFHO1NBQ047YUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVztRQUN2QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUMvQyxVQUFVLEdBQUcsWUFBSTtpQkFDWixZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUM7aUJBQ2xELFFBQVEsRUFBRSxDQUFDO1lBQ2hCLFVBQVUsSUFBSSxNQUFNLENBQUM7U0FDeEI7UUFDRCxVQUFVLElBQUksR0FBRyxDQUFDO1FBQ2xCLFlBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFlLEVBQUUsUUFBYTtRQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxrQkFDL0IsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBZSxFQUFFLFFBQWE7UUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxlQUFPLEVBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQy9CLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLENBQU8sWUFBWTs7WUFDckIsYUFBYTtZQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTdCLE1BQU0sSUFBQSxjQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWhCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUN4QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQzNDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsR0FBRyxDQUNKLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUMvRCxDQUFDO2dCQUNGLElBQUksQ0FBQyxHQUFHLENBQ0osZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxTQUFTLENBQy9ELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FDSixXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FDL0QsQ0FBQztnQkFFRixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FDSixvQkFBb0IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHFCQUFxQixVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sVUFBVSxDQUMvRyxDQUFDO2dCQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWIsSUFBSSxDQUFDLEdBQUcsQ0FDSixvREFBb0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLHdDQUF3QyxDQUNsSSxDQUFDO2dCQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWIsa0NBQWtDO2dCQUVsQyxJQUFJLFVBQVUsQ0FBQyxhQUFhLEVBQUU7b0JBQzFCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsd0RBQWEsVUFBVSxDQUFDLGFBQWEsR0FBQyxDQUFDO29CQUNoRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFOzt3QkFDckQsSUFBSSxDQUFDLEdBQUcsQ0FDSixZQUFZLEdBQUcsV0FDWCxNQUFNLENBQUMsS0FBSzs0QkFDUixDQUFDLENBQUMsY0FBYyxNQUFNLENBQUMsS0FBSyxhQUFhOzRCQUN6QyxDQUFDLENBQUMsRUFDVixhQUNJLE1BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFJLE1BQU0sQ0FBQyxJQUMvQixZQUFZLENBQ2YsQ0FBQzt3QkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7d0JBQ3JDLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7NEJBQzlCLElBQUksQ0FBQyxHQUFHLENBQ0osd0JBQXdCLE1BQU0sQ0FBQyxPQUFPLFlBQVksQ0FDckQsQ0FBQzt5QkFDTDt3QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFFRCxNQUFNLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVuQiw2QkFBNkI7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUk7YUFDUDtZQUVELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzlELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztvQkFBRSxPQUFPO2dCQUUxRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztvQkFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUV2RCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7b0JBQ3JDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ3JELFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3FCQUM1QjtvQkFFRCxJQUFJLENBQUMsR0FBRyxDQUNKLGNBQWMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQ3ZDLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbkQsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUN2QyxNQUFBLFNBQVMsQ0FBQyxLQUFLLG1DQUFJLFNBQ3ZCLGFBQWEsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUN2QyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5CLDZCQUE2QjtZQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUk7UUFDUixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsc0JBQXNCOztRQUN6QixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFDOUIsUUFBUSxDQUFDLElBQUksQ0FDVCw2Q0FBNkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQ3hELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLG1DQUFJLFNBQ3hCLHFDQUFxQyxDQUN4QyxDQUFDO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FDVCx1RUFBdUUsQ0FDMUUsQ0FBQztRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7O0FBcnRCTCw0QkFzdEJDO0FBN3NCVSx1QkFBYSxHQUEyQjtJQUMzQyxjQUFjLEVBQUUsRUFBRTtJQUNsQixTQUFTLEVBQUUsRUFBRTtDQUNoQixDQUFDO0FBQ0ssa0NBQXdCLEdBQXdCLEVBQUUsQ0FBQztBQTJzQjlELDZEQUE2RDtBQUM3RCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtJQUNqQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDcEIifQ==