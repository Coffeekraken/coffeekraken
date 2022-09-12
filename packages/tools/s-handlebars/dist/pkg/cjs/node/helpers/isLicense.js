"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
const packageJson = (0, package_1.__packageJsonSync)();
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
function isLicense(conditional, options) {
    var _a;
    let license = (_a = this.license) !== null && _a !== void 0 ? _a : packageJson.license;
    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
exports.default = isLicense;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUdkLHlEQUFnRTtBQUVoRSxNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPOztJQUNsRCxJQUFJLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFFbEQsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3JELE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0wsQ0FBQztBQVJELDRCQVFDIn0=