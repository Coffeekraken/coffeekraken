"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const fn = function (settings = {}) {
    settings = Object.assign({}, settings);
    const cacheDir = sugar_1.default('storage.cacheDir');
    if (cacheDir !== undefined) {
        ensureDirSync_1.default(cacheDir);
        return cacheDir;
    }
    return undefined;
};
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLDREQUE0QztBQUM1Qyx3RUFBa0Q7QUErQmxELE1BQU0sRUFBRSxHQUFjLFVBQVUsV0FBOEIsRUFBRTtJQUM5RCxRQUFRLHFCQUNILFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsZUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQzFCLHVCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFDRixpQkFBUyxFQUFFLENBQUMifQ==