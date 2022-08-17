export default function (api) {
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
        gtm: undefined,

        /**
         * @name            ga
         * @namespace       config.google
         * @type            String
         *
         * Specigy the google analytics id you want to use across your project
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        ga: undefined,
    };
}
