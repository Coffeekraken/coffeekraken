import __get from '@coffeekraken/sugar/shared/object/get';
import __handlebars from 'handlebars';

export default function get(
    object,
    path,
    resolveDots = true,
    insidePath = null,
) {
    let res;
    if (resolveDots) {
        res = __get(object, path);
    } else {
        res = object[path];
    }
    if (insidePath) {
        return __get(res, insidePath);
    }
    return res;
}
