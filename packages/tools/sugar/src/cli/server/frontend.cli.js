"use strict";
import __SFrontendServerProcess from '../../node/server/frontend/SFrontendServerProcess';
import __SProcessManager from '../../node/process/SProcessManager';

export default (stringArgs = '') => {
    const manager = new __SProcessManager(__SFrontendServerProcess, {
        autoRun: true,
        processSettings: {
            runAsChild: true
        }
    });
};
