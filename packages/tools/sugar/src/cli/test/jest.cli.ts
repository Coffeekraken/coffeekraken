// module.exports = (stringArgs = '') => {
//   const jestConfig = __sugarConfig('jest');
//   const defaultJestConfig = __argsToString(jestConfig.cli);
//   stringArgs = `${defaultJestConfig} ${stringArgs}`;
//   __childProcess.spawn(`jest ${stringArgs}`, null, {
//     stdio: 'inherit',
//     shell: true
//   });
// };

// const __STestJestCli = require('../../node/test/jest/STestJestCli');
const __STestJestProcess = require('../../node/test/jest/STestJestProcess');

module.exports = (stringArgs = '') => {
  const pro = new __STestJestProcess();
  pro.run(stringArgs);
};
