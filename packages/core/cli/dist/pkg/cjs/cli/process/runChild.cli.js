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
const parseArgs_1 = __importDefault(require("../../shared/cli/parseArgs"));
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = (0, parseArgs_1.default)(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const { default: ProcessClass } = yield import(args.processPath);
    if (ProcessClass.prototype instanceof s_process_1.default) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDJFQUFxRDtBQUNyRCx3RUFBaUQ7QUFNakQsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxJQUFJLEdBQTRCLElBQUEsbUJBQVcsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNyQixNQUFNLDJGQUEyRixDQUFDO0tBQ25HO0lBQ0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakUsSUFBSSxZQUFZLENBQUMsU0FBUyxZQUFZLG1CQUFVLEVBQUU7UUFDaEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFBLENBQUMifQ==