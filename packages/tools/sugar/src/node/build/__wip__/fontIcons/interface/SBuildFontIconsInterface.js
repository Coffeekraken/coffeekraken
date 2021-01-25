"use strict";
// @ts-nocheck
var _a;
const __SInterface = require('../../../class/SInterface');
const __SBuildInterface = require('../../interface/SBuildInterface');
const __sugarConfig = require('../../../config/sugar');
const __deepMerge = require('../../../object/deepMerge');
const __path = require('path');
/**
 * @name                SBuildFontIconsInterface
 * @namespace           sugar.node.build.js.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildFontIconsInterface extends __SInterface {
    },
    _a.definition = {
        inputDir: {
            type: 'String',
            required: true,
            default: __sugarConfig('build.fonticons.inputDir'),
            level: 1
        },
        outputDir: {
            type: 'String',
            required: true,
            default: __sugarConfig('build.fonticons.outputDir'),
            level: 1
        },
        config: {
            type: 'String',
            required: true,
            default: __path.resolve(__dirname, '../fantasticon.config.js'),
            level: 1
        },
        watch: {
            type: 'String',
            default: __sugarConfig('build.fonticons.watch'),
            level: 1
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRm9udEljb25zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkRm9udEljb25zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzFELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDckUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDdkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDekQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRS9COzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sU0FBRyxNQUFNLHdCQUF5QixTQUFRLFlBQVk7S0EwQm5FO0lBekJRLGFBQVUsR0FBRztRQUNsQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztZQUNsRCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsMkJBQTJCLENBQUM7WUFDbkQsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7WUFDOUQsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztZQUMvQyxLQUFLLEVBQUUsQ0FBQztTQUNUO0tBQ0Q7T0FDSCxDQUFDIn0=