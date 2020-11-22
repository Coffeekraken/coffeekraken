"use strict";
const __SBuildScssProcess = require('../../node/scss/build/SBuildScssProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
module.exports = (stringArgs = '') => {
    new __SProcessManager(__SBuildScssProcess, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
