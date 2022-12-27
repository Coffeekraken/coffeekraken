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
const ascii_1 = require("@coffeekraken/sugar/ascii");
const cli_1 = require("@coffeekraken/sugar/cli");
const console_1 = require("@coffeekraken/sugar/console");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
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
            // hook base console functions
            this._proxyConsole();
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
                this._stdio = s_stdio_1.default.existingOrNew('default', this._eventEmitter, s_stdio_1.default.NO_UI);
            }
        }
    }
    static _isStdioNeeded() {
        return !(0, is_1.__isChildProcess)() || this._treatAsMain;
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
                this._eventEmitter.pipe(proPromise, {});
                proPromise.on('chdir', (directory) => {
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
                this._eventEmitter.pipe(promise);
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
            promise.on('*', (data) => {
                this.log(data.value);
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
            this.log({
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
                yield (0, datetime_1.__wait)(1000);
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
            yield (0, datetime_1.__wait)(1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsZ0VBQXlDO0FBRXpDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELHFEQUEwRDtBQUMxRCxpREFBc0Q7QUFDdEQseURBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCwrQ0FJZ0M7QUFDaEMsK0NBQTBEO0FBQzFELHlEQUFnRTtBQUNoRSxtREFBNEQ7QUFDNUQseURBSXFDO0FBQ3JDLGtEQUE0QjtBQUM1QixvREFBOEI7QUFDOUIscURBQXVDO0FBQ3ZDLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0RBQTBCO0FBQzFCLHdGQUFrRTtBQUNsRSxvR0FBOEU7QUFjOUU7Ozs7Ozs7OztHQVNHO0FBRUgsZ0JBQWdCO0FBQ2hCLElBQUEsd0JBQWMsR0FBRSxDQUFDO0FBRWpCLE1BQU0sU0FBUyxHQUFHLGtDQUEwQixDQUFDLEtBQUssQ0FDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNsQyxDQUFDO0FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7SUFDbEIsaUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUN0QjtBQUVELElBQUksQ0FBQyxlQUFNLENBQUMsVUFBVSxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRTtJQUN4RCxPQUFPLENBQUMsR0FBRyxDQUNQLG1CQUNJLFNBQVMsQ0FBQyxTQUNkLCtEQUErRCxlQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDN0UsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNQLE9BQU8sS0FBSyxNQUFNLElBQUksQ0FB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