/**
 * @name          uniqid
 * @namespace            js.string
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
 * @see       https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __uniqid() {
    const url = URL.createObjectURL(new Blob());
    return `s-${url.substring(url.lastIndexOf('/') + 1)}`;
}
