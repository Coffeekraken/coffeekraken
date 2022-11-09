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
                description: 'Specify the google api key to use',
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
            },
            lng: {
                type: 'Number',
                description: 'Specify the map longitude',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw0QkFBNkIsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEQsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDhHQUE4RztnQkFDbEgsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDBCQUEwQjthQUMxQztZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsMkJBQTJCO2FBQzNDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw2QkFBNkI7YUFDN0M7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSwwQ0FBMEM7aUJBQ3JEO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXpFRCwrQ0F5RUMifQ==