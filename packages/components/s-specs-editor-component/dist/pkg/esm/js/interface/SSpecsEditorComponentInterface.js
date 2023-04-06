import { __i18n } from '@coffeekraken/s-i18n';
import __SInterface from '@coffeekraken/s-interface';
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
export default class SSpecsEditorComponentInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
                title: 'Id',
                description: 'Specify an id for your specs editor to be able to save his state',
            },
            specs: {
                type: 'Object',
                title: 'Specs',
                description: 'Specify the SSpecs resulting json to use for the editor',
                required: true,
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
                        copyUrl: __i18n('Copy image url', {
                            id: 's-specs-editor.image.copyUrl',
                        }),
                    },
                    video: {
                        copyUrl: __i18n('Copy video url', {
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
                    copy: '<i class="fa-regular fa-copy"></i>',
                    remove: '<i class="fa-solid fa-minus"></i>',
                    success: '<i class="fa-solid fa-check"></i>',
                    collapse: '<i class="fa-solid fa-minus"></i>',
                    mobile: '<i class="fa-solid fa-mobile-screen-button"></i>',
                    tablet: '<i class="fa-solid fa-tablet-screen-button"></i>',
                    desktop: '<i class="fa-solid fa-desktop"></i>',
                    wide: '<i class="fa-solid fa-arrows-left-right"></i>',
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDhCQUErQixTQUFRLFlBQVk7SUFDcEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxXQUFXLEVBQ1Asa0VBQWtFO2FBQ3pFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQ1AsNEVBQTRFO2FBQ25GO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCxrRUFBa0U7YUFDekU7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFdBQVcsRUFBRSwyQkFBMkI7YUFDM0M7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHdIQUF3SDtnQkFDNUgsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxJQUFJO29CQUNaLE1BQU0sRUFBRSxJQUFJO29CQUNaLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLG9GQUFvRjtnQkFDeEYsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsT0FBTyxFQUFFO29CQUNMLEtBQUssRUFBRTt3QkFDSCxPQUFPLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFFOzRCQUM5QixFQUFFLEVBQUUsOEJBQThCO3lCQUNyQyxDQUFDO3FCQUNMO29CQUNELEtBQUssRUFBRTt3QkFDSCxPQUFPLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFFOzRCQUM5QixFQUFFLEVBQUUsOEJBQThCO3lCQUNyQyxDQUFDO3FCQUNMO2lCQUNKO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsT0FBTyxFQUFFO29CQUNMLEtBQUssRUFBRSxtQ0FBbUM7b0JBQzFDLEdBQUcsRUFBRSxrQ0FBa0M7b0JBQ3ZDLE1BQU0sRUFBRSx5Q0FBeUM7b0JBQ2pELE1BQU0sRUFBRSxrQ0FBa0M7b0JBQzFDLElBQUksRUFBRSxvQ0FBb0M7b0JBQzFDLE1BQU0sRUFBRSxtQ0FBbUM7b0JBQzNDLE9BQU8sRUFBRSxtQ0FBbUM7b0JBQzVDLFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLE1BQU0sRUFBRSxrREFBa0Q7b0JBQzFELE1BQU0sRUFBRSxrREFBa0Q7b0JBQzFELE9BQU8sRUFBRSxxQ0FBcUM7b0JBQzlDLElBQUksRUFBRSwrQ0FBK0M7aUJBQ3hEO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=