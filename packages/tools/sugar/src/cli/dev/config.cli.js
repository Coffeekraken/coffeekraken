"use strict";
// import __sugarConfig from '../../node/config/sugar';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcessSettingsInterface_1 = __importDefault(require("../../node/process/interface/SProcessSettingsInterface"));
exports.default = (stringArgs = '') => {
    const res = SProcessSettingsInterface_1.default.apply({}, {});
    if (res.hasIssues()) {
        console.log(res.toString());
        return;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVEQUF1RDs7Ozs7QUFFdkQsdUhBQWlHO0FBR2pHLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLG1DQUEyQixDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEQsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1QixPQUFPO0tBQ1I7QUFDSCxDQUFDLENBQUMifQ==