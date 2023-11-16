var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SColor from '@coffeekraken/s-color';
import __SPromise from '@coffeekraken/s-promise';
import __STheme from '@coffeekraken/s-theme';
import { __copy } from '@coffeekraken/sugar/clipboard';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
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
                        color: new __SColor(__STheme.current.get('color.main')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.main')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                    //     color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.accent')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
                        color: new __SColor(__STheme.current.get('color.base')).toHex(),
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
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdkQsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELElBQUksU0FBUyxHQUFHO1lBQ1o7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksTUFBTSxFQUFFLE1BQU07cUJBQ2pCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxJQUFJLFFBQVEsQ0FDZixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxJQUFJO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJB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