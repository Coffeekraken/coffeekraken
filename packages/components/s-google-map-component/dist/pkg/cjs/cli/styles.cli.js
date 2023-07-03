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
                        color: new s_color_1.default(s_theme_1.default.get('color.main')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.main')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.accent')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
                        color: new s_color_1.default(s_theme_1.default.get('color.base')).toHex(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG9FQUE2QztBQUM3Qyx3RUFBaUQ7QUFDakQsb0VBQTZDO0FBQzdDLDZEQUF1RDtBQUV2RCxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLFNBQVMsR0FBRztZQUNaO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLE1BQU0sRUFBRSxNQUFNO3FCQUNqQjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsSUFBSSxpQkFBUSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO3FCQUMxRDtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLElBQUk7cUJBQ25CO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsV0FBVztnQkFDeEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixXQUFXLEVBQUUsZUFBZTtnQkFDNUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJ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