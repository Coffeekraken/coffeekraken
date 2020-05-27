const __isChildProcess = require('../../node/is/childProcess');
const __buildScss = require('../../node/build/scss');
const __parseArgs = require('../../node/cli/parseArgs');
const __SProcessOutput = require('../../node/blessed/SProcessOutput');
const __SBuildScssCli = require('../../node/build/SBuildScssCli');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, __SBuildScssCli.definitionObj);
  const build = __buildScss(args);
  if (__isChildProcess()) {
    build.on('stdout.data', (message) => {
      console.log(message);
    });
    return;
  }
  const output = new __SProcessOutput(build, {});
  output.attach();
};
