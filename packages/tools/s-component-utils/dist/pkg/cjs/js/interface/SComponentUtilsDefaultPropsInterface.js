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
                values: when_1.triggers,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlFQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixvQ0FBcUMsU0FBUSxxQkFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQiw0RkFBNEY7WUFDNUYsc0JBQXNCO1lBQ3RCLGtEQUFrRDtZQUNsRCwwQkFBMEI7WUFDMUIsc0JBQXNCO1lBQ3RCLEtBQUs7WUFDTCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLGVBQVE7Z0JBQ2hCLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO2FBQ2pDO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxvSEFBb0g7Z0JBQ3hILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLGtCQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1Asb0dBQW9HO2dCQUN4RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHVIQUF1SDtnQkFDM0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHFMQUFxTDtnQkFDekwsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsMEhBQTBIO2dCQUM5SCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoRkQsdURBZ0ZDIn0=