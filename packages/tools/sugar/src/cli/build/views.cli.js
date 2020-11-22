"use strict";
const __parseArgs = require('../../node/cli/parseArgs');
const __SBuildViewCli = require('../../node/build/views/SBuildViewsCli');
const __SBuildViewsActionsStream = require('../../node/build/views/SBuildViewsActionsStream');
const __output = require('../../node/process/output');
module.exports = (stringArgs = '') => {
    const args = __parseArgs(stringArgs, {
        definitionObj: __SBuildViewCli.interface.definitionObj
    });
    const stream = new __SBuildViewsActionsStream({});
    const proc = stream.start(args);
    __output(proc);
};
