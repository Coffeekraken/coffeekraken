// @ts-nocheck

import __SBuildFrontspecProcess from '../../node/frontspec/build/SBuildFrontspecProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export = async (stringArgs = '') => {
  new __SProcessManager(__SBuildFrontspecProcess, {
    autoRun: true,
    initialParams: stringArgs
  });
};
