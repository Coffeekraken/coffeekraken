import __SFrontspec from '@coffeekraken/s-frontspec';
import { __i18n } from '@coffeekraken/s-i18n';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCarpenterComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SCarpenterComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SCarpenterComponentInterface extends __SInterface {
    static get _definition() {
        return {
            src: {
                type: 'String',
                description:
                    'Specify the url where to load the actual Carpenter script',
                default: '/dist/js/carpenter.ts',
                required: true,
            },
            window: {
                type: 'Object',
                description:
                    'Specify the window in which the carpenter will work',
                default: window,
                required: true,
            },
            viewportElm: {
                type: 'String|HTMLElement',
                description:
                    'Specify the "viewport" element (or a css selector) that will be resized in your website when editing with carpenter. This will be used ONLY if you make use of container queries in your codebase instead of the plain old media queries. When using media queries, the editor will wrap your website into an iframe and resitze this iframe instead.',
                default: '.s-viewport',
            },
            autoInit: {
                type: 'Boolean',
                description:
                    'Specify if you want the editor to be automatically inited when adding the "s-carpenter" component. If not, the user will have to click on a "Carpenter" button',
                default: document.location.hash === '#carpenter',
            },
            escape: {
                type: 'Boolean',
                description:
                    'Specify if you want to enable the "escape" key to exit the editor',
                default: false,
            },
            autoEdit: {
                type: 'Boolean',
                description:
                    'Specify if you want the editor to automatically open the first editable found in the HTML',
                default: false,
            },
            endpoints: {
                type: 'Object',
                description:
                    "Specify the differents URL's that can be called to retreive the infos like specs, nodes, etc...",
                default: {
                    base: '/carpenter/api',
                    specs: '%base/specs/%specs',
                    nodes: '%base/nodes/%uid',
                    pages: '%base/pages/%uid',
                    scopes: '%base/scopes',
                    categories: '%base/categories',
                },
            },
            adapter: {
                type: 'String',
                description:
                    'Specify the adapter to use in order to apply the updated properties on a component/section/etc... Must be a registered adapter id',
                default: 'ajax',
                required: true,
            },
            sidebar: {
                type: 'Boolean',
                description:
                    'Specify if you want the left sidebar to jump across all the components/sections/etc...',
                default: false,
            },
            pagesUrl: {
                type: 'String',
                description:
                    'Specify the link to use to change page. You have access to the %specs token that will be replaced by the actual component/section specs dotpath',
                default: '/carpenter/%specs',
            },
            features: {
                type: 'Object',
                description:
                    'Specify which features you want in your carpenter editor. Available features are: "save", "delete", "upload", "nav" and "media". Note that these features can be specified also in the "carpenter.json" usually returned by the server. These will be propritary on the ones you specified here cause the server may not support "upload", etc...',
                default: {
                    scope: false,
                    insert: true,
                    edit: true,
                    delete: true,
                    move: true,
                    upload: true,
                    newPage: false,
                    savePage: true,
                    saveComponent: true,
                    media: true,
                    nav: true,
                },
            },
            frontspec: {
                type: 'Object',
                title: 'Frontspec',
                description: 'Specify a custom frontspec object',
                default: __SFrontspec.get('.'),
            },
            defaultMedia: {
                type: 'String',
                title: 'Default media',
                description: 'Specify the default media',
                default: __SFrontspec.get('media.defaultMedia'),
            },
            ghostSpecs: {
                type: 'Boolean',
                description:
                    'Specify if you want to display the specs that are marked as `"ghost":true` or not.',
                default: false,
            },
            logo: {
                type: 'String',
                description:
                    'Specify an image to be used as logo on top left of the interface',
                default: `<svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.5" x="46.0059" y="-0.000976562" width="46.0006" height="20.9094" rx="10.4547" transform="rotate(90 46.0059 -0.000976562)" fill="#FECE0F"/>
                <rect opacity="0.3" x="20.916" y="-0.000976562" width="20.9094" height="20.9094" rx="10.4547" transform="rotate(90 20.916 -0.000976562)" fill="#4900E6"/>
                <rect opacity="0.5" x="20.916" y="25.0918" width="20.9094" height="20.9094" rx="10.4547" transform="rotate(90 20.916 25.0918)" fill="black"/>
                </svg>                
                `,
            },
            i18n: {
                type: 'Object',
                description: 'Specify all the UI text that can be translated',
                default: {
                    // Scope selector
                    scopeSelectorTitle: __i18n('Scope', {
                        id: 's-carpenter.scope.selector.title',
                    }),
                    scopeSelectorLabel: __i18n('Select a scope', {
                        id: 's-carpenter.scope.selector.label',
                    }),
                    scopeSelectorButton: __i18n('Validate', {
                        id: 's-carpenter.scope.selector.button',
                    }),

                    // New page
                    newPageTitle: __i18n('New page', {
                        id: 's-carpenter.page.new.title',
                    }),
                    newPageNameLabel: __i18n('Enter a valid page name', {
                        id: 's-carpenter.page.new.nameLabel',
                    }),
                    newPageNamePlaceholder: __i18n('Homepage', {
                        id: 's-carpenter.page.new.namePlaceholder',
                    }),
                    newPageSlugLabel: __i18n('Enter a valid page slug', {
                        id: 's-carpenter.page.new.slugLabel',
                    }),
                    newPageSlugPlaceholder: __i18n('/homepage', {
                        id: 's-carpenter.page.new.slugPlaceholder',
                    }),
                    newPageUidLabel: __i18n('Enter a valid page uid', {
                        id: 's-carpenter.page.new.uidLabel',
                    }),
                    newPageUidPlaceholder: __i18n('homepage', {
                        id: 's-carpenter.page.new.namePlaceholder',
                    }),
                    newPageButton: __i18n('Create the page', {
                        id: 's-carpenter.page.new.button',
                    }),
                    newPageUidError: __i18n(
                        'The uid must contains only these characters [a-z0-9-]',
                        {
                            id: 's-carpenter.page.new.uiError',
                        },
                    ),

                    addComponent: __i18n('Add a component', {
                        id: 's-carpenter.components.add',
                    }),
                    modeInsert: __i18n('Insert', {
                        id: 's-carpenter.mode.insert',
                    }),
                    modeEdit: __i18n('Edit', {
                        id: 's-carpenter.mode.edit',
                    }),
                    modeToggle: __i18n('%s to toggle modes', {
                        id: 's-carpenter.mode.insert',
                        tokens: {
                            '%s': `<span style="font-weight: bold">ctrl+i</span>`,
                        },
                    }),
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons html to be used across the UI',
                default: {
                    menu: '<i class="fa-solid fa-ellipsis"></i>',
                    component: '<i class="fa-solid fa-puzzle-piece"></i>',
                    delete: '<i class="fa-regular fa-trash-can"></i>',
                    edit: '<i class="fa-regular fa-pen-to-square"></i>',
                    save: '<i class="fa-solid fa-floppy-disk"></i>',
                    add: '<i class="fa-solid fa-plus"></i>',
                    page: '<i class="fa-regular fa-file"></i>',
                    mobile: '<i class="fa-solid fa-mobile-screen-button"></i>',
                    tablet: '<i class="fa-solid fa-tablet-screen-button"></i>',
                    desktop: '<i class="fa-solid fa-desktop"></i>',
                    wide: '<i class="fa-solid fa-arrows-left-right"></i>',
                    folderOpen: '<i class="fa-regular fa-folder-open"></i>',
                    folderClose: '<i class="fa-solid fa-folder"></i>',
                },
            },
        };
    }
}
