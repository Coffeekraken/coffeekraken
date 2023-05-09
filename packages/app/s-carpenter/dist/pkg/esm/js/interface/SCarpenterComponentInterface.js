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
                    // New node
                    newNodeTitle: __i18n('New node', {
                        id: 's-carpenter.node.new.title',
                    }),
                    newNodeDescription: __i18n('Please enter a uid (unique id) for your node. This is important for you to find your node later...', {
                        id: 's-carpenter.node.new.title',
                    }),
                    newNodeUidLabel: __i18n('Enter a valid node uid', {
                        id: 's-carpenter.node.new.uidLabel',
                    }),
                    newNodeUidPlaceholder: __i18n('contact', {
                        id: 's-carpenter.node.new.namePlaceholder',
                    }),
                    newNodeButton: __i18n('Add my node', {
                        id: 's-carpenter.node.new.button',
                    }),
                    newNodeUidAlreadyTaken: __i18n('This uid is already taken', {
                        id: 's-carpenter.page.new.uidAlreadyTaken',
                    }),
                    newNodeUidRequired: __i18n('You must provide a valid uid to proceed', {
                        id: 's-carpenter.page.new.uidRequired',
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
                            '%s': `<span style="font-weight: bold">CTRL+i</span>`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sNEJBQTZCLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFdBQVcsRUFDUCx1VkFBdVY7Z0JBQzNWLE9BQU8sRUFBRSxhQUFhO2FBQ3pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxnS0FBZ0s7Z0JBQ3BLLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxZQUFZO2FBQ25EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyRkFBMkY7Z0JBQy9GLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpR0FBaUc7Z0JBQ3JHLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsb0JBQW9CO29CQUMzQixLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixNQUFNLEVBQUUsY0FBYztvQkFDdEIsVUFBVSxFQUFFLGtCQUFrQjtpQkFDakM7YUFDSjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsbUlBQW1JO2dCQUN2SSxPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsaUpBQWlKO2dCQUNySixPQUFPLEVBQUUsbUJBQW1CO2FBQy9CO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxtVkFBbVY7Z0JBQ3ZWLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsS0FBSztvQkFDWixNQUFNLEVBQUUsSUFBSTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsSUFBSTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsSUFBSTtvQkFDWixPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxhQUFhLEVBQUUsSUFBSTtvQkFDbkIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsR0FBRyxFQUFFLElBQUk7aUJBQ1o7YUFDSjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFBRSxNQUFNO3dCQUNaLFdBQVcsRUFDUCwyRkFBMkY7cUJBQ2xHO29CQUNELFFBQVEsRUFBRTt3QkFDTixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsV0FBVyxFQUFFLHNDQUFzQztxQkFDdEQ7b0JBQ0QsVUFBVSxFQUFFO3dCQUNSLElBQUksRUFBRSxZQUFZO3dCQUNsQixXQUFXLEVBQ1AseUVBQXlFO3FCQUNoRjtpQkFDSjthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDakM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFdBQVcsRUFBRSwyQkFBMkI7Z0JBQ3hDLE9BQU8sRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ2xEO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLE9BQU8sRUFBRTs7Ozs7aUJBS1I7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixrQkFBa0IsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNoQyxFQUFFLEVBQUUsa0NBQWtDO3FCQUN6QyxDQUFDO29CQUNGLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDekMsRUFBRSxFQUFFLGtDQUFrQztxQkFDekMsQ0FBQztvQkFDRixtQkFBbUIsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUNwQyxFQUFFLEVBQUUsbUNBQW1DO3FCQUMxQyxDQUFDO29CQUVGLFdBQVc7b0JBQ1gsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7d0JBQzdCLEVBQUUsRUFBRSw0QkFBNEI7cUJBQ25DLENBQUM7b0JBQ0Ysa0JBQWtCLEVBQUUsTUFBTSxDQUN0QixvR0FBb0csRUFDcEc7d0JBQ0ksRUFBRSxFQUFFLDRCQUE0QjtxQkFDbkMsQ0FDSjtvQkFDRCxlQUFlLEVBQUUsTUFBTSxDQUFDLHdCQUF3QixFQUFFO3dCQUM5QyxFQUFFLEVBQUUsK0JBQStCO3FCQUN0QyxDQUFDO29CQUNGLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7d0JBQ3JDLEVBQUUsRUFBRSxzQ0FBc0M7cUJBQzdDLENBQUM7b0JBQ0YsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7d0JBQ2pDLEVBQUUsRUFBRSw2QkFBNkI7cUJBQ3BDLENBQUM7b0JBQ0Ysc0JBQXNCLEVBQUUsTUFBTSxDQUMxQiwyQkFBMkIsRUFDM0I7d0JBQ0ksRUFBRSxFQUFFLHNDQUFzQztxQkFDN0MsQ0FDSjtvQkFDRCxrQkFBa0IsRUFBRSxNQUFNLENBQ3RCLHlDQUF5QyxFQUN6Qzt3QkFDSSxFQUFFLEVBQUUsa0NBQWtDO3FCQUN6QyxDQUNKO29CQUVELFdBQVc7b0JBQ1gsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7d0JBQzdCLEVBQUUsRUFBRSw0QkFBNEI7cUJBQ25DLENBQUM7b0JBQ0YsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QixFQUFFO3dCQUNoRCxFQUFFLEVBQUUsZ0NBQWdDO3FCQUN2QyxDQUFDO29CQUNGLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7d0JBQ3ZDLEVBQUUsRUFBRSxzQ0FBc0M7cUJBQzdDLENBQUM7b0JBQ0YsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QixFQUFFO3dCQUNoRCxFQUFFLEVBQUUsZ0NBQWdDO3FCQUN2QyxDQUFDO29CQUNGLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUU7d0JBQ3hDLEVBQUUsRUFBRSxzQ0FBc0M7cUJBQzdDLENBQUM7b0JBQ0YsZUFBZSxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRTt3QkFDOUMsRUFBRSxFQUFFLCtCQUErQjtxQkFDdEMsQ0FBQztvQkFDRixxQkFBcUIsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUN0QyxFQUFFLEVBQUUsc0NBQXNDO3FCQUM3QyxDQUFDO29CQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3JDLEVBQUUsRUFBRSw2QkFBNkI7cUJBQ3BDLENBQUM7b0JBQ0YsZUFBZSxFQUFFLE1BQU0sQ0FDbkIsdURBQXVELEVBQ3ZEO3dCQUNJLEVBQUUsRUFBRSw4QkFBOEI7cUJBQ3JDLENBQ0o7b0JBRUQsWUFBWSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTt3QkFDcEMsRUFBRSxFQUFFLDRCQUE0QjtxQkFDbkMsQ0FBQztvQkFDRixVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTt3QkFDekIsRUFBRSxFQUFFLHlCQUF5QjtxQkFDaEMsQ0FBQztvQkFDRixRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDckIsRUFBRSxFQUFFLHVCQUF1QjtxQkFDOUIsQ0FBQztvQkFDRixVQUFVLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixFQUFFO3dCQUNyQyxFQUFFLEVBQUUseUJBQXlCO3dCQUM3QixNQUFNLEVBQUU7NEJBQ0osSUFBSSxFQUFFLCtDQUErQzt5QkFDeEQ7cUJBQ0osQ0FBQztpQkFDTDthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsc0NBQXNDO29CQUM1QyxTQUFTLEVBQUUsMENBQTBDO29CQUNyRCxNQUFNLEVBQUUseUNBQXlDO29CQUNqRCxJQUFJLEVBQUUsNkNBQTZDO29CQUNuRCxJQUFJLEVBQUUseUNBQXlDO29CQUMvQyxHQUFHLEVBQUUsa0NBQWtDO29CQUN2QyxJQUFJLEVBQUUsb0NBQW9DO29CQUMxQyxNQUFNLEVBQUUsa0RBQWtEO29CQUMxRCxNQUFNLEVBQUUsa0RBQWtEO29CQUMxRCxPQUFPLEVBQUUscUNBQXFDO29CQUM5QyxJQUFJLEVBQUUsK0NBQStDO29CQUNyRCxVQUFVLEVBQUUsMkNBQTJDO29CQUN2RCxXQUFXLEVBQUUsb0NBQW9DO2lCQUNwRDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9