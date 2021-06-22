#!/usr/bin/env node --trace-warnings --trace-uncaught
// @ts-nocheck

require = require('esm')(module, {});
// module.exports = require('./main.js');

const __childProcess = require('child_process');
const __glob = require('glob-all');
const __path = require('path');
const __fs = require('fs');
const __SInterface = require('@coffeekraken/s-interface').default;
const __isPath = require('../shared/is/path').default;
const __parseHtml = require('../shared/console/parseHtml').default;
const __SSugarJson = require('@coffeekraken/s-sugar-json').default;
const __SSugarConfig = require('@coffeekraken/s-sugar-config').default;
const __SBench = require('@coffeekraken/s-bench').default;
const __sugarBanner = require('@coffeekraken/sugar/shared/ascii/sugarBanner').default;

const { Select, AutoComplete } = require('enquirer');

require('../node/index');

class SSugarCliParamsInterface extends __SInterface {
  static definition = {
    bench: {
      type: {
        type: 'Array<String> | Boolean',
        splitChars: [',']
      },
      default: false,
      explicit: true
    }
  }
}

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

const cliParams = SSugarCliParamsInterface.apply(process.argv.slice(2).join(' ')).value;
if (cliParams.bench) {
  __SBench.env.activateBench(cliParams.bench === true ? '*' : cliParams.bench);
}

class SSugarCli {

  _command: string;
  _stack: string;
  _action: string;
  _args: string;

  _sugarJsons: any;
  _availableCli: Record<string, any> = {}
  _availableInteractiveCli: Record<string, any> = {};

  constructor() {

    this._command =
      process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
    this._stack = this._command.split('.')[0];
    this._action = this._command.split('.')[1] || null;
    this._args =
      process.argv
        .slice(3)
        .map((arg) => {
          // @todo      support for command with 1 sub param like: --something "--else"
          if (arg.includes(' ')) {
            return `"${arg}"`;
          } else if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
            return `"${arg}"`;
          }
          return arg;
        })
        .join(' ') || '';

    // reading sugarJsons
    const sugarJsonInstance = new __SSugarJson();
    this._sugarJsons = sugarJsonInstance.read();

    // init available cli
    this._getAvailableCli();

    // interactive
    if (!this._stack && !this._action && !this._args) {
      this._interactivePrompt();
      return;
    }

    // help
    if (this._args.match(/--help/)) {
      this._displayHelp(this._stack, this._action);
      process.exit();
    }

    // normal process
    this._process();
  }

  _process() {

    console.log(this);

    if (!this._availableCli[`${this._stack}.${this._action ?? '_default'}`]) {
      this._displayHelpAfterError();      
      process.exit();
    }
    const cliObj = this._availableCli[`${this._stack}.${this._action ?? '_default'}`];
    // @ts-ignore
    if (cliObj.processPath) {
      const processFn = require(cliObj.processPath).default;
      // @ts-ignore
      processFn(this._args);
    }
  }

  _getAvailableCli() {

    // loop on each filtered files to build the this._availableCli stack
    Object.keys(this._sugarJsons).forEach((packageName) => {
      const sugarJson = this._sugarJsons[packageName];
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

        if (cliObj.interactive) {
          Object.keys(cliObj.interactive).forEach(interactiveName => {
            const interactiveObj = cliObj.interactive[interactiveName];

            const cliPath = __path.resolve(
              sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
              interactiveObj.process
            );
            if (!__fs.existsSync(cliPath))
              throw new Error(
                `[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`
              );
            
            this._availableInteractiveCli[`${cliObj.stack}.${interactiveName}`] = {
              ...interactiveObj,
              processPath: cliPath
            }
          });
        }

        Object.keys(cliObj.actions).forEach((action) => {

          const actionObj = cliObj.actions[action];

          const cliPath = __path.resolve(
            sugarJson.metas.path.replace(/\/sugar\.json$/, ''),
            actionObj.process
          );
          if (!__fs.existsSync(cliPath))
            throw new Error(
              `[sugar.cli] Sorry but the references cli file "${cliPath}" does not exists...`
            );
          if (
            !this._action &&
            cliObj.defaultAction &&
            action === cliObj.defaultAction
          ) {
            this._availableCli[`${cliObj.stack}._default`] = {
              packageJson,
              ...actionObj,
              processPath: cliPath
            };
          }

          this._availableCli[`${cliObj.stack}.${action}`] = {
            packageJson,
            ...actionObj,
            processPath: cliPath
          };
        });
      });
    });
  }

  _newStep() {
    console.clear();
    console.log(__parseHtml(__sugarBanner({
      paddingTop: 1,
      paddingBottom: 1
    })));
  }

  async _interactivePrompt() {

    this._newStep();

    const choices: string[] = [];
    for (const [name, obj] of Object.entries(this._availableInteractiveCli)) {
      choices.push(obj.title);
    }    
    const prompt = new Select({
      message: 'What do you want Sugar to do for you?',
      choices
    });
    const res = await prompt.run();
    for(const [name, obj] of Object.entries(this._availableInteractiveCli)) {
      if (res === obj.title) {
        const pro = require(obj.processPath).default;
        this._newStep();
        pro();
        break;
      }
    }
  }

  _displayHelp(stack: string, action:string) {
    let currentPackage;
    const logArray: string[] = [];
    Object.keys(this._availableCli).forEach((stackAction) => {
        const _stack = stackAction.split('.')[0];
        const _action = stackAction.split('.')[1];

        if (stack && stack !== _stack) return;
        if (action && action !== _action) return;

        const cliObj = this._availableCli[stackAction];
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
  }

  _displayHelpAfterError() {
    const logArray: string[] = [];
    logArray.push(' ');
    logArray.push(`--------------------`);
    logArray.push(`<yellow>Sugar CLI</yellow>`);
    logArray.push(`--------------------`);
    logArray.push(
      `<red>Sorry</red> but the requested "<cyan>${this._stack}.${
        this._action ?? 'default'
      }</cyan>" command does not exists...`
    );
    logArray.push(
      `Here's the list of <green>available commands</green> in your context:`
    );
    console.log(__parseHtml(logArray.join('\n')));
    this._displayHelp();
  }

}

const cli = new SSugarCli();