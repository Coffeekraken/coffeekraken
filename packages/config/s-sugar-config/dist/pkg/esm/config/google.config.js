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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0g7Ozs7Ozs7OztXQVNHO1FBQ0gsR0FBRyxFQUFFLElBQUk7UUFFVCxHQUFHLEVBQUU7WUFDRDs7Ozs7Ozs7O2VBU0c7WUFDSCxNQUFNLEVBQUUsSUFBSTtTQUNmO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==