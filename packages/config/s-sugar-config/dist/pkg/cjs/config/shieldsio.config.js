"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            style
         * @namespace       config.shieldsio
         * @type            String
         * @values           plastic,flat,for-the-badge,social
         * @default         for-the-badge
         *
         * Specify the shieldsio style you want for your badges
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        style: 'for-the-badge',
        shields: {
            size: {
                /**
                 * @name            url
                 * @namespace       config.shieldsio.shields.size
                 * @type            String
                 * @default         https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]
                 *
                 * Specify the shieldsio url for the "size" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get url() {
                    return `https://shields.io/bundlephobia/min/${api.config.packageJson.name}?style=${api.this.style}`;
                },
                /**
                 * @name            href
                 * @namespace       config.shieldsio.shields.href
                 * @type            String
                 * @default         https://www.npmjs.com/package/[packageJson.name]
                 *
                 * Specify the shieldsio href for the "size" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get href() {
                    return `https://www.npmjs.com/package/${api.config.packageJson.name}`;
                },
            },
            downloads: {
                /**
                 * @name            url
                 * @namespace       config.shieldsio.shields.download
                 * @type            String
                 * @default         https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]
                 *
                 * Specify the shieldsio url for the "download" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get url() {
                    return `https://shields.io/npm/dm/${api.config.packageJson.name}?style=${api.this.style}`;
                },
                /**
                 * @name            href
                 * @namespace       config.shieldsio.shields.download
                 * @type            String
                 * @default         https://www.npmjs.com/package/[packageJson.name]
                 *
                 * Specify the shieldsio href for the "download" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get href() {
                    return `https://www.npmjs.com/package/${api.config.packageJson.name}`;
                },
            },
            license: {
                /**
                 * @name            url
                 * @namespace       config.shieldsio.shields.license
                 * @type            String
                 * @default         https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]
                 *
                 * Specify the shieldsio url for the "license" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get url() {
                    return `https://shields.io/npm/l/${api.config.packageJson.name}?style=${api.this.style}`;
                },
                /**
                 * @name            href
                 * @namespace       config.shieldsio.shields.license
                 * @type            String
                 * @default         ./LICENSE
                 *
                 * Specify the shieldsio href for the "license" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                href: './LICENSE',
            },
            discord: {
                /**
                 * @name            url
                 * @namespace       config.shieldsio.shields.discord
                 * @type            String
                 * @default         https://shields.io/discord/[config.discord.server.id]?style=[api.this.style]
                 *
                 * Specify the shieldsio url for the "discord" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get url() {
                    return `https://shields.io/discord/${api.config.discord.server.id}?style=${api.this.style}`;
                },
                /**
                 * @name            href
                 * @namespace       config.shieldsio.shields.license
                 * @type            String
                 * @default         [config.discord.server.url]
                 *
                 * Specify the shieldsio href for the "discord" shield
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get href() {
                    return api.config.discord.server.url;
                },
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxLQUFLLEVBQUUsZUFBZTtRQUN0QixPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxHQUFHO29CQUNILE9BQU8sdUNBQXVDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN4RyxDQUFDO2dCQUVEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksSUFBSTtvQkFDSixPQUFPLGlDQUFpQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUUsQ0FBQzthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksR0FBRztvQkFDSCxPQUFPLDZCQUE2QixHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUYsQ0FBQztnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLElBQUk7b0JBQ0osT0FBTyxpQ0FBaUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFFLENBQUM7YUFDSjtZQUNELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEdBQUc7b0JBQ0gsT0FBTyw0QkFBNEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdGLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxHQUFHO29CQUNILE9BQU8sOEJBQThCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEcsQ0FBQztnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLElBQUk7b0JBQ0osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN6QyxDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBOUlELDRCQThJQyJ9