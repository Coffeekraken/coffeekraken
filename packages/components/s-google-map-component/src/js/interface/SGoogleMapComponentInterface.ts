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
                description:
                    'Specify your mapId that you can create [here](https://console.cloud.google.com/google/maps-apis/studio/maps)',
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
                description:
                    'Specify if you want your map to be bounds on current markers',
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
                description:
                    'Specify if you want the fullscreen control or not',
                default: false,
            },
        };
    }
}
