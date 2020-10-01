const __SSugarAppCli = require('../../node/app/sugar/SSugarAppCli');
const __SSugarAppTerminalUi = require('../../node/app/sugar/SSugarAppTerminalUi');

module.exports = function (stringArgs = '') {
  const sugarUiCli = new __SSugarAppCli(stringArgs, {
    output: __SSugarAppTerminalUi
  });
  sugarUiCli.run();
};
