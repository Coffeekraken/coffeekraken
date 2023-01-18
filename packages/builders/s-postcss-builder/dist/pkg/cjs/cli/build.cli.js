"use strict";
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
const SPostcssBuilderBuildParamsInterface_1 = __importDefault(require("../node/interface/SPostcssBuilderBuildParamsInterface"));
const SPostcssBuilder_1 = __importDefault(require("../node/SPostcssBuilder"));
function build(stringArgs = '') {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const builder = new SPostcssBuilder_1.default({
            interface: SPostcssBuilderBuildParamsInterface_1.default,
        });
        yield builder.build(stringArgs);
        process.exit();
    }));
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0lBQTBHO0FBQzFHLDhFQUF3RDtBQUd4RCxTQUF3QixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixDQUFDO1lBQ2xDLFNBQVMsRUFBRSw2Q0FBcUM7U0FDbkQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELHdCQVFDIn0=