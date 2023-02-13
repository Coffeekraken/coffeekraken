import { __packagePath } from '@coffeekraken/sugar/npm';
import __glob from 'glob';
import __path from 'path';

export default function () {
    const files = __glob
        .sync(`${__packagePath('@coffeekraken/sugar')}/src/icons/**/*`)
        .map((path) => {
            return __path.basename(path).replace('.svg', '');
        });

    return {
        sugarIcons: files,
    };
}
