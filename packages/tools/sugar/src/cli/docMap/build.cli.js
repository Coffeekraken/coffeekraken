"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBuildDocMapProcess_1 = __importDefault(require("../../node/docMap/SBuildDocMapProcess"));
module.exports = (stringArgs = '') => {
    const pro = new SBuildDocMapProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsZ0dBQTBFO0FBRTFFLGlCQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksNkJBQXFCLENBQ25DLEVBQUUsRUFDRjtRQUNFLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1NBQ2pCO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMifQ==