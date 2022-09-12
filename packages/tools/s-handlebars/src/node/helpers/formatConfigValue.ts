import { __packageRootDir } from '@coffeekraken/sugar/path';

/**
 * @name            formatConfigValue
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to "format" some configuration values makes absolute paths to relative, etc...
 *
 * @param       {Any}        value            The value to sanitize
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function formatConfigValue(value: string): string {
    if (typeof value !== 'string') return value;
    return value.replace(`${__packageRootDir()}/`, '');
}
