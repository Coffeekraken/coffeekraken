const __sugarConfig = require('../../node/config/sugar');
const __argsToString = require('../../node/cli/argsToString');
const __childProcess = require('child_process');

module.exports = (stringArgs = '') => {
  const jestConfig = __sugarConfig('jest');
  const defaultJestConfig = __argsToString(jestConfig.cli);
  stringArgs = `${defaultJestConfig} ${stringArgs}`;
  __childProcess.spawn(`jest ${stringArgs}`, null, {
    stdio: 'inherit',
    shell: true
  });
};
