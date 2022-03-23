(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru',
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250YWN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUdBLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsNkJBQTZCO2dCQUNsQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsbUhBQW1IO2FBQzlIO1lBQ0QsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksR0FBRzs7b0JBQ0gsT0FBTyxVQUFVLENBQ2IsTUFBQSxNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsMENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1DQUNsQyxNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsMENBQUUsSUFBSSwwQ0FBRSxLQUFLLENBQzNCLEVBQUUsQ0FBQztnQkFDUixDQUFDO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSw4RkFBOEY7YUFDekc7U0FDSixDQUFDO0lBQ04sQ0FBQztJQTlERCw0QkE4REMifQ==