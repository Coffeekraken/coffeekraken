#!/usr/bin/env node --trace-warnings --trace-uncaught
// @ts-nocheck

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
const command =
  process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
let stack = command.split('.')[0];
const cliAction = command.split('.')[1] || null;
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

// setInterval(() => {
//   console.log(__SSugarConfig.get('assets.js'));
// }, 2000);

(async () => {
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

  const availableCli: Record<string, string> = {};

  // loop on each filtered files to build the availableCli stack
  Object.keys(sugarJsons).forEach((packageName) => {
    const sugarJson = sugarJsons[packageName];
    const packageJson = require(sugarJson.metas.path.replace(
      '/sugar.json',
      '/package.json'
    ));
    if (!sugarJson.cli) return;
    sugarJson.cli.forEach((cliObj) => {
      if (!cliObj.actions) {
        throw new Error(
          `The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`
        );
      }

      Object.keys(cliObj.actions).forEach((action) => {
        const actionObj = cliObj.actions[action];

        if (actionObj.process && __isPath(actionObj.process)) {
          const cliPath = __path.resolve(
            sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
            actionObj.process
          );
          if (!__fs.existsSync(cliPath))
            throw new Error(
              `[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`
            );
          if (
            !cliAction &&
            cliObj.defaultAction &&
            action === cliObj.defaultAction
          ) {
            availableCli[`${cliObj.stack}._default`] = {
              packageJson,
              ...actionObj,
              processPath: cliPath
            };
          }

          availableCli[`${cliObj.stack}.${action}`] = {
            packageJson,
            ...actionObj,
            processPath: cliPath
          };
        } else if (actionObj.command) {
          if (
            !cliAction &&
            cliObj.defaultAction &&
            action === cliObj.defaultAction
          ) {
            availableCli[`${cliObj.stack}._default`] = {
              packageJson,
              ...actionObj
            };
          }
          availableCli[`${cliObj.stack}.${action}`] = {
            packageJson,
            ...actionObj
          };
        }
      });
    });
  });

  // check if the requested stack.action exists
  let currentPackage;
  if (!availableCli[`${stack}.${cliAction ?? '_default'}`]) {
    const logArray: string[] = [];
    logArray.push(' ');
    logArray.push(`--------------------`);
    logArray.push(`<yellow>Sugar CLI</yellow>`);
    logArray.push(`--------------------`);
    logArray.push(
      `<red>Sorry</red> but the requested "<cyan>${stack}.${
        cliAction ?? 'default'
      }</cyan>" command does not exists...`
    );
    logArray.push(
      `Here's the list of <green>available commands</green> in your context:`
    );
    Object.keys(availableCli).forEach((stackAction) => {
      const cliObj = availableCli[stackAction];
      if (currentPackage !== cliObj.packageJson.name) {
        logArray.push(' ');
        logArray.push(
          `<yellow>│</yellow> ${cliObj.packageJson.license ?? 'MIT'} <yellow>${
            cliObj.packageJson.name
          }</yellow> (<cyan>${cliObj.packageJson.version}</cyan>)`
        );
        currentPackage = cliObj.packageJson.name;
      }
      logArray.push(
        // @ts-ignore
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

  const cliObj = availableCli[`${stack}.${cliAction ?? '_default'}`];
  // @ts-ignore
  if (cliObj.processPath) {
    const processFn = require(cliObj.processPath).default;
    // @ts-ignore
    processFn(args);
  }
})();
