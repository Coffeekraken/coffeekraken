const __SBuildFrontspecProcess = require('../../node/build/frontspec/SBuildFrontspecProcess');

module.exports = (stringArgs = '') => {
  const pro = new __SBuildFrontspecProcess({});
  pro.run(stringArgs);
};
