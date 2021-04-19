"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = s_sugar_config_1.default('storage.rootDir');
        if (rootDir !== undefined) {
            fs_extra_1.default.ensureDirSync(rootDir);
            return rootDir;
        }
    }
    return '/';
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0ZBQXlEO0FBQ3pELHdEQUE0QjtBQWtDNUIsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE9BQU8sR0FBRyx3QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakQsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLGtCQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFiRCw0QkFhQyJ9