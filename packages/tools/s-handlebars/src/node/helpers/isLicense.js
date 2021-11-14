// @ts-nocheck
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
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
    var _a;
    let license = (_a = this.license) !== null && _a !== void 0 ? _a : packageJson.license;
    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNMaWNlbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNMaWNlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLGlCQUFpQixNQUFNLDJDQUEyQyxDQUFDO0FBRTFFLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU87O0lBQ2xELElBQUksT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUVsRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDckQsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFDTCxDQUFDIn0=