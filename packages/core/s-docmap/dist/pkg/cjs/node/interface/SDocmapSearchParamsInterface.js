"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const SDocmapReadParamsInterface_1 = __importDefault(require("./SDocmapReadParamsInterface"));
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
        return Object.assign(Object.assign({}, SDocmapReadParamsInterface_1.default.definition), { slug: {
                description: 'Specify a slug to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 's',
            }, namespace: {
                description: 'Specify a namespace to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 'n',
            }, excludePackages: {
                type: {
                    type: 'String[]',
                    splitChars: [' ', ','],
                },
                description: 'Specify some package(s) name(s) (glob) to exclude',
                default: s_sugar_config_1.default.get('docmap.excludePackages'),
            } });
    }
}
exports.default = SDocmapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFDMUQsOEZBQXdFO0FBRXhFOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSxxQkFBWTtJQUNqRCxNQUFNLEtBQUssV0FBVztRQUNsQix1Q0FDTyxvQ0FBNEIsQ0FBQyxVQUFVLEtBQzFDLElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsZ0VBQWdFO2dCQUNwRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiLEVBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2IsRUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDeEQsSUFDSDtJQUNOLENBQUM7Q0FDSjtBQUNELGtCQUFlLDBCQUEwQixDQUFDIn0=