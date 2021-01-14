"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
module.exports = (_a = class SScssCompileParamsInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String|Array<String>',
            default: sugar_1.default('scss.compile.input'),
            alias: 'i'
        },
        outputDir: {
            type: 'String',
            default: sugar_1.default('scss.compile.outputDir'),
            alias: 'o'
        },
        rootDir: {
            type: 'String',
            default: sugar_1.default('scss.compile.rootDir')
        },
        save: {
            type: 'Boolean',
            default: false
        },
        watch: {
            type: 'Boolean',
            default: false
        },
        compileOnChange: {
            type: 'Boolean',
            default: true
        },
        style: {
            type: 'String',
            alias: 's',
            description: 'Output style (nested,expanded,compact,compressed)',
            default: sugar_1.default('scss.compile.style') || 'expanded',
            level: 1
        },
        map: {
            type: 'Boolean',
            alias: 'm',
            description: 'Generate a sourcemap file',
            default: sugar_1.default('scss.compile.map') || true,
            level: 1
        },
        cache: {
            type: 'Boolean',
            default: sugar_1.default('scss.compile.cache')
        },
        clearCache: {
            type: 'Boolean',
            default: sugar_1.default('scss.compile.clearCache')
        },
        stripComments: {
            type: 'Boolean',
            default: sugar_1.default('scss.compile.stripComments')
        },
        minify: {
            type: 'Boolean',
            default: sugar_1.default('scss.compile.minify')
        },
        prod: {
            type: 'Boolean',
            default: sugar_1.default('scss.compile.prod')
        },
        sharedResources: {
            type: 'String|Array<String>',
            alias: 'r',
            description: 'Specify some files to load in every imported files using @use or @import',
            default: sugar_1.default('scss.compile.sharedResources'),
            level: 1
        },
        banner: {
            type: 'String',
            description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
            default: sugar_1.default('scss.compile.banner')
        },
        sass: {
            type: 'Object',
            description: 'Object passed to the sass compiler',
            default: sugar_1.default('scss.compile.sass') || {},
            level: 2
        }
    },
    _a);
//# sourceMappingURL=SScssCompileParamsInterface.js.map