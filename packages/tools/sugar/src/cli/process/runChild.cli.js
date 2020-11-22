"use strict";
const __parseArgs = require('../../node/cli/parseArgs');
module.exports = (stringArgs = '') => {
    const args = __parseArgs(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const ProcessClass = require(args.processPath);
    const processInstance = new ProcessClass();
    processInstance.run(stringArgs);
};
