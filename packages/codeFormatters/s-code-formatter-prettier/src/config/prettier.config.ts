import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export async function preprocess(env, rawPrettierConfig, rawConfig) {
    const config =
        (await __loadConfigFile([
            '.prettierrc',
            '.prettierrc.json',
            '.prettierrc.yml',
            '.prettierrc.yaml',
            '.prettierrc.js',
            'prettier.config.js',
        ])) ?? {};
    return __deepMerge(rawPrettierConfig, config);
}

export default function (env, config) {
    if (env.platform !== 'node') return;
    return {};
}
