"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class STsCompileInterface extends SInterface_1.default {
    },
    _a.definition = {
        // ...__TscInterface.definition,
        project: {
            type: 'Array<File>',
            alias: 'p'
        },
        stacks: {
            type: 'Array<String>',
            alias: 's'
        },
        input: {
            type: 'String',
            alias: 'i'
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
            type: 'Boolean'
        }
    },
    _a);
//# sourceMappingURL=STsCompileInterface.js.map