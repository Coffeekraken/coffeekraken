"use strict";
const __SBuildJsProcess = require('../../node/js/build/SBuildJsProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
module.exports = (stringArgs = '') => {
    new __SProcessManager(__SBuildJsProcess, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
