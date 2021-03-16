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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9mcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFFckQsa0JBQWU7SUFDYjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxlQUFlLEVBQUU7UUFDZixRQUFRLEVBQUUsR0FBRyxxQkFBYSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0I7UUFDM0QsUUFBUSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxTQUFTLENBQUMsOEJBQThCO1FBQ25FLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQUMsU0FBUyxDQUFDLDBCQUEwQjtRQUNsRSxNQUFNLEVBQUUsR0FBRyxxQkFBYSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEI7S0FDbEU7Q0FDRixDQUFDIn0=