import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function (api) {
    return {
        get path(): string {
            return `${__packageRootDir()}/classmap.json`;
        },
    };
}
