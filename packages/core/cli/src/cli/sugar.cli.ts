#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck

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
import __SDuration from '@coffeekraken/s-duration';
import __path from 'path';
import __STheme from '@coffeekraken/s-theme';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import { Server as __nodeIpcStoreServer } from 'node-ipc-store';
import __SLog from '@coffeekraken/s-log';

export interface ISSugarCliAvailableCliObj {
    packageJson: any;
    description: string;
    process: string;
    processPath: string;
}

export interface ISSugarCliAvailableCli {
    defaultByStack: Record<string, string>;
    endpoints: Record<string, ISSugarCliAvailableCliObj>;
}

class SSugarCliParamsInterface extends __SInterface {
    static definition = {
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

__SLog.filter({
    type: [__SLog.LOG, __SLog.INFO, __SLog.WARN, __SLog.ERROR],
});

class SSugarCli {
    _command: string;
    _stack: string;
    _action: string;
    _args: string;
    _stdio: STerminalStdio;
    _eventEmitter: __SEventEmitter;

    _sugarJsons: any;
    _availableCli: ISSugarCliAvailableCli = {
        defaultByStack: {},
        endpoints: {},
    };
    _availableInteractiveCli: Record<string, any> = {};

    constructor() {
        __SBench.start('sugar.cli');

        this._command = process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
        this._stack = this._command.split('.')[0];
        this._action = this._command.split('.')[1] || null;
        this._args =
            process.argv
                .slice(3)
                .map((arg) => {
                    // @todo      support for command with 1 sub param like: --something "--else"
                    if (arg.includes(' ')) {
                        return `"${arg}"`;
                    } else if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
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
                    throw new Error(
                        `<red>[sugar]</red> Sorry but the passed env "<yellow>${params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`,
                    );
                    break;
            }
        } else {
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

        (async () => {
            __SBench.step('sugar.cli', 'beforeLoadConfig');

            // load the sugar config
            const config = await __SSugarConfig.load();
            // console.log(__SSugarConfig.get('markdownBuilder'));
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
            this._sugarJsons = await sugarJsonInstance.read();

            __SBench.step('sugar.cli', 'afterLoadSugarJson');

            __SBench.step('sugar.cli', 'beforeLoadAvailableCli');

            // init available cli
            await this._getAvailableCli();

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
            await this._process();

            __SBench.step('sugar.cli', 'afterProcess');

            __SBench.end('sugar.cli');
        })();
    }

    async _process() {
        const defaultStackAction = this._availableCli.defaultByStack[this._stack];

        if (!this._availableCli.endpoints[`${this._stack}.${this._action ?? defaultStackAction}`]) {
            this._displayHelpAfterError();
            process.exit();
        }
        const cliObj = this._availableCli.endpoints[`${this._stack}.${this._action ?? defaultStackAction}`];

        // @ts-ignore
        if (cliObj.processPath) {
            const { default: processFn } = await import(cliObj.processPath);

            let args = this._args;

            if (cliObj.interfacePath) {
                const { default: int } = await import(cliObj.interfacePath);
                args = int.apply(this._args);
            }

            // @ts-ignore
            const proPromise = processFn(args);
            this._eventEmitter.pipe(proPromise, {});
        }
    }

    async _getAvailableCli() {
        // loop on each filtered files to build the this._availableCli stack
        for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
            const packageName = Object.keys(this._sugarJsons)[i];
            const sugarJson = this._sugarJsons[packageName];
            const packageJson = await import(sugarJson.metas.path.replace('/sugar.json', '/package.json'));
            if (!sugarJson.cli) continue;
            sugarJson.cli.forEach((cliObj) => {
                if (!cliObj.actions) {
                    throw new Error(
                        `The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`,
                    );
                }

                if (cliObj.interactive) {
                    Object.keys(cliObj.interactive).forEach((interactiveName) => {
                        const interactiveObj = cliObj.interactive[interactiveName];

                        // skip cli that are scoped in package when not in a package
                        if (interactiveObj.scope === 'package' && !__SEnv.packageJson) {
                            return;
                        }

                        const cliPath = __path.resolve(
                            sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
                            interactiveObj.process,
                        );

                        let interfacePath;
                        if (interactiveObj.interface) {
                            interfacePath = __path.resolve(
                                sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
                                interactiveObj.interface,
                            );
                        }

                        if (!__fs.existsSync(cliPath))
                            throw new Error(
                                `[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`,
                            );

                        this._availableInteractiveCli[`${cliObj.stack}.${interactiveName}`] = {
                            ...interactiveObj,
                            processPath: cliPath,
                            interfacePath,
                        };
                    });
                }

                Object.keys(cliObj.actions).forEach((action) => {
                    const actionObj = cliObj.actions[action];

                    const cliPath = __path.resolve(
                        sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
                        actionObj.process,
                    );

                    let interfacePath;
                    if (actionObj.interface) {
                        interfacePath = __path.resolve(
                            sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
                            actionObj.interface,
                        );
                    }

                    if (!__fs.existsSync(cliPath))
                        throw new Error(
                            `[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`,
                        );
                    if (!this._action && cliObj.defaultAction && action === cliObj.defaultAction) {
                        this._availableCli.defaultByStack[cliObj.stack] = action;
                    }

                    this._availableCli.endpoints[`${cliObj.stack}.${action}`] = {
                        packageJson,
                        ...actionObj,
                        processPath: cliPath,
                        interfacePath,
                    };
                });
            });
        }

        return true;
    }

    ask(askObj: ISLogAsk): Promise<any> {
        return this._eventEmitter.emit('ask', askObj);
    }

    log(log) {
        if (typeof log === 'string') {
            this._eventEmitter.emit('log', {
                value: log,
            });
            return;
        }

        this._eventEmitter.emit('log', {
            ...log,
        });
    }

    async _run(command: string): string {
        const promise = __spawn(command, [], {
            shell: true,
        });
        promise.on('*', (data) => {
            this.log(data.value);
        });

        const res = await promise;
        return res;
    }

    _newStep() {
        const logStr = [
            __sugarBanner({
                paddingTop: 1,
                paddingBottom: 1,
            }),
            `<yellow>█</yellow> This process is running in the ${
                process.env.NODE_ENV === 'production'
                    ? '<green>production</green>'
                    : process.env.NODE_ENV === 'test'
                    ? '<cyan>test</cyan>'
                    : '<yellow>development</yellow>'
            } environment`,
            !__SEnv.packageJson
                ? `<yellow>█</yellow> This process is running <yellow>outside of an existing package</yellow>.`
                : '',
            !__SEnv.packageJson ? `<yellow>█</yellow> Not all the features will be available...` : '',
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

    async _interactivePrompt() {
        this._newStep();

        const choices: string[] = [];
        for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
            choices.push(`> ${obj.title}`);
        }

        const res = await this.ask({
            type: 'autocomplete',
            message: 'What can Sugar do for you?',
            choices,
        });

        for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
            if (res === `> ${obj.title}`) {
                const pro = (await import(obj.processPath)).default;

                let args = {};
                if (obj.interfacePath) {
                    const { default: int } = await import(obj.interfacePath);
                    args = int.apply({});
                }

                this._newStep(true);
                const proPromise = pro(args);
                this._eventEmitter.pipe(proPromise, {
                    processor(value, metas) {
                        if (metas.event !== 'log') return value;
                        value.decorators = false;
                        return value;
                    },
                });
                break;
            }
        }
    }

    writeLog(log: string) {
        let currentLog = '';
        if (__fs.existsSync(`${process.cwd()}/sugar.log`)) {
            currentLog = __fs.readFileSync(`${process.cwd()}/sugar.log`, 'utf8').toString();
            currentLog += '\n\n';
        }
        currentLog += log;
        __fs.writeFileSync(`${process.cwd()}/sugar.log`, currentLog);
    }

    safeExec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        return promise;
    }

    exec(command: string, settings: any): Promise<any> {
        const promise = __spawn(command, [], {
            shell: true,
            ...(settings ?? {}),
        });
        this._eventEmitter.pipe(promise);
        return promise;
    }

    _displayHelp() {
        let currentPackage;
        const logArray: string[] = [];

        const sortedByStack = {};

        Object.keys(this._availableCli.endpoints).forEach((stackAction) => {
            const _stack = stackAction.split('.')[0];
            const _action = stackAction.split('.')[1];

            if (this._stack && _stack !== this._stack) return;

            if (!sortedByStack[_stack]) sortedByStack[_stack] = {};

            sortedByStack[_stack][_action] = this._availableCli.endpoints[stackAction];
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

                this.log(
                    `Action      : <yellow>${action}</yellow> ${
                        this._availableCli.defaultByStack[stack] === action ? '(default)' : ''
                    }`,
                );
                this.log(`Description : ${actionObj.description}`);
                this.log(`Example     : <magenta>sugar</magenta> <cyan>${stack}</cyan>.<yellow>${action}</yellow> ...`);
                this.log(' ');
            });

            this.log(' ');
        });
    }

    _displayHelpAfterError() {
        const logArray: string[] = [];
        logArray.push(
            `<red>Sorry</red> but the requested "<cyan>${this._stack}.${
                this._action ?? 'default'
            }</cyan>" command does not exists...`,
        );
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        logArray.push(' ');
        this.log(logArray.join('\n'));
        this._displayHelp();
    }
}

new SSugarCli();
