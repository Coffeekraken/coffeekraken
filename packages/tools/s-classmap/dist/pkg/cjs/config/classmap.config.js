"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
function default_1(api) {
    if (api.env.platform !== 'node') {
        return;
    }
    return {
        get path() {
            return `${(0, path_1.__packageRootDir)()}/classmap.json`;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBRTVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzdCLE9BQU87S0FDVjtJQUVELE9BQU87UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxnQkFBZ0IsQ0FBQztRQUNqRCxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFWRCw0QkFVQyJ9