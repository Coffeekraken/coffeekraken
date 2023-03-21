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
            autoEdit: {
                type: 'Boolean',
                description:
                    'Specify if you want the editor to automatically open the first editable found in the HTML',
                default: false,
            },
            specs: {
                type: 'String',
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
            logo: {
                type: 'String',
                description:
                    'Specify an image to be used as logo on top left of the interface',
                default: `<svg width="313" height="59" viewBox="0 0 313 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <path d="M88.6797 5.5957V0.732422H94.3047V14.8828H88.5625C87.1172 12.0508 86.1348 9.84375 83.6152 8.26172C81.0957 6.67969 79.332 5.88867 76.3242 5.88867C73.4141 5.88867 70.8164 6.66016 68.5312 8.20312C66.2461 9.72656 64.459 11.7773 63.1699 14.3555C61.9004 16.9141 61.2656 19.668 61.2656 22.6172C61.2656 25.6641 61.9297 28.4766 63.2578 31.0547C64.6055 33.6328 66.4512 35.6934 68.7949 37.2363C71.1387 38.7793 73.7461 39.5508 76.6172 39.5508C80.1523 39.5508 83.2773 38.4766 85.9922 36.3281C88.707 34.1602 90.6895 31.0938 91.9395 27.1289L97.5645 30.1172C96.041 35.0391 93.3457 38.8574 89.4785 41.5723C85.6309 44.2676 81.1094 45.6152 75.9141 45.6152C71.6367 45.6152 67.8379 44.5996 64.5176 42.5684C61.1973 40.5176 58.6094 37.7734 56.7539 34.3359C54.918 30.8789 54 27.0898 54 22.9688C54 18.4961 54.9375 14.5117 56.8125 11.0156C58.707 7.51953 61.3145 4.81445 64.6348 2.90039C67.9551 0.966797 71.7539 0 76.0312 0C78.9023 0 80.5488 0.478516 82.9707 1.43555C85.3926 2.39258 86.6289 3.7793 88.6797 5.5957Z" fill="black"/>
                <path d="M119.459 24.9609V39.4922H124.615V44.8828H114.127V41.1035C111.197 43.9746 107.936 45.4102 104.342 45.4102C102.447 45.4102 100.709 44.9707 99.127 44.0918C97.5645 43.2129 96.3047 42.041 95.3477 40.5762C94.4102 39.0918 93.9414 37.4512 93.9414 35.6543C93.9414 33.7207 94.459 32.002 95.4941 30.498C96.5488 28.9746 97.9648 27.8027 99.7422 26.9824C101.52 26.1621 103.307 25.752 105.104 25.752C108.111 25.752 110.914 26.6309 113.512 28.3887V25.0781C113.512 22.6758 113.004 20.957 111.988 19.9219C110.973 18.8867 109.303 18.3691 106.979 18.3691C105.338 18.3691 103.961 18.6719 102.848 19.2773C101.754 19.8633 100.846 20.7617 100.123 21.9727L94.3223 20.5371C95.6309 18.0957 97.3984 16.2793 99.625 15.0879C101.852 13.877 104.498 13.2715 107.564 13.2715C111.686 13.2715 114.693 14.209 116.588 16.084C118.502 17.959 119.459 20.918 119.459 24.9609ZM105.162 40.752C108.131 40.752 110.914 39.5117 113.512 37.0312V33.4277C110.875 31.377 108.238 30.3516 105.602 30.3516C104 30.3516 102.613 30.8594 101.441 31.875C100.289 32.8711 99.7129 34.1309 99.7129 35.6543C99.7129 37.1191 100.221 38.3398 101.236 39.3164C102.252 40.2734 103.561 40.752 105.162 40.752Z" fill="black"/>
                <path d="M134.402 32.5195V39.4922H141.111V44.8828H122.215V39.4922H128.396V19.5117H122.215V14.0918H133.201V21.0645C134.432 18.3105 135.955 16.3965 137.771 15.3223C139.607 14.2285 142.225 13.6816 145.623 13.6816H147V19.8047H145.682C142.4 19.8047 139.959 20.2344 138.357 21.0938C136.756 21.9531 135.691 23.252 135.164 24.9902C134.656 26.7285 134.402 29.2383 134.402 32.5195Z" fill="black"/>
                <path d="M178 29.6484C178 32.5195 177.336 35.2051 176.008 37.7051C174.68 40.2051 172.863 42.1777 170.559 43.623C168.273 45.0684 165.734 45.791 162.941 45.791C158.82 45.791 155.217 44.209 152.131 41.0449V53.291H158.137V58.6816H140.5V53.291H146.066V19.5117L141 19.8828L145.682 13.6816H152.131V19.0137C153.654 17.2168 155.334 15.8789 157.17 15C159.006 14.1211 160.969 13.6816 163.059 13.6816C165.969 13.6816 168.557 14.4043 170.822 15.8496C173.088 17.2754 174.846 19.209 176.096 21.6504C177.365 24.0918 178 26.7578 178 29.6484ZM162.854 40.2539C164.533 40.2539 166.047 39.7656 167.395 38.7891C168.742 37.8125 169.797 36.4844 170.559 34.8047C171.32 33.125 171.701 31.3477 171.701 29.4727C171.701 27.5781 171.281 25.8398 170.441 24.2578C169.602 22.6562 168.449 21.3867 166.984 20.4492C165.52 19.4922 163.869 19.0137 162.033 19.0137C160.119 19.0137 158.4 19.5215 156.877 20.5371C155.354 21.5332 154.172 22.8613 153.332 24.5215C152.492 26.1816 152.072 28.0078 152.072 30C152.072 33.2031 153.078 35.7129 155.09 37.5293C157.121 39.3457 159.709 40.2539 162.854 40.2539Z" fill="black"/>
                <path d="M207.5 31.0254H181.689C182.061 33.9746 183.203 36.3086 185.117 38.0273C187.031 39.7266 189.375 40.5762 192.148 40.5762C194.18 40.5762 196.064 40.1562 197.803 39.3164C199.541 38.4766 199 38.9355 200.879 37.5293L207.5 39.4922C205.82 42.1094 203.613 42.4512 200.879 43.7988C198.164 45.127 195.205 45.791 192.002 45.791C188.682 45.791 185.732 45.0977 183.154 43.7109C180.576 42.3242 178.564 40.3906 177.119 37.9102C175.693 35.4297 174.98 32.6367 174.98 29.5312C174.98 26.4453 175.684 23.6621 177.09 21.1816C178.516 18.7012 180.459 16.7676 182.92 15.3809C185.381 13.9746 188.096 13.2715 191.064 13.2715C194.307 13.2715 197.129 13.9941 199.531 15.4395C201.953 16.8652 203.857 18.916 205.244 21.5918C206.631 24.248 207.383 27.3926 207.5 31.0254ZM191.182 18.3105C188.896 18.3105 186.895 19.082 185.176 20.625C183.457 22.1484 182.354 24.1699 181.865 26.6895H201.143C200.576 24.1699 199.375 22.1484 197.539 20.625C195.703 19.082 193.584 18.3105 191.182 18.3105Z" fill="black"/>
                <path d="M235.844 24.1699V39.4922H241V44.8828H229.779V24.5508C229.779 22.6172 229.496 21.2305 228.93 20.3906C228.383 19.5508 227.475 19.1309 226.205 19.1309C223.51 19.1309 220.482 20.459 217.123 23.1152V39.4922H222.426V44.8828L192.148 45.7906L205.727 39.4922H211.146V19.5117H205.727V14.0918H217.123V17.8125C220.893 15.0586 224.438 13.6816 227.758 13.6816C230.512 13.6816 232.543 14.5312 233.852 16.2305C235.18 17.9297 235.844 20.5762 235.844 24.1699Z" fill="black"/>
                <path d="M255.203 14.0918V19.5117H249.578V35.6543C249.578 37.334 249.754 38.4277 250.105 38.9355C250.477 39.4238 251.102 39.668 251.98 39.668C253.055 39.668 258.426 39.8633 259.5 39.4922L272.021 45.791C269.4 45.791 251.814 45.4102 250.662 45.4102C248.123 45.4102 246.297 44.7754 245.184 43.5059C244.07 42.2168 243.514 40.0195 243.514 36.9141V19.5117H234L227.758 13.6816L243.514 14.0918V9.43359L249.578 3.89648V14.0918H255.203Z" fill="black"/>
                <path d="M287.52 31.0254H261.709C262.08 33.9746 263.223 36.3086 265.137 38.0273C267.051 39.7266 269.395 40.5762 272.168 40.5762C274.199 40.5762 276.084 40.1562 277.822 39.3164C279.561 38.4766 281.016 37.1875 282.188 35.4492L287.52 37.8516C285.84 40.4688 283.633 42.4512 280.898 43.7988C278.184 45.127 275.225 45.791 272.021 45.791C268.701 45.791 265.752 45.0977 263.174 43.7109C260.596 42.3242 258.584 40.3906 257.139 37.9102C255.713 35.4297 255 32.6367 255 29.5312C255 26.4453 255.703 23.6621 257.109 21.1816C258.535 18.7012 260.479 16.7676 262.939 15.3809C265.4 13.9746 268.115 13.2715 271.084 13.2715C274.326 13.2715 277.148 13.9941 279.551 15.4395C281.973 16.8652 283.877 18.916 285.264 21.5918C286.65 24.248 287.402 27.3926 287.52 31.0254ZM271.201 18.3105C268.916 18.3105 266.914 19.082 265.195 20.625C263.477 22.1484 262.373 24.1699 261.885 26.6895H281.162C280.596 24.1699 279.395 22.1484 277.559 20.625C275.723 19.082 273.604 18.3105 271.201 18.3105Z" fill="black"/>
                <path d="M300.402 32.5195V39.4922H307.111V44.8828H288.215V39.4922H294.396V19.5117H282L271.201 13.2718L299.201 14.0918V21.0645C300.432 18.3105 301.955 16.3965 303.771 15.3223C305.607 14.2285 308.225 13.6816 311.623 13.6816H313V19.8047H311.682C308.4 19.8047 305.959 20.2344 304.357 21.0938C302.756 21.9531 301.691 23.252 301.164 24.9902C300.656 26.7285 300.402 29.2383 300.402 32.5195Z" fill="black"/>
                </g>
                <rect x="46" y="-0.000976562" width="46.0006" height="20.9094" rx="5" transform="rotate(90 46 -0.000976562)" fill="#FECE0F"/>
                <rect opacity="0.3" x="20.9102" y="-0.000976562" width="20.9094" height="20.9094" rx="5" transform="rotate(90 20.9102 -0.000976562)" fill="black"/>
                <rect x="20.9102" y="25.0918" width="20.9094" height="20.9094" rx="5" transform="rotate(90 20.9102 25.0918)" fill="black"/>
                </svg>
                                                                                        
                `,
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons html to be used across the UI',
                default: {
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
