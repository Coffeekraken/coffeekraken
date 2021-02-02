"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBuildScssProcess_1 = __importDefault(require("../../node/scss/build/SBuildScssProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
module.exports = (stringArgs = '') => {
    new SProcessManager_1.default(SBuildScssProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3NzLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLGdHQUEwRTtBQUMxRSx5RkFBbUU7QUFFbkUsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0IsSUFBSSx5QkFBaUIsQ0FBQywyQkFBbUIsRUFBRTtRQUN6QyxPQUFPLEVBQUUsSUFBSTtRQUNiLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGVBQWUsRUFBRTtZQUNmLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=