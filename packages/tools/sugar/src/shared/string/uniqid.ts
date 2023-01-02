// @ts-nocheck

// import { v4 as __uuidv4 } from 'uuid';

import __hyperid from 'hyperid';

/**
 * @name          uniqid
 * @namespace            shared.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __uniqid } from '@coffeekraken/sugar/string';
 * console.log(__uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://www.npmjs.com/package/uuid
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

let _hyperidInstance;
export default function __uniqid() {
    if (!_hyperidInstance) {
        _hyperidInstance = __hyperid({
            urlSafe: true,
        });
    }
    return `s-${_hyperidInstance()}`;

    // return __uuidv4();
}
