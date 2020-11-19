const __ExpressCli = require('../../node/server/express/SExpressServerCli');
const __isChildProcess = require('../../node/is/childProcess');
const __expressServer = require('../../node/server/express/express');
const __argsToObject = require('../../node/cli/argsToObject');

module.exports = (stringArgs = '') => {
  if (__isChildProcess()) {
    const server = __expressServer(
      __argsToObject(stringArgs, __ExpressCli.interface.definitionObj)
    );
    return;
  }
  const cli = new __ExpressCli();
  cli.runWithOutput(stringArgs);
};
