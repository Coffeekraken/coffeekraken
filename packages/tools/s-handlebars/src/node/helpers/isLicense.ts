// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageJsonSync } from '@coffeekraken/sugar/package';

const packageJson = __packageJsonSync();

/**
 * @name            islicense
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to make an conditional check if a license is specified in your package.json file
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function isLicense(conditional, options) {
    let license = this.license ?? packageJson.license;

    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}
