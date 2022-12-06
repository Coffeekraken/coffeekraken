import { __packageJsonSync } from '@coffeekraken/sugar/package';

export default function (api) {
    if (api.env.platform !== 'node') return;
    return __packageJsonSync();
}
