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
                },
            },
        };
    }
}
exports.default = SDocComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBcUIsc0JBQXVCLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLE9BQU8sRUFBRTtvQkFDTCxhQUFhLEVBQUUsSUFBQSxlQUFNLEVBQUMsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsc0JBQXNCO3FCQUM3QixDQUFDO29CQUNGLFdBQVcsRUFBRSxJQUFBLGVBQU0sRUFBQyxZQUFZLEVBQUU7d0JBQzlCLEVBQUUsRUFBRSxvQkFBb0I7cUJBQzNCLENBQUM7b0JBQ0YsYUFBYSxFQUFFLElBQUEsZUFBTSxFQUFDLFVBQVUsRUFBRTt3QkFDOUIsRUFBRSxFQUFFLHNCQUFzQjtxQkFDN0IsQ0FBQztvQkFDRixNQUFNLEVBQUUsSUFBQSxlQUFNLEVBQUMsc0JBQXNCLEVBQUU7d0JBQ25DLEVBQUUsRUFBRSxjQUFjO3FCQUNyQixDQUFDO2lCQUNMO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUJELHlDQTRCQyJ9