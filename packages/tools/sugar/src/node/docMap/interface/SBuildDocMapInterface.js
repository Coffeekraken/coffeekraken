"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../interface/SInterface');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
/**
 * @name                SBuildDocMapInterface
 * @namespace           sugar.node.build.docMap.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildDocMapInterface extends __SInterface {
    },
    _a.definition = {
        'generate.globs': {
            type: 'String|Array<String>',
            alias: 'i',
            description: 'Input files glob pattern',
            default: __sugarConfig('docMap.generate.globs'),
            level: 1
        },
        'generate.output': {
            type: 'String',
            alias: 'o',
            description: 'Output file path',
            default: __sugarConfig('docMap.generate.output'),
            level: 1
        },
        'generate.exclude': {
            type: 'Object',
            description: 'Specify some regexp used to exclude files from resulting docMap',
            default: __sugarConfig('docMap.generate.exclude'),
            level: 1
        },
        'find.globs': {
            type: 'String|Array<String>',
            alias: 'i',
            description: 'docMap.json files glob pattern',
            default: __sugarConfig('docMap.find.globs'),
            level: 1
        },
        'find.exclude': {
            type: 'Object',
            description: 'Specify some regexp used to exclude files from searching docMaps',
            default: __sugarConfig('docMap.find.exclude'),
            level: 1
        }
    },
    _a);
//# sourceMappingURL=SBuildDocMapInterface.js.map