export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        style: 'for-the-badge',
        shields: {
            size: {
                url: 'https://shields.io/bundlephobia/min/[packageJson.name]?style=[config.shieldsio.style]',
                href: 'hhttps://www.npmjs.com/package/[packageJson.name]',
            },
            downloads: {
                url: 'https://shields.io/npm/dm/[packageJson.name]?style=[config.shieldsio.style]',
                href: 'hhttps://www.npmjs.com/package/[packageJson.name]',
            },
            // 'issues',
            license: {
                url: 'https://shields.io/npm/l/[packageJson.name]?style=[config.shieldsio.style]',
                href: './LICENSE',
            },
            discord: {
                url: 'https://shields.io/discord/[config.discord.server.id]?style=[config.shieldsio.style]',
                href: '[config.discord.server.url]',
            },
        },
    };
}
