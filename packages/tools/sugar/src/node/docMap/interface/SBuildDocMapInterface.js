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
        inputGlobs: {
            type: 'String|Array<String>',
            alias: 'i',
            description: 'Input files glob pattern',
            default: __sugarConfig('docMap.inputGlobs'),
            level: 1
        },
        findGlobs: {
            type: 'String|Array<String>',
            alias: 'i',
            description: 'docMap.json files glob pattern',
            default: __sugarConfig('docMap.findGlobs'),
            level: 1
        },
        output: {
            type: 'String',
            alias: 'o',
            description: 'Output file path',
            default: __sugarConfig('docMap.output') || `${__packageRoot()}/docMap.json`,
            level: 1
        }
    },
    _a);
//# sourceMappingURL=SBuildDocMapInterface.js.map