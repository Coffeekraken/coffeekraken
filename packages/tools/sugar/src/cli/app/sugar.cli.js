const __SSugarAppTerminalUi = require('../../node/app/sugar/SSugarAppTerminalUi');
const __SSugarAppProcess = require('../../node/app/sugar/SSugarAppProcess');

module.exports = function (stringArgs = '') {
  const sugarAppProcess = new __SSugarAppProcess({
    runAsChild: false,
    output: __SSugarAppTerminalUi
  });
  sugarAppProcess.run(stringArgs);
};
