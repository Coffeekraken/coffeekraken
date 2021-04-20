"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
exports.default = {
    /**
     * @name           sFileClassesMap
     * @namespace       config.fs
     * @type            Record<string, string>
     *
     * Map some SFile classes path using minimatch patterns like so:
     * {
     *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
     * }
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sFileClassesMap: {
        'tsconfig.*': `${packageRoot_1.default(__dirname)}/src/node/ts/STsconfigFile`,
        '*.js,*.jsx': `${packageRoot_1.default(__dirname)}/src/node/js/SJsFile`,
        '*.ts,*.tsx': `${packageRoot_1.default(__dirname)}/src/node/typescript/STsFile`,
        '*.scss,*.sass': `${packageRoot_1.default(__dirname)}/src/node/scss/SScssFile`,
        '*.svelte': `${packageRoot_1.default(__dirname)}/src/node/svelte/SSvelteFile`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBRXRFLGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZUFBZSxFQUFFO1FBQ2YsWUFBWSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxTQUFTLENBQUMsNEJBQTRCO1FBQ3JFLFlBQVksRUFBRSxHQUFHLHFCQUFhLENBQUMsU0FBUyxDQUFDLHNCQUFzQjtRQUMvRCxZQUFZLEVBQUUsR0FBRyxxQkFBYSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEI7UUFDdkUsZUFBZSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxTQUFTLENBQUMsMEJBQTBCO1FBQ3RFLFVBQVUsRUFBRSxHQUFHLHFCQUFhLENBQUMsU0FBUyxDQUFDLDhCQUE4QjtLQUN0RTtDQUNGLENBQUMifQ==