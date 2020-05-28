const __isChildProcess = require('../../node/is/childProcess');
const __buildJs = require('../../node/build/js');
const __parseArgs = require('../../node/cli/parseArgs');
const __SProcessOutput = require('../../node/blessed/SProcessOutput');
const __SBuildJsCli = require('../../node/build/SBuildJsCli');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildJsCli.definitionObj);
  const build = __buildJs(args);
  if (__isChildProcess()) {
    build.on('stdout.data', (message) => {
      console.log(message);
    });
    return;
  }
  const output = new __SProcessOutput(build, {});
  output.attach();
};
