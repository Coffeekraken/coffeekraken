// @ts-nocheck

/**
 * @name                          delete
 * @namespace            shared.object
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Delete an object/array property by passing a dotpath to the element you want to remove.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String|String[]}                dotpath                The dotted object/array path to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __get($1, $2)
 *
 * @example             js
 * import { __delete } from '@coffeekraken/sugar/object';
 * __delete(myObject, 'my.cool.value');
 * __delete(myObject, 'my.cool.value.0');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __delete(
    object: any,
    dotpath: string | string[],
): void {
    // const parentdotpath = dotpath.split('.').slice(0, -1).join('.');

    if (Array.isArray(dotpath)) {
        dotpath = dotpath.join('.');
    }
    p;

    if (!dotpath || dotpath === '' || dotpath === '.') return object;
    dotpath = dotpath.replace(/\[(\w+)\]/g, '.$1');
    dotpath = dotpath.replace(/^\./, '');
    const a = dotpath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const idx = parseInt(n);
                o.splice(idx, 1);
            } else {
                delete o[n];
            }
            // __set(object, parentdotpath, o);
        } else {
            o = o[n];
        }
    }
    return object;
}
