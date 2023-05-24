"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SDocmapReadParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapReadParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input path to the docmap.json file to read',
                type: 'String',
                default: s_sugar_config_1.default.get('docmap.read.input'),
                alias: 'i',
            },
            dependencies: {
                description: 'Specify if you want to read also the dependencies packages docmap files or not',
                type: 'Boolean',
                default: true,
            },
            sort: {
                description: 'Specify which of the docmap entries has to be sorted alphabetically.',
                type: 'String[]',
                default: s_sugar_config_1.default.get('docmap.read.sort'),
            },
            sortDeep: {
                description: 'Specify which of the docmap entries has to be sorted alphabetically AND deeply.',
                type: 'String[]',
                default: s_sugar_config_1.default.get('docmap.read.sortDeep'),
            },
        };
    }
}
exports.default = SDocmapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLHFCQUFZO0lBQ2pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLHdEQUF3RDtnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2dCQUNoRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCxnRkFBZ0Y7Z0JBQ3BGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDbEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLGlGQUFpRjtnQkFDckYsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxrQkFBZSwwQkFBMEIsQ0FBQyJ9