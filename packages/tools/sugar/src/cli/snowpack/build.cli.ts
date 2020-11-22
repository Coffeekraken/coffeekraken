const __SSnowpackBuildProcess = require('../../node/snowpack/SSnowpackBuildProcess');
const __SProcessManager = require('../../node/process/SProcessManager');

module.exports = (stringArgs = '') => {
  const pro = new __SProcessManager(__SSnowpackBuildProcess, {
    autoRun: true,
    processSettings: {
      runAsChild: true
    }
  });
};
