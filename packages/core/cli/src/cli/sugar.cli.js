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
import { STerminalStdio } from '@coffeekraken/s-stdio';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import '@coffeekraken/sugar/node/index';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __path from 'path';
class SSugarCliParamsInterface extends __SInterface {
}
SSugarCliParamsInterface.definition = {
    bench: {
        type: {
            type: 'Array<String> | Boolean',
            splitChars: [','],
        },
        default: false,
        explicit: true,
    },
};
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
//     type: [__SLog.LOG, __SLog.INFO, __SLog.WARN, __SLog.ERROR],
// });
class SSugarCli {
    constructor() {
        this._availableCli = {
            defaultByStack: {},
            endpoints: {},
        };
        this._availableInteractiveCli = {};
        __SBench.start('sugar.cli');
        this._command =
            process.argv && process.argv[2]
                ? process.argv[2].split(' ')[0]
                : '';
        this._stack = this._command.split('.')[0];
        this._action = this._command.split('.')[1] || null;
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
        // if (!__isChildProcess()) {
        //   new __nodeIpcStoreServer({
        //     ipc: { // node-ipc config
        //       id: "sugar-ipc-store",
        //       // silent: true
        //       startupTimeout: -1
        //     },
        //   });
        // }
        (() => __awaiter(this, void 0, void 0, function* () {
            __SBench.step('sugar.cli', 'beforeLoadConfig');
            // load the sugar config
            const config = yield __SSugarConfig.load();
            // console.log(
            //     __SSugarConfig.get(
            //         'theme.themes.default-light.ui.filtrableInput',
            //     ),
            // );
            // return;
            // clean somr folders like tmp, etc...
            __fsExtra.emptyDirSync(__SSugarConfig.get('storage.package.tmpDir'));
            __SBench.step('sugar.cli', 'afterLoadConfig');
            // init stdio and event emitter
            this._eventEmitter = new __SEventEmitter({
                metas: {
                    id: 'Sugar',
                },
            });
            this._stdio = new STerminalStdio('default', this._eventEmitter);
            if (__isChildProcess()) {
                this._eventEmitter.pipeTo(process);
            }
            // writeLog event
            this._eventEmitter.on('writeLog', (logObj) => {
                this.writeLog(logObj.value);
            });
            // print header
            if (!__isChildProcess()) {
                this._newStep(true);
            }
            __SBench.step('sugar.cli', 'beforeLoadSugarJson');
            // reading sugarJsons
            const sugarJsonInstance = new __SSugarJson();
            this._sugarJsons = yield sugarJsonInstance.read();
            __SBench.step('sugar.cli', 'afterLoadSugarJson');
            __SBench.step('sugar.cli', 'beforeLoadAvailableCli');
            // init available cli
            yield this._getAvailableCli();
            __SBench.step('sugar.cli', 'afterLoadAvailableCli');
            // interactive
            if (!this._stack && !this._action && !this._args) {
                this._interactivePrompt();
                return;
            }
            // help
            if (this._args.match(/--help/)) {
                this._displayHelp(this._stack, this._action);
                process.exit();
            }
            __SBench.step('sugar.cli', 'beforeProcess');
            const b = __SBench.end('sugar.cli');
            // console.log(b.toString());
            // normal process
            yield this._process();
            __SBench.step('sugar.cli', 'afterProcess');
            __SBench.end('sugar.cli');
        }))();
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
            // @ts-ignore
            if (cliObj.processPath) {
                const { default: processFn } = yield import(cliObj.processPath);
                let args = this._args;
                if (cliObj.interfacePath) {
                    const { default: int } = yield import(cliObj.interfacePath);
                    args = int.apply(this._args);
                }
                // @ts-ignore
                const proPromise = processFn(args);
                this._eventEmitter.pipe(proPromise, {});
                yield proPromise;
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
                const packageJson = yield import(sugarJson.metas.path.replace('/sugar.json', '/package.json'));
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
                        const actionObj = cliObj.actions[action];
                        const cliPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                        let interfacePath;
                        if (actionObj.interface) {
                            interfacePath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.interface);
                        }
                        if (!__fs.existsSync(cliPath))
                            throw new Error(`[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`);
                        if (!this._action &&
                            cliObj.defaultAction &&
                            action === cliObj.defaultAction) {
                            this._availableCli.defaultByStack[cliObj.stack] =
                                action;
                        }
                        this._availableCli.endpoints[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath, interfacePath });
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
        const logStr = [
            __sugarBanner({
                paddingTop: 1,
                paddingBottom: 1,
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
            clear: true,
            decorators: false,
            value: logStr,
        });
    }
    _interactivePrompt() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    this._newStep(true);
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
        let currentPackage;
        const logArray = [];
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
        Object.keys(sortedByStack).forEach((stack) => {
            const stackObj = sortedByStack[stack];
            this.log('<cyan>-%-</cyan>');
            this.log(`Stack       : <cyan>${stack}</cyan>`);
            this.log('<cyan>-%-</cyan>');
            Object.keys(stackObj).forEach((action) => {
                const actionObj = stackObj[action];
                if (this._availableCli.defaultByStack[stack] === action) {
                    actionObj.default = true;
                }
                this.log(`Action      : <yellow>${action}</yellow> ${this._availableCli.defaultByStack[stack] === action
                    ? '(default)'
                    : ''}`);
                this.log(`Description : ${actionObj.description}`);
                this.log(`Example     : <magenta>sugar</magenta> <cyan>${stack}</cyan>.<yellow>${action}</yellow> ...`);
                this.log(' ');
            });
            this.log(' ');
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
new SSugarCli();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLFdBQVcsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBRWpDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQW1CMUIsTUFBTSx3QkFBeUIsU0FBUSxZQUFZOztBQUN4QyxtQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLENBQUM7QUFHTjs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMs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