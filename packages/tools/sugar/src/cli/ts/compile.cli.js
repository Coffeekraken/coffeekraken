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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHdHQUFnRjtBQUVoRixTQUFTLFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLDJCQUFpQixDQUFDO1FBQ2hDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGlCQUFTLFNBQVMsQ0FBQyJ9