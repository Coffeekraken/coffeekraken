export default function (api) {
    if (api.env.platform !== 'node') return;

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
