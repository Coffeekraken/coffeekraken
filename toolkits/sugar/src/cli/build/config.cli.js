const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildConfigCli = require('../../node/build/SBuildConfigCli');
const __SBuildConfigActionsStream = require('../../node/build/SBuildConfigActionsStream');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildConfigCli.definitionObj);
  const stream = new __SBuildConfigActionsStream({});
  const proc = stream.start(args);
  __output(proc);
};
