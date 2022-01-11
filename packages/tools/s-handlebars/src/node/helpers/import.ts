import __get from '@coffeekraken/sugar/shared/object/get';
import __require from '@coffeekraken/sugar/node/esm/require';

/**
 * @name            import
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to import a file just like a regular "import" in javascript.
 *
 * @param       {String}      filePath          The path to the file you want to import
 * @return      {any}                           The imported result
 * 
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default async function _import(
    filePath
): any {
    return await import(filePath.replace(/\.ts$/, '.js'));
}
