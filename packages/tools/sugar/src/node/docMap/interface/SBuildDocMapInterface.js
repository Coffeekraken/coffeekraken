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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRG9jTWFwSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkRG9jTWFwSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzNELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRXREOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sU0FBRyxNQUFNLHFCQUFzQixTQUFRLFlBQVk7S0FzQ2hFO0lBckNRLGFBQVUsR0FBRztRQUNsQixnQkFBZ0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDO1lBQy9DLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixPQUFPLEVBQUUsYUFBYSxDQUFDLHdCQUF3QixDQUFDO1lBQ2hELEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxrQkFBa0IsRUFBRTtZQUNsQixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFDVCxpRUFBaUU7WUFDbkUsT0FBTyxFQUFFLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztZQUNqRCxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixLQUFLLEVBQUUsR0FBRztZQUNWLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsT0FBTyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzQyxLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQ1Qsa0VBQWtFO1lBQ3BFLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7WUFDN0MsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNEO09BQ0gsQ0FBQyJ9