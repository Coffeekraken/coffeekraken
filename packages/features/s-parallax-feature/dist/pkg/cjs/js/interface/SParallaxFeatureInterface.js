"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SParallaxFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SParallaxFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SParallaxFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            amount: {
                description: 'Specify the amount of parallax you want to apply',
                type: 'Number',
                default: 1,
            },
            amountX: {
                description: 'Specify the amount of parallax you want for the x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountY: {
                description: 'Specify the amount of parallax you want for the y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateX: {
                description: 'Specify the amount of parallax you want for the translate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateY: {
                description: 'Specify the amount of parallax you want for the translate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateX: {
                description: 'Specify the amount of parallax you want for the rotate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateY: {
                description: 'Specify the amount of parallax you want for the rotate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
        };
    }
}
exports.default = SParallaxFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHlCQUEwQixTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsMEdBQTBHO2dCQUM5RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwR0FBMEc7Z0JBQzlHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQ1Asb0hBQW9IO2dCQUN4SCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUNQLG9IQUFvSDtnQkFDeEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsaUhBQWlIO2dCQUNySCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxpSEFBaUg7Z0JBQ3JILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUNELDRDQThDQyJ9