"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDocblockSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SDocblock settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocblockSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            filePath: {
                description: 'Specify the file path of the parsed file',
                type: 'String',
            },
            filter: {
                description: 'Specify a filter function that will be called on each docblock. If return false, the docblock will be ignored',
                type: 'Function',
            },
            filterByTag: {
                description: 'Specify a filter function by tag. This mean that this object must have as property the tagname you want to filter by, and a filter function as value',
                type: 'Object',
                default: {},
            },
            renderMarkdown: {
                description: 'Specify if you want to render the markdown inside the tag contents or not',
                type: 'Boolean',
                default: true,
            },
            markedOptions: {
                description: 'Specify some options for the marked library',
                type: 'Object',
                default: {},
            },
        };
    }
}
exports.default = SDocblockSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBR3JEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDBCQUEyQixTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLCtHQUErRztnQkFDbkgsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHNKQUFzSjtnQkFDMUosSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQS9CRCw2Q0ErQkMifQ==