// @ts-nocheck

import __SBuildDocMapProcess from '../../node/docMap/SBuildDocMapProcess';

export = (stringArgs = '') => {
  const pro = new __SBuildDocMapProcess({});
  pro.run(stringArgs);
};
