"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
exports.default = {
    /**
     * @name           sFileClassesMap
     * @namespace       config.fs
     * @type            Record<string, string>
     *
     * Map some SFile classes path to their propers extensions like so:
     * {
     *   'scss,sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
     * }
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sFileClassesMap: {
        'js,jsx': `${packageRoot_1.default(__dirname)}/src/node/js/SJsFile`,
        'ts,tsx': `${packageRoot_1.default(__dirname)}/src/node/typescript/STsFile`,
        'scss,sass': `${packageRoot_1.default(__dirname)}/src/node/scss/SScssFile`,
        svelte: `${packageRoot_1.default(__dirname)}/src/node/svelte/SSvelteFile`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBRXJELGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZUFBZSxFQUFFO1FBQ2YsUUFBUSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxTQUFTLENBQUMsc0JBQXNCO1FBQzNELFFBQVEsRUFBRSxHQUFHLHFCQUFhLENBQUMsU0FBUyxDQUFDLDhCQUE4QjtRQUNuRSxXQUFXLEVBQUUsR0FBRyxxQkFBYSxDQUFDLFNBQVMsQ0FBQywwQkFBMEI7UUFDbEUsTUFBTSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxTQUFTLENBQUMsOEJBQThCO0tBQ2xFO0NBQ0YsQ0FBQyJ9