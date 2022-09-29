"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SColorApplyParamsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform        js
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SColorApplyParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            desaturate: {
                type: 'Number',
                default: 0,
                alias: 'd',
                description: 'Allows you to desaturate the color using a percentage',
            },
            saturate: {
                type: 'Number',
                default: 0,
                alias: 's',
                description: 'Allows you to saturate the color using a percentage',
            },
            greyscale: {
                type: 'Boolean',
                default: false,
                alias: 'g',
                description: 'Allows you to get back the grayscale version of your color',
            },
            spin: {
                type: 'Number',
                default: 0,
                description: 'Spin the hue on the passed value (max 360)',
            },
            transparentize: {
                type: 'Number',
                default: 0,
                description: 'The amount of transparency to apply between 0-100|0-1',
            },
            alpha: {
                type: 'Number',
                default: 0,
                alias: 'a',
                description: 'The new alpha value to apply between 0-100|0-1',
            },
            opacity: {
                type: 'Number',
                default: 0,
                alias: 'o',
                description: 'The new alpha value to apply between 0-100|0-1',
            },
            opacify: {
                type: 'Number',
                default: 0,
                description: 'The amount of transparence to remove between 0-100|0-1',
            },
            darken: {
                type: 'Number',
                default: 0,
                description: 'The amount of darkness (of the nightmare of the shadow) to apply between 0-100',
            },
            lighten: {
                type: 'Number',
                default: 0,
                alias: 'l',
                description: 'The amount of lightness (of the sky of the angels) to apply between 0-100',
            },
            invert: {
                type: 'Boolean',
                default: false,
                alias: 'i',
                description: 'Specify if you want to invert the color to keep a good contrast ratio with a background for example',
            },
        };
    }
}
exports.default = SColorApplyParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLHFCQUFZO0lBQ2pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLHVEQUF1RDthQUM5RDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AscURBQXFEO2FBQzVEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCw0REFBNEQ7YUFDbkU7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsV0FBVyxFQUFFLDRDQUE0QzthQUM1RDtZQUNELGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixXQUFXLEVBQ1AsdURBQXVEO2FBQzlEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxnREFBZ0Q7YUFDaEU7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLGdEQUFnRDthQUNoRTtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixXQUFXLEVBQ1Asd0RBQXdEO2FBQy9EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFdBQVcsRUFDUCxnRkFBZ0Y7YUFDdkY7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLDJFQUEyRTthQUNsRjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AscUdBQXFHO2FBQzVHO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGtCQUFlLDBCQUEwQixDQUFDIn0=