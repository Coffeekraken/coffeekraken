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
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const SDocmap_1 = __importDefault(require("../node/SDocmap"));
exports.default = (stringArgs = '') => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const docmap = new SDocmap_1.default();
        const result = yield docmap.read(stringArgs);
        (0, clipboard_1.__copy)(JSON.stringify(result, null, 4));
        console.log(`<green>[read]</green> docmap.json copied to your clipboard`);
        console.log(`<green>[read]</green> <cyan>${Object.keys((_a = result === null || result === void 0 ? void 0 : result.map) !== null && _a !== void 0 ? _a : {}).length}</cyan> docmap items`);
        resolve(result);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDZEQUF1RDtBQUN2RCw4REFBd0M7QUFFeEMsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBQSxrQkFBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNERBQTRELENBQy9ELENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUNQLCtCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxNQUNuQyxzQkFBc0IsQ0FDekIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=