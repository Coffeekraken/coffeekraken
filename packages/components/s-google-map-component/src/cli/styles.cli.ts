// @ts-nocheck
import __SColor from '@coffeekraken/s-color';
import __SPromise from '@coffeekraken/s-promise';
import __STheme from '@coffeekraken/s-theme';
import { __copy } from '@coffeekraken/sugar/clipboard';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        let styleJson = [
            {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        weight: '2.00',
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: new __SColor(__STheme.get('color.main')).toHex(),
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels.text',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [
                    {
                        color: '#f2f2f2',
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#ffffff',
                    },
                ],
            },
            {
                featureType: 'landscape.man_made',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#ffffff',
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'all',
                stylers: [
                    {
                        saturation: -100,
                    },
                    {
                        lightness: 45,
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#eeeeee',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#7b7b7b',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        visibility: 'off',
                    },
                    {
                        color: '#ffffff',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'all',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'all',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [
                    {
                        color: '#46bcec',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#c8d7d4',
                        color: new __SColor(__STheme.get('color.main')).toHex(),
                    },
                    {
                        lightness: 30,
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#070707',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        visibility: 'off',
                    },
                    {
                        color: '#ffffff',
                    },
                ],
            },
        ];

        styleJson = [
            {
                featureType: 'all',
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        saturation: 36,
                    },
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 100,
                        lightness: 100,
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        visibility: 'off',
                    },
                    // {
                    //     color: '#000000',
                    //     color: new __SColor(__STheme.get('color.base')).toHex(),
                    // },
                    // {
                    //     lightness: 16,
                    //     lightness: -44,
                    // },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 20,
                        lightness: -60,
                    },
                ],
            },
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 17,
                        lightness: -64,
                    },
                    {
                        weight: 1.2,
                    },
                ],
            },
            {
                featureType: 'administrative.country',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#e5c163',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 100,
                    },
                ],
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#c4c4c4',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 100,
                    },
                ],
            },
            {
                featureType: 'administrative.neighborhood',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#e5c163',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 100,
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 5,
                        lightness: -69,
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 5,
                        lightness: -68,
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'poi.business',
                elementType: 'geometry',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#e5c163',
                        color: new __SColor(
                            __STheme.get('color.accent'),
                        ).toHex(),
                    },
                    {
                        lightness: -40,
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#ffffff',
                    },
                ],
            },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'labels.text.stroke',
            //     stylers: [
            //         {
            //             visibility: 'off',
            //         },
            //         // {
            //         //     color: '#e5c163',
            //         // },
            //     ],
            // },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 6,
                        lightness: -68,
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#575757',
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#ffffff',
                    },
                ],
            },
            // {
            //     featureType: 'road.arterial',
            //     elementType: 'labels.text.stroke',
            //     stylers: [
            //         {
            //             visibility: 'off',
            //         },
            //         // {
            //         //     color: '#2c2c2c',
            //         // },
            //     ],
            // },
            {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 6,
                        lightness: -68,
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#999999',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: 8,
                        lightness: -68,
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                        color: new __SColor(__STheme.get('color.base')).toHex(),
                    },
                    {
                        lightness: -65,
                    },
                ],
            },
        ];

        __copy(JSON.stringify(styleJson, null, 4));

        emit('log', {
            value: `<green>[cache]</green> Your google map style json has been copied into your clipboard...`,
        });

        resolve();
    });
};
