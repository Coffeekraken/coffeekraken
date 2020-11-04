const __SBuildSnowpackProcess = require('../../node/build/snowpack/SBuildSnowpackProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
const __SFsDeamon = require('../../node/deamon/fs/SFsDeamon');

module.exports = (stringArgs = '') => {
  const manager = new __SProcessManager(__SBuildSnowpackProcess, {
    autoRun: true,
    // deamon: new __SFsDeamon({
    //   processParams: (params, file) => {
    //     // params.input = file.path;
    //     return params;
    //   }
    // }),
    processSettings: {
      runAsChild: true
    }
  });
};
