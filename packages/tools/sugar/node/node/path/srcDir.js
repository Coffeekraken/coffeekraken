"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const srcDir = sugar_1.default('storage.srcDir');
    if (srcDir !== undefined) {
        fs_extra_1.default.ensureDirSync(srcDir);
        return srcDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcGF0aC9zcmNEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQTRDO0FBQzVDLHdEQUE0QjtBQThCNUIsbUJBQXlCLFdBQTRCLEVBQUU7SUFDckQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUN4QixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELDRCQVVDIn0=