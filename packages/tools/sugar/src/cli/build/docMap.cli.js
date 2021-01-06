"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBuildDocMapProcess_1 = __importDefault(require("../../node/docMap/SBuildDocMapProcess"));
module.exports = (stringArgs = '') => {
    const pro = new SBuildDocMapProcess_1.default({});
    pro.run(stringArgs);
};
//# sourceMappingURL=docMap.cli.js.map