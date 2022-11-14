"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
                // default: __SSugarConfig.get('google.map.apiKey'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDRCQUE2QixTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLG9JQUFvSTtnQkFDeEksb0RBQW9EO2dCQUNwRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsOEdBQThHO2dCQUNsSCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsMEJBQTBCO2dCQUN2QyxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsNkJBQTZCO2FBQzdDO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsMENBQTBDO2lCQUNyRDthQUNKO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1RUQsK0NBNEVDIn0=