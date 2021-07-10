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
import __parseArgs from '../shared/cli/parseArgs';
import __SInterface from '@coffeekraken/s-interface';
import __parseHtml from '../shared/console/parseHtml';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SBench from '@coffeekraken/s-bench';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import '../node/index';
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
        this._availableCli = {};
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
        // print header
        if (!__isChildProcess()) {
            this._newStep();
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            // load the sugar config
            yield __SSugarConfig.load();
            // reading sugarJsons
            const sugarJsonInstance = new __SSugarJson();
            this._sugarJsons = yield sugarJsonInstance.read();
            // init available cli
            yield this._getAvailableCli();
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
            // normal process
            this._process();
        }))();
    }
    _process() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._availableCli[`${this._stack}.${(_a = this._action) !== null && _a !== void 0 ? _a : '_default'}`]) {
                this._displayHelpAfterError();
                process.exit();
            }
            const cliObj = this._availableCli[`${this._stack}.${(_b = this._action) !== null && _b !== void 0 ? _b : '_default'}`];
            // @ts-ignore
            if (cliObj.processPath) {
                const { default: processFn } = yield import(cliObj.processPath);
                // @ts-ignore
                processFn(this._args);
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
                            const cliPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), interactiveObj.process);
                            if (!__fs.existsSync(cliPath))
                                throw new Error(`[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`);
                            this._availableInteractiveCli[`${cliObj.stack}.${interactiveName}`] = Object.assign(Object.assign({}, interactiveObj), { processPath: cliPath });
                        });
                    }
                    Object.keys(cliObj.actions).forEach((action) => {
                        const actionObj = cliObj.actions[action];
                        const cliPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                        if (!__fs.existsSync(cliPath))
                            throw new Error(`[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`);
                        if (!this._action &&
                            cliObj.defaultAction &&
                            action === cliObj.defaultAction) {
                            this._availableCli[`${cliObj.stack}._default`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                        }
                        this._availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                    });
                });
            }
            return true;
        });
    }
    _newStep() {
        console.clear();
        console.log(__parseHtml(__sugarBanner({
            paddingTop: 1,
            paddingBottom: 1
        })));
        console.log(__parseHtml(`<yellow>█</yellow> This process is running in the ${process.env.NODE_ENV === 'production' ? '<green>production</green>' : process.env.NODE_ENV === 'test' ? '<cyan>test</cyan>' : '<yellow>development</yellow>'} environment`));
        console.log(__parseHtml('<yellow>█</yellow>'));
    }
    _interactivePrompt() {
        return __awaiter(this, void 0, void 0, function* () {
            this._newStep();
            const choices = [];
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                choices.push(obj.title);
            }
            const prompt = new Select({
                message: 'What do you want Sugar to do for you?',
                choices
            });
            const res = yield prompt.run();
            for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
                if (res === obj.title) {
                    const pro = yield import(obj.processPath);
                    this._newStep();
                    pro();
                    break;
                }
            }
        });
    }
    _displayHelp(stack, action) {
        let currentPackage;
        const logArray = [];
        Object.keys(this._availableCli).forEach((stackAction) => {
            var _a;
            const _stack = stackAction.split('.')[0];
            const _action = stackAction.split('.')[1];
            if (stack && stack !== _stack)
                return;
            if (action && action !== _action)
                return;
            const cliObj = this._availableCli[stackAction];
            if (currentPackage !== cliObj.packageJson.name) {
                logArray.push(' ');
                logArray.push(`<yellow>│</yellow> ${(_a = cliObj.packageJson.license) !== null && _a !== void 0 ? _a : 'MIT'} <yellow>${cliObj.packageJson.name}</yellow> (<cyan>${cliObj.packageJson.version}</cyan>)`);
                currentPackage = cliObj.packageJson.name;
            }
            logArray.push(
            // @ts-ignore
            `<yellow>│</yellow> - '<yellow>sugar</yellow> <cyan>${stackAction}</cyan> ...': ${cliObj.description}`);
        });
        logArray.push(' ');
        logArray.push(`For more help on each of these commands, simply call them with the <cyan>--help</cyan> flag`);
        logArray.push(' ');
        console.log(__parseHtml(logArray.join('\n')));
    }
    _displayHelpAfterError() {
        var _a;
        const logArray = [];
        logArray.push(' ');
        logArray.push(`--------------------`);
        logArray.push(`<yellow>Sugar CLI</yellow>`);
        logArray.push(`--------------------`);
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${this._stack}.${(_a = this._action) !== null && _a !== void 0 ? _a : 'default'}</cyan>" command does not exists...`);
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        console.log(__parseHtml(logArray.join('\n')));
        this._displayHelp();
    }
}
const cli = new SSugarCli();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxjQUFjOzs7Ozs7Ozs7O0FBUWQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLFdBQVcsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGFBQWEsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RSxPQUFPLGdCQUFnQixNQUFNLDBDQUEwQyxDQUFDO0FBSXhFLE9BQU8sZUFBZSxDQUFDO0FBRXZCLE1BQU0sd0JBQXlCLFNBQVEsWUFBWTs7QUFDMUMsbUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNsQjtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUE7QUFHSDs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEYsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO0lBQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FB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