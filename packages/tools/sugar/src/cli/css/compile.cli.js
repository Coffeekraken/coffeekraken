"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SScssCompileProcess_1 = __importDefault(require("../../node/scss/compile/SScssCompileProcess"));
function compileScss(stringArgs = '') {
    const pro = new SScssCompileProcess_1.default({}, {
        stdio: 'inherit'
    });
    pro.run(stringArgs);
}
module.exports = compileScss;
//# sourceMappingURL=compile.cli.js.map