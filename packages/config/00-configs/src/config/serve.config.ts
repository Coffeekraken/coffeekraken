export default (api) => {
    return {
        img: {
            /**
             * @name            imgPath
             * @namespace       config.serve.img
             * @type            String
             * @default         /dist/img
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            imgPath: '/dist/img',
        },
        js: {
            /**
             * @name            path
             * @namespace       config.serve.js
             * @type            String
             * @default         /dist/js
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            path: '/dist/js',
        },
        css: {
            /**
             * @name            path
             * @namespace       config.serve.css
             * @type            String
             * @default         /dist/css
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            path: '/dist/css',
        },
        icons: {
            /**
             * @name            path
             * @namespace       config.serve.icons
             * @type            String
             * @default         /dist/icons
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            path: '/dist/icons',
        },
        fonts: {
            /**
             * @name            path
             * @namespace       config.serve.fonts
             * @type            String
             * @default         /dist/fonts
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            path: '/dist/fonts',
        },
        cache: {
            /**
             * @name            path
             * @namespace       config.serve.cache
             * @type            String
             * @default         /cache
             *
             * Specify the serving cache folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            path: '/cache',
        },
    };
};
