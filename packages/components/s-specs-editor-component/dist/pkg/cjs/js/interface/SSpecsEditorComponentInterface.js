"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSpecsEditorComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSpecsEditorComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSpecsEditorComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                type: 'String',
                title: 'Id',
                description: 'Specify an id for your specs editor to be able to save his state',
            },
            values: {
                type: 'Object',
                title: 'Values',
                description: 'Values that match with the passed specs',
                required: true,
            },
            specs: {
                type: 'Object',
                title: 'Specs',
                description: 'Specify the SSpecs resulting json to use for the editor',
                required: true,
            },
            source: {
                type: 'Object',
                description: 'Specify a source that will act as a "master". You will be then able to override some values of this master using the normal editor. This is useful when you just want to specify some values to override and not all of them.',
            },
            frontspec: {
                type: 'Object',
                title: 'Frontspec',
                description: 'Specify the frontspec json to make use of it for things like media, etc...',
            },
            media: {
                type: 'String',
                title: 'Media',
                description: 'Specify the media on which the specs editor is currently working',
            },
            defaultMedia: {
                type: 'String',
                title: 'Default media',
                description: 'Specify the default media',
            },
            features: {
                type: 'Object',
                description: 'Specify which features you want in your specs editor. Available features are: "save", "delete", "upload", and "media".',
                default: {
                    save: true,
                    delete: true,
                    upload: true,
                    media: true,
                },
            },
            ghostSpecs: {
                type: 'Boolean',
                description: 'Specify if you want to display the specs that are marked as `"ghost":true` or not.',
                default: false,
            },
            i18n: {
                type: 'Object',
                title: 'i18n',
                description: 'Specify all the words/sentences that are used in the UI',
                default: {
                    image: {
                        copyUrl: (0, s_i18n_1.__i18n)('Copy image url', {
                            id: 's-specs-editor.image.copyUrl',
                        }),
                    },
                    video: {
                        copyUrl: (0, s_i18n_1.__i18n)('Copy video url', {
                            id: 's-specs-editor.video.copyUrl',
                        }),
                    },
                },
            },
            icons: {
                type: 'Object',
                title: 'Icons',
                description: 'Specify some icons html used across the interface',
                default: {
                    clear: '<i class="fa-solid fa-xmark"></i>',
                    add: '<i class="fa-solid fa-plus"></i>',
                    delete: '<i class="fa-regular fa-trash-can"></i>',
                    expand: '<i class="fa-solid fa-plus"></i>',
                    collapse: '<i class="fa-solid fa-minus"></i>',
                    copy: '<i class="fa-regular fa-copy"></i>',
                    remove: '<i class="fa-solid fa-minus"></i>',
                    success: '<i class="fa-solid fa-check"></i>',
                    mobile: '<i class="fa-solid fa-mobile-screen-button"></i>',
                    tablet: '<i class="fa-solid fa-tablet-screen-button"></i>',
                    desktop: '<i class="fa-solid fa-desktop"></i>',
                    wide: '<i class="fa-solid fa-arrows-left-right"></i>',
                    up: '<i class="fa-solid fa-angle-up"></i>',
                    down: '<i class="fa-solid fa-angle-down"></i>',
                    left: '<i class="fa-solid fa-angle-left"></i>',
                    right: '<i class="fa-solid fa-angle-right"></i>',
                    reorder: '<i class="fa-solid fa-arrows-up-down"></i>',
                    repeatableEmpty: '<i class="fa-solid fa-laptop-medical"></i>',
                },
            },
        };
    }
}
exports.default = SSpecsEditorComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLFdBQVcsRUFDUCxrRUFBa0U7YUFDekU7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsV0FBVyxFQUFFLHlDQUF5QztnQkFDdEQsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLCtOQUErTjthQUN0TztZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUNQLDRFQUE0RTthQUNuRjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQ1Asa0VBQWtFO2FBQ3pFO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxlQUFlO2dCQUN0QixXQUFXLEVBQUUsMkJBQTJCO2FBQzNDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx3SEFBd0g7Z0JBQzVILE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsSUFBSTtvQkFDWixNQUFNLEVBQUUsSUFBSTtvQkFDWixLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxNQUFNO2dCQUNiLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUU7d0JBQ0gsT0FBTyxFQUFFLElBQUEsZUFBTSxFQUFDLGdCQUFnQixFQUFFOzRCQUM5QixFQUFFLEVBQUUsOEJBQThCO3lCQUNyQyxDQUFDO3FCQUNMO29CQUNELEtBQUssRUFBRTt3QkFDSCxPQUFPLEVBQUUsSUFBQSxlQUFNLEVBQUMsZ0JBQWdCLEVBQUU7NEJBQzlCLEVBQUUsRUFBRSw4QkFBOEI7eUJBQ3JDLENBQUM7cUJBQ0w7aUJBQ0o7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLG1DQUFtQztvQkFDMUMsR0FBRyxFQUFFLGtDQUFrQztvQkFDdkMsTUFBTSxFQUFFLHlDQUF5QztvQkFDakQsTUFBTSxFQUFFLGtDQUFrQztvQkFDMUMsUUFBUSxFQUFFLG1DQUFtQztvQkFDN0MsSUFBSSxFQUFFLG9DQUFvQztvQkFDMUMsTUFBTSxFQUFFLG1DQUFtQztvQkFDM0MsT0FBTyxFQUFFLG1DQUFtQztvQkFDNUMsTUFBTSxFQUFFLGtEQUFrRDtvQkFDMUQsTUFBTSxFQUFFLGtEQUFrRDtvQkFDMUQsT0FBTyxFQUFFLHFDQUFxQztvQkFDOUMsSUFBSSxFQUFFLCtDQUErQztvQkFDckQsRUFBRSxFQUFFLHNDQUFzQztvQkFDMUMsSUFBSSxFQUFFLHdDQUF3QztvQkFDOUMsSUFBSSxFQUFFLHdDQUF3QztvQkFDOUMsS0FBSyxFQUFFLHlDQUF5QztvQkFDaEQsT0FBTyxFQUFFLDRDQUE0QztvQkFDckQsZUFBZSxFQUNYLDRDQUE0QztpQkFDbkQ7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1R0QsaURBNEdDIn0=