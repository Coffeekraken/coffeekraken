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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../shared/is/path"));
const parseHtml_1 = __importDefault(require("../shared/console/parseHtml"));
const sugarJson_1 = __importDefault(require("../node/sugar/sugarJson"));
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
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({}, actionObj), { process: require(cliPath).default // eslint-disable-line
                     });
                }
                else if (actionObj.command) {
                    availableCli[`${cliObj.stack}.${action}`] = Object.assign({}, actionObj);
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
            const cliObj = availableCli[stackAction];
            if (currentPackage !== packageName) {
                logArray.push(' ');
                logArray.push(`<yellow>│</yellow> <yellow>${packageName}</yellow>`);
                currentPackage = packageName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFLZCxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLDZEQUF5QztBQUN6Qyw0RUFBc0Q7QUFDdEQsd0VBQWtEO0FBRWxEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxHQUNYLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzdDLE1BQU0sSUFBSSxHQUNSLE9BQU8sQ0FBQyxJQUFJO0tBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1gsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3ZELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVyQix1Q0FBdUM7QUFDdkMsSUFBSSxDQUFDLEtB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