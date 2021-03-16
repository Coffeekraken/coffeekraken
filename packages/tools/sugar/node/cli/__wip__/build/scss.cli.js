"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildScssProcess_1 = __importDefault(require("../../node/scss/build/SBuildScssProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
exports.default = (stringArgs = '') => {
    new SProcessManager_1.default(SBuildScssProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs,
        processSettings: {
            runAsChild: true
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpL19fd2lwX18vYnVpbGQvc2Nzcy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsZ0dBQTBFO0FBQzFFLHlGQUFtRTtBQUVuRSxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyxJQUFJLHlCQUFpQixDQUFDLDJCQUFtQixFQUFFO1FBQ3pDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsYUFBYSxFQUFFLFVBQVU7UUFDekIsZUFBZSxFQUFFO1lBQ2YsVUFBVSxFQUFFLElBQUk7U0FDakI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==