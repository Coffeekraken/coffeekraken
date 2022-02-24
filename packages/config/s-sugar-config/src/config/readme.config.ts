export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        layout: {
            /**
             * @name            headerImageUrl
             * @namespace       config.readme.layout
             * @type            String
             * @default         [config.serve.img.url]/img/doc/readmeHeader.jpg
             *
             * Specify the header image to use for displaying readme. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            headerImageUrl: '[config.serve.img.url]/doc/readmeHeader.jpg',
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
        shields: '[config.shieldsio.shields]',
    };
}
