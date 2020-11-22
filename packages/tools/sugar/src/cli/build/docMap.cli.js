"use strict";
const __SBuildDocMapProcess = require('../../node/build/docMap/SBuildDocMapProcess');
module.exports = (stringArgs = '') => {
    const pro = new __SBuildDocMapProcess({});
    pro.run(stringArgs);
};
