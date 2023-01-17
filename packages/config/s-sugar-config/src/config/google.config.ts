export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }

    return {
        /**
         * @name            gtm
         * @namespace       config.google
         * @type            String
         *
         * Specigy the google tag manager you want to use across your project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        gtm: null,

        map: {
            /**
             * @name            apiKey
             * @namespace       config.google
             * @type            String
             *
             * Specigy the google map api key to use across your project
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            apiKey: null,
        },
    };
}
