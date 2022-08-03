"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontendServerAddDefaultPagesParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server adding default pages process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontendServerAddDefaultPagesParamsIn extends s_interface_1.default {
    static get _definition() {
        return {
            yes: {
                description: 'Answer yes to all the potential questions',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.pagesDir'),
            },
        };
    }
}
exports.default = SFrontendServerAddDefaultPagesParamsIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQUMxRCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzVFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXJCRCx5REFxQkMifQ==