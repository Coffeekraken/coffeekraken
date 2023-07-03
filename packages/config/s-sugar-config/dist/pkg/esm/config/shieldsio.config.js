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
                    return `https://shields.io/bundlephobia/min/%packageName?style=${api.this.style}`;
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
                    return `https://www.npmjs.com/package/%packageName`;
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
                    return `https://shields.io/npm/dm/%packageName?style=${api.this.style}`;
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
                    return `https://www.npmjs.com/package/%packageName`;
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
                    return `https://shields.io/npm/l/%packageName?style=${api.this.style}`;
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
                    return `https://img.shields.io/discord/${api.config.discord.server.id}?color=5100FF&label=Join%20us%20on%20Discord&style=${api.this.style}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7V0FXRztRQUNILEtBQUssRUFBRSxlQUFlO1FBQ3RCLE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEdBQUc7b0JBQ0gsT0FBTywwREFBMEQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEYsQ0FBQztnQkFFRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLElBQUk7b0JBQ0osT0FBTyw0Q0FBNEMsQ0FBQztnQkFDeEQsQ0FBQzthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksR0FBRztvQkFDSCxPQUFPLGdEQUFnRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1RSxDQUFDO2dCQUVEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksSUFBSTtvQkFDSixPQUFPLDRDQUE0QyxDQUFDO2dCQUN4RCxDQUFDO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxHQUFHO29CQUNILE9BQU8sK0NBQStDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNFLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxHQUFHO29CQUNILE9BQU8sa0NBQWtDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLHNEQUFzRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoSixDQUFDO2dCQUVEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksSUFBSTtvQkFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ3pDLENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==