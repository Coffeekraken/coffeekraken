const __SBuildScssProcess = require('../../node/build/scss/SBuildScssProcess');

module.exports = (stringArgs = '') => {
  const pro = new __SBuildScssProcess({});
  pro.run(stringArgs);
};
