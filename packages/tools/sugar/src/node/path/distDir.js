"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const distDir = sugar_1.default('storage.distDir');
    if (distDir !== undefined) {
        fs_extra_1.default.ensureDirSync(distDir);
        return distDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0VBQXNEO0FBQ3RELHdEQUE0QjtBQThCNUIsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN6QixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFWRCw0QkFVQyJ9