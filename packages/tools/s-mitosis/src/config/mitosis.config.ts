import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';

export async function preprocess(api) {
    const config = (await __loadConfigFile('mitosis.config.js')) ?? {};
    return __deepMerge(api.this, config);
}

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {};
}
