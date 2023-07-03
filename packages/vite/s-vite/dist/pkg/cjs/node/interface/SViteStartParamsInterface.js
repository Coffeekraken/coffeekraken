"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SViteStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchenViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViteStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            host: {
                type: 'String',
                description: 'Specify the host on which to launch the vite server',
                required: true,
                default: s_sugar_config_1.default.get('vite.server.host'),
                alias: 'h',
            },
            port: {
                type: 'Number',
                description: 'Specify the port on which to launch the vite server',
                required: true,
                default: s_sugar_config_1.default.get('vite.server.port'),
                alias: 'p',
            },
        };
    }
}
exports.default = SViteStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLHlCQUEwQixTQUFRLHFCQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2dCQUMvQyxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDL0MsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxrQkFBZSx5QkFBeUIsQ0FBQyJ9