#!/usr/bin/env node --trace-warnings --trace-uncaught
// @ts-nocheck

require = require('esm')(module, {});
// module.exports = require('./main.js');

import __childProcess from 'child_process';
import __glob from 'glob-all';
import __packageRoot from '../node/path/packageRoot';
import __path from 'path';
import __fs from 'fs';
import __isPath from '../shared/is/path';
import __parseHtml from '../shared/console/parseHtml';
import __sugarJson from '../node/sugar/sugarJson';
import __SSugarJson from '@coffeekraken/s-sugar-json';

import '../node/index';

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

(async () => {
  const sugarJsonInstance = new __SSugarJson();
  const sugarJsons = sugarJsonInstance.read();

  // // filter by packageJson
  // const filteredFiles: string[] = [];
  // files.forEach((path) => {
  //   const packagePath = path.split('node_modules/').slice(-1);
  //   if (filteredFiles.indexOf(packagePath) === -1) filteredFiles.push(path);
  // });

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
          availableCli[`${cliObj.stack}.${action}`] = {
            packageJson,
            ...actionObj,
            processPath: cliPath
          };
        } else if (actionObj.command) {
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

  const cliObj = availableCli[`${stack}.${action}`];
  // @ts-ignore
  if (cliObj.processPath) {
    const processFn = require(cliObj.processPath).default;
    // @ts-ignore
    processFn(args);
  }
})();
