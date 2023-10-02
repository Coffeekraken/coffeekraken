import { __i18n } from '@coffeekraken/s-i18n';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDocComponentInterface extends __SInterface {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: __SSugarConfig.get('doc.endpoints'),
            },
            fetchExtension: {
                type: 'string',
                description:
                    'Specify an extension to add at the end of the fetch url like "json"',
                default: '',
            },
            loaderSvg: {
                type: 'String',
                description: 'Specify an svg to use as the loader',
                default: `<svg class="s-logo s-logo-coffeekraken-picto" viewBox="0 0 299 229" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M102.5 55.3151V202.802H191V229H71V29H142V55.3151H102.5Z" fill="white"/>
                        <path d="M265.5 26.3151V202.802H227.5V229H298.5V0H227.5V26.3151H265.5Z" fill="white"/>
                        <path d="M31.5 109.315V166.802H31V193H0V83H71V109.315H31.5Z" fill="white"/>
                        <path d="M173 144.5C173 159.136 162.703 171 150 171C137.297 171 127 159.136 127 144.5C127 129.864 137.297 118 150 118C167.5 118 173 129.864 173 144.5Z" fill="#FEBD0F"/>
                        <path d="M240 144.5C240 159.136 229.703 171 217 171C204.297 171 194 159.136 194 144.5C194 129.864 200.5 118 217 118C229.703 118 240 129.864 240 144.5Z" fill="#FEBD0F"/>
                        </svg>
                        `,
            },
            features: {
                type: 'Object',
                description:
                    'Specify which feature are available like "fullscreen", etc...',
                default: {
                    fullscreen: true,
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons for the UI',
                default: {
                    file: '<i class="fa-regular fa-file"></i>',
                    enterFullscreen: '<i class="fa-solid fa-expand"></i>',
                    exitFullscreen: '<i class="fa-solid fa-compress"></i>',
                    menu: '<i class="fa-solid fa-list-ul"></i>',
                },
            },
            i18n: {
                type: 'Object',
                description: 'Specify all the UI translations',
                default: {
                    examplesTitle: __i18n('Examples', {
                        id: 's-doc.examples.title',
                    }),
                    paramsTitle: __i18n('Parameters', {
                        id: 's-doc.params.title',
                    }),
                    cssClassesTitle: __i18n('CSS Classes', {
                        id: 's-doc.cssClasses.title',
                    }),
                    settingsTitle: __i18n('Settings', {
                        id: 's-doc.settings.title',
                    }),
                    search: __i18n('Search documentation', {
                        id: 's-doc.search',
                    }),
                    toggleFullscreen: __i18n('Toggle fullscreen', {
                        id: 's-doc.fullscreen.toggle',
                    }),
                },
            },
        };
    }
}
