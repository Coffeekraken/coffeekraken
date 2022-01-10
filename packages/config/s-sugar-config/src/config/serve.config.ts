import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export function postprocess(env, serveConfig, config) {
    return serveConfig;
}

export default (env, config) => {
    return {
        img: {
            /**
             * @name            url
             * @namespace       config.serve.img
             * @type            String
             * @default         /img
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/img' : '/img',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         /js
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/js' : '/js',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         /css
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/css' : '/css',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         /icons
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/icons' : '/icons',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         /fonts
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: env.env === 'development' ? '[config.vite.server.hostname]/fonts' : '/fonts',
        },
    };
};
