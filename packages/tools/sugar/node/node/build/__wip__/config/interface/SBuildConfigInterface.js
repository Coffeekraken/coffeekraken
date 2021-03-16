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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkQ29uZmlnSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy9jb25maWcvaW50ZXJmYWNlL1NCdWlsZENvbmZpZ0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUMxRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXpEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sU0FBRyxNQUFNLHFCQUFzQixTQUFRLFlBQVk7S0FpQmhFO0lBaEJRLGFBQVUsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO1FBQzVELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSx3QkFBd0I7WUFDeEUsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLE9BQU8sRUFBRSxhQUFhLENBQUMsd0JBQXdCLENBQUMsSUFBSSxhQUFhO1lBQ2pFLEtBQUssRUFBRSxDQUFDO1NBQ1Q7S0FDRixDQUFFO09BQ0osQ0FBQyJ9