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
            uid: {
                type: 'String',
                title: 'UID',
                description: 'Specify a unique id for your specs editor to be able to save his state',
                required: true,
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
                    delete: true,
                    upload: true,
                    save: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFDUCx3RUFBd0U7Z0JBQzVFLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrTkFBK047YUFDdE87WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFDUCw0RUFBNEU7YUFDbkY7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLGtFQUFrRTthQUN6RTtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsV0FBVyxFQUFFLDJCQUEyQjthQUMzQztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asd0hBQXdIO2dCQUM1SCxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLElBQUk7b0JBQ1osTUFBTSxFQUFFLElBQUk7b0JBQ1osSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asb0ZBQW9GO2dCQUN4RixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFO3dCQUNILE9BQU8sRUFBRSxJQUFBLGVBQU0sRUFBQyxnQkFBZ0IsRUFBRTs0QkFDOUIsRUFBRSxFQUFFLDhCQUE4Qjt5QkFDckMsQ0FBQztxQkFDTDtvQkFDRCxLQUFLLEVBQUU7d0JBQ0gsT0FBTyxFQUFFLElBQUEsZUFBTSxFQUFDLGdCQUFnQixFQUFFOzRCQUM5QixFQUFFLEVBQUUsOEJBQThCO3lCQUNyQyxDQUFDO3FCQUNMO2lCQUNKO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsT0FBTyxFQUFFO29CQUNMLEtBQUssRUFBRSxtQ0FBbUM7b0JBQzFDLEdBQUcsRUFBRSxrQ0FBa0M7b0JBQ3ZDLE1BQU0sRUFBRSx5Q0FBeUM7b0JBQ2pELE1BQU0sRUFBRSxrQ0FBa0M7b0JBQzFDLFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLElBQUksRUFBRSxvQ0FBb0M7b0JBQzFDLE1BQU0sRUFBRSxtQ0FBbUM7b0JBQzNDLE9BQU8sRUFBRSxtQ0FBbUM7b0JBQzVDLE1BQU0sRUFBRSxrREFBa0Q7b0JBQzFELE1BQU0sRUFBRSxrREFBa0Q7b0JBQzFELE9BQU8sRUFBRSxxQ0FBcUM7b0JBQzlDLElBQUksRUFBRSwrQ0FBK0M7b0JBQ3JELEVBQUUsRUFBRSxzQ0FBc0M7b0JBQzFDLElBQUksRUFBRSx3Q0FBd0M7b0JBQzlDLElBQUksRUFBRSx3Q0FBd0M7b0JBQzlDLEtBQUssRUFBRSx5Q0FBeUM7b0JBQ2hELE9BQU8sRUFBRSw0Q0FBNEM7b0JBQ3JELGVBQWUsRUFDWCw0Q0FBNEM7aUJBQ25EO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBN0dELGlEQTZHQyJ9