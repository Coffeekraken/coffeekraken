#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-bench", "@coffeekraken/s-env", "@coffeekraken/s-event-emitter", "@coffeekraken/s-stdio", "@coffeekraken/s-sugar-config", "@coffeekraken/s-sugar-json", "@coffeekraken/sugar/node/index", "@coffeekraken/sugar/node/is/childProcess", "@coffeekraken/sugar/node/process/spawn", "@coffeekraken/sugar/shared/ascii/sugarBanner", "@coffeekraken/sugar/node/package/jsonSync", "@coffeekraken/sugar/shared/cli/parseArgs", "@coffeekraken/sugar/shared/cli/argsToString", "@coffeekraken/sugar/shared/time/wait", "fs", "fs-extra", "path", "@coffeekraken/sugar/node/token/replaceTokens", "@coffeekraken/s-log", "@coffeekraken/sugar/shared/console/parseHtml", "./interface/SSugarCliParamsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
    const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
    const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
    const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
    const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
    const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
    require("@coffeekraken/sugar/node/index");
    const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
    const spawn_1 = __importDefault(require("@coffeekraken/sugar/node/process/spawn"));
    const sugarBanner_1 = __importDefault(require("@coffeekraken/sugar/shared/ascii/sugarBanner"));
    const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
    const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
    const argsToString_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/argsToString"));
    const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
    const fs_1 = __importDefault(require("fs"));
    const fs_extra_1 = __importDefault(require("fs-extra"));
    const path_1 = __importDefault(require("path"));
    const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/node/token/replaceTokens"));
    const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
    const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
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
    class SSugarCli {
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
            this._availableCli = {
                defaultByStack: {},
                endpoints: {},
            };
            this._availableInteractiveCli = {};
            s_bench_1.default.start('sugar.cli');
            if (process.env.TREAT_AS_MAIN) {
                this._treatAsMain = true;
                process.env.TREAT_AS_MAIN = false;
            }
            this.packageJson = (0, jsonSync_1.default)();
            this.args = this._parseArgs(process.argv);
            this._setNodeEnv();
            (() => __awaiter(this, void 0, void 0, function* () {
                s_bench_1.default.step('sugar.cli', 'beforeLoadConfig');
                yield (0, wait_1.default)(10);
                // load the sugar config
                const config = yield s_sugar_config_1.default.load();
                // console.log(
                //     __SSugarConfig.get(
                //         'theme.themes.coffeekraken-dark.color.complementary.default',
                //     ),
                // );
                // console.log(__SSugarConfig.get('theme.themes.default-light.color.info.default.text'));
                // return;
                // if (!this.args.params['no-scripts'] && !this.args.action && this.packageJson.scripts?.[this.args.stack]) {
                //     const scriptCommand = SSugarCli.replaceTokens(this.packageJson.scripts[this.args.stack]);
                //     console.log('SSS', scriptCommand);
                //     __childProcess.spawnSync(scriptCommand, [], {
                //         stdio: 'inherit',
                //         shell: true
                //     });
                //     return;
                // }
                // hook base console functions
                this._proxyConsole();
                s_bench_1.default.step('sugar.cli', 'afterLoadConfig');
                s_bench_1.default.step('sugar.cli', 'beforeClearTmpDir');
                // clean som folders like tmp, etc...
                fs_extra_1.default.emptyDirSync(s_sugar_config_1.default.get('storage.package.tmpDir'));
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
            }))();
        }
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
        static get command() {
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
        static replaceTokens(command, params) {
            command = command.replace('[arguments]', params ? (0, argsToString_1.default)(params) : '');
            command = (0, replaceTokens_1.default)(command);
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
        static replaceSugarCommandForDev(command) {
            if (!command.match(/^sugar\s/))
                return command;
            return command.replace(/^sugar/, this.command);
        }
        _setNodeEnv() {
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
        _parseArgs(argv = process.argv) {
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
        _proxyConsole() {
            // do not proxy text environment
            if (process.env.NODE_ENV === 'test')
                return;
            // hooking the consoles methods to parse html at output
            const originalConsole = {};
            ['log', 'warn', 'error', 'trace'].forEach((method) => {
                originalConsole[method] = console[method];
                console[method] = (...args) => {
                    args.forEach((value, i) => {
                        if (typeof value === 'string') {
                            args[i] = (0, parseHtml_1.default)(args[i]);
                        }
                    });
                    originalConsole[method](...args);
                };
            });
        }
        _initStdio(def = true, websocket = true) {
            if (this._isStdioNeeded()) {
                if (def) {
                    this._stdio = s_stdio_1.default.existingOrNew('default', this._eventEmitter, s_stdio_1.default.NO_UI);
                }
                // if (websocket) {
                //     this._websocketStdio = __SStdio.existingOrNew(
                //         'websocket',
                //         this._eventEmitter,
                //         __SStdio.UI_WEBSOCKET,
                //     );
                // }
            }
        }
        _isStdioNeeded() {
            return !(0, childProcess_1.default)() || this._treatAsMain;
        }
        _getCliObj() {
            var _a, _b;
            const defaultStackAction = this._availableCli.defaultByStack[this.args.stack];
            if (!this._availableCli.endpoints[`${this.args.stack}.${(_a = this.args.action) !== null && _a !== void 0 ? _a : defaultStackAction}`]) {
                this._displayHelpAfterError();
                process.exit(0);
            }
            let cliObj = this._availableCli.endpoints[`${this.args.stack}.${(_b = this.args.action) !== null && _b !== void 0 ? _b : defaultStackAction}`];
            return cliObj;
        }
        _process() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
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
                // @ts-ignore
                if (cliObj.processPath) {
                    const { default: processFn, sugarCliSettings } = yield (_a = cliObj.processPath, __syncRequire ? Promise.resolve().then(() => __importStar(require(_a))) : new Promise((resolve_1, reject_1) => { require([_a], resolve_1, reject_1); }).then(__importStar));
                    // init stdio
                    this._initStdio(true, true);
                    yield (0, wait_1.default)(100);
                    if (!(0, childProcess_1.default)()) {
                        this._newStep();
                    }
                    let args = this.args.args;
                    if (cliObj.interfacePath) {
                        const { default: int } = yield (_b = cliObj.interfacePath, __syncRequire ? Promise.resolve().then(() => __importStar(require(_b))) : new Promise((resolve_2, reject_2) => { require([_b], resolve_2, reject_2); }).then(__importStar));
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
                    const promise = (0, spawn_1.default)(SSugarCli.replaceTokens(cliObj.command), [], {});
                    this._eventEmitter.pipe(promise);
                    const res = yield promise;
                    // if (!__isChildProcess()) {
                    process.exit(0);
                    // }
                }
            });
        }
        _getAvailableCli() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                // loop on each filtered files to build the this._availableCli stack
                for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
                    const packageName = Object.keys(this._sugarJsons)[i];
                    const sugarJson = this._sugarJsons[packageName];
                    const packageJson = (yield (_a = sugarJson.metas.path.replace('/sugar.json', '/package.json'), __syncRequire ? Promise.resolve().then(() => __importStar(require(_a))) : new Promise((resolve_3, reject_3) => { require([_a], resolve_3, reject_3); }).then(__importStar))).default;
                    if (!sugarJson.cli)
                        continue;
                    sugarJson.cli.forEach((cliObj) => {
                        if (!cliObj.actions) {
                            throw new Error(`The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`);
                        }
                        if (cliObj.interactive) {
                            Object.keys(cliObj.interactive).forEach((interactiveName) => {
                                const interactiveObj = cliObj.interactive[interactiveName];
                                // skip cli that are scoped in package when not in a package
                                if (interactiveObj.scope === 'package' &&
                                    !s_env_1.default.packageJson) {
                                    return;
                                }
                                const cliPath = path_1.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), interactiveObj.process);
                                let interfacePath;
                                if (interactiveObj.interface) {
                                    interfacePath = path_1.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), interactiveObj.interface);
                                }
                                if (!fs_1.default.existsSync(cliPath))
                                    throw new Error(`[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`);
                                this._availableInteractiveCli[`${cliObj.stack}.${interactiveName}`] = Object.assign(Object.assign({}, interactiveObj), { processPath: cliPath, interfacePath });
                            });
                        }
                        Object.keys(cliObj.actions).forEach((action) => {
                            if (action.match(/\s/)) {
                                throw new Error(`The action "<yellow>${action}</yellow>" seems to have some spaces in his id... Please correct that.`);
                            }
                            const actionObj = cliObj.actions[action];
                            let processPath, command;
                            if (actionObj.command && !actionObj.process) {
                                command = SSugarCli.replaceTokens(actionObj.command);
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
                                this._availableCli.defaultByStack[cliObj.stack] = action;
                            }
                            this._availableCli.endpoints[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath,
                                command,
                                interfacePath });
                        });
                    });
                }
                return true;
            });
        }
        ask(askObj) {
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
            this._eventEmitter.emit('log', Object.assign({}, log));
        }
        _run(command) {
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
        _newStep() {
            const packageJson = this.packageJson;
            const logStr = [
                ...(0, sugarBanner_1.default)({
                    borders: false,
                    marginLeft: 1,
                    paddingBottom: 1,
                    version: `CLI <cyan>v${packageJson.version}</cyan>`,
                }).split('\n'),
                `This process is running in the ${process.env.NODE_ENV === 'production'
                    ? '<green>production</green>'
                    : process.env.NODE_ENV === 'test'
                        ? '<cyan>test</cyan>'
                        : '<yellow>development</yellow>'} environment`,
                !s_env_1.default.packageJson
                    ? `This process is running <yellow>outside of an existing package</yellow>.`
                    : '',
                !s_env_1.default.packageJson
                    ? `Not all the features will be available...`
                    : '',
                '',
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
        writeLog(log) {
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
        safeExec(command, settings) {
            const promise = (0, spawn_1.default)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
            return promise;
        }
        exec(command, settings) {
            const promise = (0, spawn_1.default)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
            this._eventEmitter.pipe(promise);
            return promise;
        }
        _displayHelp() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                // init stdop
                this._initStdio(true, false);
                yield (0, wait_1.default)(100);
                this._newStep();
                if (this.args.stack && this.args.action) {
                    const commandObj = this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];
                    this.log(` Action <cyan>${this.args.stack}.${this.args.action}</cyan>`);
                    this.log(`<yellow>${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
                    this.log(``);
                    this.log(`${commandObj.description}`);
                    this.log(`Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
                    this.log(``);
                    this.log(`<yellow>██</yellow>   <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`);
                    this.log(``);
                    if (commandObj.interfacePath) {
                        const { default: int } = yield (_a = commandObj.interfacePath, __syncRequire ? Promise.resolve().then(() => __importStar(require(_a))) : new Promise((resolve_4, reject_4) => { require([_a], resolve_4, reject_4); }).then(__importStar));
                        Object.entries(int.definition).forEach(([arg, argObj]) => {
                            this.log(`   <cyan>${arg}</cyan> ${argObj.alias
                                ? `(<magenta>-${argObj.alias}</magenta>)`
                                : ''}`);
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
                    sortedByStack[_stack][_action] = this._availableCli.endpoints[stackAction];
                });
                // this.log(
                //     `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
                // );
                this.log(`Stacks and actions list:`);
                // this.log(
                //     `<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`,
                // );
                Object.keys(sortedByStack).forEach((stack) => {
                    const stackObj = sortedByStack[stack];
                    this.log(`<cyan>${stack}</cyan>`);
                    Object.keys(stackObj).forEach((action) => {
                        const actionObj = stackObj[action];
                        if (this._availableCli.defaultByStack[stack] === action) {
                            actionObj.default = true;
                        }
                        this.log(`  <magenta>${action}</magenta>${' '.repeat(20 - action.length)}: ${actionObj.description}`);
                    });
                });
                yield (0, wait_1.default)(1000);
                // if (!__isChildProcess()) {
                process.exit(0);
                // }
            });
        }
        _displayHelpAfterError() {
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
    // instanciate the cli only once and not for test environment
    if (!global._sugarCli && process.env.NODE_ENV !== 'test') {
        global._sugarCli = new SSugarCli();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE2QztJQUM3QyxnRUFBeUM7SUFDekMsb0ZBQTREO0lBRTVELG9FQUEwRDtJQUMxRCxrRkFBMEQ7SUFDMUQsOEVBQXNEO0lBQ3RELDBDQUF3QztJQUN4Qyw0RkFBd0U7SUFFeEUsbUZBQTZEO0lBQzdELCtGQUF5RTtJQUN6RSx5RkFBc0U7SUFDdEUseUZBQW1FO0lBQ25FLCtGQUF5RTtJQUN6RSxnRkFBMEQ7SUFDMUQsNENBQXNCO0lBQ3RCLHdEQUFpQztJQUVqQyxnREFBMEI7SUFDMUIsaUdBQTJFO0lBQzNFLGdFQUF5QztJQUV6Qyw2RkFBdUU7SUFFdkUsb0dBQThFO0lBYzlFOzs7Ozs7Ozs7T0FTRztJQUVILE1BQU0sU0FBUyxHQUFHLGtDQUEwQixDQUFDLEtBQUssQ0FDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNsQyxDQUFDO0lBQ0YsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO1FBQ2pCLGlCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyRTtJQUVELElBQUksQ0FBQyxlQUFNLENBQUMsVUFBVSxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUNQLG1CQUNJLFNBQVMsQ0FBQyxTQUNkLCtEQUErRCxlQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDN0UsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNQLE9B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