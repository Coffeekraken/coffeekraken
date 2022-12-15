"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SGlitchFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SGlitch feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SGlitchFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            fps: {
                type: 'Number',
                description: 'Specify the frames per second of the render',
                default: 30,
            },
            minTimeout: {
                type: 'Number',
                description: 'Specify the min timeout between the glitches phase in ms',
                default: 0,
            },
            maxTimeout: {
                type: 'Number',
                description: 'Specify the max timeout between the glitches phase in ms',
                default: 5000,
            },
            minDiration: {
                type: 'Number',
                description: 'Specify the min glitch duration in ms',
                default: 100,
            },
            maxDuration: {
                type: 'Number',
                description: 'Specify the max glitch duration in ms',
                default: 2000,
            },
        };
    }
}
exports.default = SGlitchFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaENELDBDQWdDQyJ9