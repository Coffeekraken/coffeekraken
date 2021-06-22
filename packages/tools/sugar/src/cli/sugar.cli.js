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
const { prompt, Select } = require('enquirer');
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
                Object.keys(cliObj.actions).forEach((action) => {
                    const actionObj = cliObj.actions[action];
                    if (actionObj.process && __isPath(actionObj.process)) {
                        const cliPath = __path.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                        if (!__fs.existsSync(cliPath))
                            throw new Error(`[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`);
                        if (!this._action &&
                            cliObj.defaultAction &&
                            action === cliObj.defaultAction) {
                            this._availableCli[`${cliObj.stack}._default`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                        }
                        this._availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                    }
                    else if (actionObj.command) {
                        if (!this._action &&
                            cliObj.defaultAction &&
                            action === cliObj.defaultAction) {
                            this._availableCli[`${cliObj.stack}._default`] = Object.assign({ packageJson }, actionObj);
                        }
                        this._availableCli[`${cliObj.stack}.${action}`] = Object.assign({ packageJson }, actionObj);
                    }
                });
            });
        });
    }
    _newStep() {
        console.clear();
        console.log(__parseHtml(__sugarBanner()));
    }
    _interactivePrompt() {
        return __awaiter(this, void 0, void 0, function* () {
            this._newStep();
            const prompt = new Select({
                name: 'what',
                message: 'What do you want Sugar to do for you?',
                choices: [
                    'Init a new project',
                    'List the available commands',
                    'Display the help'
                ]
            });
            const res = yield prompt.run();
            this._newStep();
            console.log(res);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLHlDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ2xFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN0RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ25FLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2RSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXRGLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRS9DLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUV6QixNQUFNLHdC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