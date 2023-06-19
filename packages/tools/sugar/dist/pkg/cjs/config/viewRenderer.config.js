"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dirname_1 = __importDefault(require("../node/fs/dirname"));
const packageRootDir_1 = __importDefault(require("../node/path/packageRootDir"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDirs() {
            return [
                (0, packageRootDir_1.default)(),
                `${api.config.storage.src.rootDir}/views`,
                `${path_1.default.resolve((0, packageRootDir_1.default)((0, dirname_1.default)()), 'src/views/twig')}`,
            ];
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLGlFQUEyQztBQUMzQyxpRkFBMkQ7QUFFM0QsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTtZQUNSLE9BQU87Z0JBQ0gsSUFBQSx3QkFBZ0IsR0FBRTtnQkFDbEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRO2dCQUN6QyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2IsSUFBQSx3QkFBZ0IsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUM3QixnQkFBZ0IsQ0FDbkIsRUFBRTthQUNOLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUExQkQsNEJBMEJDIn0=