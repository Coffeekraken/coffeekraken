const __ScssBuildSPanel = require('../../node/build/panels/ScssBuildSPanel');
const __isChildProcess = require('../../node/is/childProcess');
const __buildScss = require('../../node/build/scss');
const __ScssBuildSProcess = require('../../node/build/processes/ScssBuildSProcess');

module.exports = (stringArgs = '') => {
  if (__isChildProcess()) {
    const build = __buildScss();
    build.on('log', (message) => {
      console.log('~' + message);
    });
    return;
  }

  const _process = new __ScssBuildSProcess({});
  console.log('P', _process);

  // const scssBuildSPanel = new __ScssBuildSPanel({
  //   screen: true
  // });
  // scssBuildSPanel.build();
  // return scssBuildSPanel;
};
