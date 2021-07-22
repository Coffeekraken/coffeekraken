export default {

    style: 'for-the-badge',

    shields: [
        'size',
        'downloads',
        'issues',
        'license',
        'discord'
    ],

    urls: {
        size: 'bundlephobia/min/%packageName',
        downloads: 'npm/dm/%packageName',
        issues: 'github/issues/&user/&repo',
        license: 'npm/l/&packageName',
        discord: 'https://img.shields.io/discord/%serverId'
    }

}