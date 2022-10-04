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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdkQ7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztnQkFDekIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCx5SUFBeUk7Z0JBQzdJLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZDRCxpREF1Q0MifQ==