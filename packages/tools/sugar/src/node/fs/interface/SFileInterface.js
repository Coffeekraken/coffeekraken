"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFileSettingsInterface = void 0;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SFileInterface
 * @namespace           sugar.node.fs.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a "file" descriptor element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileSettingsInterface extends SInterface_1.default {
}
exports.SFileSettingsInterface = SFileSettingsInterface;
SFileSettingsInterface.definition = {};
class SFileInterface extends SInterface_1.default {
}
exports.default = SFileInterface;
SFileInterface.definition = {
    name: {
        type: 'String',
        description: 'Store the file name',
        required: true
    },
    path: {
        type: 'String',
        description: 'Store the full file path to the file on the system',
        required: true
    },
    cwd: {
        type: 'String',
        description: 'Store the path to the root directory where lives the file. This has to be specified in the settings.rootDir property through the constructor'
    },
    relPath: {
        type: 'String',
        description: 'Store the path to the file relative to the ```rootDir``` property if this one has been setted'
    },
    dirPath: {
        type: 'String',
        description: 'Store the file path of the folder where lives the file',
        required: true
    },
    extension: {
        type: 'String',
        description: 'Store the file extension like "json", "js", "css", etc...',
        required: true
    },
    exists: {
        type: 'Boolean',
        description: 'true if the file exists on the filesystem, false if not',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbGVJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7O0FBRWQsd0VBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxvQkFBWTs7QUFBeEQsd0RBRUM7QUFEUSxpQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUd6QixNQUFxQixjQUFlLFNBQVEsb0JBQVk7O0FBQXhELGlDQXNDQztBQXJDUSx5QkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHFCQUFxQjtRQUNsQyxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsb0RBQW9EO1FBQ2pFLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCw4SUFBOEk7S0FDako7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCwrRkFBK0Y7S0FDbEc7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDIn0=