"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monorepo_cli_1 = __importDefault(require("./monorepo.cli"));
exports.default = (stringArgs = '') => {
    monorepo_cli_1.default(stringArgs);
};
