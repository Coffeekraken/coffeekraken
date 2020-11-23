"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SBuildJsCliInterface
 * @namespace           sugar.node.js.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildJsCliInterface extends SInterface_1.default {
}
exports.default = SBuildJsCliInterface;
SBuildJsCliInterface.definitionObj = {
    input: {
        type: 'String',
        default: sugar_1.default('build.js.input')
    },
    outputDir: {
        type: 'String',
        default: sugar_1.default('build.js.outputDir')
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('build.js.rootDir')
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: sugar_1.default('build.js.map'),
        level: 1
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        description: 'Pack the files into a final one or just process the passed file',
        default: sugar_1.default('build.js.bundle'),
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        description: 'Specify the compiler that you want a "production" ready output',
        default: sugar_1.default('build.js.prod')
    },
    format: {
        type: 'String',
        values: ['iife', 'cjs', 'esm'],
        alias: 'f',
        description: 'Specify the format you want as output',
        default: sugar_1.default('build.js.format')
    },
    inject: {
        type: 'Array<String>',
        alias: 'i',
        description: 'Specify some files to inject in each processed files. Usefull for shiming, etc...',
        default: sugar_1.default('build.js.inject')
    },
    loader: {
        type: 'Object',
        alias: 'l',
        description: 'Specify some loader to use for specifiy extensions. Object format ```{".ext": "loader"}```',
        default: sugar_1.default('build.js.loader')
    },
    minify: {
        type: 'Boolean',
        alias: 'm',
        description: 'Specify if you want to minify the output generated code or not',
        default: sugar_1.default('build.js.minify')
    },
    platform: {
        type: 'String',
        values: ['browser', 'node'],
        description: 'Specify the platform you want to build the code for',
        default: sugar_1.default('build.js.platform')
    },
    target: {
        type: 'Array<String>',
        description: 'Specify the target(s) you want. Can be es2020, chrome{version}, firefox{version}, safari{version}, edge{version} or node{version}',
        default: sugar_1.default('build.js.target')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('build.js.banner')
    },
    mainFields: {
        type: 'Array<String>',
        description: 'Specify the list of package.json properties you want the compiler to use to resolve dependencies. The order MATHER',
        default: sugar_1.default('build.js.mainFields')
    }
};
