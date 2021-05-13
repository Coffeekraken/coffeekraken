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
const __packageRoot = require('../node/path/packageRoot');
const __path = require('path');
const __fs = require('fs');
const __isPath = require('../shared/is/path').default;
const __parseHtml = require('../shared/console/parseHtml').default;
const __SSugarJson = require('@coffeekraken/s-sugar-json').default;
require('../node/index');
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
const command = process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
let stack = command.split('.')[0];
const action = command.split('.')[1] || null;
const args = process.argv
    .slice(3)
    .map((arg) => {
    if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
    }
    return arg;
})
    .join(' ') || '';
// if theirs nothing as stack or action
if (!stack) {
    stack = 'app';
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const sugarJsonInstance = new __SSugarJson();
    const sugarJsons = sugarJsonInstance.read();
    // // filter by packageJson
    // const filteredFiles: string[] = [];
    // files.forEach((path) => {
    //   const packagePath = path.split('node_modules/').slice(-1);
    //   if (filteredFiles.indexOf(packagePath) === -1) filteredFiles.push(path);
    // });
    const availableCli = {};
    // loop on each filtered files to build the availableCli stack
    Object.keys(sugarJsons).forEach((packageName) => {
        const sugarJson = sugarJsons[packageName];
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
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                }
                else if (actionObj.command) {
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign({ packageJson }, actionObj);
                }
            });
        });
    });
    // check if the requested stack.action exists
    let currentPackage;
    if (!availableCli[`${stack}.${action}`]) {
        const logArray = [];
        logArray.push(' ');
        logArray.push(`--------------------`);
        logArray.push(`<yellow>Sugar CLI</yellow>`);
        logArray.push(`--------------------`);
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${stack}.${action}</cyan>" command does not exists...`);
        logArray.push(`Here's the list of <green>available commands</green> in your context:`);
        Object.keys(availableCli).forEach((stackAction) => {
            var _a;
            const cliObj = availableCli[stackAction];
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
        process.exit();
    }
    const cliObj = availableCli[`${stack}.${action}`];
    // @ts-ignore
    if (cliObj.processPath) {
        const processFn = require(cliObj.processPath).default;
        // @ts-ignore
        processFn(args);
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLHlDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzFELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNuRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFbkUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXpCOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxHQUNYLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FB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