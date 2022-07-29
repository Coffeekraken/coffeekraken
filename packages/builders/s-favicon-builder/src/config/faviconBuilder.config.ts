export default function ({ env, config }) {
    if (env.platform !== 'node') return;

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
            return `${config.storage.src.rootDir}/favicon/favicon.png`;
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
            return `${config.storage.dist.rootDir}/favicon`;
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
