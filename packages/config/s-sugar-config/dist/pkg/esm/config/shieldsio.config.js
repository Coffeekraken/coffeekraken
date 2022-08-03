export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7V0FXRztRQUNILEtBQUssRUFBRSxlQUFlO1FBQ3RCLE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEdBQUc7b0JBQ0gsT0FBTyx1Q0FBdUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3hHLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxJQUFJO29CQUNKLE9BQU8saUNBQWlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRSxDQUFDO2FBQ0o7WUFDRCxTQUFTLEVBQUU7Z0JBQ1A7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxHQUFHO29CQUNILE9BQU8sNkJBQTZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM5RixDQUFDO2dCQUVEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksSUFBSTtvQkFDSixPQUFPLGlDQUFpQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUUsQ0FBQzthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksR0FBRztvQkFDSCxPQUFPLDRCQUE0QixHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0YsQ0FBQztnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsV0FBVzthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEdBQUc7b0JBQ0gsT0FBTyw4QkFBOEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoRyxDQUFDO2dCQUVEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksSUFBSTtvQkFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ3pDLENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==