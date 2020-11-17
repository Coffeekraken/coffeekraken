const __SBuildFrontspecProcess = require('../../node/frontspec/build/SBuildFrontspecProcess');
const __SProcessManager = require('../../node/process/SProcessManager');

module.exports = async (stringArgs = '') => {
  new __SProcessManager(__SBuildFrontspecProcess, {
    autoRun: true,
    initialParams: stringArgs
  });
};
