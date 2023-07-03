"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SFaviconBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFaviconBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFaviconBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input image file to use',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('faviconBuilder.input'),
            },
            outDir: {
                description: 'Specify the output directory ou want your icons in',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('faviconBuilder.outDir'),
            },
            outFileName: {
                description: 'Specify the output file name you want for the html file',
                type: 'String',
                required: true,
                default: s_sugar_config_1.default.get('faviconBuilder.outFileName'),
            },
            settings: {
                description: 'Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder',
                type: 'Object',
                default: s_sugar_config_1.default.get('faviconBuilder.settings'),
            },
        };
    }
}
exports.default = SFaviconBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixtQ0FBb0MsU0FBUSxxQkFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1Asb0RBQW9EO2dCQUN4RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdkQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCw4R0FBOEc7Z0JBQ2xILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUEvQkQsc0RBK0JDIn0=