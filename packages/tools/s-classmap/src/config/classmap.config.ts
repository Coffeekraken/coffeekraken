import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }

    return {
        get path(): string {
            return `${__packageRootDir()}/classmap.json`;
        },
    };
}
