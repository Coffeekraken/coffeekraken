"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
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
         *   '*.scss,*.sass': `${__packageRootDir(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        classesMap: {
            'tsconfig.*': `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/node/scss/SScssFile`,
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUU1RCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEdBQUcsSUFBQSx1QkFBZ0IsRUFDN0IsSUFBQSxjQUFTLEdBQUUsQ0FDZCw0QkFBNEI7WUFDN0IsWUFBWSxFQUFFLEdBQUcsSUFBQSx1QkFBZ0IsRUFDN0IsSUFBQSxjQUFTLEdBQUUsQ0FDZCxzQkFBc0I7WUFDdkIsWUFBWSxFQUFFLEdBQUcsSUFBQSx1QkFBZ0IsRUFDN0IsSUFBQSxjQUFTLEdBQUUsQ0FDZCw4QkFBOEI7WUFDL0IsZUFBZSxFQUFFLEdBQUcsSUFBQSx1QkFBZ0IsRUFDaEMsSUFBQSxjQUFTLEdBQUUsQ0FDZCwwQkFBMEI7U0FDOUI7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWhDRCw0QkFnQ0MifQ==