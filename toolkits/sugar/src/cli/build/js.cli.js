const __moduleAliases = require('../../node/build/js/moduleAliases');
const __SBuildJsProcess = require('../../node/build/js/SBuildJsProcess');

module.exports = (stringArgs = '') => {
  __moduleAliases();
  const pro = new __SBuildJsProcess({
    runAsChild: true
  });
  pro.run(stringArgs);
};
