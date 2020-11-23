"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const sugar_1 = __importDefault(require("../../node/config/sugar"));
exports.default = async (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs, {
        definitionObj: {
            path: {
                type: 'String',
                alias: 'p',
                default: null
            }
        }
    });
    if (!args.path) {
        throw new Error(`The cli action "config.get" need a "path" argument...`);
    }
    console.log(sugar_1.default(args.path));
};
