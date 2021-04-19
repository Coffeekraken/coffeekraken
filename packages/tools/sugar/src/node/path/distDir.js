"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const distDir = s_sugar_config_1.default('storage.distDir');
    if (distDir !== undefined) {
        fs_extra_1.default.ensureDirSync(distDir);
        return distDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0ZBQXlEO0FBQ3pELHdEQUE0QjtBQThCNUIsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLHdCQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDekIsa0JBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBVkQsNEJBVUMifQ==