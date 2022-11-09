import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
export default class SGoogleMapComponentInterface extends __SInterface {
    static get _definition() {
        return {
            apiKey: {
                type: 'String',
                description: 'Specify the google api key to use',
                default: __SSugarConfig.get('google.map.apiKey'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sNEJBQTZCLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2dCQUNoRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsOEdBQThHO2dCQUNsSCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsMEJBQTBCO2FBQzFDO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwyQkFBMkI7YUFDM0M7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDZCQUE2QjthQUM3QztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLDBDQUEwQztpQkFDckQ7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsNENBQTRDO2dCQUN6RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=