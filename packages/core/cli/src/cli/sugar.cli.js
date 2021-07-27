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
import __path from 'path';
import __fs from 'fs';
import __SEnv from '@coffeekraken/s-env';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SBench from '@coffeekraken/s-bench';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import { STerminalStdio } from '@coffeekraken/s-stdio';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import '@coffeekraken/sugar/node/index';
class SSugarCliParamsInterface extends __SInterface {
}
SSugarCliParamsInterface.definition = {
    bench: {
        type: {
            type: 'Array<String> | Boolean',
            splitChars: [',']
        },
        default: false,
        explicit: true
    }
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
class SSugarCli {
    constructor() {
        this._availableCli = {
            defaultByStack: {},
            endpoints: {}
        };
        this._availableInteractiveCli = {};
        this._command =
            process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
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
                else if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
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
            // load the sugar config
            yield __SSugarConfig.load();
            // init stdio and event emitter
            this._eventEmitter = new __SEventEmitter({
                metas: {
                    id: 'Sugar'
                }
            });
            this._stdio = new STerminalStdio(this._eventEmitter);
            // print header 
            if (!__isChildProcess()) {
                this._newStep(true);
            }
            // reading sugarJsons
            const sugarJsonInstance = new __SSugarJson();
            this._sugarJsons = yield sugarJsonInstance.read();
            // init available cli
            yield this._getAvailableCli();
            // interactive
            // if (!this._stack && !this._action && !this._args) {
            //   this._interactivePrompt();
            //   return;
            // }
            // help
            if (this._args.match(/--help/)) {
                this._displayHelp(this._stack, this._action);
                process.exit();
            }
            // normal process
            this._process();
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
                this._eventEmitter.pipe(processFn(args));
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
                        Object.keys(cliObj.interactive).forEach(interactiveName => {
                            const interactiveObj = cliObj.interactive[interactiveName];
                            // skip cli that are scoped in package when not in a package
                            if (interactiveObj.scope === 'package' && !__SEnv.packageJson) {
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
                            this._availableCli.defaultByStack[cliObj.stack] = action;
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
                value: log
            });
            return;
        }
        this._eventEmitter.emit('log', Object.assign({}, log));
    }
    _run(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = __spawn(command, [], {
                shell: true
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
                paddingBottom: 1
            }),
            `<yellow>█</yellow> This process is running in the ${process.env.NODE_ENV === 'production' ? '<green>production</green>' : process.env.NODE_ENV === 'test' ? '<cyan>test</cyan>' : '<yellow>development</yellow>'} environment`,
            !__SEnv.packageJson ? `<yellow>█</yellow> This process is running <yellow>outside of an existing package</yellow>.` : '',
            !__SEnv.packageJson ? `<yellow>█</yellow> Not all the features will be available...` : '',
            '<yellow>█</yellow>'
        ].filter(l => l !== '').join('\n');
        this.log({
            clear: true,
            decorators: false,
            value: logStr
        });
    }
    _interactivePrompt() {
        return __awaiter(this, void 0, void 0, function* () {
            this._newStep();
            const choices = [];
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                choices.push(obj.title);
            }
            const res = yield this.ask({
                type: 'autocomplete',
                message: 'What can Sugar do for you?',
                choices
            });
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                if (res === obj.title) {
                    const pro = (yield import(obj.processPath)).default;
                    this._newStep(true);
                    pro(this);
                    break;
                }
            }
        });
    }
    writeLog(log) {
        let currentLog = '';
        if (__fs.existsSync(`${process.cwd()}/sugar.log`)) {
            currentLog = __fs.readFileSync(`${process.cwd()}/sugar.log`, 'utf8').toString();
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
        Object.keys(this._availableCli.endpoints).forEach(stackAction => {
            const _stack = stackAction.split('.')[0];
            const _action = stackAction.split('.')[1];
            if (this._stack && _stack !== this._stack)
                return;
            if (!sortedByStack[_stack])
                sortedByStack[_stack] = {};
            sortedByStack[_stack][_action] = this._availableCli.endpoints[stackAction];
        });
        Object.keys(sortedByStack).forEach((stack) => {
            const stackObj = sortedByStack[stack];
            this.log('<cyan>-%-</cyan>');
            this.log(`Stack       : <cyan>${stack}</cyan>`);
            this.log('<cyan>-%-</cyan>');
            Object.keys(stackObj).forEach(action => {
                const actionObj = stackObj[action];
                if (this._availableCli.defaultByStack[stack] === action) {
                    actionObj.default = true;
                }
                this.log(`Action      : <yellow>${action}</yellow> ${this._availableCli.defaultByStack[stack] === action ? '(default)' : ''}`);
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
const cli = new SSugarCli();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBSWQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLFdBQVcsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBR3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUk1RCxPQUFPLGdDQUFnQyxDQUFDO0FBY3hDLE1BQU0sd0JBQXlCLFNBQVEsWUFBWTs7QUFDMUMsbUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNsQjtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUE7QUFHSDs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFD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