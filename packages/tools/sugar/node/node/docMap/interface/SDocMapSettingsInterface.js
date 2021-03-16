"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../config/sugar"));
/**
 * @name                SDocMapSettingsInterface
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
class SDocMapSettingsInterface extends SInterface_1.default {
}
SDocMapSettingsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: sugar_1.default('docMap.cache'),
        level: 1
    },
    'build.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: sugar_1.default('docMap.build.globs'),
        level: 1
    },
    'build.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: sugar_1.default('docMap.build.exclude'),
        level: 1
    },
    'find.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'docMap.json files glob pattern',
        default: sugar_1.default('docMap.find.globs'),
        level: 1
    },
    'find.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching docMaps',
        default: sugar_1.default('docMap.find.exclude'),
        level: 1
    },
    'save.path': {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: sugar_1.default('docMap.save.path'),
        level: 1
    }
};
exports.default = SDocMapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvZG9jTWFwL2ludGVyZmFjZS9TRG9jTWFwU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNEVBQXNEO0FBQ3RELCtEQUErQztBQUcvQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sd0JBQXlCLFNBQVEsb0JBQVk7O0FBQzFDLG1DQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLGNBQWMsQ0FBQztRQUN0QyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxPQUFPLEVBQUUsZUFBYSxDQUFDLHNCQUFzQixDQUFDO1FBQzlDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzQyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1Qsa0VBQWtFO1FBQ3BFLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLE9BQU8sRUFBRSxlQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFFSixrQkFBZSx3QkFBd0IsQ0FBQyJ9