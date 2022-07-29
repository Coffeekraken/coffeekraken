export default function ({ env, config }) {
    if (env.platform !== 'node') return;

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
                return `${config.discord.server.url}`;
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
                return `mailto:${
                    config?.packageJson?.author?.email ??
                    config?.git?.user?.email
                }`;
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
