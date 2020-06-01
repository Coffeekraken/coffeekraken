const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildJsCli = require('../../node/build/SBuildJsCli');
const __SBuildJsActionsStream = require('../../node/build/SBuildJsActionsStream');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildJsCli.definitionObj);
  const stream = new __SBuildJsActionsStream({
    name: 'Build JS'
  });
  const proc = stream.start(args);
  __output(proc);
};
