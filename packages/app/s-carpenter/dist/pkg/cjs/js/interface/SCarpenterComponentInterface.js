"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SCarpenterComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            src: {
                type: 'String',
                description: 'Specify the url where to load the actual Carpenter script',
                default: '/dist/js/carpenter.ts',
                required: true,
            },
            window: {
                type: 'Object',
                description: 'Specify the window in which the carpenter will work',
                default: window,
                required: true,
            },
            viewportElm: {
                type: 'String|HTMLElement',
                description: 'Specify the "viewport" element (or a css selector) that will be resized in your website when editing with carpenter. This will be used ONLY if you make use of container queries in your codebase instead of the plain old media queries. When using media queries, the editor will wrap your website into an iframe and resitze this iframe instead.',
                default: '.s-viewport',
            },
            autoInit: {
                type: 'Boolean',
                description: 'Specify if you want the editor to be automatically inited when adding the "s-carpenter" component. If not, the user will have to click on a "Carpenter" button',
                default: document.location.hash === '#carpenter',
            },
            escape: {
                type: 'Boolean',
                description: 'Specify if you want to enable the "escape" key to exit the editor',
                default: false,
            },
            autoEdit: {
                type: 'Boolean',
                description: 'Specify if you want the editor to automatically open the first editable found in the HTML',
                default: false,
            },
            endpoints: {
                type: 'Object',
                description: "Specify the differents URL's that can be called to retreive the infos like specs, nodes, etc...",
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
                description: 'Specify the adapter to use in order to apply the updated properties on a component/section/etc... Must be a registered adapter id',
                default: 'ajax',
                required: true,
            },
            sidebar: {
                type: 'Boolean',
                description: 'Specify if you want the left sidebar to jump across all the components/sections/etc...',
                default: false,
            },
            pagesUrl: {
                type: 'String',
                description: 'Specify the link to use to change page. You have access to the %specs token that will be replaced by the actual component/section specs dotpath',
                default: '/carpenter/%specs',
            },
            features: {
                type: 'Object',
                description: 'Specify which features you want in your carpenter editor. Available features are: "save", "delete", "upload", "nav" and "media". Note that these features can be specified also in the "carpenter.json" usually returned by the server. These will be propritary on the ones you specified here cause the server may not support "upload", etc...',
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
                default: s_frontspec_1.default.get('.'),
            },
            defaultMedia: {
                type: 'String',
                title: 'Default media',
                description: 'Specify the default media',
                default: s_frontspec_1.default.get('media.defaultMedia'),
            },
            ghostSpecs: {
                type: 'Boolean',
                description: 'Specify if you want to display the specs that are marked as `"ghost":true` or not.',
                default: false,
            },
            logo: {
                type: 'String',
                description: 'Specify an image to be used as logo on top left of the interface',
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
                    scopeSelectorTitle: (0, s_i18n_1.__i18n)('Scope', {
                        id: 's-carpenter.scope.selector.title',
                    }),
                    scopeSelectorLabel: (0, s_i18n_1.__i18n)('Select a scope', {
                        id: 's-carpenter.scope.selector.label',
                    }),
                    scopeSelectorButton: (0, s_i18n_1.__i18n)('Validate', {
                        id: 's-carpenter.scope.selector.button',
                    }),
                    // New page
                    newPageTitle: (0, s_i18n_1.__i18n)('New page', {
                        id: 's-carpenter.page.new.title',
                    }),
                    newPageNameLabel: (0, s_i18n_1.__i18n)('Enter a valid page name', {
                        id: 's-carpenter.page.new.nameLabel',
                    }),
                    newPageNamePlaceholder: (0, s_i18n_1.__i18n)('Homepage', {
                        id: 's-carpenter.page.new.namePlaceholder',
                    }),
                    newPageSlugLabel: (0, s_i18n_1.__i18n)('Enter a valid page slug', {
                        id: 's-carpenter.page.new.slugLabel',
                    }),
                    newPageSlugPlaceholder: (0, s_i18n_1.__i18n)('/homepage', {
                        id: 's-carpenter.page.new.slugPlaceholder',
                    }),
                    newPageUidLabel: (0, s_i18n_1.__i18n)('Enter a valid page uid', {
                        id: 's-carpenter.page.new.uidLabel',
                    }),
                    newPageUidPlaceholder: (0, s_i18n_1.__i18n)('homepage', {
                        id: 's-carpenter.page.new.namePlaceholder',
                    }),
                    newPageButton: (0, s_i18n_1.__i18n)('Create the page', {
                        id: 's-carpenter.page.new.button',
                    }),
                    newPageUidError: (0, s_i18n_1.__i18n)('The uid must contains only these characters [a-z0-9-]', {
                        id: 's-carpenter.page.new.uiError',
                    }),
                    addComponent: (0, s_i18n_1.__i18n)('Add a component', {
                        id: 's-carpenter.components.add',
                    }),
                    modeInsert: (0, s_i18n_1.__i18n)('Insert', {
                        id: 's-carpenter.mode.insert',
                    }),
                    modeEdit: (0, s_i18n_1.__i18n)('Edit', {
                        id: 's-carpenter.mode.edit',
                    }),
                    modeToggle: (0, s_i18n_1.__i18n)('%s to toggle modes', {
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
exports.default = SCarpenterComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGlEQUE4QztBQUM5Qyw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFxQiw0QkFBNkIsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFdBQVcsRUFDUCx1VkFBdVY7Z0JBQzNWLE9BQU8sRUFBRSxhQUFhO2FBQ3pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxnS0FBZ0s7Z0JBQ3BLLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxZQUFZO2FBQ25EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyRkFBMkY7Z0JBQy9GLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpR0FBaUc7Z0JBQ3JHLE9BQU8sRUFB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