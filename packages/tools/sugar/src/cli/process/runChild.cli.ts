import __parseArgs from '../../node/cli/parseArgs';

interface IProcessRunChildOptions {
  processPath: string;
}

export default (stringArgs = '') => {
  const args: IProcessRunChildOptions = __parseArgs(stringArgs);
  if (!args.processPath) {
    throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
  }
  const ProcessClass = require(args.processPath);
  const processInstance = new ProcessClass();
  processInstance.run(stringArgs);
};
