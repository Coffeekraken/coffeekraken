// @ts-nocheck

import __SBuildScssProcess from '../../node/scss/build/SBuildScssProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export default (stringArgs = '') => {
  new __SProcessManager(__SBuildScssProcess, {
    autoRun: true,
    initialParams: stringArgs,
    processSettings: {
      runAsChild: true
    }
  });
};
