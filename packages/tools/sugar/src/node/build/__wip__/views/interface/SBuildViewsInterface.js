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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRWaWV3c0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUMxRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXpEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sU0FBRyxNQUFNLG9CQUFxQixTQUFRLFlBQVk7S0FpQi9EO0lBaEJRLGFBQVUsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO1FBQzVELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxrQkFBa0I7WUFDakUsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE9BQU8sRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUMsSUFBSSxZQUFZO1lBQy9ELEtBQUssRUFBRSxDQUFDO1NBQ1Q7S0FDRixDQUFFO09BQ0osQ0FBQyJ9