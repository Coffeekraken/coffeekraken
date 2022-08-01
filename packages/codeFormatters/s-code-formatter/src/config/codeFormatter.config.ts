export default (api) => {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name            glob
         * @namespace       config.codeFormatter
         * @type            String
         * @default         ** /*
         *
         * Specify the default glob for the SCodeFormatter.format process
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        glob: '**/*',

        /**
         * @name            inDir
         * @namespace       config.codeFormatter
         * @type            String
         * @default         [config.storage.src.rootDir]
         *
         * Specify the default inDir for the SCodeFormatter.format process
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        get inDir() {
            return api.config.storage.src.rootDir;
        },
    };
};
