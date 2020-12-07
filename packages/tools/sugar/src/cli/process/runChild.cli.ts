// @ts-nocheck

import __parseArgs from '../../node/cli/parseArgs';
import __SProcess from '../../node/process/SProcess';

interface IProcessRunChildOptions {
  processPath: string;
}

export = (stringArgs = '') => {
  const args: IProcessRunChildOptions = __parseArgs(stringArgs);
  if (!args.processPath) {
    throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
  }
  const ProcessClass = require(args.processPath);

  if (ProcessClass instanceof __SProcess) {
    const processInstance = new ProcessClass();
    processInstance.run(stringArgs);
  }
};
