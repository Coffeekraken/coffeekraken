"use strict";

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
import __STestJestProcess from '../../node/test/jest/STestJestProcess';

export default (stringArgs = '') => {
    const pro = new __STestJestProcess();
    pro.run(stringArgs);
};
