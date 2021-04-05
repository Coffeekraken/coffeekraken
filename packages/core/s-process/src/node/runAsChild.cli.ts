// @ts-nocheck

import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';

interface IProcessRunChildOptions {
  processPath: string;
}

const stringArgs =
  process.argv
    .slice(1)
    .map((arg) => {
      if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
      }
      return arg;
    })
    .join(' ') || '';
const args: IProcessRunChildOptions = __parseArgs(stringArgs);
if (!args.processPath) {
  throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
}
const settings = Object.assign({}, args._settings);
delete args._settings;
const ProcessClass = require(args.processPath).default; // eslint-disable-line
if (ProcessClass.prototype instanceof __SProcess) {
  const processInstance = new ProcessClass(
    {},
    {
      process: {
        ...settings,
        runAsChild: false
      }
    }
  );
  processInstance.run(stringArgs);
}
