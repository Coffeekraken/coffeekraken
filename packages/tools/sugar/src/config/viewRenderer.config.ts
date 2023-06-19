import __path from 'path';
import __dirname from '../node/fs/dirname';
import __packageRootDir from '../node/path/packageRootDir';

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
            return [
                __packageRootDir(),
                `${api.config.storage.src.rootDir}/views`,
                `${__path.resolve(
                    __packageRootDir(__dirname()),
                    'src/views/twig',
                )}`,
            ];
        },
    };
}
