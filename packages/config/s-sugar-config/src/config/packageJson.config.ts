import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';

export default function (api) {
    if (api.env.platform !== 'node') return;
    return __packageJson();
}
