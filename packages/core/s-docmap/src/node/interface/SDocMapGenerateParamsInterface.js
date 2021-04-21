"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDocMapGenerateParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapGenerateParamsInterface extends s_interface_1.default {
}
SDocMapGenerateParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: s_sugar_config_1.default('docmap.cache'),
        level: 1
    },
    globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: s_sugar_config_1.default('docmap.generate.globs'),
        level: 1
    },
    exclude: {
        type: 'Array<String>',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: s_sugar_config_1.default('docmap.generate.exclude'),
        level: 1
    },
    fields: {
        type: 'Array<String>',
        description: 'Specify which docblock fields you want in your final docmap.json file',
        alias: 'f',
        default: s_sugar_config_1.default('docmap.generate.fields')
    },
    filters: {
        type: 'Object<RegExp>',
        description: 'Specify some properties and regex to use to filter docblocks',
        default: s_sugar_config_1.default('docmap.generate.filters')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        description: 'Specify if you want to watch the sources files to re-generate the docmap.json automatically on updates',
        default: s_sugar_config_1.default('docmap.generate.watch')
    },
    outPath: {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: s_sugar_config_1.default('docmap.generate.outPath'),
        level: 1
    },
    save: {
        type: 'Boolean',
        alias: 's',
        description: 'Specify if you want to save the generated file under the ```outPath``` path',
        default: s_sugar_config_1.default('docmap.generate.save')
    }
};
exports.default = SDocMapGenerateParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcEdlbmVyYXRlUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLDhCQUErQixTQUFRLHFCQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3RDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUM7UUFDL0MsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFDVCxpRUFBaUU7UUFDbkUsT0FBTyxFQUFFLHdCQUFhLENBQUMseUJBQXlCLENBQUM7UUFDakQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFDVCx1RUFBdUU7UUFDekUsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyx3QkFBd0IsQ0FBQztLQUNqRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsV0FBVyxFQUNULDhEQUE4RDtRQUNoRSxPQUFPLEVBQUUsd0JBQWEsQ0FBQyx5QkFBeUIsQ0FBQztLQUNsRDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1Qsd0dBQXdHO1FBQzFHLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsT0FBTyxFQUFFLHdCQUFhLENBQUMseUJBQXlCLENBQUM7UUFDakQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsNkVBQTZFO1FBQy9FLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHNCQUFzQixDQUFDO0tBQy9DO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLDhCQUE4QixDQUFDIn0=