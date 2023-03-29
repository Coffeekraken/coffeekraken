export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        extract: {
            /**
             * @name            glob
             * @type            String
             * @namespace       config.i18n.extract
             * @default         ** /*.+(ts|tsx)
             *
             * Specify a glob relative to the cwd from there to extract __i18n statements in your codebase
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get glob() {
                return `${api.config.storage.src.rootDir}/**/*.+(ts|tsx)`;
            },

            /**
             * @name            outDir
             * @type            String
             * @namespace       config.i18n.extract
             * @default         api.config.storage.src.i18nDir;
             *
             * Specify the output directory path where the i18n files will be stored
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outDir() {
                return api.config.storage.src.i18nDir;
            },

            /**
             * @name            filename
             * @type            String
             * @namespace       config.i18n.extract
             * @default         extracted.i18n.json
             *
             * Specify the filename for the extracted json
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fileName: 'extracted.i18n.json',
        },
    };
}
