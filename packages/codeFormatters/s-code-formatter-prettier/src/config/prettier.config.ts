import { __loadConfigFile } from '@coffeekraken/sugar/load';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

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
        },
        api.config.prettier ?? {},
    );
}
