"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const distDir = sugar_1.default('storage.distDir');
    if (distDir !== undefined) {
        ensureDirSync_1.default(distDir);
        return distDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3REaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQTRDO0FBQzVDLHdFQUFrRDtBQStCbEQsbUJBQXlCLFdBQTZCLEVBQUU7SUFDdEQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN6Qix1QkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELDRCQVVDIn0=