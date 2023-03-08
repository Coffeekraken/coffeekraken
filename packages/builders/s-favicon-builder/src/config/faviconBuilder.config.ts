export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name            input
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.src.rootDir]/favicon/favicon.png
         *
         * Specify where the favicon source file is stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.rootDir}/favicon/favicon.png`;
        },

        /**
         * @name            outDir
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         [config.storage.dist.rootDir]/favicon
         *
         * Specify where the favicon output files have to be stored
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outDir() {
            return `${api.config.storage.dist.rootDir}/favicon`;
        },

        /**
         * @name            outFileName
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         favicon.html
         *
         * Specify the filename of the html file that contains all the favicon code
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get outFileName() {
            return `favicon.html`;
        },

        /**
         * @name            settings
         * @namespace       config.faviconBuilder
         * @type            String
         * @default         {}
         *
         * Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        settings: {},
    };
}
