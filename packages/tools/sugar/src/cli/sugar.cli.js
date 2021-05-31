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
// setInterval(() => {
//   console.log(__SSugarConfig.get('assets.js'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLHlDQUF5QztBQUV6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzFELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNuRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXZFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUV6Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUs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