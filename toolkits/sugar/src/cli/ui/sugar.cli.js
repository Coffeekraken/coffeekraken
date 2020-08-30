const __SSugarUiCli = require('../../node/ui/sugar/SSugarUiCli');
const __isChild = require('../../node/is/childProcess');

module.exports = function (stringArgs = '') {
  const sugarUiCli = new __SSugarUiCli(stringArgs);
  sugarUiCli.run();
};
