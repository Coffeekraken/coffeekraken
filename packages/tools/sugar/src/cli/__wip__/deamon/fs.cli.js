"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFsDeamonProcess_1 = __importDefault(require("../../node/deamon/fs/SFsDeamonProcess"));
exports.default = (stringArgs = '') => {
    const pro = new SFsDeamonProcess_1.default();
    pro.run(stringArgs);
};
