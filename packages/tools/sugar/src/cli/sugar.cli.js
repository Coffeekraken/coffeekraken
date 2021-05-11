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
require = require('esm')(module, {});
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../shared/is/path"));
const parseHtml_1 = __importDefault(require("../shared/console/parseHtml"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
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
    const sugarJsonInstance = new s_sugar_json_1.default();
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
                if (actionObj.process && path_2.default(actionObj.process)) {
                    const cliPath = path_1.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ''), actionObj.process);
                    if (!fs_1.default.existsSync(cliPath))
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
        console.log(parseHtml_1.default(logArray.join('\n')));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQU1yQyxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLDZEQUF5QztBQUN6Qyw0RUFBc0Q7QUFFdEQsOEVBQXNEO0FBRXRELHlCQUF1QjtBQUV2Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUM3QyxNQUFNLElBQUksR0FDUixPQUFPLENBQUMsSUFBSTtLQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNYLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN2RCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7S0FDbkI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENB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