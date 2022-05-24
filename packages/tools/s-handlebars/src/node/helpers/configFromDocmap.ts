import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';

/**
 * @name            configFromDocmap
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to extract from the passed docmap some config
 *
 * @param       {Any}           docmap          The source docmap
 * @param       {String}        path            The dotpath to the config you want to extract
 * @return      {Any}                           THe object representing each configs docmap object
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFromDocmap(docmap: any, path: string): any {
    const newObj = {};
    Object.keys(docmap.map).forEach((namespace) => {
        if (!namespace.includes(path + '.')) return;
        newObj[namespace.replace(path + '.', '')] = docmap.map[namespace];
    });
    return newObj;
}
