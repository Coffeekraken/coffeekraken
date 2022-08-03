"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    const { default: ProcessClass } = yield Promise.resolve().then(() => __importStar(require(args.processPath)));
    if (ProcessClass.prototype instanceof s_process_1.default) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELHdFQUFpRDtBQU1qRCxrQkFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBNEIsSUFBQSxtQkFBVyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3JCLE1BQU0sMkZBQTJGLENBQUM7S0FDbkc7SUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLHdEQUFhLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQztJQUNqRSxJQUFJLFlBQVksQ0FBQyxTQUFTLFlBQVksbUJBQVUsRUFBRTtRQUNoRCxNQUFNLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUEsQ0FBQyJ9