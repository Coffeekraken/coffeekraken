"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSugarFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SSugarFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            pleasantCss: {
                description: 'Specify if you want the "pleasant css" syntax in your pages',
                type: 'Boolean',
                default: true,
            },
            containerQuery: {
                description: 'Specify if you want support for container queries in your css or not',
                type: 'Boolean',
                default: true,
            },
            scrolled: {
                description: 'Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled',
                type: 'Boolean',
                default: true,
            },
            scrolledDelta: {
                description: 'Specify after how many scroll the scrolled class will be applied',
                type: 'Number',
                default: 200,
            },
            vhvar: {
                description: 'Specify if you want the `--vh` css variable to be computed and available',
                type: 'Boolean',
                default: true,
            },
            autoResize: {
                description: 'Specify if you want the auto resize to be enabled',
                type: 'Boolean',
                default: true,
            },
            confirmBtn: {
                description: 'Specify if you want the "confirm button" feature to be enabled',
                type: 'Boolean',
                default: true,
            },
            inputAdditionalAttributes: {
                description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
                type: 'Boolean',
                default: true,
            },
            resizeTransmations: {
                description: 'Specify if you want all the transitions and animations cleared during window resize',
                type: 'Boolean',
                default: true,
            },
            linksStateAttributes: {
                description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
                type: 'Boolean',
                default: true,
            },
            preventScrollRestoration: {
                description: 'Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying',
                type: 'Boolean',
                default: true,
            },
            env: {
                description: 'Specify if you want to display the current environment at start',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.default = SSugarFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHNCQUF1QixTQUFRLHFCQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLDZEQUE2RDtnQkFDakUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDhHQUE4RztnQkFDbEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLGtFQUFrRTtnQkFDdEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsMEVBQTBFO2dCQUM5RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsZ0VBQWdFO2dCQUNwRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELHlCQUF5QixFQUFFO2dCQUN2QixXQUFXLEVBQ1AsOEdBQThHO2dCQUNsSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELGtCQUFrQixFQUFFO2dCQUNoQixXQUFXLEVBQ1AscUZBQXFGO2dCQUN6RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELG9CQUFvQixFQUFFO2dCQUNsQixXQUFXLEVBQ1AsbUdBQW1HO2dCQUN2RyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELHdCQUF3QixFQUFFO2dCQUN0QixXQUFXLEVBQ1Asc0dBQXNHO2dCQUMxRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE3RUQseUNBNkVDIn0=