export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name            input
         * @namespace       config.readme
         * @type            String
         * @default         [config.storage.src.docDir]/README.md
         *
         * Specify where is stored the input README.md file before bein builded using the SMarkdownBuilder class
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.docDir}/README.md`;
        },

        /**
         * @name            output
         * @namespace       config.readme
         * @type            String
         * @default         [config.storage.package.rootDir]/README.md
         *
         * Specify where is stored the output README.md file after bein builded using the SMarkdownBuilder class
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get output() {
            return `${api.config.storage.package.rootDir}/README.md`;
        },

        layout: {
            /**
             * @name            headerImageUrl
             * @namespace       config.readme.layout
             * @type            String
             * @default         https://cdnv2.coffeekraken.io/readme-header.jpg
             *
             * Specify the header image to use for displaying readme. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get headerImageUrl() {
                return `https://cdnv2.coffeekraken.io/readme-header.png`;
            },
        },
        /**
         * @name            shields
         * @namespace       config.readme
         * @type            Object
         * @default         [config.shieldsio.shields]
         *
         * Specify the readme shields to display in your readme.
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shields() {
            return api.config.shieldsio.shields;
        },
    };
}
