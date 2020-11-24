"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const all_1 = __importDefault(require("../monorepo/all"));
module.exports = (stringArgs = '') => {
    all_1.default(stringArgs);
};
