"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const glob_1 = __importDefault(require("glob"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
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
