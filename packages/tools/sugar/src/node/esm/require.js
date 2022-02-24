import __callsites from 'callsites';
import __esm from 'esm';
import { createRequire } from 'module';
/**
 * @name                require
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to get back an fully functional "require" function in
 * an ESM context.
 *
 * @param       {String}            package         The package you want to require
 * @return      {Function}                  The "require" cjs fully functional function
 *
 * @example         js
 * import require from '@coffeekraken/sugar/node/esm/require';
 * require('something');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function require(pkg) {
    var _a;
    // @ts-ignore
    let filePath = (_a = __callsites()[1]
        .getFileName()) === null || _a === void 0 ? void 0 : _a.replace(/^file:\/\//, '');
    const rr = createRequire(filePath);
    const r = __esm({});
    const requiredPkg = rr(pkg);
    return requiredPkg;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsR0FBVzs7SUFDdkMsYUFBYTtJQUNiLElBQUksUUFBUSxHQUFHLE1BQUEsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFCLFdBQVcsRUFBRSwwQ0FDWixPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBUyxRQUFRLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMifQ==