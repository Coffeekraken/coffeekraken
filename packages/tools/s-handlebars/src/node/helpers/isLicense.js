// @ts-nocheck
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
const packageJson = __packageJsonSync();
/**
 * @name            islicense
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNMaWNlbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNMaWNlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLGlCQUFpQixNQUFNLDJDQUEyQyxDQUFDO0FBRTFFLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPOztJQUNsRCxJQUFJLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFFbEQsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3JELE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQyJ9