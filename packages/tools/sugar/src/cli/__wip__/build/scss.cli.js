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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nzcy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3NzLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxnR0FBMEU7QUFDMUUseUZBQW1FO0FBRW5FLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLElBQUkseUJBQWlCLENBQUMsMkJBQW1CLEVBQUU7UUFDekMsT0FBTyxFQUFFLElBQUk7UUFDYixhQUFhLEVBQUUsVUFBVTtRQUN6QixlQUFlLEVBQUU7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUNqQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9