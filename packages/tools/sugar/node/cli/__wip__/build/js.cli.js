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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NsaS9fX3dpcF9fL2J1aWxkL2pzLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwwRkFBb0U7QUFDcEUseUZBQW1FO0FBRW5FLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLElBQUkseUJBQWlCLENBQUMseUJBQWlCLEVBQUU7UUFDdkMsT0FBTyxFQUFFLElBQUk7UUFDYixhQUFhLEVBQUUsVUFBVTtRQUN6QixlQUFlLEVBQUU7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUNqQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9