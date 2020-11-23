import __SBuildDocMapProcess from '../../node/build/docMap/SBuildDocMapProcess';

export default (stringArgs = '') => {
  const pro = new __SBuildDocMapProcess({});
  pro.run(stringArgs);
};
