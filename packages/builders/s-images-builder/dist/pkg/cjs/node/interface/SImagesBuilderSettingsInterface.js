"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SImagesBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SImagesBuilder
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SImagesBuilderSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            resolveGlob: {
                description: 'Specify some settings to use for the [resolveGlob function](/api/@coffeekraken.sugar.node.glob.resolveGlob)',
                type: 'IResolveGlobSettings',
                default: {},
            },
        };
    }
}
exports.default = SImagesBuilderSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQXFCLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLDZHQUE2RztnQkFDakgsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFYRCxrREFXQyJ9