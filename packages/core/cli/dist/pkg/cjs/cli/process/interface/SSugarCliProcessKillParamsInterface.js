"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSugarCliProcessKillParamsInterface
 * @namespace           cli.process.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the `sugar process.kill` command
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarCliProcessKillParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                description: 'Specify the process id you want to kill',
                type: 'Number',
                alias: 'i',
            },
            port: {
                description: 'Specify the port on which the process you want to kill is binded',
                type: 'Number',
                alias: 'p',
            },
        };
    }
}
exports.default = SSugarCliProcessKillParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLG1DQUFvQyxTQUFRLHFCQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsV0FBVyxFQUFFLHlDQUF5QztnQkFDdEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1Asa0VBQWtFO2dCQUN0RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhCRCxzREFnQkMifQ==