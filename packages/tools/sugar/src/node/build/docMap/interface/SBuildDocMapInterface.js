"use strict";
var _a;
const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
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
    _a.definitionObj = {
        input: {
            type: 'String|Array<String>',
            alias: 'i',
            description: 'Input files glob pattern',
            default: __sugarConfig('build.docMap.input') || 'src/**/*',
            level: 1
        },
        externalDocMaps: {
            type: 'String|Array<String>',
            alias: 'e',
            description: 'Specify where to search for external docMap.json files',
            default: __sugarConfig('build.docMap.externalDocMaps'),
            level: 1
        },
        output: {
            type: 'String',
            alias: 'o',
            description: 'Output file path',
            default: __sugarConfig('build.docMap.output') ||
                `${__packageRoot()}/docMap.json`,
            level: 1
        },
        watch: {
            type: 'String',
            alias: 'w',
            description: 'Specify a glob pattern of the files you want to watch to rebuild automatically the docMap.json',
            default: __sugarConfig('build.docMap.watch'),
            level: 1
        }
    },
    _a);
