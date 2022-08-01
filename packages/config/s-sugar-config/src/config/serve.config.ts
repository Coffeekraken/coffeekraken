export default (api) => {
    return {
        img: {
            /**
             * @name            url
             * @namespace       config.serve.img
             * @type            String
             * @default         /dist/img
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/dist/img',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         /dist/js
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/dist/js',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         /dist/css
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/dist/css',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         /dist/icons
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/dist/icons',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         /dist/fonts
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/dist/fonts',
        },
        cache: {
            /**
             * @name            url
             * @namespace       config.serve.cache
             * @type            String
             * @default         /cache
             *
             * Specify the serving cache folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: '/cache',
        },
    };
};
