import __SFrontspec from '@coffeekraken/s-frontspec';
import { __get } from '@coffeekraken/sugar/object';

/**
 * @name            frontspec
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a sugar frontspecuration
 *
 * @param       {String}        dotPath            The frontspec dotpath
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function frontspec(dotPath: string = ''): any {
    const frontspec = new __SFrontspec();
    const frontspecJson = frontspec.read();
    if (dotPath) {
        return __get(frontspecJson, dotPath);
    }
    return frontspecJson;
}
