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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDhCQUErQixTQUFRLFlBQVk7SUFDcEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxXQUFXLEVBQ1Asa0VBQWtFO2FBQ3pFO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrTkFBK047YUFDdE87WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFDUCw0RUFBNEU7YUFDbkY7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLGtFQUFrRTthQUN6RTtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsV0FBVyxFQUFFLDJCQUEyQjthQUMzQztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asd0hBQXdIO2dCQUM1SCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLElBQUk7b0JBQ1osTUFBTSxFQUFFLElBQUk7b0JBQ1osS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asb0ZBQW9GO2dCQUN4RixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFO3dCQUNILE9BQU8sRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzlCLEVBQUUsRUFBRSw4QkFBOEI7eUJBQ3JDLENBQUM7cUJBQ0w7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILE9BQU8sRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzlCLEVBQUUsRUFBRSw4QkFBOEI7eUJBQ3JDLENBQUM7cUJBQ0w7aUJBQ0o7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLG1DQUFtQztvQkFDMUMsR0FBRyxFQUFFLGtDQUFrQztvQkFDdkMsTUFBTSxFQUFFLHlDQUF5QztvQkFDakQsTUFBTSxFQUFFLGtDQUFrQztvQkFDMUMsSUFBSSxFQUFFLG9DQUFvQztvQkFDMUMsTUFBTSxFQUFFLG1DQUFtQztvQkFDM0MsT0FBTyxFQUFFLG1DQUFtQztvQkFDNUMsUUFBUSxFQUFFLG1DQUFtQztvQkFDN0MsTUFBTSxFQUFFLGtEQUFrRDtvQkFDMUQsTUFBTSxFQUFFLGtEQUFrRDtvQkFDMUQsT0FBTyxFQUFFLHFDQUFxQztvQkFDOUMsSUFBSSxFQUFFLCtDQUErQztpQkFDeEQ7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==