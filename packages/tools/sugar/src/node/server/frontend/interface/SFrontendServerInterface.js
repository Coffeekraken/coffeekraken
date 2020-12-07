"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SFrontendServerInterface extends SInterface_1.default {
    },
    _a.definition = {
        hostname: {
            type: 'String',
            alias: 'o',
            description: 'Server hostname',
            default: sugar_1.default('frontend.hostname') || '127.0.0.1',
            level: 1
        },
        port: {
            type: 'Number',
            alias: 'p',
            description: 'Server port',
            default: sugar_1.default('frontend.port') || 3000,
            level: 1
        },
        rootDir: {
            type: 'String',
            description: 'Server root directory',
            default: sugar_1.default('frontend.rootDir') || __packageRoot(process.cwd()),
            level: 1
        },
        viewsDir: {
            type: 'String',
            description: 'Server views directory',
            default: sugar_1.default('frontend.viewsDir') ||
                __packageRoot(process.cwd()) + '/views'
        }
    },
    _a);
//# sourceMappingURL=SFrontendServerInterface.js.map