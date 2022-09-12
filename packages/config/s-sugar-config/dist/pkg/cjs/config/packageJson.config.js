"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return (0, package_1.__packageJsonSync)();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWdFO0FBRWhFLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTyxJQUFBLDJCQUFpQixHQUFFLENBQUM7QUFDL0IsQ0FBQztBQUhELDRCQUdDIn0=