"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SDocmapReadParamsInterface_1 = __importDefault(require("./SDocmapReadParamsInterface"));
/**
 * @name                SDocmapReadParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapReadParamsInterface extends s_interface_1.default {
    static get _definition() {
        return Object.assign(Object.assign({}, SDocmapReadParamsInterface_1.default.definition), { slug: {
                description: 'Specify a slug to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 's',
            }, namespace: {
                description: 'Specify a namespace to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 'n',
            } });
    }
}
exports.default = SDocmapReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCw4RkFBd0U7QUFFeEU7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLDBCQUEyQixTQUFRLHFCQUFZO0lBQ2pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLHVDQUNPLG9DQUE0QixDQUFDLFVBQVUsS0FDMUMsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnRUFBZ0U7Z0JBQ3BFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2IsRUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYixJQUNIO0lBQ04sQ0FBQztDQUNKO0FBQ0Qsa0JBQWUsMEJBQTBCLENBQUMifQ==