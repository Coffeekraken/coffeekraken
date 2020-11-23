"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const all_1 = __importDefault(require("../monorepo/all"));
exports.default = (stringArgs = '') => {
    all_1.default(stringArgs);
};
