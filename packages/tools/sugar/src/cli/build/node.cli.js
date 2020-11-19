const __SBuildNodeCli = require('../../node/build/node/SBuildNodeCli');
const __SBuildNodeActionsStream = require('../../node/build/node/SBuildNodeActionsStream');
const __output = require('../../node/process/output');
const __sugarConfig = require('../../node/config/sugar');

module.exports = (stringArgs = '') => {
  const cli = new __SBuildNodeCli();
  __output(cli.run(stringArgs));
};
