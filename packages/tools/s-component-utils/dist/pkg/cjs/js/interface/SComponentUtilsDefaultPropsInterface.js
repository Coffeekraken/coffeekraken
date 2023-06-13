"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const when_1 = require("@coffeekraken/sugar/js/dom/detect/when");
/**
 * @name                SComponentUtilsDefaultPropsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of a basic SComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SComponentUtilsDefaultPropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                description: 'Specify an id for your component',
                type: 'String',
                physical: true,
            },
            // status: {
            //     description:
            //         'Specify the status of the component. Can be "pending", "mounting" or "mounted"',
            //     type: 'String',
            //     values: ['pending', 'mounting', 'mounted'],
            //     default: 'pending',
            //     physical: true,
            // },
            mountWhen: {
                description: 'Specify when your component will be mounted',
                type: 'String',
                values: when_1.WhenTriggers,
                default: 'direct',
            },
            activeWhen: {
                description: 'Specify when your component is active and when it is not',
                type: 'String[]',
                values: ['inViewport', 'lod'],
                default: ['inViewport', 'lod'],
            },
            lod: {
                description: 'Specify the minimum lod (level of details) from when this component is active',
                type: 'Number',
            },
            adoptStyle: {
                description: 'Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element',
                type: 'Boolean',
                default: true,
                // physical: true,
            },
            saveState: {
                description: 'Specify if you want to save the state of your component',
                type: 'Boolean',
                default: false,
            },
            lnf: {
                description: 'Specify the lnf (look-and-feel) of your component. This is used by the css to style your component',
                type: 'String',
                default: 'default',
                physical: true,
            },
            bare: {
                description: 'Specify if you want your component with only the bare styling. It just add the "s-bare" class on the component itself',
                type: 'Boolean',
                default: false,
            },
            responsive: {
                description: 'Specify some responsive properties. A "media" property is required and has to be either a media query, or a media query name defined in the config.themeMedia.queries theme setting',
                type: 'Object',
                default: {},
            },
            prefixEvent: {
                description: 'Specify if you want the emitted events to be prefixed by the name of the feature/component like "s-slider.change" or not',
                type: 'Boolean',
                default: true,
            },
            verbose: {
                description: 'Specify if you want this component/feature to log informations about activity or not',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.default = SComponentUtilsDefaultPropsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUFzRTtBQUV0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixvQ0FBcUMsU0FBUSxxQkFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQiw0RkFBNEY7WUFDNUYsc0JBQXNCO1lBQ3RCLGtEQUFrRDtZQUNsRCwwQkFBMEI7WUFDMUIsc0JBQXNCO1lBQ3RCLEtBQUs7WUFDTCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLG1CQUFZO2dCQUNwQixPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQzthQUNqQztZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asb0hBQW9IO2dCQUN4SCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTtnQkFDYixrQkFBa0I7YUFDckI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLG9HQUFvRztnQkFDeEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx1SEFBdUg7Z0JBQzNILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxxTEFBcUw7Z0JBQ3pMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLDBIQUEwSDtnQkFDOUgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHNGQUFzRjtnQkFDMUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaEZELHVEQWdGQyJ9