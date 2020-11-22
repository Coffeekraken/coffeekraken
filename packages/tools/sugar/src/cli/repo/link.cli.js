"use strict";
const __childProcess = require('child_process');
module.exports = (stringArgs = '') => {
    __childProcess.exec(`cd $(sugar path.root) && npx lerna link`, (error, stdout, stderr) => {
        if (error) {
            throw new Error(error);
        }
        if (stderr) {
            console.error(stderr);
            return;
        }
        console.log(stdout);
    });
};
