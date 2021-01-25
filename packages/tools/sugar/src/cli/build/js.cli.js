"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBuildJsProcess_1 = __importDefault(require("../../node/js/build/SBuildJsProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
module.exports = (stringArgs = '') => {
    new SProcessManager_1.default(SBuildJsProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianMuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsMEZBQW9FO0FBQ3BFLHlGQUFtRTtBQUVuRSxpQkFBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMzQixJQUFJLHlCQUFpQixDQUFDLHlCQUFpQixFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsYUFBYSxFQUFFLFVBQVU7UUFDekIsZUFBZSxFQUFFO1lBQ2YsVUFBVSxFQUFFLElBQUk7U0FDakI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==