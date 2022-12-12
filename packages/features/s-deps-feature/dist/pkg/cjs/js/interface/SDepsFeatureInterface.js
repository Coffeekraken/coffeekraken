"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDepsFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SCssPartial feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDepsFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            css: {
                type: 'String',
                description: 'Specify the "partial" css you want to load. This is relative to the "rootPath" property and can be a simple id like "welcome" that will resolve to "${cssPartialsPath}/welcome.css" or directly a path',
            },
            // cssPartialsPath: {
            //     type: 'String',
            //     description:
            //         'Specify the path where are stored your css partials files',
            //     get default() {
            //         return `${__SSugarConfig.get('serve.css.path')}/partials`;
            //     },
            // },
        };
    }
}
exports.default = SDepsFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHFCQUFzQixTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHdNQUF3TTthQUMvTTtZQUNELHFCQUFxQjtZQUNyQixzQkFBc0I7WUFDdEIsbUJBQW1CO1lBQ25CLHVFQUF1RTtZQUN2RSxzQkFBc0I7WUFDdEIscUVBQXFFO1lBQ3JFLFNBQVM7WUFDVCxLQUFLO1NBQ1IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxCRCx3Q0FrQkMifQ==