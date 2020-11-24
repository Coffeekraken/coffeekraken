// @ts-nocheck

import __SBuildJsProcess from '../../node/js/build/SBuildJsProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export = (stringArgs = '') => {
  new __SProcessManager(__SBuildJsProcess, {
    autoRun: true,
    initialParams: stringArgs,
    processSettings: {
      runAsChild: true
    }
  });
};
