import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';

export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        namespaces: {
            views: [
                `./${__path.relative(
                    __packageRootDir(),
                    api.config.storage.src.viewsDir,
                )}`,
            ],
            bare: [
                `./${__path.relative(
                    __packageRootDir(),
                    api.config.storage.src.viewsDir,
                )}/bare`,
            ],
            sections: [
                `./${__path.relative(
                    __packageRootDir(),
                    api.config.storage.src.viewsDir,
                )}/sections`,
            ],
            components: [
                `./${__path.relative(
                    __packageRootDir(),
                    api.config.storage.src.viewsDir,
                )}/components`,
            ],
        },
        get cwd() {
            return api.config.storage.rootDir;
        },
    };
}
