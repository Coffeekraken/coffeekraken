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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require = require('esm')(module /*, options*/);
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../shared/is/path"));
const parseHtml_1 = __importDefault(require("../shared/console/parseHtml"));
const sugarJson_1 = __importDefault(require("../node/sugar/sugarJson"));
require("../node/index");
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
    const sugarJsons = yield sugarJson_1.default('*');
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
                if (actionObj.process && path_2.default(actionObj.process)) {
                    const cliPath = path_1.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                    if (!fs_1.default.existsSync(cliPath))
                        throw new Error(`[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`);
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({ packageJson }, actionObj), { process: require(cliPath).default // eslint-disable-line
                     });
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
        console.log(parseHtml_1.default(logArray.join('\n')));
        process.exit();
    }
    const cliObj = availableCli[`${stack}.${action}`];
    // @ts-ignore
    if (cliObj.process) {
        // @ts-ignore
        cliObj.process(args);
    }
}))();
// // if no action, try to get the default one
// if (!action) {
//   const config = require(`./${stack}/config.json`); // eslint-disable-line
//   if (!config.default) {
//     throw new Error(
//       `Sorry but you have to specify an action to make on the module "${stack}}"...`
//     );
//   } else {
//     action = config.default;
//   }
// }
// (async () => {
//   if (stack === 'monorepo' && action === 'link') {
//     require('./monorepo/link.cli.js').default(args); // eslint-disable-line
//     return;
//   }
//   require('../node/index');
//   const __SProcess = require('@coffeekraken/s-process').default; // eslint-disable-line
//   // const pkg = require(`./${stack}/${action}.cli.js`);
//   const cliApi = require(`./${stack}/${action}.cli.js`).default; // eslint-disable-line
//   // SProcess classes
//   if (cliApi.prototype && cliApi.prototype instanceof __SProcess) {
//     const processInstance = new cliApi({});
//     return await processInstance.run(args);
//   } else if (typeof cliApi === 'function') {
//     return await cliApi(args);
//   }
// })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQU0vQyxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLDZEQUF5QztBQUN6Qyw0RUFBc0Q7QUFDdEQsd0VBQWtEO0FBRWxELHlCQUF1QjtBQUV2Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUM3QyxNQUFNLElBQUksR0FDUixPQUFPLENBQUMsSUFBSTtLQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNYLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN2RCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7S0FDbkI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENB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