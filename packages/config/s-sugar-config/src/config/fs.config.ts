import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function (env) {
    if (env.platform !== 'node') return;

    return {};
}
