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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRm9udEljb25zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy9mb250SWNvbnMvaW50ZXJmYWNlL1NCdWlsZEZvbnRJY29uc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUMxRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3pELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxPQUFPLFNBQUcsTUFBTSx3QkFBeUIsU0FBUSxZQUFZO0tBMEJuRTtJQXpCUSxhQUFVLEdBQUc7UUFDbEIsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsMEJBQTBCLENBQUM7WUFDbEQsS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLDJCQUEyQixDQUFDO1lBQ25ELEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDO1lBQzlELEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUM7WUFDL0MsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNEO09BQ0gsQ0FBQyJ9