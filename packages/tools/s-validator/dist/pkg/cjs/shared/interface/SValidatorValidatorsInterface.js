"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SValidator_js_1 = __importDefault(require("../SValidator.js"));
/**
 * @name                SValidatorValidatorsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe all the available validators of the SValidator class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SValidatorValidatorsInterface extends s_interface_1.default {
    static get _definition() {
        return SValidator_js_1.default.getValidatorsDefinition();
    }
}
exports.default = SValidatorValidatorsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHFFQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQiw2QkFBOEIsU0FBUSxxQkFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLHVCQUFZLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0NBQ0o7QUFKRCxnREFJQyJ9