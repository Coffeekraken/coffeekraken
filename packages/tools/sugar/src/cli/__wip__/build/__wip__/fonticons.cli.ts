// @ts-nocheck

import __moduleAliases from '../../node/build/js/moduleAliases';
import __SBuildFontIconsProcess from '../../node/build/fontIcons/SBuildFontIconsProcess';
import __SProcessManager from '../../node/process/SProcessManager';
import __SFsDeamon from '../../node/deamon/fs/SFsDeamon';

export default (stringArgs = '') => {
  const manager = new __SProcessManager(__SBuildFontIconsProcess, {
    autoRun: true,
    deamon: new __SFsDeamon({
      processParams: (params, file) => {
        return params;
      }
    }),
    processSettings: {
      runAsChild: true
    }
  });
};
