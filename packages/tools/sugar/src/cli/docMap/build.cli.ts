// @ts-nocheck

import __SBuildDocMapProcess from '../../node/docMap/SBuildDocMapProcess';

export = (stringArgs = '') => {
  const pro = new __SBuildDocMapProcess(
    {},
    {
      process: {
        stdio: 'inherit'
      }
    }
  );
  pro.run(stringArgs);
};
