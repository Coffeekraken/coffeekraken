const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildDocCli = require('../../node/build/doc/SBuildDocCli');
const __SBuildDocActionsStream = require('../../node/build/doc/SBuildDocActionsStream');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildDocCli.interface.definitionObj);
  const stream = new __SBuildDocActionsStream({});
  const proc = stream.start(args);
  __output(proc);
};
