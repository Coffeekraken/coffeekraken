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
    const cacheDir = sugar_1.default('storage.cacheDir');
    if (cacheDir !== undefined) {
        ensureDirSync_1.default(cacheDir);
        return cacheDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0REFBNEM7QUFDNUMsd0VBQWtEO0FBK0JsRCxtQkFBeUIsV0FBOEIsRUFBRTtJQUN2RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsZUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQzFCLHVCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBVkQsNEJBVUMifQ==