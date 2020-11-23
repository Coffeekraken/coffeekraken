"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SCompileTsProcess_1 = __importDefault(require("../../node/typescript/SCompileTsProcess"));
function compileTs(stringArgs = '') {
    const pro = new SCompileTsProcess_1.default();
}
exports.default = compileTs;
