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
            data: {
                type: 'String|Object',
                description:
                    'Specify a url from where to get the carpenter data back, directly the JSON data or a simple id pointing to a HTMLTemplate tag that host the JSON data',
                default: '/carpenter.json',
                required: true,
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
            pagesLink: {
                type: 'String',
                description:
                    'Specify the link to use to change page. You have access to the %dotpath token that will be replaced by the actual component/section specs dotpath',
                default: '/carpenter/%dotpath',
            },
            features: {
                type: 'Object',
                description:
                    'Specify which features you want in your carpenter editor. Available features are: "save", "delete", "upload", "nav" and "media". Note that these features can be specified also in the "carpenter.json" usually returned by the server. These will be propritary on the ones you specified here cause the server may not support "upload", etc...',
                default: {
                    save: true,
                    delete: true,
                    upload: true,
                    nav: true,
                    media: true,
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
                default: `<svg width="315" height="59" viewBox="0 0 315 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <path d="M90.6797 5.5957V0.732422H96.3047V14.8828H90.5625C89.1172 12.0508 88.1348 9.84375 85.6152 8.26172C83.0957 6.67969 81.332 5.88867 78.3242 5.88867C75.4141 5.88867 72.8164 6.66016 70.5312 8.20312C68.2461 9.72656 66.459 11.7773 65.1699 14.3555C63.9004 16.9141 63.2656 19.668 63.2656 22.6172C63.2656 25.6641 63.9297 28.4766 65.2578 31.0547C66.6055 33.6328 68.4512 35.6934 70.7949 37.2363C73.1387 38.7793 75.7461 39.5508 78.6172 39.5508C82.1523 39.5508 85.2773 38.4766 87.9922 36.3281C90.707 34.1602 92.6895 31.0938 93.9395 27.1289L99.5645 30.1172C98.041 35.0391 95.3457 38.8574 91.4785 41.5723C87.6309 44.2676 83.1094 45.6152 77.9141 45.6152C73.6367 45.6152 69.8379 44.5996 66.5176 42.5684C63.1973 40.5176 60.6094 37.7734 58.7539 34.3359C56.918 30.8789 56 27.0898 56 22.9688C56 18.4961 56.9375 14.5117 58.8125 11.0156C60.707 7.51953 63.3145 4.81445 66.6348 2.90039C69.9551 0.966797 73.7539 0 78.0312 0C80.9023 0 82.5488 0.478516 84.9707 1.43555C87.3926 2.39258 88.6289 3.7793 90.6797 5.5957Z" fill="black"/>
                <path d="M121.459 24.9609V39.4922H126.615V44.8828H116.127V41.1035C113.197 43.9746 109.936 45.4102 106.342 45.4102C104.447 45.4102 102.709 44.9707 101.127 44.0918C99.5645 43.2129 98.3047 42.041 97.3477 40.5762C96.4102 39.0918 95.9414 37.4512 95.9414 35.6543C95.9414 33.7207 96.459 32.002 97.4941 30.498C98.5488 28.9746 99.9648 27.8027 101.742 26.9824C103.52 26.1621 105.307 25.752 107.104 25.752C110.111 25.752 112.914 26.6309 115.512 28.3887V25.0781C115.512 22.6758 115.004 20.957 113.988 19.9219C112.973 18.8867 111.303 18.3691 108.979 18.3691C107.338 18.3691 105.961 18.6719 104.848 19.2773C103.754 19.8633 102.846 20.7617 102.123 21.9727L96.3223 20.5371C97.6309 18.0957 99.3984 16.2793 101.625 15.0879C103.852 13.877 106.498 13.2715 109.564 13.2715C113.686 13.2715 116.693 14.209 118.588 16.084C120.502 17.959 121.459 20.918 121.459 24.9609ZM107.162 40.752C110.131 40.752 112.914 39.5117 115.512 37.0312V33.4277C112.875 31.377 110.238 30.3516 107.602 30.3516C106 30.3516 104.613 30.8594 103.441 31.875C102.289 32.8711 101.713 34.1309 101.713 35.6543C101.713 37.1191 102.221 38.3398 103.236 39.3164C104.252 40.2734 105.561 40.752 107.162 40.752Z" fill="black"/>
                <path d="M136.402 32.5195V39.4922H143.111V44.8828H124.215V39.4922H130.396V19.5117H124.215V14.0918H135.201V21.0645C136.432 18.3105 137.955 16.3965 139.771 15.3223C141.607 14.2285 144.225 13.6816 147.623 13.6816H149V19.8047H147.682C144.4 19.8047 141.959 20.2344 140.357 21.0938C138.756 21.9531 137.691 23.252 137.164 24.9902C136.656 26.7285 136.402 29.2383 136.402 32.5195Z" fill="black"/>
                <path d="M180 29.6484C180 32.5195 179.336 35.2051 178.008 37.7051C176.68 40.2051 174.863 42.1777 172.559 43.623C170.273 45.0684 167.734 45.791 164.941 45.791C160.82 45.791 157.217 44.209 154.131 41.0449V53.291H160.137V58.6816H142.5V53.291H148.066V19.5117L143 19.8828L147.682 13.6816H154.131V19.0137C155.654 17.2168 157.334 15.8789 159.17 15C161.006 14.1211 162.969 13.6816 165.059 13.6816C167.969 13.6816 170.557 14.4043 172.822 15.8496C175.088 17.2754 176.846 19.209 178.096 21.6504C179.365 24.0918 180 26.7578 180 29.6484ZM164.854 40.2539C166.533 40.2539 168.047 39.7656 169.395 38.7891C170.742 37.8125 171.797 36.4844 172.559 34.8047C173.32 33.125 173.701 31.3477 173.701 29.4727C173.701 27.5781 173.281 25.8398 172.441 24.2578C171.602 22.6562 170.449 21.3867 168.984 20.4492C167.52 19.4922 165.869 19.0137 164.033 19.0137C162.119 19.0137 160.4 19.5215 158.877 20.5371C157.354 21.5332 156.172 22.8613 155.332 24.5215C154.492 26.1816 154.072 28.0078 154.072 30C154.072 33.2031 155.078 35.7129 157.09 37.5293C159.121 39.3457 161.709 40.2539 164.854 40.2539Z" fill="black"/>
                <path d="M209.5 31.0254H183.689C184.061 33.9746 185.203 36.3086 187.117 38.0273C189.031 39.7266 191.375 40.5762 194.148 40.5762C196.18 40.5762 198.064 40.1562 199.803 39.3164C201.541 38.4766 201 38.9355 202.879 37.5293L209.5 39.4922C207.82 42.1094 205.613 42.4512 202.879 43.7988C200.164 45.127 197.205 45.791 194.002 45.791C190.682 45.791 187.732 45.0977 185.154 43.7109C182.576 42.3242 180.564 40.3906 179.119 37.9102C177.693 35.4297 176.98 32.6367 176.98 29.5312C176.98 26.4453 177.684 23.6621 179.09 21.1816C180.516 18.7012 182.459 16.7676 184.92 15.3809C187.381 13.9746 190.096 13.2715 193.064 13.2715C196.307 13.2715 199.129 13.9941 201.531 15.4395C203.953 16.8652 205.857 18.916 207.244 21.5918C208.631 24.248 209.383 27.3926 209.5 31.0254ZM193.182 18.3105C190.896 18.3105 188.895 19.082 187.176 20.625C185.457 22.1484 184.354 24.1699 183.865 26.6895H203.143C202.576 24.1699 201.375 22.1484 199.539 20.625C197.703 19.082 195.584 18.3105 193.182 18.3105Z" fill="black"/>
                <path d="M237.844 24.1699V39.4922H243V44.8828H231.779V24.5508C231.779 22.6172 231.496 21.2305 230.93 20.3906C230.383 19.5508 229.475 19.1309 228.205 19.1309C225.51 19.1309 222.482 20.459 219.123 23.1152V39.4922H224.426V44.8828L194.148 45.7906L207.727 39.4922H213.146V19.5117H207.727V14.0918H219.123V17.8125C222.893 15.0586 226.438 13.6816 229.758 13.6816C232.512 13.6816 234.543 14.5312 235.852 16.2305C237.18 17.9297 237.844 20.5762 237.844 24.1699Z" fill="black"/>
                <path d="M257.203 14.0918V19.5117H251.578V35.6543C251.578 37.334 251.754 38.4277 252.105 38.9355C252.477 39.4238 253.102 39.668 253.98 39.668C255.055 39.668 260.426 39.8633 261.5 39.4922L274.021 45.791C271.4 45.791 253.814 45.4102 252.662 45.4102C250.123 45.4102 248.297 44.7754 247.184 43.5059C246.07 42.2168 245.514 40.0195 245.514 36.9141V19.5117H236L229.758 13.6816L245.514 14.0918V9.43359L251.578 3.89648V14.0918H257.203Z" fill="black"/>
                <path d="M289.52 31.0254H263.709C264.08 33.9746 265.223 36.3086 267.137 38.0273C269.051 39.7266 271.395 40.5762 274.168 40.5762C276.199 40.5762 278.084 40.1562 279.822 39.3164C281.561 38.4766 283.016 37.1875 284.188 35.4492L289.52 37.8516C287.84 40.4688 285.633 42.4512 282.898 43.7988C280.184 45.127 277.225 45.791 274.021 45.791C270.701 45.791 267.752 45.0977 265.174 43.7109C262.596 42.3242 260.584 40.3906 259.139 37.9102C257.713 35.4297 257 32.6367 257 29.5312C257 26.4453 257.703 23.6621 259.109 21.1816C260.535 18.7012 262.479 16.7676 264.939 15.3809C267.4 13.9746 270.115 13.2715 273.084 13.2715C276.326 13.2715 279.148 13.9941 281.551 15.4395C283.973 16.8652 285.877 18.916 287.264 21.5918C288.65 24.248 289.402 27.3926 289.52 31.0254ZM273.201 18.3105C270.916 18.3105 268.914 19.082 267.195 20.625C265.477 22.1484 264.373 24.1699 263.885 26.6895H283.162C282.596 24.1699 281.395 22.1484 279.559 20.625C277.723 19.082 275.604 18.3105 273.201 18.3105Z" fill="black"/>
                <path d="M302.402 32.5195V39.4922H309.111V44.8828H290.215V39.4922H296.396V19.5117H284L273.201 13.2718L301.201 14.0918V21.0645C302.432 18.3105 303.955 16.3965 305.771 15.3223C307.607 14.2285 310.225 13.6816 313.623 13.6816H315V19.8047H313.682C310.4 19.8047 307.959 20.2344 306.357 21.0938C304.756 21.9531 303.691 23.252 303.164 24.9902C302.656 26.7285 302.402 29.2383 302.402 32.5195Z" fill="black"/>
                </g>
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
                    addComponent: __i18n('Add a component', {
                        id: 's-carpenter.components.add',
                    }),
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons html to be used across the UI',
                default: {
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
