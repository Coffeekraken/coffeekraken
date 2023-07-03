export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }
    return {
        server: {
            /**
             * @name            id
             * @namespace       config.discord.server
             * @type            String
             * @default         940362961682333767
             *
             * Specify the discord server id
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            id: '940362961682333767',
            /**
             * @name            url
             * @namespace       config.discord.server
             * @type            String
             * @default         https://discord.gg/HzycksDJ
             *
             * Specify the discord server url
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: 'https://discord.gg/HzycksDJ',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixPQUFPO0tBQ1Y7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxvQkFBb0I7WUFDeEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSw2QkFBNkI7U0FDckM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9