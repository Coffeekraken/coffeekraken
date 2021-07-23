export default {

    style: 'for-the-badge',

    shields: [
        'size',
        'downloads',
        // 'issues',
        'license',
        'discord'
    ],

    urls: {
        size: 'bundlephobia/min/[packageJson.name]',
        downloads: 'npm/dm/[packageJson.name]',
        issues: 'github/issues/[config.git.user]/[config.git.repo.name]',
        license: 'npm/l/[packageJson.name]',
        discord: 'discord/[config.discord.server.id]'
    }

}