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
const packageRootDir_1 = __importDefault(require("../../node/path/packageRootDir"));
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = (0, parseArgs_1.default)(stringArgs, {
        definition: {
            highest: {
                type: 'Boolean',
                alias: 'h',
                default: false
            }
        }
    });
    console.log((0, packageRootDir_1.default)(args.highest));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9GQUE4RDtBQUM5RCx5RUFBbUQ7QUFNbkQsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxJQUFJLEdBQXFCLElBQUEsbUJBQVcsRUFBQyxVQUFVLEVBQUU7UUFDckQsVUFBVSxFQUFFO1lBQ1YsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2Y7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSx3QkFBZ0IsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUEsQ0FBQyJ9