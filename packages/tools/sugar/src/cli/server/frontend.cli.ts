// @ts-nocheck

import __SFrontendServerProcess from '../../node/server/frontend/SFrontendServerProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export = (stringArgs = '') => {
  const manager = new __SProcessManager(__SFrontendServerProcess, {
    autoRun: true,
    processSettings: {
      runAsChild: true
    }
  });
};
