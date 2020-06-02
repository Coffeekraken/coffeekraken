const __HapiCli = require('../../node/server/SHapiServerCli');
const __isChildProcess = require('../../node/is/childProcess');
const __hapiServer = require('../../node/server/hapi');
const __argsToObject = require('../../node/cli/argsToObject');

module.exports = (stringArgs = '') => {
  if (__isChildProcess()) {
    const server = __hapiServer(
      __argsToObject(stringArgs, __HapiCli.definitionObj)
    );
    return;
  }
  const cli = new __HapiCli();
  cli.runWithOutput(stringArgs);
};
