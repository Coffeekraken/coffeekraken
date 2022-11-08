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
import __SPromise from '@coffeekraken/s-promise';
import __STheme from '@coffeekraken/s-theme';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const styleJson = [
            {
                featureType: 'all',
                elementType: 'all',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'off',
                    },
                    {
                        saturation: '-100',
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
                    },
                    {
                        lightness: 40,
                    },
                    {
                        visibility: 'off',
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
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 16,
                    },
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
                    },
                    {
                        lightness: 20,
                    },
                ],
            },
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 17,
                    },
                    {
                        weight: 1.2,
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 20,
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: __STheme.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: __STheme.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: __STheme.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    {
                        lightness: 21,
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: __STheme.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: __STheme.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    {
                        visibility: 'on',
                    },
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                    {
                        lightness: 17,
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                    {
                        lightness: 29,
                    },
                    {
                        weight: 0.2,
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 18,
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 16,
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#7f8d89',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000',
                    },
                    {
                        lightness: 19,
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [
                    {
                        color: '#2b3638',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#2b3638',
                    },
                    {
                        lightness: 17,
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#24282b',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#24282b',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'off',
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
                ],
            },
            {
                featureType: 'water',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
        ];
        console.log(__STheme.get('color.accent'));
        emit('log', {
            value: `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxTQUFTLEdBQUc7WUFDZDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsSUFBSTtxQkFDbkI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtvQkFDRDt3QkFDSSxVQUFVLEVBQUUsTUFBTTtxQkFDckI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEVBQUU7cUJBQ2pCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtvQkFDRDt3QkFDSSxTQUFTLEVBQUUsRUFBRTtxQkFDaEI7b0JBQ0Q7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtvQkFD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