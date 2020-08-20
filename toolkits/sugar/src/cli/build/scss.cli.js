const __SBuildScssCli = require('../../node/build/scss/SBuildScssCli');

module.exports = (stringArgs = '') => {
  const cli = new __SBuildScssCli(stringArgs, {
    output: {}
  });
  cli.run();
};
