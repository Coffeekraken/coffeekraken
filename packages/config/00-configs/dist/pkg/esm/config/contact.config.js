export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        discord: {
            /**
             * @name            url
             * @namespace       config.contact.discord
             * @type            String
             * @default         [config.discord.server.url]
             *
             * Specify the url for the "discord" contact
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get url() {
                return `${api.config.discord.server.url}`;
            },
            /**
             * @name            url
             * @namespace       config.contact.discord
             * @type            String
             * @default         https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord
             *
             * Specify the shield url for the "discord" contact
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            shield: 'https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord',
        },
        email: {
            /**
             * @name            url
             * @namespace       config.contact.email
             * @type            String
             * @default         config?.packageJson?.author?.email ?? config?.git?.user?.email
             *
             * Specify the url for the "email" contact
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get url() {
                var _a, _b, _c, _d, _e, _f, _g;
                return `mailto:${(_d = (_c = (_b = (_a = api.config) === null || _a === void 0 ? void 0 : _a.packageJson) === null || _b === void 0 ? void 0 : _b.author) === null || _c === void 0 ? void 0 : _c.email) !== null && _d !== void 0 ? _d : (_g = (_f = (_e = api.config) === null || _e === void 0 ? void 0 : _e.git) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.email}`;
            },
            /**
             * @name            shield
             * @namespace       config.contact.email
             * @type            String
             * @default         [config.discord.server.url]
             *
             * Specify the shield url for the "email" contact
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxHQUFHO2dCQUNILE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsbUhBQW1IO1NBQzlIO1FBQ0QsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksR0FBRzs7Z0JBQ0gsT0FBTyxVQUNILE1BQUEsTUFBQSxNQUFBLE1BQUEsR0FBRyxDQUFDLE1BQU0sMENBQUUsV0FBVywwQ0FBRSxNQUFNLDBDQUFFLEtBQUssbUNBQ3RDLE1BQUEsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLEdBQUcsMENBQUUsSUFBSSwwQ0FBRSxLQUMzQixFQUFFLENBQUM7WUFDUCxDQUFDO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSw4RkFBOEY7U0FDekc7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9