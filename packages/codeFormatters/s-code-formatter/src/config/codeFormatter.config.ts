export default (env, config) => {
    return {
        /**
         * @name            input
         * @namespace       config.codeFormatter
         * @type            String
         * @default         ** /*
         *
         * Specify the default input for the SCodeFormatter.format process
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        input: '**/*',

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
        inDir: '[config.storage.src.rootDir]',
    };
};
