"use strict";
const __moduleAliases = require('../../node/build/js/moduleAliases');
const __SBuildFontIconsProcess = require('../../node/build/fontIcons/SBuildFontIconsProcess');
const __SProcessManager = require('../../node/process/SProcessManager');
const __SFsDeamon = require('../../node/deamon/fs/SFsDeamon');
module.exports = (stringArgs = '') => {
    const manager = new __SProcessManager(__SBuildFontIconsProcess, {
        autoRun: true,
        deamon: new __SFsDeamon({
            processParams: (params, file) => {
                return params;
            }
        }),
        processSettings: {
            runAsChild: true
        }
    });
};
