const __SBuildFrontspecCli = require('../../node/build/frontspec/SBuildFrontspecCli');

module.exports = (stringArgs = '') => {
  const cli = new __SBuildFrontspecCli(stringArgs, {
    output: {
      maxItemsByGroup: 2
    }
  });
  cli.run();
};
