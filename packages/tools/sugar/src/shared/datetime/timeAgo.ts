// @ts-nocheck
import __jsAgo from 'js-ago';

/**
 * @name                                  timeAgo
 * @namespace            shared.datetime
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * Simple "time" ago for your Unix timestamps and JavaScript Date objects.
 *
 * @param           {Number}             timestamp                 The timestamp to transform
 * @param           {'short'|'medium'|'long'}       [format='medium']       The format you want back
 * @return          {String}                                          The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __timeAgo($1)
 *
 * @example           js
 * import { __timeAgo } from '@coffeekraken/sugar/datetime';
 * __timeAgo(1611344957); // => 7 secs ago
 *
 * @see         https://www.npmjs.com/package/js-ago
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __timeAgo(
    timestamp,
    format: 'short' | 'medium' | 'long' = 'medium',
) {
    return __jsAgo(timestamp, {
        format,
    });
}
