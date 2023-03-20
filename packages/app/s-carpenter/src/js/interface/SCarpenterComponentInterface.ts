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
                default: `<svg width="352" height="103" viewBox="0 0 352 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M106.533 30.3984V27H114.033V42.5273H106.533C104.326 36.9219 100.5 35.1191 98.4883 35.1191C95.9297 35.1191 93.6543 35.7832 91.6621 37.1113C89.6895 38.4395 88.1465 40.2559 87.0332 42.5605C85.9395 44.8457 85.3926 47.3848 85.3926 50.1777C85.3926 52.7949 85.9102 55.1973 86.9453 57.3848C88 59.5527 89.4648 61.291 91.3398 62.5996C93.2148 63.8887 95.373 64.5332 97.8145 64.5332C100.822 64.5332 103.43 63.498 105.637 61.4277C107.863 59.3379 110.5 56.9746 112.5 53.0781L121 54.6504C117.719 64.8848 108.264 72.6777 96.9941 72.6777C92.1504 72.6777 87.9121 71.75 84.2793 69.8945C80.666 68.0391 77.8828 65.4023 75.9297 61.9844C73.9766 58.5664 73 54.5723 73 50.002C73 45.6855 74.0059 41.7988 76.0176 38.3418C78.0293 34.8848 80.8027 32.1797 84.3379 30.2266C87.8926 28.2539 91.8672 27.2676 96.2617 27.2676C99 27.2676 103.018 27.6445 106.533 30.3984Z" fill="black"/>
                <path d="M144.326 53.6641V65.0605H149.307V72.1504H134.541V69.748C131.748 71.6621 128.955 72.6191 126.162 72.6191C122.783 72.6191 120.078 71.75 118.047 70.0117C116.016 68.2734 115 65.9297 115 62.9805C115 59.8555 116.133 57.3555 118.398 55.4805C120.684 53.5859 123.711 52.6387 127.48 52.6387C128.789 52.6387 129.951 52.7852 130.967 53.0781C132.002 53.3516 133.193 53.8301 134.541 54.5137V52.0527C134.541 50.4902 134.053 49.2402 133.076 48.3027C132.1 47.3652 130.635 46.8965 128.682 46.8965C126.553 46.8965 124.668 47.7168 123.027 49.3574L115.117 47.9219C117.52 43.0781 122.48 40.6562 130 40.6562C135.156 40.6562 138.828 41.7207 141.016 43.8496C143.223 45.959 144.326 49.2305 144.326 53.6641ZM128.359 66.4961C130.117 66.4961 132.178 65.4414 134.541 63.332V60.5781C132.432 59.2109 130.498 58.5273 128.74 58.5273C127.334 58.5273 126.26 58.8594 125.518 59.5234C124.775 60.1875 124.404 61.1348 124.404 62.3652C124.404 65.1191 125.723 66.4961 128.359 66.4961Z" fill="black"/>
                <path d="M173.807 41.0078V50.2363C171.111 50.4121 168.963 50.8418 167.361 51.5254C165.779 52.1895 164.549 53.3418 163.67 54.9824C162.811 56.623 162.381 58.9668 162.381 62.0137V65.0605H168.504V72.1504H146.912V65.0605H152.566V48.5664H147.205V41.3594H161.561V49.1816C162.283 46.8184 163.621 44.8555 165.574 43.293C167.527 41.7305 169.949 40.9492 172.84 40.9492C173.27 40.9492 173.592 40.9688 173.807 41.0078Z" fill="black"/>
                <path d="M206.5 57.0918C206.5 60.0996 205.963 62.8047 204.889 65.207C203.814 67.5898 202.262 69.4648 200.23 70.832C198.219 72.1992 195.895 72.8828 193.258 72.8828C190.016 72.8828 187.018 71.6035 184.264 69.0449V78.918H190.357V86.0078H169.264V78.918H174.479V50.2363H170.084L172.84 40.9492H184.213L184.264 45.1973C186.979 42.3652 190.016 40.9492 193.375 40.9492C196.09 40.9492 198.434 41.6621 200.406 43.0879C202.398 44.4941 203.912 46.418 204.947 48.8594C205.982 51.3008 206.5 54.0449 206.5 57.0918ZM190.416 65.1191C192.35 65.1191 193.834 64.4062 194.869 62.9805C195.904 61.5352 196.422 59.4941 196.422 56.8574C196.422 54.3379 195.895 52.375 194.84 50.9688C193.785 49.5625 192.271 48.8594 190.299 48.8594C188.424 48.8594 186.92 49.5918 185.787 51.0566C184.674 52.5215 184.117 54.4941 184.117 56.9746C184.117 59.2988 184.693 61.2422 185.846 62.8047C187.018 64.3477 188.541 65.1191 190.416 65.1191Z" fill="black"/>
                <path d="M235.5 58.8203H212.531C212.766 61.1836 213.576 63.0586 214.963 64.4453C216.369 65.8125 218.176 66.4961 220.383 66.4961C222.824 66.4961 225.207 65.2852 227.531 62.8633L235.148 65.3242C233.469 67.8438 231.389 69.7383 228.908 71.0078C226.428 72.2578 221.488 72.8828 218.09 72.8828C214.691 72.8828 213.684 72.248 211.066 70.9785C208.469 69.6895 206.447 67.873 205.002 65.5293C203.576 63.1855 202.863 60.4316 202.863 57.2676C202.863 54.1426 203.605 51.3105 205.09 48.7715C206.594 46.2324 208.615 44.25 211.154 42.8242C213.713 41.3789 216.486 40.6562 219.475 40.6562C222.717 40.6562 225.539 41.4082 227.941 42.9121C230.344 44.3965 232.189 46.5156 233.479 49.2695C234.787 52.0039 235.461 55.1875 235.5 58.8203ZM219.006 47.1895C217.248 47.1895 215.832 47.6973 214.758 48.7129C213.703 49.7285 213.039 51.2812 212.766 53.3711H225.598C225.324 51.5352 224.572 50.0508 223.342 48.918C222.131 47.7656 220.686 47.1895 219.006 47.1895Z" fill="black"/>
                <path d="M268.312 52.5215V65.0605H272.941V72.1504H258.469V53.3125C258.469 51.8672 258.244 50.8223 257.795 50.1777C257.365 49.5137 256.633 49.1816 255.598 49.1816C253.723 49.1816 251.838 49.8555 249.943 51.2031V65.0605H254.748V72.1504L218.09 72.8828L226.5 65.207L240.188 65.0605V48.5664H235.5V41.3594H249.943V44.2598C252.873 42.0527 255.881 40.9492 258.967 40.9492C262.033 40.9492 264.357 41.9258 265.939 43.8789C267.521 45.8125 268.312 48.6934 268.312 52.5215Z" fill="black"/>
                <path d="M291.365 41.3594V48.5664H285.682V62.0137C285.682 62.9707 285.867 63.6934 286.238 64.1816C286.609 64.6504 287.303 64.8848 288.318 64.8848C289.158 64.8848 297.007 65.3145 298.199 64.8848L307.914 72.8822C303.215 72.8822 286.248 72.6191 283.924 72.6191C281.248 72.6191 279.236 71.9453 277.889 70.5977C276.561 69.2305 275.896 67.3066 275.896 64.8262V48.5664H259.5L258.967 40.9492L275.896 41.3594V36.584L285.682 29.5527V41.3594H291.365Z" fill="black"/>
                <path d="M323.5 58.8203H300.531C300.766 61.1836 301.576 63.0586 302.963 64.4453C304.369 65.8125 306.176 66.4961 308.383 66.4961C310.824 66.4961 313.207 65.2852 315.531 62.8633L323.148 65.3242C321.469 67.8438 319.389 69.7383 316.908 71.0078C314.428 72.2578 311.488 72.8828 308.09 72.8828C304.691 72.8828 301.684 72.248 299.066 70.9785C296.469 69.6895 294.447 67.873 293.002 65.5293C291.576 63.1855 290.863 60.4316 290.863 57.2676C290.863 54.1426 291.605 51.3105 293.09 48.7715C294.594 46.2324 296.615 44.25 299.154 42.8242C301.713 41.3789 304.592 40.6562 307.58 40.6562C310.822 40.6562 313.539 41.4082 315.941 42.9121C318.344 44.3965 320.189 46.5156 321.479 49.2695C322.787 52.0039 323.461 55.1875 323.5 58.8203ZM307.006 47.1895C305.248 47.1895 303.832 47.6973 302.758 48.7129C301.703 49.7285 301.039 51.2812 300.766 53.3711H313.598C313.324 51.5352 312.572 50.0508 311.342 48.918C310.131 47.7656 308.686 47.1895 307.006 47.1895Z" fill="black"/>
                <path d="M351.5 41.0078V50.2363C348.805 50.4121 346.656 50.8418 345.055 51.5254C343.473 52.1895 342.242 53.3418 341.363 54.9824C340.504 56.623 340.074 58.9668 340.074 62.0137V65.0605H346.197V72.1504H324.605V65.0605H330.26V48.5664L314.105 48.6504L307.58 40.6562L339.254 41.3594V49.1816C339.977 46.8184 341.314 44.8555 343.268 43.293C345.221 41.7305 347.643 40.9492 350.533 40.9492C350.963 40.9492 351.285 40.9688 351.5 41.0078Z" fill="black"/>
                <path d="M22.8301 1.64959V15.9471C22.8301 16.533 23.1434 17.0747 23.653 17.3699L44.8907 29.6726C45.4003 29.9678 45.7136 30.5096 45.7136 31.0955V55.2153C45.7136 55.7986 46.0243 56.3384 46.5304 56.6345L59.6128 64.2886C60.7186 64.9355 62.1135 64.1438 62.1135 62.8693V21.6462C62.1135 21.05 61.789 20.5003 61.2651 20.209L25.2991 0.212316C24.1934 -0.402416 22.8301 0.391225 22.8301 1.64959Z" fill="#FECE0F"/>
                <path d="M88.5747 79.8193C85.8023 79.2213 83.1475 78.2996 80.6404 77.0191L80.6326 77.0151L80.6249 77.0111C77.4491 75.3803 74.685 73.2673 72.3858 70.6908L65.7013 74.4838C65.1891 74.7744 64.5599 74.773 64.049 74.4801L43.0147 62.4202C42.506 62.1285 41.88 62.1258 41.3687 62.413L28.1526 69.8372C27.0355 70.4646 27.0285 72.0601 28.1399 72.6974L64.0895 93.3089C64.6095 93.6071 65.2511 93.6028 65.7671 93.2979L88.5747 79.8193Z" fill="#FECE0F"/>
                <path d="M15.0446 95.8342L2.46559 102.789C1.35848 103.402 -0.00298273 102.605 4.90849e-06 101.346L0.0971901 60.4131C0.0986058 59.8168 0.424397 59.2679 0.948997 58.9778L37.2173 38.9245C38.3386 38.3045 39.7137 39.1297 39.6824 40.4038L39.3124 55.4781C39.2981 56.0612 38.9743 56.5933 38.4611 56.8771L17.2403 68.6104C16.7249 68.8954 16.4007 69.4308 16.3888 70.0166L15.8961 94.4281C15.8843 95.0138 15.5601 95.5492 15.0446 95.8342Z" fill="#FECE0F"/>
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
