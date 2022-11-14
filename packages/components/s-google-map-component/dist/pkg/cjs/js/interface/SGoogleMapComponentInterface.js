"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SGoogleMapComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SGoogleMapComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SGoogleMapComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            apiKey: {
                type: 'String',
                description: 'Specify the google api key to use. You can specify it in the config.google.map.apiKey configuration for your project if you prefer',
                default: s_sugar_config_1.default.get('google.map.apiKey'),
                required: true,
            },
            mapId: {
                type: 'String',
                description: 'Specify your mapId that you can create [here](https://console.cloud.google.com/google/maps-apis/studio/maps)',
                required: true,
            },
            lat: {
                type: 'Number',
                description: 'Specify the map latitude',
                required: true,
            },
            lng: {
                type: 'Number',
                description: 'Specify the map longitude',
                required: true,
            },
            zoom: {
                type: 'Number',
                description: 'Specify the google map zoom',
            },
            bounds: {
                type: 'Boolean',
                description: 'Specify if you want your map to be bounds on current markers',
                default: true,
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons to be used across your maps',
                default: {
                    marker: '<i class="fa-solid fa-location-dot"></i>',
                },
            },
            zoomControl: {
                type: 'Boolean',
                description: 'Specify if you want the zom control or not',
                default: false,
            },
            mapTypeControl: {
                type: 'Boolean',
                description: 'Specify if you want the map type control or not',
                default: false,
            },
            scaleControl: {
                type: 'Boolean',
                description: 'Specify if you want the map scale control or not',
                default: false,
            },
            streetViewControl: {
                type: 'Boolean',
                description: 'Specify if you want the streeview control or not',
                default: false,
            },
            rotateControl: {
                type: 'Boolean',
                description: 'Specify if you want the rotate control or not',
                default: false,
            },
            fullscreenControl: {
                type: 'Boolean',
                description: 'Specify if you want the fullscreen control or not',
                default: false,
            },
        };
    }
}
exports.default = SGoogleMapComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw0QkFBNkIsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxvSUFBb0k7Z0JBQ3hJLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEQsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDhHQUE4RztnQkFDbEgsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDBCQUEwQjtnQkFDdkMsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDZCQUE2QjthQUM3QztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLDBDQUEwQztpQkFDckQ7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsNENBQTRDO2dCQUN6RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUVELCtDQTRFQyJ9