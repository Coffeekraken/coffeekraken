export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        fontawesome: {
            /**
             * @name            url
             * @namespace       config.icons.fontawesome
             * @type             String
             * @default         https://use.fontawesome.com/releases/v5.15.3/css/all.css
             *
             * Specify the url to the font-awesome stylesheet to load. By default it will load
             * all the icons but you can create a "kit" on the fontaawesome website and load only
             * the icons you need.
             * When using the postcss sugar plugin with the ```@sugar.icon.fa``` mixin, this url will be automatically
             * loaded in your css if you use some fontawesome icons.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
        },

        fantasticon: {
            /**
             * @name            name
             * @namespace       config.icons.fantasticon
             * @type            String
             * @default         sugar-fonticon
             *
             * Specify the name of the generated font
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            name: 'sugar-fonticon',

            /**
             * @name            outputDir
             * @namespace       config.icons.fantasticon
             * @type            String
             * @default         [config.storage.src.fontsDir]/sugar-icons
             *
             * Specify the output directory to generate fonticon in
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outputDir() {
                return `${api.config.storage.src.fontsDir}/sugar-icons`;
            },

            /**
             * @name            serveFontsDir
             * @namespace       config.icons.fantasticon
             * @type            String
             * @default         [config.storage.dist.fontsDir]/sugar-icons
             *
             * Specify the path to the fonts directory to serve
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get serveFontsDir() {
                return `${api.config.storage.dist.fontsDir}/sugar-icons`;
            },
        },
    };
}
