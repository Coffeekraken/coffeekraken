const __isChildProcess = require('../../node/is/childProcess');
const __argsToObject = require('../../node/cli/argsToObject');
const __SProcessOutput = require('../../node/blessed/SProcessOutput');
const __PhpSCli = require('../../node/server/SPhpServerCli');

module.exports = (stringArgs = '') => {
  const cli = new __PhpSCli();
  cli.spawnWithDisplay();
};
