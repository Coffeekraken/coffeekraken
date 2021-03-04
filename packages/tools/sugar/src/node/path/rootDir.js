"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = sugar_1.default('storage.rootDir');
        if (rootDir !== undefined) {
            fs_extra_1.default.ensureDirSync(rootDir);
            return rootDir;
        }
    }
    return '/';
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQTRDO0FBQzVDLHdEQUE0QjtBQWtDNUIsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE9BQU8sR0FBRyxlQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDekIsa0JBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxPQUFPLENBQUM7U0FDaEI7S0FDRjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWJELDRCQWFDIn0=