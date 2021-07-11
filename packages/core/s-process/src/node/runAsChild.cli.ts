// @ts-nocheck

import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';

interface IProcessRunChildOptions {
  processPath: string;
}

(async() => {

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
  delete args[-1];
  if (!args._settings.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
  }

  const settings = Object.assign({}, args._settings);
  const processPath = settings.processPath;
  delete settings.processPath;
  delete args._settings;

  const pro = await __SProcess.from(processPath, {
    process: {
      ...settings,
      runAsChild: false
    }
  });
  if (pro && pro.run) pro.run(args);

})();
