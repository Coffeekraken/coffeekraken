"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SFrontendServerProcess_1 = __importDefault(require("../../node/server/frontend/SFrontendServerProcess"));
module.exports = (stringArgs = '') => {
    // const manager = new __SProcessManager(, {
    //   autoRun: true,
    //   processSettings: {
    //     runAsChild: true
    //   }
    // });
    const pro = new SFrontendServerProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsK0dBQXlGO0FBR3pGLGlCQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzNCLDRDQUE0QztJQUM1QyxtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixNQUFNO0lBQ04sTUFBTTtJQUVOLE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQXdCLENBQ3RDLEVBQUUsRUFDRjtRQUNFLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxTQUFTO1NBQ2pCO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDIn0=