import __callsites from 'callsites';
import __esm from 'esm';
import { createRequire } from 'module';
/**
 * @name                require
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @platform            ts
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLEdBQVc7O0lBQ3ZDLGFBQWE7SUFDYixJQUFJLFFBQVEsR0FBRyxNQUFBLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQixXQUFXLEVBQUUsMENBQ1osT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQVMsUUFBUSxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDIn0=