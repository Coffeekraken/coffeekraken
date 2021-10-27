import __get from '@coffeekraken/sugar/shared/object/get';

export default function get(object, path, resolveDots = true) {
    // if (resolveDots) {
    //     console.log(path, Object.keys(object));
    //     return __get(object, path);
    // }
    console.log(Object.keys(object));

    // console.log(Object.keys(object[path]));
    return object[path];
}
