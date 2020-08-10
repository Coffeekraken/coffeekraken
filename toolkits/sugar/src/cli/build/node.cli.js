const __SBuildNodeCli = require('../../node/build/node/SBuildNodeCli');
const __SBuildNodeActionsStream = require('../../node/build/node/SBuildNodeActionsStream');
const __output = require('../../node/process/output');
const __sugarConfig = require('../../node/config/sugar');

module.exports = (stringArgs = '') => {
  const stream = new __SBuildNodeActionsStream();
  const args = __SBuildNodeCli.parseArgs(stringArgs);
  const proc = stream.start(args);
  __output(proc);
};
