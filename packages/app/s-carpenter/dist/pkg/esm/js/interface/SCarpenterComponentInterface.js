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
                    newPageUidError: __i18n('The uid must contains only these characters [a-z0-9-]', {
                        id: 's-carpenter.page.new.uiError',
                    }),
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
                    menu: '<i class="fa-solid fa-bars"></i>',
                    component: '<i class="fa-solid fa-puzzle-piece"></i>',
                    delete: '<i class="fa-regular fa-trash-can"></i>',
                    edit: '<i class="fa-regular fa-pen-to-square"></i>',
                    save: '<i class="fa-solid fa-floppy-disk"></i>',
                    add: '<i class="fa-solid fa-plus"></i>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sNEJBQTZCLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFdBQVcsRUFDUCx1VkFBdVY7Z0JBQzNWLE9BQU8sRUFBRSxhQUFhO2FBQ3pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxnS0FBZ0s7Z0JBQ3BLLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxZQUFZO2FBQ25EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyRkFBMkY7Z0JBQy9GLE9BQU8sRUFBRSxLQUFLO2FB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