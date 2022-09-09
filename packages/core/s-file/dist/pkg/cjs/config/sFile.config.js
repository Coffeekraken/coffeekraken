"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name           classesMap
         * @namespace       config.sFile
         * @type            Record<string, string>
         * @default         {}
         *
         * Map some SFile classes path using minimatch patterns like so:
         * {
         *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        classesMap: {
            'tsconfig.*': `${(0, packageRoot_1.default)((0, fs_1.__dirname)())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${(0, packageRoot_1.default)((0, fs_1.__dirname)())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${(0, packageRoot_1.default)((0, fs_1.__dirname)())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${(0, packageRoot_1.default)((0, fs_1.__dirname)())}/src/node/scss/SScssFile`,
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELDRGQUFzRTtBQUV0RSxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEdBQUcsSUFBQSxxQkFBYSxFQUMxQixJQUFBLGNBQVMsR0FBRSxDQUNkLDRCQUE0QjtZQUM3QixZQUFZLEVBQUUsR0FBRyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxzQkFBc0I7WUFDakUsWUFBWSxFQUFFLEdBQUcsSUFBQSxxQkFBYSxFQUMxQixJQUFBLGNBQVMsR0FBRSxDQUNkLDhCQUE4QjtZQUMvQixlQUFlLEVBQUUsR0FBRyxJQUFBLHFCQUFhLEVBQzdCLElBQUEsY0FBUyxHQUFFLENBQ2QsMEJBQTBCO1NBQzlCO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE5QkQsNEJBOEJDIn0=