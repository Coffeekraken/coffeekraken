"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SBuildScssInterface extends SInterface_1.default {
    },
    _a.definition = {
        outputDir: {
            type: 'String',
            default: sugar_1.default('build.frontspec.outputDir'),
            required: true,
            alias: 'o',
            level: 1
        },
        sources: {
            type: 'Array<Object>',
            default: sugar_1.default('build.frontspec.sources'),
            required: true,
            level: 1
        },
        filename: {
            type: 'String',
            default: sugar_1.default('build.frontspec.filename'),
            required: true,
            alias: 'n',
            level: 1
        },
        search: {
            type: 'String',
            default: sugar_1.default('build.frontspec.search'),
            alias: 's',
            level: 1
        },
        dirDepth: {
            type: 'Integer',
            default: sugar_1.default('build.frontspec.dirDepth'),
            required: true,
            alias: 'd',
            level: 1
        },
        cache: {
            type: 'Boolean',
            default: sugar_1.default('build.frontspec.cache'),
            alias: 'c',
            level: 1
        }
    },
    _a);
//# sourceMappingURL=module.js.map