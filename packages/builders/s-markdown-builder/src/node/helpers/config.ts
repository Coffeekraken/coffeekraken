import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';

export default function config(docmap: any, path: string): any {
    const newObj = {};
    Object.keys(docmap.map).forEach((namespace) => {
        if (!namespace.includes(path + '.')) return;
        newObj[namespace.replace(path + '.', '')] = docmap.map[namespace];
    });
    return newObj;
}
