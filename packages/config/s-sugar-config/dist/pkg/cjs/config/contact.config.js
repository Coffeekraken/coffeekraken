"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksR0FBRztnQkFDSCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUNGLG1IQUFtSDtTQUMxSDtRQUNELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEdBQUc7O2dCQUNILE9BQU8sVUFDSCxNQUFBLE1BQUEsTUFBQSxNQUFBLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLFdBQVcsMENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1DQUN0QyxNQUFBLE1BQUEsTUFBQSxHQUFHLENBQUMsTUFBTSwwQ0FBRSxHQUFHLDBDQUFFLElBQUksMENBQUUsS0FDM0IsRUFBRSxDQUFDO1lBQ1AsQ0FBQztZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQ0YsOEZBQThGO1NBQ3JHO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFuRUQsNEJBbUVDIn0=