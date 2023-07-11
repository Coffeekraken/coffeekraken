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
const SImagesBuilderBuildParamsInterface_js_1 = __importDefault(require("../node/interface/SImagesBuilderBuildParamsInterface.js"));
const SImagesBuilder_js_1 = __importDefault(require("../node/SImagesBuilder.js"));
function build(stringArgs = '') {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const builder = new SImagesBuilder_js_1.default({
            interface: SImagesBuilderBuildParamsInterface_js_1.default,
        });
        const result = yield builder.build(stringArgs);
        resolve(result);
    }));
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0lBQTJHO0FBQzNHLGtGQUF5RDtBQUV6RCxTQUF3QixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksMkJBQWdCLENBQUM7WUFDakMsU0FBUyxFQUFFLCtDQUFvQztTQUNsRCxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsd0JBUUMifQ==