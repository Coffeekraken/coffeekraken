"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                SBuildScssInterface
 * @namespace           sugar.node.build.scss.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildScssInterface extends SInterface_1.default {
}
exports.default = SBuildScssInterface;
SBuildScssInterface.definition = {
    outputDir: {
        type: 'String',
        default: sugar_1.default('build.frontspec.outputDir'),
        required: true,
        alias: 'o',
        level: 1
    },
    sources: {
        type: 'Array<Object>',
        default: sugar_1.default('build.frontspec.sources'),
        required: true,
        level: 1
    },
    filename: {
        type: 'String',
        default: sugar_1.default('build.frontspec.filename'),
        required: true,
        alias: 'n',
        level: 1
    },
    search: {
        type: 'String',
        default: sugar_1.default('build.frontspec.search'),
        alias: 's',
        level: 1
    },
    dirDepth: {
        type: 'Integer',
        default: sugar_1.default('build.frontspec.dirDepth'),
        required: true,
        alias: 'd',
        level: 1
    },
    cache: {
        type: 'Boolean',
        default: sugar_1.default('build.frontspec.cache'),
        alias: 'c',
        level: 1
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvZnJvbnRzcGVjL2J1aWxkL2ludGVyZmFjZS9TQnVpbGRGcm9udHNwZWNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELGtFQUFrRDtBQUdsRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLG1CQUFvQixTQUFRLG9CQUFZOztBQUE3RCxzQ0EwQ0M7QUF6Q1EsOEJBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7UUFDbkQsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsZUFBYSxDQUFDLHlCQUF5QixDQUFDO1FBQ2pELFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQywwQkFBMEIsQ0FBQztRQUNsRCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyx3QkFBd0IsQ0FBQztRQUNoRCxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsMEJBQTBCLENBQUM7UUFDbEQsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7UUFDL0MsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQyJ9