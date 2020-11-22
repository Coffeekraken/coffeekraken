"use strict";
const __SFrontendServerProcess = require('../../node/server/frontend/SFrontendServerProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
module.exports = (stringArgs = '') => {
    const manager = new __SProcessManager(__SFrontendServerProcess, {
        autoRun: true,
        processSettings: {
            runAsChild: true
        }
    });
};
