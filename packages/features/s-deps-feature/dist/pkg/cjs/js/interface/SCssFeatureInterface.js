"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SCssPartialFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
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
class SCssPartialFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            partial: {
                type: 'String',
                description: 'Specify the "partial" css you want to load. This is relative to the "rootPath" property and can be a simple id like "welcome" that will resolve to "${rootPath}/welcome.css" or directly a path also relative',
            },
            rootPath: {
                type: 'String',
                description: 'Specify the path where are stored your css files',
                default: s_sugar_config_1.default.get('serve.css.path'),
            },
            partialsPath: {
                type: 'String',
                description: 'Specify the path where are stored your css partials files',
                get default() {
                    return `${SCssPartialFeatureInterface._definition.rootPath.default}/partials`;
                },
            },
        };
    }
}
exports.default = SCssPartialFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiwyQkFBNEIsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrTUFBK007YUFDdE47WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2FBQ2hEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsMkJBQTJCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLFdBQVcsQ0FBQztnQkFDbEYsQ0FBQzthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZCRCw4Q0F1QkMifQ==