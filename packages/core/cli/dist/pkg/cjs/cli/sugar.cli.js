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
const s_stdio_1 = __importStar(require("@coffeekraken/s-stdio"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const ascii_1 = require("@coffeekraken/sugar/ascii");
const cli_1 = require("@coffeekraken/sugar/cli");
const console_1 = require("@coffeekraken/sugar/console");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const __Enquirer = __importStar(require("enquirer"));
const fs_2 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_2 = __importDefault(require("path"));
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
// process sugar
(0, process_1.__processSugar)();
const cliParams = SSugarCliParamsInterface_1.default.apply(process.argv.slice(2).join(' '));
if (!cliParams.bench) {
    s_bench_1.default.disable();
}
global._console = {};
['log', 'warn', 'debug', 'info'].forEach((key) => {
    global._console[key] = console[key];
});
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
            const processId = parseInt(fs_2.default.readFileSync(this._lockFilePath).toString());
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
            if (!(0, path_1.__packageRootDir)()) {
                // ask the user if he want to continue at his own risk...
                const result = yield __Enquirer.default.prompt({
                    type: 'confirm',
                    name: 'question',
                    default: false,
                    message: [
                        `${chalk_1.default.bold(chalk_1.default.yellow('!!! SUGAR   !!!'))}`,
                        `${chalk_1.default.bold(chalk_1.default.red('  !!! WARNING !!!'))}`,
                        `${chalk_1.default.bold(chalk_1.default.red('  !!!'))} It seems that ${chalk_1.default.cyan('you are not in a package folder')}...`,
                        `${chalk_1.default.bold(chalk_1.default.red('  !!!'))} Would you like to continue at your own risk?`,
                        `${chalk_1.default.bold(chalk_1.default.red('  !!! WARNING !!!'))}`,
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
            (0, keyboard_1.__hotkey)('ctrl+c').on('press', () => {
                process.emit('SIGINT');
            });
            this._bench = new s_bench_1.default('sugar.cli', {
                bubbles: false,
            });
            if (process.env.TREAT_AS_MAIN) {
                this._treatAsMain = true;
                process.env.TREAT_AS_MAIN = false;
            }
            this.packageJson = (0, package_1.__packageJsonSync)();
            this.cliPackageJson = (0, package_1.__packageJsonSync)((0, fs_1.__dirname)());
            this.args = this._parseArgs(process.argv);
            this._setNodeEnv();
            this._bench.step('beforeLoadConfig');
            yield (0, datetime_1.__wait)(10);
            // load the sugar config
            const config = yield s_sugar_config_1.default.load({
                cache: true,
            });
            // console.log('LOADED');
            // console.log(__SSugarConfig.get('viewRenderer'));
            // return;
            // check the "sugar.lock" file in the tmp folder
            // only if we are in a package scope
            if (this.packageJson) {
                this._lockFilePath = `${s_sugar_config_1.default.get('storage.package.tmpDir')}/sugar.lock`;
                if (!fs_2.default.existsSync(this._lockFilePath)) {
                    (0, fs_1.__writeFileSync)(this._lockFilePath, `${process.pid}`);
                    (0, process_1.__onProcessExit)(() => {
                        if (!this.isLocked()) {
                            fs_extra_1.default.emptyDirSync(s_sugar_config_1.default.get('storage.package.tmpDir'));
                        }
                    });
                }
            }
            this._bench.step('afterLoadConfig');
            this._bench.step('beforeClearTmpDir');
            this._bench.step('afterClearTmpDir');
            // init stdio and event emitter
            this._eventEmitter = new s_event_emitter_1.default({
                metas: {
                    id: 'Sugar',
                },
            });
            if ((0, is_1.__isChildProcess)()) {
                this._eventEmitter.pipeTo(process);
            }
            // writeLog event
            this._eventEmitter.on('writeLog', (logObj) => {
                this.writeLog(logObj.value);
            });
            this._bench.step('beforeLoadSugarJson');
            // reading sugarJsons
            const sugarJsonInstance = new s_sugar_json_1.default();
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
        args.params = (0, cli_1.__parseArgs)(a);
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
                        args[i] = (0, console_1.__parseHtml)(args[i]);
                    }
                });
                originalConsole[method](...args);
            };
        });
    }
    static _initStdio(def = true) {
        if (this._isStdioNeeded()) {
            if (def) {
                this._stdio = new s_stdio_1.default('default', [
                    new s_stdio_1.__SStdioEventEmitterSource(this._eventEmitter),
                    new s_stdio_1.__SStdioConsoleSource(),
                ], [
                    new s_stdio_1.__SStdioBasicAdapter(),
                    new s_stdio_1.__SStdioNotificationAdapter(),
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
                const p = (0, cli_1.__parseArgs)(cliObj.command);
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
                const { default: processFn, sugarCliSettings } = yield Promise.resolve().then(() => __importStar(require(cliObj.processPath)));
                // init stdio
                this._initStdio(true);
                yield (0, datetime_1.__wait)(100);
                if (!(0, is_1.__isChildProcess)()) {
                    this._newStep();
                }
                let args = this.args.args;
                if (cliObj.interfacePath) {
                    const { default: int } = yield Promise.resolve().then(() => __importStar(require(cliObj.interfacePath)));
                    args = int.apply(this.args.args);
                }
                // @ts-ignore
                const proPromise = processFn(args);
                // this._eventEmitter.pipe(proPromise, {});
                (_a = proPromise.on) === null || _a === void 0 ? void 0 : _a.call(proPromise, 'chdir', (directory) => {
                    if (!fs_2.default.existsSync(directory))
                        return;
                    proPromise.emit('log', {
                        value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`,
                    });
                    process.chdir(directory);
                });
                yield proPromise;
                yield (0, datetime_1.__wait)(1000);
                process.exit(0);
            }
            else if (cliObj.command) {
                // init stdio
                this._initStdio(true);
                const promise = (0, process_1.__spawn)((0, replaceCommandTokens_1.default)(cliObj.command), [], {});
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
                const packageJson = (0, fs_1.__readJsonSync)(sugarJson.metas.path.replace('/sugar.json', '/package.json'));
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
                            processPath = path_2.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                            if (!fs_2.default.existsSync(processPath)) {
                                throw new Error(`[sugar.cli] Sorry but the references cli file "${processPath}" does not exists...`);
                            }
                        }
                        let interfacePath;
                        if (actionObj.interface) {
                            interfacePath = path_2.default.resolve(sugarJson.metas.folderPath, actionObj.interface);
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
            const promise = (0, process_1.__spawn)(command, [], {
                shell: true,
            });
            const res = yield promise;
            return res;
        });
    }
    static _newStep() {
        const packageRootDir = (0, path_1.__packageRootDir)(), monoPackageRootDir = (0, path_1.__packageRootDir)(process.cwd(), {
            highest: true,
        });
        [
            ...(0, ascii_1.__sugarBanner)({
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
        if (fs_2.default.existsSync(`${process.cwd()}/sugar.log`)) {
            currentLog = fs_2.default
                .readFileSync(`${process.cwd()}/sugar.log`, 'utf8')
                .toString();
            currentLog += '\n\n';
        }
        currentLog += log;
        fs_2.default.writeFileSync(`${process.cwd()}/sugar.log`, currentLog);
    }
    static safeExec(command, settings) {
        const promise = (0, process_1.__spawn)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        return promise;
    }
    static exec(command, settings) {
        const promise = (0, process_1.__spawn)(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        this._eventEmitter.pipe(promise);
        return promise;
    }
    static _displayHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            // init stdop
            this._initStdio(true);
            yield (0, datetime_1.__wait)(500);
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
                    const { default: int } = yield Promise.resolve().then(() => __importStar(require(commandObj.interfacePath)));
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
                yield (0, datetime_1.__wait)(1000);
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
            yield (0, datetime_1.__wait)(1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsZ0VBQXlDO0FBRXpDLGlFQUsrQjtBQUMvQixrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELHFEQUEwRDtBQUMxRCxpREFBc0Q7QUFDdEQseURBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCwrQ0FJZ0M7QUFDaEMsK0NBQTBEO0FBQzFELDJEQUF3RDtBQUN4RCx5REFBZ0U7QUFDaEUsbURBQTREO0FBQzVELHlEQUlxQztBQUNyQyxrREFBNEI7QUFDNUIsb0RBQThCO0FBQzlCLHFEQUF1QztBQUN2Qyw0Q0FBc0I7QUFDdEIsd0RBQWlDO0FBQ2pDLGdEQUEwQjtBQUMxQix3RkFBa0U7QUFDbEUsb0dBQThFO0FBYzlFOzs7Ozs7Ozs7R0FTRztBQUVILGdCQUFnQjtBQUNoQixJQUFBLHdCQUFjLEdBQUUsQ0FBQztBQUVqQixNQUFNLFNBQVMsR0FBRyxrQ0FBMEIsQ0FBQyxLQUFLLENBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDbEMsQ0FBQztBQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO0lBQ2xCLGlCQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDdEI7QUFFRCxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENB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