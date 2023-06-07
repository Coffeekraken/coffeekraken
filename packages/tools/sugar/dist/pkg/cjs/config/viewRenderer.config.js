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
            var _a;
            return [
                (0, path_1.__packageRootDir)(),
                ...((_a = api.parent.rootDirs) !== null && _a !== void 0 ? _a : []),
                `${path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/views/twig')}`,
            ];
            // if (api.config.viewRenderer.defaultEngine === 'twig') {
            //     return [
            //         __packageRootDir(),
            //         ...(api.parent.rootDirs ?? []),
            //         `${__path.resolve(
            //             __packageRootDir(__dirname()),
            //             'src/views/twig',
            //         )}`,
            //     ];
            // }
            // return [
            //     __packageRootDir(),
            //     ...(api.parent.rootDirs ?? []),
            //     `${__path.resolve(
            //         __packageRootDir(__dirname()),
            //         'src/views/blade',
            //     )}`,
            // ];
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCxnREFBMEI7QUFFMUIsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksUUFBUTs7WUFDUixPQUFPO2dCQUNILElBQUEsdUJBQWdCLEdBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUM7Z0JBQzlCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDYixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsZ0JBQWdCLENBQ25CLEVBQUU7YUFDTixDQUFDO1lBRUYsMERBQTBEO1lBQzFELGVBQWU7WUFDZiw4QkFBOEI7WUFDOUIsMENBQTBDO1lBQzFDLDZCQUE2QjtZQUM3Qiw2Q0FBNkM7WUFDN0MsZ0NBQWdDO1lBQ2hDLGVBQWU7WUFDZixTQUFTO1lBQ1QsSUFBSTtZQUNKLFdBQVc7WUFDWCwwQkFBMEI7WUFDMUIsc0NBQXNDO1lBQ3RDLHlCQUF5QjtZQUN6Qix5Q0FBeUM7WUFDekMsNkJBQTZCO1lBQzdCLFdBQVc7WUFDWCxLQUFLO1FBQ1QsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBN0NELDRCQTZDQyJ9