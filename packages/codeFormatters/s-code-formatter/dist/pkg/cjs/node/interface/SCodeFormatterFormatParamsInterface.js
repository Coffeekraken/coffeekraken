"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SCodeFormatterFormatParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the parameters for the SCodeFormatter.format method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCodeFormatterFormatParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glog pattern relative to the "inDir"',
                type: 'String',
                default: s_sugar_config_1.default.get('codeFormatter.glob'),
                alias: 'i',
            },
            inDir: {
                description: 'Specify the working directory from where the glob will be resolved',
                type: 'String',
                default: s_sugar_config_1.default.get('codeFormatter.inDir'),
                alias: 'd',
            },
            watch: {
                description: 'Specify if you want to watch for files changes and format them automatically',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            formatInitial: {
                description: 'Specify if you want to format the founded files directly even if you have specified the watch parameter to true',
                type: 'Boolean',
                default: false,
                alias: 'f',
            },
        };
    }
}
exports.default = SCodeFormatterFormatParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixtQ0FBb0MsU0FBUSxxQkFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDakQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1Asb0VBQW9FO2dCQUN4RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDhFQUE4RTtnQkFDbEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsaUhBQWlIO2dCQUNySCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhDRCxzREFnQ0MifQ==