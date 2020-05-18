const __isChildProcess = require('../../node/is/childProcess');
const __buildScss = require('../../node/build/scss');
const __parseHtml = require('../../node/terminal/parseHtml');
const __SProcess = require('../../node/terminal/SProcess');
const __SProcessPanel = require('../../node/blessed/SProcessPanel');
const __parseArgs = require('../../node/cli/parseArgs');
const __ScssBuildSProcess = require('../../node/build/process/ScssBuildSProcess');

module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    child: {
      type: 'boolean',
      default: false
    }
  });

  if (__isChildProcess()) {
    const build = __buildScss({
      watch: true
    });
    build.on('log', (message) => {
      console.log(message);
    });
    return;
  }

  const scssBuildProcess = new __ScssBuildSProcess();
  const panel = new __SProcessPanel(scssBuildProcess, {});
  global.screen.append(panel);
};
