const __SBuildJsCli = require('../../node/build/js/SBuildJsCli');
const __moduleAliases = require('../../node/build/js/moduleAliases');

module.exports = (stringArgs = '') => {
  // module aliases
  __moduleAliases();

  const cli = new __SBuildJsCli(stringArgs, {
    output: {}
  });
  cli.run();
};
