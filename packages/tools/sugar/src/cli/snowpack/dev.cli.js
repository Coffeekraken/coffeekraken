"use strict";
const __SSnowpackDevProcess = require('../../node/snowpack/SSnowpackDevProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
module.exports = (stringArgs = '') => {
    const pro = new __SProcessManager(__SSnowpackDevProcess, {
        autoRun: true,
        processSettings: {
            runAsChild: true
        }
    });
};
