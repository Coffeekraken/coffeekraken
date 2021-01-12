"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
module.exports = (_a = class STsCompileInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String|Array<String>',
            alias: 'i',
            default: `${packageRoot_1.default()}/tsconfig.json`
        },
        cache: {
            type: 'Boolean',
            default: true
        },
        clearCache: {
            type: 'Boolean',
            default: false
        },
        prod: {
            type: 'Boolean',
            default: false
        },
        stripComments: {
            type: 'Boolean',
            default: false
        },
        tsconfig: {
            type: 'Object',
            default: sugar_1.default('ts')
        },
        transpileOnly: {
            type: 'Boolean',
            default: false
        },
        watch: {
            type: 'Boolean',
            default: false
        }
    },
    _a);
//# sourceMappingURL=STsCompileInterface.js.map