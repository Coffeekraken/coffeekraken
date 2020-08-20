// module.exports = (stringArgs = '') => {
//   const jestConfig = __sugarConfig('jest');
//   const defaultJestConfig = __argsToString(jestConfig.cli);
//   stringArgs = `${defaultJestConfig} ${stringArgs}`;
//   __childProcess.spawn(`jest ${stringArgs}`, null, {
//     stdio: 'inherit',
//     shell: true
//   });
// };

const __STestJestCli = require('../../node/test/jest/STestJestCli');

module.exports = (stringArgs = '') => {
  const cli = new __STestJestCli(stringArgs, {
    output: {}
  });
  cli.run();
};
