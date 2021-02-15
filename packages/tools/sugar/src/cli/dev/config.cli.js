"use strict";
// import __sugarConfig from '../../node/config/sugar';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcessSettingsInterface_1 = __importDefault(require("../../node/process/interface/SProcessSettingsInterface"));
exports.default = (stringArgs = '') => {
    const res = SProcessSettingsInterface_1.default.apply({}, {
        complete: true
    });
    if (res.hasIssues()) {
        console.log(res.toString());
        return;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDs7Ozs7QUFFdkQsdUhBQWlHO0FBR2pHLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLG1DQUEyQixDQUFDLEtBQUssQ0FDM0MsRUFBRSxFQUNGO1FBQ0UsUUFBUSxFQUFFLElBQUk7S0FDZixDQUNGLENBQUM7SUFDRixJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLE9BQU87S0FDUjtBQUNILENBQUMsQ0FBQyJ9