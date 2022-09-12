import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        /**
         * @name           classesMap
         * @namespace       config.sFile
         * @type            Record<string, string>
         * @default         {}
         *
         * Map some SFile classes path using minimatch patterns like so:
         * {
         *   '*.scss,*.sass': `${__packageRootDir(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        classesMap: {
            'tsconfig.*': `${__packageRootDir(
                __dirname(),
            )}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${__packageRootDir(
                __dirname(),
            )}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${__packageRootDir(
                __dirname(),
            )}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${__packageRootDir(
                __dirname(),
            )}/src/node/scss/SScssFile`,
        },
    };
}
