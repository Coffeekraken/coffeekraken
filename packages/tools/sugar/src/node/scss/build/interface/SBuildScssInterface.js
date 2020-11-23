"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SBuildScssInterface
 * @namespace           sugar.node.build.scss.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildScssInterface extends SInterface_1.default {
}
exports.default = SBuildScssInterface;
SBuildScssInterface.definitionObj = {
    input: {
        type: 'String',
        default: sugar_1.default('build.scss.input')
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('build.scss.outputDir')
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('build.scss.rootDir')
    },
    style: {
        type: 'String',
        alias: 's',
        description: 'Output style (nested,expanded,compact,compressed)',
        default: sugar_1.default('build.scss.style') || 'expanded',
        level: 1
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('build.scss.map') || true,
        level: 1
    },
    cache: {
        type: 'Boolean',
        default: sugar_1.default('build.scss.cache')
    },
    clearCache: {
        type: 'Boolean',
        default: sugar_1.default('build.scss.clearCache')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('build.scss.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('build.scss.minify')
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('build.scss.prod')
    },
    sharedResources: {
        type: 'String|Array<String>',
        alias: 'r',
        description: 'Specify some files to load in every imported files using @use or @import',
        default: sugar_1.default('build.scss.sharedResources'),
        level: 1
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('build.scss.banner')
    },
    sass: {
        type: 'Object',
        description: 'Object passed to the sass compiler',
        default: sugar_1.default('build.scss.sass') || {},
        level: 2
    }
};
