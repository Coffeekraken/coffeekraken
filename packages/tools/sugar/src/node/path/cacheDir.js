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
    const cacheDir = sugar_1.default('storage.cacheDir');
    if (cacheDir !== undefined) {
        fs_extra_1.default.ensureDirSync(cacheDir);
        return cacheDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzRUFBc0Q7QUFDdEQsd0RBQTRCO0FBOEI1QixtQkFBeUIsV0FBOEIsRUFBRTtJQUN2RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsZUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQzFCLGtCQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELDRCQVVDIn0=