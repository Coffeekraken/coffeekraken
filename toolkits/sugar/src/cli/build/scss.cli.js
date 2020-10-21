const __SBuildScssProcess = require('../../node/build/scss/SBuildScssProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
const __SFsDeamon = require('../../node/deamon/fs/SFsDeamon');

module.exports = (stringArgs = '') => {
  const manager = new __SProcessManager(__SBuildScssProcess, {
    autoRun: true,
    deamon: new __SFsDeamon({
      processParams: (params, file) => {
        // params.input = file.path;
        return params;
      }
    }),
    processSettings: {
      runAsChild: true
    }
  });
};
