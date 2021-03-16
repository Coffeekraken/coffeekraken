"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const sugar_1 = __importDefault(require("../../config/sugar"));
/**
 * @name            ResolveSettingsInterface
 * @namespace       sugar.node.module.interface
 * @type            Class
 * @extends         SInterface
 *
 * This represent the resolve settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class ResolveSettingsInterface extends SInterface_1.default {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: sugar_1.default('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: sugar_1.default('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: sugar_1.default('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: sugar_1.default('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: packageRoot_1.default()
    }
};
exports.default = ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvbW9kdWxlL2ludGVyZmFjZS9SZXNvbHZlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0RUFBc0Q7QUFDdEQseUVBQW1EO0FBQ25ELCtEQUErQztBQUUvQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx3QkFBeUIsU0FBUSxvQkFBWTs7QUFDMUMsbUNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGVBQWEsQ0FBQywyQkFBMkIsQ0FBQztLQUNwRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsK0JBQStCLENBQUM7S0FDeEQ7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxlQUFhLENBQUMsOEJBQThCLENBQUM7S0FDdkQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDN0IsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztRQUMzQixPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUscUJBQWEsRUFBRTtLQUN6QjtDQUNGLENBQUM7QUFFSixrQkFBZSx3QkFBd0IsQ0FBQyJ9