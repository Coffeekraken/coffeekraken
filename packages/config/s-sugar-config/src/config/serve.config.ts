import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export function postprocess(env, serveConfig, config) {
    if (env.env === 'production') {
        serveConfig.img.url = config.storage.dist.imgDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.js.url = config.storage.dist.jsDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.css.url = config.storage.dist.cssDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.icons.url = config.storage.dist.iconsDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.fonts.url = config.storage.dist.fontsDir.replace(
            __packageRoot(),
            '',
        );
    } else {
        serveConfig.img.url = config.storage.src.imgDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.js.url = config.storage.src.jsDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.css.url = config.storage.src.cssDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.icons.url = config.storage.src.iconsDir.replace(
            __packageRoot(),
            '',
        );
        serveConfig.fonts.url = config.storage.src.fontsDir.replace(
            __packageRoot(),
            '',
        );
    }
    return serveConfig;
}

export default (env, config) => {
    return {
        img: {
            /**
             * @name            url
             * @namespace       config.serve.img
             * @type            String
             * @default         config.storage.(src|dist).imgDir.replace(__packageRoot(),'')
             *
             * Specify the serving img folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        js: {
            /**
             * @name            url
             * @namespace       config.serve.js
             * @type            String
             * @default         config.storage.(src|dist).jsDir.replace(__packageRoot(),'')
             *
             * Specify the serving js folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        css: {
            /**
             * @name            url
             * @namespace       config.serve.css
             * @type            String
             * @default         config.storage.(src|dist).cssDir.replace(__packageRoot(),'')
             *
             * Specify the serving css folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        icons: {
            /**
             * @name            url
             * @namespace       config.serve.icons
             * @type            String
             * @default         config.storage.(src|dist).iconsDir.replace(__packageRoot(),'')
             *
             * Specify the serving icons folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
        fonts: {
            /**
             * @name            url
             * @namespace       config.serve.fonts
             * @type            String
             * @default         config.storage.(src|dist).fontsDir.replace(__packageRoot(),'')
             *
             * Specify the serving fonts folder path to use in your views
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '',
        },
    };
};
