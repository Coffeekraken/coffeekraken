#!/usr/bin/env node --trace-warnings --trace-uncaught

import __childProcess from 'child_process';
import __glob from 'glob-all';
import __packageRoot from '../node/path/packageRoot';
import __path from 'path';
import __fs from 'fs';
import __isPath from '../shared/is/path';
import __parseHtml from '../shared/console/parseHtml';

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
const command =
  process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
let stack = command.split('.')[0];
const action = command.split('.')[1] || null;
const args =
  process.argv
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
const globalNodeModulesPath = __childProcess
  .execSync(`npm root -g`)
  .toString()
  .trim();

// get local node modules directory path
const localNodeModulesPath = `${__packageRoot()}/node_modules`;

// build globs
const globs: string[] = [];

// local first
if (localNodeModulesPath) {
  globs.push(`${localNodeModulesPath}/*/sugar.json`);
  globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
  globs.push(`${__packageRoot()}/sugar.json`);
}
// then global
if (globalNodeModulesPath) {
  globs.push(`${globalNodeModulesPath}/*/sugar.json`);
  globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
}

// search for "sugar.json" files
const files = __glob.sync(globs, {});

// filter by packageJson
const filteredFiles: string[] = [];
files.forEach((path) => {
  const packagePath = path.split('node_modules/').slice(-1);
  if (filteredFiles.indexOf(packagePath) === -1) filteredFiles.push(path);
});

const availableCli: Record<string, string> = {};

// loop on each filtered files to build the availableCli stack
filteredFiles.forEach((sugarFilePath) => {
  const sugarJson = require(sugarFilePath);
  const packageJson = require(sugarFilePath.replace(
    '/sugar.json',
    '/package.json'
  ));
  if (!sugarJson.cli) return;
  sugarJson.cli.forEach((cliObj) => {
    if (!cliObj.actions) {
      throw new Error(
        `The following sugar.json file "${sugarFilePath}" is missing the "cli.actions" object`
      );
    }
    Object.keys(cliObj.actions).forEach((action) => {
      const actionObj = cliObj.actions[action];

      if (actionObj.process && __isPath(actionObj.process)) {
        const cliPath = __path.resolve(
          sugarFilePath.replace(/\/sugar\.json$/, ''),
          actionObj.process
        );
        if (!__fs.existsSync(cliPath))
          throw new Error(
            `[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`
          );
        availableCli[`${cliObj.stack}.${action}`] = {
          ...actionObj,
          packageJson,
          process: require(cliPath).default // eslint-disable-line
        };
      } else if (actionObj.command) {
        availableCli[`${cliObj.stack}.${action}`] = {
          ...actionObj,
          packageJson
        };
      }
    });
  });
});

// check if the requested stack.action exists
let currentPackage;
if (!availableCli[`${stack}.${action}`]) {
  const logArray: string[] = [];
  logArray.push(' ');
  logArray.push(`--------------------`);
  logArray.push(`<yellow>Sugar CLI</yellow>`);
  logArray.push(`--------------------`);
  logArray.push(
    `<red>Sorry</red> but the requested "<cyan>${stack}.${action}</cyan>" command does not exists...`
  );
  logArray.push(
    `Here's the list of <green>available commands</green> in your context:`
  );
  Object.keys(availableCli).forEach((stackAction) => {
    const cliObj = availableCli[stackAction];
    if (currentPackage !== cliObj.packageJson.name) {
      logArray.push(' ');
      logArray.push(
        `<yellow>│</yellow> <yellow>${cliObj.packageJson.name}</yellow> ${cliObj.packageJson.license} (<cyan>${cliObj.packageJson.version}</cyan>)`
      );
      currentPackage = cliObj.packageJson.name;
    }
    logArray.push(
      `<yellow>│</yellow> - '<yellow>sugar</yellow> <cyan>${stackAction}</cyan> ...': ${cliObj.description}`
    );
  });
  logArray.push(' ');
  logArray.push(
    `For more help on each of these commands, simply call them with the <cyan>--help</cyan> flag`
  );
  logArray.push(' ');
  console.log(__parseHtml(logArray.join('\n')));
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
