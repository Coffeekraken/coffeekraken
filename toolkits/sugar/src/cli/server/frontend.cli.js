const __FrontendServerCli = require('../../node/server/frontend/SFrontendServerCli');
const __isChildProcess = require('../../node/is/childProcess');
const __frontendServer = require('../../node/server/frontend/frontend');
const __argsToObject = require('../../node/cli/argsToObject');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  // if (__isChildProcess()) {
  //   const server = __frontendServer();
  //   __argsToObject(stringArgs, __FrontendServerCli.definitionObj);
  //   return;
  // }
  const cli = new __FrontendServerCli();
  const process = cli.run(stringArgs);
  __output(process);
};
