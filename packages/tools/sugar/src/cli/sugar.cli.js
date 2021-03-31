#!/usr/bin/env node --trace-warnings --trace-uncaught
"use strict";
// @ts-nocheck
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
// get local node modules directory path
const topLocalNodeModulesPath = `${packageRoot_1.default(process.cwd(), true)}/node_modules`;
// build globs
const globs = [];
// local first
if (localNodeModulesPath) {
    globs.push(`${localNodeModulesPath}/*/sugar.json`);
    globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
    globs.push(`${packageRoot_1.default()}/sugar.json`);
}
// top local
if (localNodeModulesPath !== topLocalNodeModulesPath) {
    globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
    globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
    globs.push(`${packageRoot_1.default(process.cwd(), true)}/sugar.json`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXIuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsY0FBYzs7Ozs7QUFFZCxrRUFBMkM7QUFDM0Msd0RBQThCO0FBQzlCLDJFQUFxRDtBQUNyRCxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLDZEQUF5QztBQUN6Qyw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxPQUFPLEdBQ1gsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDN0MsTUFBTSxJQUFJLEdBQ1IsT0FBTyxDQUFDLElBQUk7S0FDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdkQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7S0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXJCLHVDQUF1QztBQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO0lBQ1YsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUNmO0FBRUQseUNBQXlDO0FBQ3pDLE1BQU0scUJBQXFCLEdBQUcsdUJBQWM7S0FDekMsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUN2QixRQUFRLEVBQUU7S0FDVixJQUFJLEVBQUUsQ0FBQztBQUVWLHdDQUF3QztBQUN4QyxNQUFNLG9CQUFvQixHQUFHLEdBQUcscUJBQWEsRUFBRSxlQUFlLENBQUM7QUFFL0Qsd0NBQXdDO0FBQ3hDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxxQkFBYSxDQUM5QyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxDQUNMLGVBQWUsQ0FBQztBQUVqQixjQUFjO0FBQ2QsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0FBRTNCLGNBQWM7QUFDZCxJQUFJLG9CQUFvQixFQUFFO0lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsZUFBZSxDQUFDLENBQUM7SUFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0NBQzdDO0FBQ0QsWUFBWTtBQUNaLElBQUksb0JBQW9CLEtBQUssdUJBQXVCLEVBQUU7SUFDcEQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHVCQUF1QixlQUFlLENBQUMsQ0FBQztJQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLGlCQUFpQixDQUFDLENBQUM7SUFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUNoRTtBQUNELGNBQWM7QUFDZCxJQUFJLHFCQUFxQixFQUFFO0lBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxxQkFBcUIsZUFBZSxDQUFDLENBQUM7SUFDcEQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHFCQUFxQixpQkFBaUIsQ0FBQyxDQUFDO0NBQ3ZEO0FBRUQsZ0NBQWdDO0FBQ2hDLE1BQU0sS0FBSyxHQUFHLGtCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVyQyx3QkFBd0I7QUFDeEIsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO0FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFFLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztBQUVoRCw4REFBOEQ7QUFDOUQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO0lBQ3RDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDL0MsYUFBYSxFQUNiLGVBQWUsQ0FDaEIsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1FBQUUsT0FBTztJQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0NBQWtDLGFBQWEsdUNBQXVDLENBQ3ZGLENBQUM7U0FDSDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMsSUFBSSxTQUFTLENBQUMsT0FBTyxJQUFJLGNBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzVCLGFBQWEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEVBQzNDLFNBQVMsQ0FBQyxPQUFPLENBQ2xCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29CQUMzQixNQUFNLElBQUksS0FBSyxDQUNiLGtEQUFrRCxPQUFPLHNCQUFzQixDQUNoRixDQUFDO2dCQUNKLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFFLENBQUMsbUNBQ3BDLFNBQVMsS0FDWixXQUFXLEVBQ1gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCO21CQUN6RCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM1QixZQUFZLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLG1DQUNwQyxTQUFTLEtBQ1osV0FBVyxHQUNaLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILDZDQUE2QztBQUM3QyxJQUFJLGNBQWMsQ0FBQztBQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLEVBQUU7SUFDdkMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdEMsUUFBUSxDQUFDLElBQUksQ0FDWCw2Q0FBNkMsS0FBSyxJQUFJLE1BQU0scUNBQXFDLENBQ2xHLENBQUM7SUFDRixRQUFRLENBQUMsSUFBSSxDQUNYLHVFQUF1RSxDQUN4RSxDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNoRCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBSSxjQUFjLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixRQUFRLENBQUMsSUFBSSxDQUNYLDhCQUE4QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksYUFBYSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sV0FBVyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sVUFBVSxDQUM1SSxDQUFDO1lBQ0YsY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQzFDO1FBQ0QsUUFBUSxDQUFDLElBQUk7UUFDWCxhQUFhO1FBQ2Isc0RBQXNELFdBQVcsaUJBQWlCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FDdkcsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLENBQUMsSUFBSSxDQUNYLDZGQUE2RixDQUM5RixDQUFDO0lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ2hCO0FBRUQsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDbEQsYUFBYTtBQUNiLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtJQUNsQixhQUFhO0lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QjtBQUVELDhDQUE4QztBQUM5QyxpQkFBaUI7QUFDakIsNkVBQTZFO0FBQzdFLDJCQUEyQjtBQUMzQix1QkFBdUI7QUFDdkIsdUZBQXVGO0FBQ3ZGLFNBQVM7QUFDVCxhQUFhO0FBQ2IsK0JBQStCO0FBQy9CLE1BQU07QUFDTixJQUFJO0FBRUosaUJBQWlCO0FBQ2pCLHFEQUFxRDtBQUNyRCw4RUFBOEU7QUFDOUUsY0FBYztBQUNkLE1BQU07QUFDTiw4QkFBOEI7QUFDOUIsMEZBQTBGO0FBRTFGLDJEQUEyRDtBQUMzRCwwRkFBMEY7QUFFMUYsd0JBQXdCO0FBQ3hCLHNFQUFzRTtBQUN0RSw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsTUFBTTtBQUNOLFFBQVEifQ==