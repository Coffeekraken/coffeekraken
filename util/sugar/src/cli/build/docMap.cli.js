const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildDocMapCli = require('../../node/build/docMap/SBuildDocMapCli');
const __SBuildDocMapActionsStream = require('../../node/build/docMap/SBuildDocMapActionsStream');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildDocMapCli.definitionObj);
  const stream = new __SBuildDocMapActionsStream({
    name: 'Build docMap.json file'
  });
  const proc = stream.start(args);
  __output(proc);
};
