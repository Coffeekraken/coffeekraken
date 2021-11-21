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
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __fsExtra from 'fs-extra';
import __path from 'path';
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
class SSugarCli {
    constructor() {
        this._availableCli = {
            defaultByStack: {},
            endpoints: {},
        };
        this._availableInteractiveCli = {};
        __SBench.start('sugar.cli');
        // hook ctrl+c
        __hotkey('ctrl+c').on('press', (e) => {
            // @ts-ignore
            process.emit('SIGINT');
        });
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
            //         'theme.themes.coffeekraken-dark.color.complementary.default',
            //     ),
            // );
            // return;
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
            __SBench.end('sugar.cli', true);
            // normal process
            yield this._process();
            __SBench.step('sugar.cli', 'afterProcess');
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
                const { default: processFn, sugarCliSettings } = yield import(cliObj.processPath);
                if (!__isChildProcess()) {
                    this._stdio = __SStdio.existingOrNew('default', this._eventEmitter, sugarCliSettings.stdio);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUE0QixNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxnQkFBZ0IsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLE9BQU8sTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RCxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLFdBQVcsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQWMxQixNQUFNLHdCQUF5QixTQUFRLFlBQVk7SUFDL0MsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLHlCQUF5QjtvQkFDL0IsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDbEMsQ0FBQztBQUNGLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtJQUNqQixRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FDdEIsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FDbkQsQ0FBQztDQUNMO0FBRUQsa0JBQWtCO0FBQ2xCLHNGQUFzRjtBQUN0RixNQUFNO0FBRU4sTUFBTSxTQUFTO0lBZVg7UUFOQSxrQkFBYSxHQUEyQjtZQUNwQyxjQUFjLEVBQUUsRUFBRTtZQUNsQixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBQ0YsNkJBQXdCLEdBQXdCLEVBQUUsQ0FBQztRQUcvQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVCLGNBQWM7UUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pDLGFBQWE7WUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVE7WUFDVCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSztZQUNOLE9BQU8sQ0FBQyxJQUFJO2lCQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1QsNkVBQTZFO2dCQUM3RSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ25CLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDckI7cUJBQU0sSUFDSCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJO29CQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQ3pCO29CQUNFLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDckI7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6Qiw4QkFBOEI7UUFDOUIsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWixRQUFRLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssYUFBYTtvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1YsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxZQUFZO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLE1BQU07b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO29CQUM5QixNQUFNO2dCQUNWO29CQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELE1BQU0sQ0FBQyxHQUFHLHFHQUFxRyxDQUMxSyxDQUFDO29CQUNGLE1BQU07YUFDYjtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7U0FDeEM7UUFFRCw2QkFBNkI7UUFDN0IsK0JBQStCO1FBQy9CLGdDQUFnQztRQUNoQywrQkFBK0I7UUFDL0Isd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQixTQUFTO1FBQ1QsUUFBUTtRQUNSLElBQUk7UUFFSixDQUFDLEdBQVMsRUFBRTtZQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFL0Msd0JBQXdCO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLGVBQWU7WUFDZiwwQkFBMEI7WUFDMUIsd0VBQXdFO1lBQ3hFLFNBQVM7WUFDVCxLQUFLO1lBQ0wsVUFBVTtZQUVWLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNoRCxxQ0FBcUM7WUFDckMsU0FBUyxDQUFDLFlBQVksQ0FDbEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUMvQyxDQUFDO1lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUUvQywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBQztnQkFDckMsS0FBSyxFQUFFO29CQUNILEVBQUUsRUFBRSxPQUFPO2lCQUNkO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0QztZQUVELGlCQUFpQjtZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBRWxELHFCQUFxQjtZQUNyQixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRWxELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFFakQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVyRCxxQkFBcUI7WUFDckIsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUU5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBRXBELGNBQWM7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUM5QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDMUIsT0FBTzthQUNWO1lBRUQsT0FBTztZQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQjtZQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWhDLGlCQUFpQjtZQUNqQixNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRUssUUFBUTs7O1lBQ1YsTUFBTSxrQkFBa0IsR0FDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELElBQ0ksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FDekIsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksa0JBQWtCLEVBQUUsQ0FDekQsRUFDSDtnQkFDRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsTUFBTSxNQUFNLEdBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQ3hCLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLGtCQUFrQixFQUFFLENBQ3pELENBQUM7WUFFTixhQUFhO1lBQ2IsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUNwQixNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUN6RCxNQUFNLENBQUMsV0FBVyxDQUNyQixDQUFDO2dCQUVGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO29CQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLFNBQVMsRUFDVCxJQUFJLENBQUMsYUFBYSxFQUNsQixnQkFBZ0IsQ0FBQyxLQUFLLENBQ3pCLENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRWxCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBRXRCLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzVELElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEM7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxVQUFVLENBQUM7Z0JBQ2pCLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEI7O0tBQ0o7SUFFSyxnQkFBZ0I7O1lBQ2xCLG9FQUFvRTtZQUNwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQzVCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQy9ELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO29CQUFFLFNBQVM7Z0JBQzdCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNqQixNQUFNLElBQUksS0FBSyxDQUNYLCtDQUErQyxXQUFXLCtDQUErQyxDQUM1RyxDQUFDO3FCQUNMO29CQUVELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTt3QkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUNuQyxDQUFDLGVBQWUsRUFBRSxFQUFFOzRCQUNoQixNQUFNLGNBQWMsR0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFFeEMsNERBQTREOzRCQUM1RCxJQUNJLGNBQWMsQ0FBQyxLQUFLLEtBQUssU0FBUztnQ0FDbEMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUNyQjtnQ0FDRSxPQUFPOzZCQUNWOzRCQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQzFCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDeEIsZ0JBQWdCLEVBQ2hCLEVBQUUsQ0FDTCxFQUNELGNBQWMsQ0FBQyxPQUFPLENBQ3pCLENBQUM7NEJBRUYsSUFBSSxhQUFhLENBQUM7NEJBQ2xCLElBQUksY0FBYyxDQUFDLFNBQVMsRUFBRTtnQ0FDMUIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQzFCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDeEIsZ0JBQWdCLEVBQ2hCLEVBQUUsQ0FDTCxFQUNELGNBQWMsQ0FBQyxTQUFTLENBQzNCLENBQUM7NkJBQ0w7NEJBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUN6QixNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RCxPQUFPLHNCQUFzQixDQUM5RixDQUFDOzRCQUVOLElBQUksQ0FBQyx3QkFBd0IsQ0FDekIsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLGVBQWUsRUFBRSxDQUN2QyxtQ0FDTSxjQUFjLEtBQ2pCLFdBQVcsRUFBRSxPQUFPLEVBQ3BCLGFBQWEsR0FDaEIsQ0FBQzt3QkFDTixDQUFDLENBQ0osQ0FBQztxQkFDTDtvQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFFekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUNsRCxTQUFTLENBQUMsT0FBTyxDQUNwQixDQUFDO3dCQUVGLElBQUksYUFBYSxDQUFDO3dCQUNsQixJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUU7NEJBQ3JCLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUMxQixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEVBQ2xELFNBQVMsQ0FBQyxTQUFTLENBQ3RCLENBQUM7eUJBQ0w7d0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzRCQUN6QixNQUFNLElBQUksS0FBSyxDQUNYLGtEQUFrRCxPQUFPLHNCQUFzQixDQUNsRixDQUFDO3dCQUNOLElBQ0ksQ0FBQyxJQUFJLENBQUMsT0FBTzs0QkFDYixNQUFNLENBQUMsYUFBYTs0QkFDcEIsTUFBTSxLQUFLLE1BQU0sQ0FBQyxhQUFhLEVBQ2pDOzRCQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0NBQzNDLE1BQU0sQ0FBQzt5QkFDZDt3QkFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFFLENBQUMsaUNBRWpELFdBQVcsSUFDUixTQUFTLEtBQ1osV0FBVyxFQUFFLE9BQU8sRUFDcEIsYUFBYSxHQUNoQixDQUFDO29CQUNWLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRCxHQUFHLENBQUMsTUFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFHO1FBQ0gsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixLQUFLLEVBQUUsR0FBRzthQUNiLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssb0JBQ3RCLEdBQUcsRUFDUixDQUFDO0lBQ1AsQ0FBQztJQUVLLElBQUksQ0FBQyxPQUFlOztZQUN0QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRUQsUUFBUTtRQUNKLE1BQU0sTUFBTSxHQUFHO1lBQ1gsYUFBYSxDQUFDO2dCQUNWLFVBQVUsRUFBRSxDQUFDO2dCQUNiLGFBQWEsRUFBRSxDQUFDO2FBQ25CLENBQUM7WUFDRixxREFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZO2dCQUNqQyxDQUFDLENBQUMsMkJBQTJCO2dCQUM3QixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtvQkFDakMsQ0FBQyxDQUFDLG1CQUFtQjtvQkFDckIsQ0FBQyxDQUFDLDhCQUNWLGNBQWM7WUFDZCxDQUFDLE1BQU0sQ0FBQyxXQUFXO2dCQUNmLENBQUMsQ0FBQyw2RkFBNkY7Z0JBQy9GLENBQUMsQ0FBQyxFQUFFO1lBQ1IsQ0FBQyxNQUFNLENBQUMsV0FBVztnQkFDZixDQUFDLENBQUMsOERBQThEO2dCQUNoRSxDQUFDLENBQUMsRUFBRTtZQUNSLG9CQUFvQjtTQUN2QjthQUNJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLE1BQU07U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVLLGtCQUFrQjs7WUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWhCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztZQUM3QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDcEMsSUFBSSxDQUFDLHdCQUF3QixDQUNoQyxFQUFFO2dCQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNsQztZQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDdkIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLE9BQU8sRUFBRSw0QkFBNEI7Z0JBQ3JDLE9BQU87YUFDVixDQUFDLENBQUM7WUFFSCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDcEMsSUFBSSxDQUFDLHdCQUF3QixDQUNoQyxFQUFFO2dCQUNDLElBQUksR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFFcEQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNkLElBQUksR0FBRyxDQUFDLGFBQWEsRUFBRTt3QkFDbkIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pELElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUN4QjtvQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDaEMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLOzRCQUNsQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSztnQ0FBRSxPQUFPLEtBQUssQ0FBQzs0QkFDeEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7NEJBQ3pCLE9BQU8sS0FBSyxDQUFDO3dCQUNqQixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDO0tBQUE7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUMvQyxVQUFVLEdBQUcsSUFBSTtpQkFDWixZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUM7aUJBQ2xELFFBQVEsRUFBRSxDQUFDO1lBQ2hCLFVBQVUsSUFBSSxNQUFNLENBQUM7U0FDeEI7UUFDRCxVQUFVLElBQUksR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQWUsRUFBRSxRQUFhO1FBQ25DLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFDL0IsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsUUFBYTtRQUMvQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQy9CLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxjQUFjLENBQUM7UUFDbkIsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBRTlCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDOUQsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUVsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXZELGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QyxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEtBQUssU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxNQUFNLEVBQUU7b0JBQ3JELFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUM1QjtnQkFFRCxJQUFJLENBQUMsR0FBRyxDQUNKLHlCQUF5QixNQUFNLGFBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU07b0JBQy9DLENBQUMsQ0FBQyxXQUFXO29CQUNiLENBQUMsQ0FBQyxFQUNWLEVBQUUsQ0FDTCxDQUFDO2dCQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsR0FBRyxDQUNKLGdEQUFnRCxLQUFLLG1CQUFtQixNQUFNLGVBQWUsQ0FDaEcsQ0FBQztnQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxzQkFBc0I7O1FBQ2xCLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM5QixRQUFRLENBQUMsSUFBSSxDQUNULDZDQUE2QyxJQUFJLENBQUMsTUFBTSxJQUNwRCxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLFNBQ3BCLHFDQUFxQyxDQUN4QyxDQUFDO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FDVCx1RUFBdUUsQ0FDMUUsQ0FBQztRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQUVELElBQUksU0FBUyxFQUFFLENBQUMifQ==