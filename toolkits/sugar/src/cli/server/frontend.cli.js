const __FrontendServerCli = require('../../node/server/frontend/SFrontendServerCli');
const __output = require('../../node/process/output');
const __isChildProcess = require('../../node/is/childProcess');

module.exports = (stringArgs = '') => {
  const cli = new __FrontendServerCli();
  const process = cli.run(stringArgs);
  __output(process);
};
