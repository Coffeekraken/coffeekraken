// @ts-nocheck

import __parseArgs from '../../shared/cli/parseArgs';
import __SProcess from '../../node/process/SProcess';

interface IProcessRunChildOptions {
  processPath: string;
}

export default (stringArgs = '') => {
  const args: IProcessRunChildOptions = __parseArgs(stringArgs);
  if (!args.processPath) {
    throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
  }
  const ProcessClass = require(args.processPath).default;
  if (ProcessClass.prototype instanceof __SProcess) {
    const processInstance = new ProcessClass();
    processInstance.run(stringArgs);
  }
};
