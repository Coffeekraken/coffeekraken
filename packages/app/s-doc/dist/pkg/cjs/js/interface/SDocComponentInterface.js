"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: s_sugar_config_1.default.get('doc.endpoints'),
            },
            loaderSvg: {
                type: 'String',
                description: 'Specify an svg to use as the loader',
                default: `<svg class="s-logo s-logo--coffeekraken-picto" viewBox="0 0 299 229" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M102.5 55.3151V202.802H191V229H71V29H142V55.3151H102.5Z" fill="white"/>
                        <path d="M265.5 26.3151V202.802H227.5V229H298.5V0H227.5V26.3151H265.5Z" fill="white"/>
                        <path d="M31.5 109.315V166.802H31V193H0V83H71V109.315H31.5Z" fill="white"/>
                        <path d="M173 144.5C173 159.136 162.703 171 150 171C137.297 171 127 159.136 127 144.5C127 129.864 137.297 118 150 118C167.5 118 173 129.864 173 144.5Z" fill="#FEBD0F"/>
                        <path d="M240 144.5C240 159.136 229.703 171 217 171C204.297 171 194 159.136 194 144.5C194 129.864 200.5 118 217 118C229.703 118 240 129.864 240 144.5Z" fill="#FEBD0F"/>
                        </svg>
                        `,
            },
            features: {
                type: 'Object',
                description: 'Specify which feature are available like "fullscreen", etc...',
                default: {
                    fullscreen: true,
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons for the UI',
                default: {
                    file: '<i class="fa-regular fa-file"></i>',
                    enterFullscreen: '<i class="fa-solid fa-expand"></i>',
                    exitFullscreen: '<i class="fa-solid fa-compress"></i>',
                },
            },
            i18n: {
                type: 'Object',
                description: 'Specify all the UI translations',
                default: {
                    examplesTitle: (0, s_i18n_1.__i18n)('Examples', {
                        id: 's-doc.examples.title',
                    }),
                    paramsTitle: (0, s_i18n_1.__i18n)('Parameters', {
                        id: 's-doc.params.title',
                    }),
                    settingsTitle: (0, s_i18n_1.__i18n)('Settings', {
                        id: 's-doc.settings.title',
                    }),
                    search: (0, s_i18n_1.__i18n)('Search documentation', {
                        id: 's-doc.search',
                    }),
                    toggleFullscreen: (0, s_i18n_1.__i18n)('Toggle fullscreen', {
                        id: 's-doc.fullscreen.toggle',
                    }),
                },
            },
        };
    }
}
exports.default = SDocComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBcUIsc0JBQXVCLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELE9BQU8sRUFBRTs7Ozs7Ozt5QkFPQTthQUNaO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLE9BQU8sRUFBRTtvQkFDTCxVQUFVLEVBQUUsSUFBSTtpQkFDbkI7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLG9DQUFvQztvQkFDMUMsZUFBZSxFQUFFLG9DQUFvQztvQkFDckQsY0FBYyxFQUFFLHNDQUFzQztpQkFDekQ7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxPQUFPLEVBQUU7b0JBQ0wsYUFBYSxFQUFFLElBQUEsZUFBTSxFQUFDLFVBQVUsRUFBRTt3QkFDOUIsRUFBRSxFQUFFLHNCQUFzQjtxQkFDN0IsQ0FBQztvQkFDRixXQUFXLEVBQUUsSUFBQSxlQUFNLEVBQUMsWUFBWSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsb0JBQW9CO3FCQUMzQixDQUFDO29CQUNGLGFBQWEsRUFBRSxJQUFBLGVBQU0sRUFBQyxVQUFVLEVBQUU7d0JBQzlCLEVBQUUsRUFBRSxzQkFBc0I7cUJBQzdCLENBQUM7b0JBQ0YsTUFBTSxFQUFFLElBQUEsZUFBTSxFQUFDLHNCQUFzQixFQUFFO3dCQUNuQyxFQUFFLEVBQUUsY0FBYztxQkFDckIsQ0FBQztvQkFDRixnQkFBZ0IsRUFBRSxJQUFBLGVBQU0sRUFBQyxtQkFBbUIsRUFBRTt3QkFDMUMsRUFBRSxFQUFFLHlCQUF5QjtxQkFDaEMsQ0FBQztpQkFDTDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVERCx5Q0E0REMifQ==