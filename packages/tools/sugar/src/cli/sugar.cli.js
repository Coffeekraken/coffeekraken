#!/usr/bin/env node --trace-warnings --trace-uncaught
"use strict";
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
require = require('esm')(module, {});
// module.exports = require('./main.js');
const __childProcess = require('child_process');
const __glob = require('glob-all');
const __path = require('path');
const __fs = require('fs');
const __SInterface = require('@coffeekraken/s-interface').default;
const __isPath = require('../shared/is/path').default;
const __parseHtml = require('../shared/console/parseHtml').default;
const __SSugarJson = require('@coffeekraken/s-sugar-json').default;
const __SSugarConfig = require('@coffeekraken/s-sugar-config').default;
const __SBench = require('@coffeekraken/s-bench').default;
const __sugarBanner = require('@coffeekraken/sugar/shared/ascii/sugarBanner').default;
const { Select, AutoComplete } = require('enquirer');
require('../node/index');
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
const cliParams = SSugarCliParamsInterface.apply(process.argv.slice(2).join(' ')).value;
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
        // reading sugarJsons
        const sugarJsonInstance = new __SSugarJson();
        this._sugarJsons = sugarJsonInstance.read();
        // init available cli
        this._getAvailableCli();
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
    }
    _process() {
        var _a, _b;
        console.log(this);
        if (!this._availableCli[`${this._stack}.${(_a = this._action) !== null && _a !== void 0 ? _a : '_default'}`]) {
            this._displayHelpAfterError();
            process.exit();
        }
        const cliObj = this._availableCli[`${this._stack}.${(_b = this._action) !== null && _b !== void 0 ? _b : '_default'}`];
        // @ts-ignore
        if (cliObj.processPath) {
            const processFn = require(cliObj.processPath).default;
            // @ts-ignore
            processFn(this._args);
        }
    }
    _getAvailableCli() {
        // loop on each filtered files to build the this._availableCli stack
        Object.keys(this._sugarJsons).forEach((packageName) => {
            const sugarJson = this._sugarJsons[packageName];
            const packageJson = require(sugarJson.metas.path.replace('/sugar.json', '/package.json'));
            if (!sugarJson.cli)
                return;
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
        });
    }
    _newStep() {
        console.clear();
        console.log(__parseHtml(__sugarBanner({
            paddingTop: 1,
            paddingBottom: 1
        })));
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
                    const pro = require(obj.processPath).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLHlDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ2xFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN0RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ25FLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2RSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXRGLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXJELE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUV6QixNQUFNLHdC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