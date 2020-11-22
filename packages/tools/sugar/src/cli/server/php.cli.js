"use strict";
const __PhpSCli = require('../../node/server/SPhpServerCli');
module.exports = (stringArgs = '') => {
    const cli = new __PhpSCli();
    cli.runWithOutput(stringArgs);
};
