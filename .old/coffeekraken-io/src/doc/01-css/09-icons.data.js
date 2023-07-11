import { __packagePathSync } from '@coffeekraken/sugar/npm';
import __glob from 'glob';
import __path from 'path';

export default function () {
    const files = __glob
        .sync(`${__packagePathSync('@coffeekraken/sugar')}/src/icons/**/*`)
        .map((path) => {
            return __path.basename(path).replace('.svg', '');
        });

    return {
        sugarIcons: files,
    };
}
