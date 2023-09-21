import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __prettierPluginSh from 'prettier-plugin-sh';

export async function preprocess(api) {
    const config =
        (await __loadConfigFile([
            '.prettierrc',
            '.prettierrc.json',
            '.prettierrc.yml',
            '.prettierrc.yaml',
            '.prettierrc.js',
            'prettier.config.js',
        ])) ?? {};
    return __deepMerge(api.this, config);
}

export default function (api) {
    if (api.env.platform !== 'node') return;
    return __deepMerge(
        {
            singleQuote: true,
            plugins: ['prettier-plugin-sh'],
        },
        api.config.prettier ?? {},
    );
}
