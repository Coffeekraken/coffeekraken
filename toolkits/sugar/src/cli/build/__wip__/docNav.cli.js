const __parseArgs = require('../../../node/cli/parseArgs');
const __SBuildDocNavCli = require('../../node/build/docNav/SBuildDocNavCli');
const __SBuildDocNavActionsStream = require('../../node/build/docNav/SBuildDocNavActionsStream');
const __output = require('../../../node/process/output');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildDocNavCli.definitionObj);
  const stream = new __SBuildDocNavActionsStream({
    name: 'Build docNav.json'
  });
  const proc = stream.start(args);
  __output(proc);
};
