#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
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
import __SEnv from '@coffeekraken/s-env';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SStdio from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import '@coffeekraken/sugar/node/index';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __SLog from '@coffeekraken/s-log';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SSugarCliParamsInterface from './interface/SSugarCliParamsInterface';
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
const cliParams = __SSugarCliParamsInterface.apply(process.argv.slice(2).join(' '));
if (cliParams.bench) {
    __SBench.env.activateBench(cliParams.bench === true ? '*' : cliParams.bench);
}
if (!__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
    console.log(`The log preset "${cliParams.logPreset}" does not exists... Here's the list of available presets:\n${__SLog.PRESETS.map(preset => {
        return `- ${preset}\n`;
    }).join('')}`);
    cliParams.logPreset = 'default';
}
__SLog.filter(__SLog[`PRESET_${cliParams.logPreset.toUpperCase()}`]);
export default class SSugarCli {
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
        __SBench.start('sugar.cli');
        if (process.env.TREAT_AS_MAIN) {
            this._treatAsMain = true;
            process.env.TREAT_AS_MAIN = false;
        }
        this.args = this._parseArgs(process.argv);
        this._setNodeEnv();
        (() => __awaiter(this, void 0, void 0, function* () {
            __SBench.step('sugar.cli', 'beforeLoadConfig');
            // load the sugar config
            const config = yield __SSugarConfig.load();
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
            __fsExtra.emptyDirSync(__SSugarConfig.get('storage.package.tmpDir'));
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
        command = command.replace('[arguments]', params ? __argsToString(params) : '');
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
    static replaceSugarCommandForDev(command) {
        if (!command.match(/^sugar\s/))
            return command;
        return command.replace(/^sugar/, this.command);
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
        args.command =
            argv && argv[2]
                ? argv[2].split(' ')[0]
                : '';
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
        const lastArg = argv.slice(-1)[0];
        if (lastArg.match(/\s?(-h$|--help$)/))
            args.isHelp = true;
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
        var _a, _b;
        const defaultStackAction = this._availableCli.defaultByStack[this.args.stack];
        if (!this._availableCli.endpoints[`${this.args.stack}.${(_a = this.args.action) !== null && _a !== void 0 ? _a : defaultStackAction}`]) {
            this._displayHelpAfterError();
            process.exit();
        }
        let cliObj = this._availableCli.endpoints[`${this.args.stack}.${(_b = this.args.action) !== null && _b !== void 0 ? _b : defaultStackAction}`];
        return cliObj;
    }
    _process() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    ...argv.slice(0, 3),
                    ...process.argv.slice(2)
                ];
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
                const { default: processFn, sugarCliSettings } = yield import(cliObj.processPath);
                if (this._isStdioNeeded()) {
                    this._stdio = __SStdio.existingOrNew('default', this._eventEmitter, __SStdio.NO_UI);
                }
                yield __wait(100);
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
                process.exit();
                // }
            }
            else if (cliObj.command) {
                if (this._isStdioNeeded()) {
                    this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
                }
                const promise = __spawn(SSugarCli.replaceTokens(cliObj.command), [], {});
                this._eventEmitter.pipe(promise);
                const res = yield promise;
                // if (!__isChildProcess()) {
                process.exit();
                // }
            }
        });
    }
    _getAvailableCli() {
        return __awaiter(this, void 0, void 0, function* () {
            // loop on each filtered files to build the this._availableCli stack
            for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
                const packageName = Object.keys(this._sugarJsons)[i];
                const sugarJson = this._sugarJsons[packageName];
                const packageJson = (yield import(sugarJson.metas.path.replace('/sugar.json', '/package.json'))).default;
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
                                !__SEnv.packageJson) {
                                return;
                            }
                            const cliPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), interactiveObj.process);
                            let interfacePath;
                            if (interactiveObj.interface) {
                                interfacePath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), interactiveObj.interface);
                            }
                            if (!__fs.existsSync(cliPath))
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
    _newStep() {
        const packageJson = __packageJson(__dirname());
        const logStr = [
            __sugarBanner({
                paddingTop: 1,
                paddingBottom: 1,
                version: `CLI <cyan>v${packageJson.version}</cyan>`,
            }),
            `<yellow>█</yellow> This process is running in the ${process.env.NODE_ENV === 'production'
                ? '<green>production</green>'
                : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'} environment`,
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
    _interactivePrompt() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isStdioNeeded()) {
                this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
            }
            yield __wait(100);
            this._newStep();
            const choices = [];
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                choices.push(`> ${obj.title}`);
            }
            const res = yield this.ask({
                type: 'autocomplete',
                message: 'What can Sugar do for you?',
                choices,
            });
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                if (res === `> ${obj.title}`) {
                    const pro = (yield import(obj.processPath)).default;
                    let args = {};
                    if (obj.interfacePath) {
                        const { default: int } = yield import(obj.interfacePath);
                        args = int.apply({});
                    }
                    // this._newStep(true);
                    const proPromise = pro(args);
                    this._eventEmitter.pipe(proPromise, {
                        processor(value, metas) {
                            if (metas.event !== 'log')
                                return value;
                            value.decorators = false;
                            return value;
                        },
                    });
                    break;
                }
            }
        });
    }
    writeLog(log) {
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
    safeExec(command, settings) {
        const promise = __spawn(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        return promise;
    }
    exec(command, settings) {
        const promise = __spawn(command, [], Object.assign({ shell: true }, (settings !== null && settings !== void 0 ? settings : {})));
        this._eventEmitter.pipe(promise);
        return promise;
    }
    _displayHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isStdioNeeded()) {
                this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
            }
            yield __wait(100);
            this._newStep();
            if (this.args.stack && this.args.action) {
                const commandObj = this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];
                this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
                this.log(`<yellow>█</yellow> Action <cyan>${this.args.stack}.${this.args.action}</cyan>`);
                this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
                this.log(`<yellow>█</yellow>`);
                this.log(`<yellow>█</yellow> ${commandObj.description}`);
                this.log(`<yellow>█</yellow> Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
                this.log(`<yellow>█</yellow>`);
                this.log(`<yellow>████</yellow>   <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`);
                this.log(`<yellow>█</yellow>`);
                if (commandObj.interfacePath) {
                    const { default: int } = yield import(commandObj.interfacePath);
                    Object.entries(int.definition).forEach(([arg, argObj]) => {
                        this.log(`<yellow>█</yellow>   <cyan>${arg}</cyan> ${argObj.alias
                            ? `(<magenta>-${argObj.alias}</magenta>)`
                            : ''}`);
                        this.log(`<yellow>█</yellow>   ${argObj.description}`);
                        if (argObj.default !== undefined) {
                            this.log(`<yellow>█</yellow>   Default: <magenta>${argObj.default}</magenta>`);
                        }
                        this.log(`<yellow>█</yellow>`);
                    });
                }
                yield __wait(1000);
                // if (!__isChildProcess()) {
                process.exit();
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
            this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
            this.log(`<yellow>█</yellow> Stacks and actions list:`);
            this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
            Object.keys(sortedByStack).forEach((stack) => {
                const stackObj = sortedByStack[stack];
                this.log(`<yellow>█</yellow> <cyan>${stack}</cyan>`);
                Object.keys(stackObj).forEach((action) => {
                    const actionObj = stackObj[action];
                    if (this._availableCli.defaultByStack[stack] === action) {
                        actionObj.default = true;
                    }
                    this.log(`<yellow>█</yellow>   <magenta>${action}</magenta>${' '.repeat(20 - action.length)}: ${actionObj.description}`);
                });
            });
            yield __wait(1000);
            // if (!__isChildProcess()) {
            process.exit();
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
if (!global._sugarCli) {
    global._sugarCli = new SSugarCli();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxRQUE0QixNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGVBQWUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6QyxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUV2RSxPQUFPLDBCQUEwQixNQUFNLHNDQUFzQyxDQUFDO0FBYzlFOzs7Ozs7Ozs7R0FTRztBQUVILE1BQU0sU0FB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