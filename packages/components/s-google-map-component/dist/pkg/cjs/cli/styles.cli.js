"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.main')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.main')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.accent')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.current.get('color.base')).toHex(),
                    },
                    {
                        lightness: -65,
                    },
                ],
            },
        ];
        (0, clipboard_1.__copy)(JSON.stringify(styleJson, null, 4));
        emit('log', {
            value: `<green>[cache]</green> Your google map style json has been copied into your clipboard...`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFDakQsb0VBQTZDO0FBQzdDLDZEQUF1RDtBQUV2RCxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLFNBQVMsR0FBRztZQUNaO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLE1BQU0sRUFBRSxNQUFNO3FCQUNqQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUNmLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxJQUFJO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsV0FBVztnQkFDeEIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsS0FBSztxQkFDcEI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxDQUFDLEdBQUc7cUJBQ25CO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxFQUFFO3FCQUNoQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLGtCQUFrQjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsS0FBSztxQkFDcEI7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsY0FBYztnQkFDM0IsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsWUFBWTtxQkFDM0I7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsT0FBTztnQkFDcEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7b0JBQ0Q7d0JBQ0ksVUFBVSxFQUFFLElBQUk7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsT0FBTztnQkFDcEIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxFQUFFO3FCQUNoQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSjthQUNKO1NBQ0osQ0FBQztRQUVGLFNBQVMsR0FBRztZQUNSO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxJQUFJO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsRUFBRTtxQkFDakI7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLGlCQUFRLENBQ2YsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDLEtBQUssRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxTQUFTLEVBQUUsR0FBRzt3QkFDZCxTQUFTLEVBQUUsR0FBRztxQkFDakI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO29CQUNELElBQUk7b0JBQ0osd0JBQXdCO29CQUN4Qix1RUFBdUU7b0JBQ3ZFLEtBQUs7b0JBQ0wsSUFBSTtvQkFDSixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsS0FBSztpQkFDUjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUNmLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksU0FBUyxFQUFFLEVBQUU7d0JBQ2IsU0FBUyxFQUFFLENBQUMsRUFBRTtxQkFDakI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxnQkFBZ0I7Z0JBQzdCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxFQUFFO3dCQUNiLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSxHQUFHO3FCQUNkO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLGlCQUFRLENBQ2YsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDLEtBQUssRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxTQUFTLEVBQUUsR0FBRztxQkFDakI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxHQUFHO3FCQUNqQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsV0FBVyxFQUFFLGtCQUFrQjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUNmLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksU0FBUyxFQUFFLEdBQUc7cUJBQ2pCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsV0FBVztnQkFDeEIsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxDQUFDO3dCQUNaLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxDQUFDO3dCQUNaLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO29CQUNEO3dCQUNJLFVBQVUsRUFBRSxJQUFJO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLElBQUk7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsY0FBYztnQkFDM0IsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQ3ZDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsY0FBYztnQkFDM0IsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNELElBQUk7WUFDSixtQ0FBbUM7WUFDbkMseUNBQXlDO1lBQ3pDLGlCQUFpQjtZQUNqQixZQUFZO1lBQ1osaUNBQWlDO1lBQ2pDLGFBQWE7WUFDYixlQUFlO1lBQ2YsbUNBQW1DO1lBQ25DLGdCQUFnQjtZQUNoQixTQUFTO1lBQ1QsS0FBSztZQUNMO2dCQUNJLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUNmLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksU0FBUyxFQUFFLENBQUM7d0JBQ1osU0FBUyxFQUFFLENBQUMsRUFBRTtxQkFDakI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNELElBQUk7WUFDSixvQ0FBb0M7WUFDcEMseUNBQXlDO1lBQ3pDLGlCQUFpQjtZQUNqQixZQUFZO1lBQ1osaUNBQWlDO1lBQ2pDLGFBQWE7WUFDYixlQUFlO1lBQ2YsbUNBQW1DO1lBQ25DLGdCQUFnQjtZQUNoQixTQUFTO1lBQ1QsS0FBSztZQUNMO2dCQUNJLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxTQUFTO3dCQUNoQixLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUNmLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDckMsQ0FBQyxLQUFLLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksU0FBUyxFQUFFLENBQUM7d0JBQ1osU0FBUyxFQUFFLENBQUMsRUFBRTtxQkFDakI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsU0FBUztnQkFDdEIsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxDQUFDO3dCQUNaLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsT0FBTztnQkFDcEIsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsS0FBSyxFQUFFLElBQUksaUJBQVEsQ0FDZixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUMsS0FBSyxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQ2pCO2lCQUNKO2FBQ0o7U0FDSixDQUFDO1FBRUYsSUFBQSxrQkFBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsMEZBQTBGO1NBQ3BHLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9