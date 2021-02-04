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
    'build.globs': {
        type: 'String|Array<String>',
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
        type: 'String|Array<String>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUN0RCwrREFBK0M7QUFHL0M7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHdCQUF5QixTQUFRLG9CQUFZOztBQUMxQyxtQ0FBVSxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxPQUFPLEVBQUUsZUFBYSxDQUFDLHNCQUFzQixDQUFDO1FBQzlDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLGdDQUFnQztRQUM3QyxPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQzNDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxrRUFBa0U7UUFDcEUsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztRQUM3QyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztRQUMxQyxLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLHdCQUF3QixDQUFDIn0=