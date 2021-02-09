// @ts-nocheck

import __SFrontendServerProcess from '../../node/server/frontend/SFrontendServerProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export default (stringArgs = '') => {
  // const manager = new __SProcessManager(, {
  //   autoRun: true,
  //   processSettings: {
  //     runAsChild: true
  //   }
  // });

  const pro = new __SFrontendServerProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run();
};
