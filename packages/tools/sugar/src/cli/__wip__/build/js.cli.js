"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildJsProcess_1 = __importDefault(require("../../node/js/build/SBuildJsProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
exports.default = (stringArgs = '') => {
    new SProcessManager_1.default(SBuildJsProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianMuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBGQUFvRTtBQUNwRSx5RkFBbUU7QUFFbkUsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsSUFBSSx5QkFBaUIsQ0FBQyx5QkFBaUIsRUFBRTtRQUN2QyxPQUFPLEVBQUUsSUFBSTtRQUNiLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGVBQWUsRUFBRTtZQUNmLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=