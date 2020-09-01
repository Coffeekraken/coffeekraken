const __SSugarUiCli = require('../../node/ui/sugar/SSugarUiCli');
const __SSugarUiOutput = require('../../node/ui/sugar/SSugarUiOutput');

module.exports = function (stringArgs = '') {
  const sugarUiCli = new __SSugarUiCli(stringArgs, {
    output: __SSugarUiOutput
  });
  sugarUiCli.run();
};
