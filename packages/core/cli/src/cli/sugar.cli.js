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
import __SInterface from '@coffeekraken/s-interface';
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
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
class SSugarCliParamsInterface extends __SInterface {
    static get _definition() {
        return {
            bench: {
                type: {
                    type: 'Array<String> | Boolean',
                    splitChars: [','],
                },
                default: false,
                explicit: true,
            },
        };
    }
}
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
const cliParams = SSugarCliParamsInterface.apply(process.argv.slice(2).join(' '));
if (cliParams.bench) {
    __SBench.env.activateBench(cliParams.bench === true ? '*' : cliParams.bench);
}
// __SLog.filter({
//     type: [__SLog.TYPE_LOG, __SLog.TYPE_INFO, __SLog.TYPE_WARN, __SLog.TYPE_ERROR],
// });
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
        var _a, _b;
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
        this._command =
            process.argv && process.argv[2]
                ? process.argv[2].split(' ')[0]
                : '';
        this._stack = this._command.split('.')[0];
        if (!((_a = this._stack) === null || _a === void 0 ? void 0 : _a.match(/^[a-zA-Z0-9]+$/)))
            this._stack = undefined;
        this._action = this._command.split('.')[1] || null;
        if (!((_b = this._action) === null || _b === void 0 ? void 0 : _b.match(/^[a-zA-Z0-9]+$/)))
            this._action = undefined;
        this._isHelp = false;
        const lastArg = process.argv.slice(-1)[0];
        if (lastArg.match(/\s?(-h$|--help$)/))
            this._isHelp = true;
        this._args =
            process.argv
                .slice(3)
                .map((arg) => {
                // @todo      support for command with 1 sub param like: --something "--else"
                if (arg.includes(' ')) {
                    return `"${arg}"`;
                }
                else if (arg.slice(0, 2) !== '--' &&
                    arg.slice(0, 1) !== '-') {
                    return `"${arg}"`;
                }
                return arg;
            })
                .join(' ') || '';
        // checking and set "NODE_ENV"
        const params = __parseArgs(this._args);
        if (params.env) {
            switch (params.env) {
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
                    throw new Error(`<red>[sugar]</red> Sorry but the passed env "<yellow>${params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`);
                    break;
            }
        }
        else {
            process.env.NODE_ENV = 'development';
        }
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
            if (this._isHelp) {
                this._displayHelp(this._stack, this._action);
                return;
            }
            // interactive
            if (!this._stack && !this._action && !this._args) {
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
    static replaceTokens(command) {
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
    _process() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const defaultStackAction = this._availableCli.defaultByStack[this._stack];
            if (!this._availableCli.endpoints[`${this._stack}.${(_a = this._action) !== null && _a !== void 0 ? _a : defaultStackAction}`]) {
                this._displayHelpAfterError();
                process.exit();
            }
            const cliObj = this._availableCli.endpoints[`${this._stack}.${(_b = this._action) !== null && _b !== void 0 ? _b : defaultStackAction}`];
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
                let args = this._args;
                if (cliObj.interfacePath) {
                    const { default: int } = yield import(cliObj.interfacePath);
                    args = int.apply(this._args);
                }
                // @ts-ignore
                const proPromise = processFn(args);
                this._eventEmitter.pipe(proPromise, {});
                yield proPromise;
                yield __wait(1000);
                process.exit();
            }
            else if (cliObj.command) {
                if (this._isStdioNeeded()) {
                    this._stdio = __SStdio.existingOrNew('default', this._eventEmitter);
                }
                const promise = __spawn(SSugarCli.replaceTokens(cliObj.command), [], {});
                this._eventEmitter.pipe(promise);
                yield promise;
                process.exit();
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
                        if (!this._action &&
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
            if (this._stack && this._action) {
                const commandObj = this._availableCli.endpoints[`${this._stack}.${this._action}`];
                this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
                this.log(`<yellow>█</yellow> Action <cyan>${this._stack}.${this._action}</cyan>`);
                this.log(`<yellow>█ ${'-'.repeat(process.stdout.columns - 2)}</yellow>`);
                this.log(`<yellow>█</yellow>`);
                this.log(`<yellow>█</yellow> ${commandObj.description}`);
                this.log(`<yellow>█</yellow> Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
                this.log(`<yellow>█</yellow>`);
                this.log(`<yellow>████</yellow>   <yellow>sugar</yellow> <cyan>${this._stack}.${this._action}</cyan> <magenta>[arguments]</magenta>`);
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
                process.exit();
            }
            const sortedByStack = {};
            Object.keys(this._availableCli.endpoints).forEach((stackAction) => {
                const _stack = stackAction.split('.')[0];
                const _action = stackAction.split('.')[1];
                if (this._stack && _stack !== this._stack)
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
            process.exit();
        });
    }
    _displayHelpAfterError() {
        var _a;
        const logArray = [];
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${this._stack}.${(_a = this._action) !== null && _a !== void 0 ? _a : 'default'}</cyan>" command does not exists...`);
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        logArray.push(' ');
        this.log(logArray.join('\n'));
        this._displayHelp();
    }
}
if (!global._sugarCli) {
    global._sugarCli = new SSugarCli();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUE0QixNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGVBQWUsTUFBTSw4Q0FBOEMsQ0FBQztBQUczRSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQWV2RSxNQUFNLHdCQUF5QixTQUFRLFlBQVk7SUFDL0MsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFB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