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
        rootDirs: {
            get sugar() {
                switch (api.config.viewRenderer.defaultEngine) {
                    case 'blade':
                        return `${__path.resolve(
                            __packageRootDir(__dirname()),
                            'src/views/blade',
                        )}`;
                        break;
                    case 'twig':
                    default:
                        return `${__path.resolve(
                            __packageRootDir(__dirname()),
                            'src/views/twig',
                        )}`;
                        break;
                }
            },
        },
    };
}
