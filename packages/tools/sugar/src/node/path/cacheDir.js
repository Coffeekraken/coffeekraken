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
    const cacheDir = s_sugar_config_1.default('storage.cacheDir');
    if (cacheDir !== undefined) {
        fs_extra_1.default.ensureDirSync(cacheDir);
        return cacheDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsd0RBQTRCO0FBOEI1QixtQkFBeUIsV0FBOEIsRUFBRTtJQUN2RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsd0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFWRCw0QkFVQyJ9