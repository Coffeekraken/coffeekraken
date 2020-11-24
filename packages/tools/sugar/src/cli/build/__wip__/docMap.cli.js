"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildDocMapProcess_1 = __importDefault(require("../../node/build/docMap/SBuildDocMapProcess"));
exports.default = (stringArgs = '') => {
    const pro = new SBuildDocMapProcess_1.default({});
    pro.run(stringArgs);
};
