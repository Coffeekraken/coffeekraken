"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SFrontendServerProcess_1 = __importDefault(require("../../node/server/frontend/SFrontendServerProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
module.exports = (stringArgs = '') => {
    const manager = new SProcessManager_1.default(SFrontendServerProcess_1.default, {
        autoRun: true,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsK0dBQXlGO0FBQ3pGLHlGQUFtRTtBQUVuRSxpQkFBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixDQUFDLGdDQUF3QixFQUFFO1FBQzlELE9BQU8sRUFBRSxJQUFJO1FBQ2IsZUFBZSxFQUFFO1lBQ2YsVUFBVSxFQUFFLElBQUk7U0FDakI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==