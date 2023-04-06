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
                description:
                    'Specify an id for your specs editor to be able to save his state',
            },
            specs: {
                type: 'Object',
                title: 'Specs',
                description:
                    'Specify the SSpecs resulting json to use for the editor',
                required: true,
            },
            frontspec: {
                type: 'Object',
                title: 'Frontspec',
                description:
                    'Specify the frontspec json to make use of it for things like media, etc...',
            },
            media: {
                type: 'String',
                title: 'Media',
                description:
                    'Specify the media on which the specs editor is currently working',
            },
            defaultMedia: {
                type: 'String',
                title: 'Default media',
                description: 'Specify the default media',
            },
            features: {
                type: 'Object',
                description:
                    'Specify which features you want in your specs editor. Available features are: "save", "delete", "upload", and "media".',
                default: {
                    save: true,
                    delete: true,
                    upload: true,
                    media: true,
                },
            },
            ghostSpecs: {
                type: 'Boolean',
                description:
                    'Specify if you want to display the specs that are marked as `"ghost":true` or not.',
                default: false,
            },
            i18n: {
                type: 'Object',
                title: 'i18n',
                description:
                    'Specify all the words/sentences that are used in the UI',
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
                description:
                    'Specify some icons html used across the interface',
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
