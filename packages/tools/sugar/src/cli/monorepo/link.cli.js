"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
const output_1 = __importDefault(require("../../node/process/output"));
exports.default = (stringArgs = '') => {
    const process = linkPackages_1.default();
    output_1.default(process);
};
