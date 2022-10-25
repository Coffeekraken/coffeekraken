"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
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
            var _a, _b;
            if (api.config.viewRenderer.defaultEngine === 'twig') {
                return [
                    ...((_a = api.parent.rootDirs) !== null && _a !== void 0 ? _a : []),
                    `${path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/views/twig')}`,
                ];
            }
            return [
                ...((_b = api.parent.rootDirs) !== null && _b !== void 0 ? _b : []),
                `${path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/views/blade')}`,
            ];
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCxnREFBMEI7QUFFMUIsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTs7WUFDUixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsS0FBSyxNQUFNLEVBQUU7Z0JBQ2xELE9BQU87b0JBQ0gsR0FBRyxDQUFDLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQztvQkFDOUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNiLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixnQkFBZ0IsQ0FDbkIsRUFBRTtpQkFDTixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILEdBQUcsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUM7Z0JBQzlCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDYixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsaUJBQWlCLENBQ3BCLEVBQUU7YUFDTixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBbENELDRCQWtDQyJ9