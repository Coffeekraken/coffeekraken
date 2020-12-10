"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
/**
 * @name                SBuildViewsInterface
 * @namespace           sugar.node.build.views.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for building views process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildViewsInterface extends __SInterface {
    },
    _a.definition = __deepMerge(__SBuildInterface.definition, {
        input: {
            type: 'String',
            alias: 'i',
            description: 'Input files glob pattern',
            default: __sugarConfig('build.views.input') || 'src/views/**/*.*',
            level: 1
        },
        outputDir: {
            type: 'String',
            alias: 'o',
            description: 'Output directory path',
            default: __sugarConfig('build.views.outputDir') || 'dist/views',
            level: 1
        }
    }),
    _a);
//# sourceMappingURL=module.js.map