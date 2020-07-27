const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildScssCli = require('../../node/build/scss/SBuildScssCli');
const __SBuildScssActionsStream = require('../../node/build/scss/SBuildScssActionsStream');
const __output = require('../../node/process/output');
const __sugarConfig = require('../../node/config/sugar');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildScssCli.definitionObj);
  const stream = new __SBuildScssActionsStream();
  const proc = stream.start(args);
  __output(proc);
};
