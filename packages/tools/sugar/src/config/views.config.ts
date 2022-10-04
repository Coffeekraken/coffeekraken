import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';

export default function ({ env, config }) {
    if (env.platform !== 'node') return;

    return {
        rootFolders: {
            twig: [
                `./${__path.relative(
                    __packageRootDir(),
                    config.storage.src.viewsDir,
                )}`,
                `./node_modules/@coffeekraken/sugar/src/views/twig`,
            ],
            blade: [
                `./${__path.relative(
                    __packageRootDir(),
                    config.storage.src.viewsDir,
                )}`,
                `./node_modules/@coffeekraken/sugar/src/views/blade`,
            ],
        },
    };
}
