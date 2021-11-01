import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

/**
 * @name            rootRelative
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to remove in a path the absolute part and get only the relative part of it
 *
 * @param       {String}        path            The path you want to process
 * @return      {String}                    The processed path
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function rootRelative(path: string): string {
    return path.replace(`${__packageRoot()}/`, '');
}
