const __SBladePhpServerCli = require('../../node/server/SBladePhpServerCli');

module.exports = (stringArgs = '') => {
  const cli = new __SBladePhpServerCli();
  cli.runWithOutput(stringArgs);
};
