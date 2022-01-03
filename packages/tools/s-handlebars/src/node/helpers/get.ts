import __get from '@coffeekraken/sugar/shared/object/get';

/**
 * @name            get
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get get a value deep into the passed object using dotpath syntax
 *
 * @param       {Object}        object          The object you want to get a value from
 * @param      {String}        path             The dotpath to the value you want to get
 * @param       {Boolean}       [resolveDots=true]      Specify if you want to resolve the passed dotpath or treat it as a property
 * @param       {String}        [insidePath=null]       Gives you the ability to take a subvalue if you have set the "resolveDots" to false
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
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
        if (path === '@coffeekraken.s-images-builder.node.sImagesBuilder') {
            res = object[path];
            // console.log('re', res);
        }
    }
    if (insidePath) {
        return __get(res, insidePath);
    }
    return res;
}
