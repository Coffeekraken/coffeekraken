// @ts-nocheck
import __tcpPortUsed from 'tcp-port-used';
/**
 * @name            isPortFree
 * @namespace            node.http
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function simply check if the passed port is free or not
 *
 * @param           {Number}            port            The port to check
 * @return          {Promise}                           A promise resolved with the result when the check has been done
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
 * await isPortFree(22000); // => true
 *
 * @see             https://www.npmjs.com/package/tcp-port-used
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function isPortFree(port) {
    return new Promise((resolve) => {
        __tcpPortUsed.check(port, '127.0.0.1').then(function (inUse) {
            resolve(!inUse);
        }, function () {
            resolve(false);
        });
    });
}
export default isPortFree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsVUFBVSxDQUFDLElBQUk7SUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNCLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDdkMsVUFBVSxLQUFLO1lBQ1gsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxFQUNEO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==