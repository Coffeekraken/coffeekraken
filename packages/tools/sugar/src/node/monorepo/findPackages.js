"use strict";
const glob_1 = require("glob");
const folderPath_1 = require("../fs/folderPath");
module.exports = async function findPackages(rootDir = process.cwd()) {
    const packagesObj = {};
    const packagesPaths = glob_1.default
        .sync('**/package.json', {
        cwd: rootDir,
        ignore: '**/node_modules/**'
    })
        .filter((path) => path !== 'package.json');
    packagesPaths.forEach((path) => {
        packagesObj[folderPath_1.default(path)] = require(`${rootDir}/${path}`);
    });
    return packagesObj;
};
