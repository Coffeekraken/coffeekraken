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
                        icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_867_4887)">
                        <rect x="2" y="2" width="14" height="14" rx="4" stroke="black" stroke-width="4"/>
                        <rect x="2" y="48" width="37" height="14" rx="4" stroke="black" stroke-width="4"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 29V35C4 36.1046 4.89543 37 6 37H58C59.1046 37 60 36.1046 60 35V29C60 27.8954 59.1046 27 58 27H6C4.89543 27 4 27.8954 4 29ZM0 29C0 25.6863 2.68629 23 6 23H58C61.3137 23 64 25.6863 64 29V35C64 38.3137 61.3137 41 58 41H6C2.68629 41 0 38.3137 0 35V29Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 29V35C4 36.1046 4.89543 37 6 37H57.9999C59.1045 37 59.9999 36.1046 59.9999 35V29C59.9999 27.8954 59.1045 27 57.9999 27H6C4.89543 27 4 27.8954 4 29ZM0 29C0 25.6863 2.68629 23 6 23H57.9999C61.3136 23 63.9999 25.6863 63.9999 29V35C63.9999 38.3137 61.3136 41 57.9999 41H6C2.68629 41 0 38.3137 0 35V29Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27 6V12C27 13.1046 27.8954 14 29 14H58C59.1046 14 60 13.1046 60 12V6C60 4.89543 59.1046 4 58 4H29C27.8954 4 27 4.89543 27 6ZM23 6C23 2.68629 25.6863 0 29 0H58C61.3137 0 64 2.68629 64 6V12C64 15.3137 61.3137 18 58 18H29C25.6863 18 23 15.3137 23 12V6Z" fill="black"/>
                        <path d="M52 48H58C60.2091 48 62 49.7909 62 52V58C62 60.2091 60.2091 62 58 62H52C49.7909 62 48 60.2091 48 58V52C48 49.7909 49.7909 48 52 48Z" stroke="black" stroke-width="4"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_867_4887">
                        <rect width="64" height="64" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        `,
                    },
                    sections: {
                        name: 'Sections',
                        description: 'All the available pre-build sections',
                        icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2654_4067)">
                        <rect y="23" width="58" height="4" rx="2" fill="black"/>
                        <rect y="30" width="53" height="4" rx="2" fill="black"/>
                        <rect y="37" width="64" height="4" rx="2" fill="black"/>
                        <rect y="44" width="57" height="4" rx="2" fill="black"/>
                        <rect y="51" width="14" height="4" rx="2" fill="black"/>
                        <rect x="17" y="51" width="22" height="4" rx="2" fill="black"/>
                        <path d="M7.05078 8.21289L3.18359 20H0.0683594L5.35156 5.78125H7.33398L7.05078 8.21289ZM10.2637 20L6.38672 8.21289L6.07422 5.78125H8.07617L13.3887 20H10.2637ZM10.0879 14.707V17.002H2.57812V14.707H10.0879Z" fill="black"/>
                        <path d="M20.2344 17.6172V12.9102C20.2344 12.5716 20.179 12.2819 20.0684 12.041C19.9577 11.7936 19.7852 11.6016 19.5508 11.4648C19.3229 11.3281 19.0267 11.2598 18.6621 11.2598C18.3496 11.2598 18.0794 11.3151 17.8516 11.4258C17.6237 11.5299 17.4479 11.6829 17.3242 11.8848C17.2005 12.0801 17.1387 12.3112 17.1387 12.5781H14.3262C14.3262 12.1289 14.4303 11.7025 14.6387 11.2988C14.847 10.8952 15.1497 10.5404 15.5469 10.2344C15.944 9.92188 16.416 9.67773 16.9629 9.50195C17.5163 9.32617 18.1348 9.23828 18.8184 9.23828C19.6387 9.23828 20.3678 9.375 21.0059 9.64844C21.6439 9.92188 22.1452 10.332 22.5098 10.8789C22.8809 11.4258 23.0664 12.1094 23.0664 12.9297V17.4512C23.0664 18.0306 23.1022 18.5059 23.1738 18.877C23.2454 19.2415 23.3496 19.5605 23.4863 19.834V20H20.6445C20.5078 19.7135 20.4036 19.3555 20.332 18.9258C20.2669 18.4896 20.2344 18.0534 20.2344 17.6172ZM20.6055 13.5645L20.625 15.1562H19.0527C18.6816 15.1562 18.3594 15.1986 18.0859 15.2832C17.8125 15.3678 17.5879 15.4883 17.4121 15.6445C17.2363 15.7943 17.1061 15.9701 17.0215 16.1719C16.9434 16.3737 16.9043 16.5951 16.9043 16.8359C16.9043 17.0768 16.9596 17.2949 17.0703 17.4902C17.181 17.679 17.3405 17.8288 17.5488 17.9395C17.7572 18.0436 18.0013 18.0957 18.2812 18.0957C18.7044 18.0957 19.0723 18.0111 19.3848 17.8418C19.6973 17.6725 19.9382 17.4642 20.1074 17.2168C20.2832 16.9694 20.3743 16.735 20.3809 16.5137L21.123 17.7051C21.0189 17.972 20.8757 18.2487 20.6934 18.5352C20.5176 18.8216 20.293 19.0918 20.0195 19.3457C19.7461 19.5931 19.4173 19.7982 19.0332 19.9609C18.6491 20.1172 18.1934 20.1953 17.666 20.1953C16.9954 20.1953 16.3867 20.0618 15.8398 19.7949C15.2995 19.5215 14.8698 19.1471 14.5508 18.6719C14.2383 18.1901 14.082 17.6432 14.082 17.0312C14.082 16.4779 14.1862 15.9863 14.3945 15.5566C14.6029 15.127 14.9089 14.7656 15.3125 14.4727C15.7227 14.1732 16.2337 13.9486 16.8457 13.7988C17.4577 13.6426 18.1673 13.5645 18.9746 13.5645H20.6055Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2654_4067">
                        <rect width="64" height="64" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        `,
                    },
                    components: {
                        name: 'Components',
                        description: 'All the available components that you can use to create custom sections',
                        icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0775 32.1213L13.4507 38.2659C13.0425 38.6444 12.8105 39.1758 12.8105 39.7325V41.8903C12.8105 42.9949 13.706 43.8903 14.8105 43.8903H48.1796C49.2842 43.8903 50.1796 42.9949 50.1796 41.8903V33.4136C50.1796 32.8748 49.9622 32.3587 49.5766 31.9824L40.4088 23.0343C39.6319 22.276 38.3918 22.276 37.6149 23.0343L27.0218 33.3735C26.274 34.1034 25.0901 34.1345 24.305 33.4448L22.7573 32.0853C21.9869 31.4085 20.8294 31.4241 20.0775 32.1213Z" stroke="black" stroke-width="3"/>
                        <circle cx="16.8507" cy="22.6808" r="3.79987" stroke="black" stroke-width="2.5"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14V49C5 50.1046 5.89543 51 7 51H57C58.1046 51 59 50.1046 59 49V14C59 12.8954 58.1046 12 57 12H7C5.89543 12 5 12.8954 5 14ZM1 14C1 10.6863 3.68629 8 7 8H57C60.3137 8 63 10.6863 63 14V49C63 52.3137 60.3137 55 57 55H7C3.68629 55 1 52.3137 1 49V14Z" fill="black"/>
                        </svg>
                        
                        `,
                    },
                },
            },
            noPreviewIcon: {
                type: 'String',
                title: 'No preview icon',
                description: 'Specify an svg icon to be used when no preview is available for a particular "spec"',
                default: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2654_4137)">
                <path d="M5.63803 8.4781C4.66303 7.70935 3.2474 7.88748 2.47865 8.86248C1.7099 9.83748 1.88803 11.2531 2.86303 12.0219L58.363 55.5219C59.338 56.2906 60.7537 56.1125 61.5224 55.1375C62.2912 54.1625 62.113 52.7469 61.138 51.9781L51.2755 44.2531C54.988 40.4469 57.5005 36.1812 58.7662 33.1531C59.0755 32.4125 59.0755 31.5875 58.7662 30.8469C57.3693 27.5 54.4349 22.625 50.0474 18.5562C45.6412 14.45 39.5755 11 32.0005 11C25.6068 11 20.2818 13.4656 16.1287 16.7L5.63803 8.4781ZM19.7943 19.5687C23.188 17.1594 27.2662 15.5 32.0005 15.5C38.113 15.5 43.138 18.275 46.9912 21.8469C50.6005 25.2031 53.0943 29.1875 54.3693 32C53.188 34.625 50.938 38.2625 47.7224 41.4594L42.6787 37.5031C43.5318 35.8531 44.0099 33.9875 44.0099 32C44.0099 25.3719 38.638 20 32.0099 20C28.9912 20 26.2255 21.1156 24.1162 22.9531L19.7943 19.5687ZM39.0224 34.6437L31.3818 28.6531C31.7755 27.8562 32.0005 26.9469 32.0005 26C32.0005 25.4844 31.9349 24.9781 31.813 24.5C31.8787 24.5 31.9349 24.5 32.0005 24.5C36.1443 24.5 39.5005 27.8562 39.5005 32C39.5005 32.9281 39.3318 33.8187 39.0224 34.6437ZM39.9037 46.8594C37.513 47.8812 34.8787 48.5 32.0005 48.5C25.888 48.5 20.863 45.725 17.0099 42.1531C13.4005 38.7969 10.9068 34.8125 9.63178 32C10.4099 30.275 11.6474 28.1094 13.3255 25.925L9.79115 23.1406C7.65365 25.925 6.12553 28.7 5.2349 30.8469C4.92553 31.5875 4.92553 32.4125 5.2349 33.1531C6.63178 36.5 9.56615 41.375 13.9537 45.4437C18.3599 49.55 24.4255 53 32.0005 53C36.4818 53 40.4287 51.7906 43.8318 49.9531L39.9037 46.8594ZM20.0005 32C20.0005 38.6281 25.3724 44 32.0005 44C33.2474 44 34.4474 43.8125 35.5818 43.4562L30.313 39.3125C28.1099 38.8062 26.2724 37.325 25.2787 35.3469L20.0193 31.2031C20.0005 31.4656 19.9912 31.7281 19.9912 32H20.0005Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_2654_4137">
                <rect width="60" height="48" fill="white" transform="translate(2 8)"/>
                </clipPath>
                </defs>
                </svg>
                `,
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
                    // unsaved changes
                    unsavedConfirmation: (0, s_i18n_1.__i18n)("Their's some unsaved changes... Would you like to exit?", {
                        id: 's-carpenter.confirmation.unsaved',
                    }),
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