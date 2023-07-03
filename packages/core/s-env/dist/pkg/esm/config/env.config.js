// @ts-ignore
if (global && !global.document)
    global.document = {};
export default (api) => {
    return {
        /**
         * @name            env
         * @type            String
         * @namespace       config.env
         * @default         undefined
         *
         * Specify the environment env. This is usually "production" or "dev" as value.
         * If undefined, will be determined depending on the platform.
         * For node, it will take the process.env.NODE_ENV variable
         * For browser, if not specified manually, it will depends on the "env.envFromLocation" configuration to determine the correct environment using regex check
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        env: undefined,
        envFromLocation: {
            /**
             * @name            development
             * @type            Regex
             * @namespace       config.env.envFromLocation
             * @default         https?://(localhost|127.0.0.1|0.0.0.0|192.168.[0-9]{1,3}.[0-9]{1,3})
             *
             * Specify the regex to detect the "development" environment from the document.location.href variable
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            development: 'https?://(localhost|127.0.0.1|0.0.0.0|192.168.[0-9]{1,3}.[0-9]{1,3})',
            /**
             * @name            staging
             * @type            Regex
             * @namespace       config.env.envFromLocation
             * @default         https?://([a-zA-Z0-9.-]+)?staging([a-zA-Z0-9.-]+)?
             *
             * Specify the regex to detect the "staging" environment from the document.location.href variable
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            staging: 'https?://([a-zA-Z0-9.-]+)?staging([a-zA-Z0-9.-]+)?',
            /**
             * @name            production
             * @type            Regex
             * @namespace       config.env.envFromLocation
             * @default         https?://.*
             *
             * Specify the regex to detect the "production" environment from the document.location.href variable
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            production: 'https?://.*',
        },
        git: {
            template: {
                name: 'Template',
                commit: {
                    id: undefined,
                    time: undefined,
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0lBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFckQsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsR0FBRyxFQUFFLFNBQVM7UUFFZCxlQUFlLEVBQUU7WUFDYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUNQLHNFQUFzRTtZQUUxRTs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLG9EQUFvRDtZQUU3RDs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLGFBQWE7U0FDNUI7UUFFRCxHQUFHLEVBQUU7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRTtvQkFDSixFQUFFLEVBQUUsU0FBUztvQkFDYixJQUFJLEVBQUUsU0FBUztpQkFDbEI7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9