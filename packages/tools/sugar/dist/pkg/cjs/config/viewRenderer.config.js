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
        rootDirs: {
            get sugar() {
                switch (api.config.viewRenderer.defaultEngine) {
                    case 'blade':
                        return `${path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/views/blade')}`;
                        break;
                    case 'twig':
                    default:
                        return `${path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/views/twig')}`;
                        break;
                }
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCxnREFBMEI7QUFFMUIsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRTtZQUNOLElBQUksS0FBSztnQkFDTCxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRTtvQkFDM0MsS0FBSyxPQUFPO3dCQUNSLE9BQU8sR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNwQixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsaUJBQWlCLENBQ3BCLEVBQUUsQ0FBQzt3QkFDSixNQUFNO29CQUNWLEtBQUssTUFBTSxDQUFDO29CQUNaO3dCQUNJLE9BQU8sR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNwQixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsZ0JBQWdCLENBQ25CLEVBQUUsQ0FBQzt3QkFDSixNQUFNO2lCQUNiO1lBQ0wsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFuQ0QsNEJBbUNDIn0=