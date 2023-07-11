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
// @ts-nocheck
const STypescriptBuilderBuildParamsInterface_js_1 = __importDefault(require("../node/interface/STypescriptBuilderBuildParamsInterface.js"));
const STypescriptBuilder_js_1 = __importDefault(require("../node/STypescriptBuilder.js"));
exports.default = (stringArgs = '') => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = STypescriptBuilderBuildParamsInterface_js_1.default.apply(stringArgs);
        const builder = new STypescriptBuilder_js_1.default();
        const result = yield builder._build(finalParams);
        resolve(result);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLDRJQUFtSDtBQUNuSCwwRkFBaUU7QUFFakUsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sV0FBVyxHQUNiLG1EQUF3QyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxNQUFNLE9BQU8sR0FBRyxJQUFJLCtCQUFvQixFQUFFLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=