import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';

export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDirs() {
            if (api.config.viewRenderer.defaultEngine === 'twig') {
                return [
                    ...(api.parent.rootDirs ?? []),
                    `${__path.resolve(
                        __packageRootDir(__dirname()),
                        'src/views/twig',
                    )}`,
                ];
            }
            return [
                ...(api.parent.rootDirs ?? []),
                `${__path.resolve(
                    __packageRootDir(__dirname()),
                    'src/views/blade',
                )}`,
            ];
        },
    };
}
