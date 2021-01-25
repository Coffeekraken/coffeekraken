"use strict";
// @ts-nocheck
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
    _a.definition = __deepMerge(__SBuildInterface.definition, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkQ29uZmlnSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkQ29uZmlnSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzFELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDckUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDdkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsT0FBTyxTQUFHLE1BQU0scUJBQXNCLFNBQVEsWUFBWTtLQWlCaEU7SUFoQlEsYUFBVSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7UUFDNUQsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLHdCQUF3QjtZQUN4RSxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLGFBQWE7WUFDakUsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNGLENBQUU7T0FDSixDQUFDIn0=