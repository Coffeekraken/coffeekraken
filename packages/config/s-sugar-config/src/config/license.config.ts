export default ({ env, config }) => {
    if (env.platform !== 'node') return;

    return {
        layout: {
            /**
             * @name            headerImageUrl
             * @namespace       config.license.layout
             * @type            String
             * @default         [config.serve.img.url]/doc/licenseHeader.jpg
             *
             * Specify the header image to use for displaying license. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get headerImageUrl() {
                return `${config.serve.img.url}/doc/licenseHeader.jpg`;
            },
        },
    };
};
