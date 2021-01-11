"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const STsCompileProcess_1 = __importDefault(require("../../node/typescript/compile/STsCompileProcess"));
function compileTs(stringArgs = '') {
    const pro = new STsCompileProcess_1.default({
        stdio: 'inherit',
        exitAtEnd: true
    });
    pro.run(stringArgs);
}
module.exports = compileTs;
//# sourceMappingURL=compile.cli.js.map