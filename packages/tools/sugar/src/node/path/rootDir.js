"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
function default_1(settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = sugar_1.default('storage.rootDir');
        if (rootDir !== undefined) {
            ensureDirSync_1.default(rootDir);
            return rootDir;
        }
    }
    return '/';
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQTRDO0FBQzVDLHdFQUFrRDtBQW1DbEQsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE9BQU8sR0FBRyxlQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDekIsdUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixPQUFPLE9BQU8sQ0FBQztTQUNoQjtLQUNGO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBYkQsNEJBYUMifQ==