const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildJsCli = require('../../node/build/js/SBuildJsCli');
const __SBuildJsActionsStream = require('../../node/build/js/SBuildJsActionsStream');
const __output = require('../../node/process/output');
const __moduleAliases = require('../../node/build/js/moduleAliases');
const __color = require('../../node/color/color');

module.exports = (stringArgs = '') => {
  // module aliases
  __moduleAliases();

  const args = __parseArgs(stringArgs, __SBuildJsCli.definitionObj);
  const stream = new __SBuildJsActionsStream();
  const proc = stream.start(args);
  __output(proc);
};
