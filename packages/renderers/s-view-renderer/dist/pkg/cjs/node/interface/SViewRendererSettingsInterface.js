"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SViewRendererSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SViewRenderer settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViewRendererSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            rootDirs: {
                description: 'Specify some folder paths where to search for views',
                type: 'String[]',
                default: s_sugar_config_1.default.get('viewRenderer.rootDirs'),
            },
            cacheDir: {
                description: 'Specigy the folder to store the engines cache',
                type: 'String',
                default: s_sugar_config_1.default.get('viewRenderer.cacheDir'),
            },
            defaultEngine: {
                description: 'Specify the default engine to use when not any is specified at the dotpath start like "twig://...", etc...',
                type: 'String',
                values: ['twig', 'blade'],
                default: s_sugar_config_1.default.get('viewRenderer.defaultEngine'),
            },
            enginesSettings: {
                description: 'Specify some engines settings. Object must contain each engine settings under his own property. For blade, the property name is "blade"',
                type: 'Object',
                default: {},
            },
            defaultData: {
                description: 'Specify some default data to pass to the view',
                type: 'Object',
                default: {},
            },
            sharedDataFiles: {
                description: 'Specify some shared data files to load',
                type: 'String[]',
                default: s_sugar_config_1.default.get('viewRenderer.sharedDataFiles'),
            },
        };
    }
}
exports.default = SViewRendererSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdkQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCw0R0FBNEc7Z0JBQ2hILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQzthQUM1RDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AseUlBQXlJO2dCQUM3SSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQzthQUM5RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2Q0QsaURBdUNDIn0=