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
            categories: {
                type: 'Object',
                description: 'Specify the categories metas like title and description',
                default: {
                    bare: {
                        name: 'Bare',
                        description: 'All the components that are helpful the the page structure like layout, container, etc...',
                    },
                    sections: {
                        name: 'Sections',
                        description: 'All the available pre-build sections',
                    },
                    components: {
                        name: 'Components',
                        description: 'All the available components that you can use to create custom sections',
                    },
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
                    // New node
                    newNodeTitle: (0, s_i18n_1.__i18n)('New node', {
                        id: 's-carpenter.node.new.title',
                    }),
                    newNodeDescription: (0, s_i18n_1.__i18n)('Please enter a uid (unique id) for your node. This is important for you to find your node later...', {
                        id: 's-carpenter.node.new.title',
                    }),
                    newNodeUidLabel: (0, s_i18n_1.__i18n)('Enter a valid node uid', {
                        id: 's-carpenter.node.new.uidLabel',
                    }),
                    newNodeUidPlaceholder: (0, s_i18n_1.__i18n)('contact', {
                        id: 's-carpenter.node.new.namePlaceholder',
                    }),
                    newNodeButton: (0, s_i18n_1.__i18n)('Add my node', {
                        id: 's-carpenter.node.new.button',
                    }),
                    newNodeUidAlreadyTaken: (0, s_i18n_1.__i18n)('This uid is already taken', {
                        id: 's-carpenter.page.new.uidAlreadyTaken',
                    }),
                    newNodeUidRequired: (0, s_i18n_1.__i18n)('You must provide a valid uid to proceed', {
                        id: 's-carpenter.page.new.uidRequired',
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
                            '%s': `<span style="font-weight: bold">CTRL+i</span>`,
                        },
                    }),
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons html to be used across the UI',
                default: {
                    insert: '<i class="fa-solid fa-plus"></i>',
                    move: '<i class="fa-solid fa-up-down-left-right"></i>',
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