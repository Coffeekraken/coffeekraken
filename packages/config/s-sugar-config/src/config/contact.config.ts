import __parseAuthorString from '@coffeekraken/sugar/shared/npm/utils/parseAuthorString';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default {
    discord: {
        url: '[config.discord.server.url]',
        shield: 'https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&logo=discord'
    },
    email: {
        get url() {
            return __SSugarConfig.safeGet('packageJson.author.email') ?? __SSugarConfig.safeGet('git.user.email');
        },
        shield: 'https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&logo=Mail.Ru'
    }
}