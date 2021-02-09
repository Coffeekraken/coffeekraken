"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SBuildFrontspecProcess_1 = __importDefault(require("../../node/frontspec/build/SBuildFrontspecProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    new SProcessManager_1.default(SBuildFrontspecProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsK0dBQXlGO0FBQ3pGLHlGQUFtRTtBQUVuRSxrQkFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxJQUFJLHlCQUFpQixDQUFDLGdDQUF3QixFQUFFO1FBQzlDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMifQ==