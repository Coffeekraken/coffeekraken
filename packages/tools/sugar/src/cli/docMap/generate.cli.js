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
const SBuildDocMapProcess_1 = __importDefault(require("../../node/docMap/SBuildDocMapProcess"));
const SProcessPipe_1 = __importDefault(require("../../node/process/SProcessPipe"));
module.exports = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const pipe = new SProcessPipe_1.default([
        SBuildDocMapProcess_1.default,
        (params) => {
            return params;
        },
        SBuildDocMapProcess_1.default
    ]);
    // const manager = new __SProcessManager(pipe, {
    //   // stdio: true
    // });
    // manager.run();
    const runPromise = pipe.run();
    // runPromise.on('log,*.log,warn,*.warn', (value) => {
    //   console.log(value.value || value);
    // });
});
//# sourceMappingURL=generate.cli.js.map