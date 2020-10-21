const __moduleAliases = require('../../node/build/js/moduleAliases');
const __SBuildJsProcess = require('../../node/build/js/SBuildJsProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
const __SFsDeamon = require('../../node/deamon/fs/SFsDeamon');

module.exports = (stringArgs = '') => {
  __moduleAliases();
  const manager = new __SProcessManager(__SBuildJsProcess, {
    autoRun: true,
    deamon: new __SFsDeamon({
      processParams: (params, file) => {
        if (params.pack) return params;
        params.input = file.path;
        return params;
      }
    }),
    processSettings: {
      runAsChild: true
    }
  });
  // const pro = new __SBuildJsProcess({
  //   runAsChild: true
  // });
  // pro.run(stringArgs);
};
