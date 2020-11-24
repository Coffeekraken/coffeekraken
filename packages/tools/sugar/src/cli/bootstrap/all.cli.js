"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const monorepo_cli_1 = __importDefault(require("./monorepo.cli"));
module.exports = (stringArgs = '') => {
    monorepo_cli_1.default(stringArgs);
};
