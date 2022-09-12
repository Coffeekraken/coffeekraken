// @ts-nocheck
import __ip from 'ip';
/**
 * @name              ipAddress
 * @namespace            node.network
 * @type              Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to get your ip address
 *
 * @return      {String}            The current ip address of your system
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __ipAddress } from '@coffeekraken/sugar/network';
 * __ipAddress(); // => 192.168.1.45
 *
 * @see             https://www.npmjs.com/package/ip
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function __ipAddress() {
    return __ip.address();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVc7SUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUIsQ0FBQyJ9