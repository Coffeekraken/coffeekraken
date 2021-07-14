#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
// @ts-nocheck

import __childProcess from 'child_process';
import __glob from 'glob-all';
import __path from 'path';
import __fs from 'fs';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SInterface from '@coffeekraken/s-interface';
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SBench from '@coffeekraken/s-bench';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';

import * as Enquirer from 'enquirer';

import '@coffeekraken/sugar/node/index';

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

const cliParams = SSugarCliParamsInterface.apply(process.argv.slice(2).join(' '));
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

    // checking and set "NODE_ENV"
    const params = __parseArgs(this._args);
    if (params.env) {
      switch(params.env) {
        case 'dev':
        case 'development':
          process.env.NODE_ENV = 'development';
        break;
        case 'prod':
        case 'production':
          process.env.NODE_ENV = 'production';
        break;
        case 'test':
          process.env.NODE_ENV = 'test';
        break;
        default:
          throw new Error(`<red>[sugar]</red> Sorry but the passed env "<yellow>${params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`);
        break;
      }
    } else {
      process.env.NODE_ENV = 'development';
    }

    // print header
    if (!__isChildProcess()) {
      this._newStep();
    }

    (async () => {

      // load the sugar config
      await __SSugarConfig.load();

      // reading sugarJsons
      const sugarJsonInstance = new __SSugarJson();
      this._sugarJsons = await sugarJsonInstance.read();

      // init available cli
      await this._getAvailableCli();

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

    })();
  }

  async _process() {

    if (!this._availableCli[`${this._stack}.${this._action ?? '_default'}`]) {
      this._displayHelpAfterError();      
      process.exit();
    }
    const cliObj = this._availableCli[`${this._stack}.${this._action ?? '_default'}`];

    // @ts-ignore
    if (cliObj.processPath) {
      const {default: processFn} = await import(cliObj.processPath);
      // @ts-ignore
      processFn(this._args);
    }
  }

  async _getAvailableCli() {

    // loop on each filtered files to build the this._availableCli stack

    for (let i = 0; i<Object.keys(this._sugarJsons).length; i++) {
      const packageName = Object.keys(this._sugarJsons)[i];
      const sugarJson = this._sugarJsons[packageName];
      const packageJson = await import(sugarJson.metas.path.replace(
        '/sugar.json',
        '/package.json'
      ));
      if (!sugarJson.cli) continue;
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
    }

    return true;
  }

  _newStep() {
    console.clear();
    console.log(__parseHtml(__sugarBanner({
      paddingTop: 1,
      paddingBottom: 1
    })));
    console.log(__parseHtml(`<yellow>█</yellow> This process is running in the ${process.env.NODE_ENV === 'production' ? '<green>production</green>' : process.env.NODE_ENV === 'test' ? '<cyan>test</cyan>' : '<yellow>development</yellow>'} environment`))
    console.log(__parseHtml('<yellow>█</yellow>'));
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
        const pro = await import(obj.processPath);
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