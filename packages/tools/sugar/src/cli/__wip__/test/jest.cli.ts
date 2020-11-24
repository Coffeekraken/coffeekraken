// @ts-nocheck

// const __STestJestCli = require('../../node/test/jest/STestJestCli');
import _STestJestProcess from '../../node/test/jest/STestJestProcess';

export default (stringArgs = '') => {
  const pro = new _STestJestProcess();
  pro.run(stringArgs);
};
