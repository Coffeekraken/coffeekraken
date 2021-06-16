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
const __SSugarConfig = require('@coffeekraken/s-sugar-config').default;
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
const cliAction = command.split('.')[1] || null;
const args = process.argv
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
// if theirs nothing as stack or action
if (!stack) {
    stack = 'app';
}
// setInterval(() => {
//   console.log(__SSugarConfig.get('assets.'));
// }, 2000);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const sugarJsonInstance = new __SSugarJson();
    const sugarJsons = sugarJsonInstance.read();
    // // filter by packageJson
    // const filteredFiles: string[] = [];
    // files.forEach((path) => {
    //   const packagePath = path.split('node_modules/').slice(-1);
    //   if (filteredFiles.indexOf(packagePath) === -1) filteredFiles.push(path);
    // });
    // setInterval(() => {
    //   console.log(__SSugarConfig.get('frontspec.default').assets.css);
    // }, 3000);
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
                    if (!cliAction &&
                        cliObj.defaultAction &&
                        action === cliObj.defaultAction) {
                        availableCli[`${cliObj.stack}._default`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                    }
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { processPath: cliPath });
                }
                else if (actionObj.command) {
                    if (!cliAction &&
                        cliObj.defaultAction &&
                        action === cliObj.defaultAction) {
                        availableCli[`${cliObj.stack}._default`] = Object.assign({ packageJson }, actionObj);
                    }
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign({ packageJson }, actionObj);
                }
            });
        });
    });
    // check if the requested stack.action exists
    let currentPackage;
    if (!availableCli[`${stack}.${cliAction !== null && cliAction !== void 0 ? cliAction : '_default'}`]) {
        const logArray = [];
        logArray.push(' ');
        logArray.push(`--------------------`);
        logArray.push(`<yellow>Sugar CLI</yellow>`);
        logArray.push(`--------------------`);
        logArray.push(`<red>Sorry</red> but the requested "<cyan>${stack}.${cliAction !== null && cliAction !== void 0 ? cliAction : 'default'}</cyan>" command does not exists...`);
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
    const cliObj = availableCli[`${stack}.${cliAction !== null && cliAction !== void 0 ? cliAction : '_default'}`];
    // @ts-ignore
    if (cliObj.processPath) {
        const processFn = require(cliObj.processPath).default;
        // @ts-ignore
        processFn(args);
    }
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLHlDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzFELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNuRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXZFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUs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