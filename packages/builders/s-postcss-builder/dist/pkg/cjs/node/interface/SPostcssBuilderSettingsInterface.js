"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SPostcssBuilderSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SPostcssBuilder class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SPostcssBuilderSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            postcss: {
                description: 'Specify some postcss configurations',
                type: 'Object',
                default: s_sugar_config_1.default.get('postcssBuilder.postcss'),
            },
            purgecss: {
                description: 'Specify some purgecss configurations',
                type: 'Object',
                default: s_sugar_config_1.default.get('postcssBuilder.purgecss'),
            },
        };
    }
}
exports.default = SPostcssBuilderSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixnQ0FBaUMsU0FBUSxxQkFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUN4RDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBZkQsbURBZUMifQ==