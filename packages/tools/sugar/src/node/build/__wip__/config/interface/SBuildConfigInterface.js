"use strict";
var _a;
const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
/**
 * @name                SBuildConfigInterface
 * @namespace           sugar.node.build.config.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a build config process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildConfigInterface extends __SInterface {
    },
    _a.definitionObj = __deepMerge(__SBuildInterface.definitionObj, {
        input: {
            type: 'String',
            alias: 'i',
            description: 'Input files glob pattern',
            default: __sugarConfig('build.config.input') || 'src/config/*.config.js',
            level: 1
        },
        outputDir: {
            type: 'String',
            alias: 'o',
            description: 'Output directory path',
            default: __sugarConfig('build.config.outputDir') || 'dist/config',
            level: 1
        }
    }),
    _a);
