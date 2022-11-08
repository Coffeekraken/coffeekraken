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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
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
                        color: s_theme_1.default.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'landscape',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: s_theme_1.default.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: s_theme_1.default.get('color.accent'),
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
                        color: s_theme_1.default.get('color.accent'),
                    },
                ],
            },
            {
                featureType: 'poi',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: s_theme_1.default.get('color.accent'),
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
        console.log(s_theme_1.default.get('color.accent'));
        emit('log', {
            value: `<green>[cache]</green> The "<yellow>${finalParams.id}</yellow>" config has been cached <green>successfully</green> under <cyan>${filePath}</cyan>`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFFN0Msa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxTQUFTLEdBQUc7WUFDZDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxVQUFVLEVBQUUsSUFBSTtxQkFDbkI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtvQkFDRDt3QkFDSSxVQUFVLEVBQUUsTUFBTTtxQkFDckI7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksVUFBVSxFQUFFLEVBQUU7cUJBQ2pCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtvQkFDRDt3QkFDSSxTQUFTLEVBQUUsRUFBRTtxQkFDaEI7b0JBQ0Q7d0JBQ0ksVUFBVSxFQUFFLEtBQUs7cUJBQ3BCO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsT0FBTyxFQUFFO29CQUNMO3dCQUNJLFVBQVUsRUFBRSxLQUFLO3FCQUNwQjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsU0FBUztxQkFDbkI7b0JB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