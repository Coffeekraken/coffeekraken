"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
exports.default = async (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definitionObj: {
            highest: {
                type: 'Boolean',
                alias: 'h',
                default: false
            }
        }
    });
    console.log(packageRoot_1.default(args.highest));
};
