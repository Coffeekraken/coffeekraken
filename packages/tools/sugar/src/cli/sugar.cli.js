#!/usr/bin/env node --trace-warnings --trace-uncaught
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const glob_all_1 = __importDefault(require("glob-all"));
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../shared/is/path"));
const parseHtml_1 = __importDefault(require("../shared/console/parseHtml"));
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
// get global node modules directory path
const globalNodeModulesPath = child_process_1.default
    .execSync(`npm root -g`)
    .toString()
    .trim();
// get local node modules directory path
const localNodeModulesPath = `${packageRoot_1.default()}/node_modules`;
// build globs
const globs = [];
// local first
if (localNodeModulesPath) {
    globs.push(`${localNodeModulesPath}/*/sugar.json`);
    globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
    globs.push(`${packageRoot_1.default()}/sugar.json`);
}
// then global
if (globalNodeModulesPath) {
    globs.push(`${globalNodeModulesPath}/*/sugar.json`);
    globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
}
// search for "sugar.json" files
const files = glob_all_1.default.sync(globs, {});
// filter by packageJson
const filteredFiles = [];
files.forEach((path) => {
    const packagePath = path.split('node_modules/').slice(-1);
    if (filteredFiles.indexOf(packagePath) === -1)
        filteredFiles.push(path);
});
const availableCli = {};
// loop on each filtered files to build the availableCli stack
filteredFiles.forEach((sugarFilePath) => {
    const sugarJson = require(sugarFilePath);
    const packageJson = require(sugarFilePath.replace('/sugar.json', '/package.json'));
    if (!sugarJson.cli)
        return;
    sugarJson.cli.forEach((cliObj) => {
        if (!cliObj.actions) {
            throw new Error(`The following sugar.json file "${sugarFilePath}" is missing the "cli.actions" object`);
        }
        Object.keys(cliObj.actions).forEach((action) => {
            const actionObj = cliObj.actions[action];
            if (actionObj.process && path_2.default(actionObj.process)) {
                const cliPath = path_1.default.resolve(sugarFilePath.replace(/\/sugar\.json$/, ''), actionObj.process);
                if (!fs_1.default.existsSync(cliPath))
                    throw new Error(`[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`);
                availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({}, actionObj), { packageJson, process: require(cliPath).default // eslint-disable-line
                 });
            }
            else if (actionObj.command) {
                availableCli[`${cliObj.stack}.${action}`] = Object.assign(Object.assign({}, actionObj), { packageJson });
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
        if (currentPackage !== cliObj.packageJson.name) {
            logArray.push(' ');
            logArray.push(`<yellow>│</yellow> <yellow>${cliObj.packageJson.name}</yellow> ${cliObj.packageJson.license} (<cyan>${cliObj.packageJson.version}</cyan>)`);
            currentPackage = cliObj.packageJson.name;
        }
        logArray.push(`<yellow>│</yellow> - '<yellow>sugar</yellow> <cyan>${stackAction}</cyan> ...': ${cliObj.description}`);
    });
    logArray.push(' ');
    logArray.push(`For more help on each of these commands, simply call them with the <cyan>--help</cyan> flag`);
    logArray.push(' ');
    console.log(parseHtml_1.default(logArray.join('\n')));
    process.exit();
}
const cliObj = availableCli[`${stack}.${action}`];
if (cliObj.process) {
    console.log(cliObj, args);
    cliObj.process(args);
}
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
//   const __SProcess = require('../node/process/SProcess').default; // eslint-disable-line
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLGtFQUEyQztBQUMzQyx3REFBOEI7QUFDOUIsMkVBQXFEO0FBQ3JELGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFDdEIsNkRBQXlDO0FBQ3pDLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sR0FDWCxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUM3QyxNQUFNLElBQUksR0FDUixPQUFPLENBQUMsSUFBSTtLQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNYLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUN2RCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7S0FDbkI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztLQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFckIsdUNBQXVDO0FBQ3ZDLElBQUks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