"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildFontIconsProcess_1 = __importDefault(require("../../node/build/fontIcons/SBuildFontIconsProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
const SFsDeamon_1 = __importDefault(require("../../node/deamon/fs/SFsDeamon"));
exports.default = (stringArgs = '') => {
    const manager = new SProcessManager_1.default(SBuildFontIconsProcess_1.default, {
        autoRun: true,
        deamon: new SFsDeamon_1.default({
            processParams: (params, file) => {
                return params;
            }
        }),
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb25zLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbnRpY29ucy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsK0dBQXlGO0FBQ3pGLHlGQUFtRTtBQUNuRSwrRUFBeUQ7QUFFekQsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsTUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBaUIsQ0FBQyxnQ0FBd0IsRUFBRTtRQUM5RCxPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxJQUFJLG1CQUFXLENBQUM7WUFDdEIsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDO1NBQ0YsQ0FBQztRQUNGLGVBQWUsRUFBRTtZQUNmLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=