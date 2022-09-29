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
                type: 'String',
                default: s_sugar_config_1.default.get('viewRenderer.rootDirs'),
            },
            cacheDir: {
                description: 'Specigy the folder to store the engines cache',
                type: 'String',
                default: s_sugar_config_1.default.get('viewRenderer.cacheDir'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdkQ7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLHlJQUF5STtnQkFDN0ksSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaENELGlEQWdDQyJ9