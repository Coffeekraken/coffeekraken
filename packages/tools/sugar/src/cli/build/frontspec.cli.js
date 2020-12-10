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
const SBuildFrontspecProcess_1 = __importDefault(require("../../node/frontspec/build/SBuildFrontspecProcess"));
const SProcessManager_1 = __importDefault(require("../../node/process/SProcessManager"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    new SProcessManager_1.default(SBuildFrontspecProcess_1.default, {
        autoRun: true,
        initialParams: stringArgs
    });
});
//# sourceMappingURL=module.js.map