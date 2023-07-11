import __path from 'path';
import __packageRootDir from '../node/path/packageRootDir.js';

export default function ({ env, config }) {
    if (env.platform !== 'node') return;

    return {
        layouts: {
            main: {
                name: 'Default (main)',
                viewDotPath: 'layouts.main',
            },
        },
        rootDirs: [
            `./${__path.relative(
                __packageRootDir(),
                config.storage.src.viewsDir,
            )}`,
            `./node_modules/@coffeekraken/sugar/src/views`,
        ],
    };
}
