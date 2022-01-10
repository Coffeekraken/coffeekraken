export default function (env, config) {
    if (env.platform !== 'node')
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: '[config.discord.server.url]',
            /**
             * @name            url
             * @namespace       config.contact.discord
             * @type            String
             * @default         https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord
             *
             * Specify the shield url for the "discord" contact
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get url() {
                var _a, _b, _c, _d, _e;
                return `mailto:${((_c = (_b = (_a = config === null || config === void 0 ? void 0 : config.packageJson) === null || _a === void 0 ? void 0 : _a.author) === null || _b === void 0 ? void 0 : _b.email) !== null && _c !== void 0 ? _c : (_e = (_d = config === null || config === void 0 ? void 0 : config.git) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.email)}`;
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSw2QkFBNkI7WUFDbEM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxtSEFBbUg7U0FDOUg7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxHQUFHOztnQkFDSCxPQUFPLFVBQVUsQ0FDYixNQUFBLE1BQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVywwQ0FBRSxNQUFNLDBDQUFFLEtBQUssbUNBQ2xDLE1BQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRywwQ0FBRSxJQUFJLDBDQUFFLEtBQUssQ0FDM0IsRUFBRSxDQUFDO1lBQ1IsQ0FBQztZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsOEZBQThGO1NBQ3pHO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==