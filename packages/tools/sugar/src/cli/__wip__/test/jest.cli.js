"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const __STestJestCli = require('../../node/test/jest/STestJestCli');
const STestJestProcess_1 = __importDefault(require("../../node/test/jest/STestJestProcess"));
exports.default = (stringArgs = '') => {
    const pro = new STestJestProcess_1.default();
    pro.run(stringArgs);
};
