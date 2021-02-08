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
const SDocblock_1 = __importDefault(require("../../node/docblock/SDocblock"));
const SDocblockHtmlRenderer_1 = __importDefault(require("../../node/docblock/renderers/SDocblockHtmlRenderer"));
const fs_1 = __importDefault(require("fs"));
exports.default = (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const content = fs_1.default.readFileSync(`${__dirname}/../../js/class/SInterface.ts`, 'utf8');
    const blocks = new SDocblock_1.default(content);
    const renderer = new SDocblockHtmlRenderer_1.default(blocks);
    const res = yield renderer.render();
    console.log(res);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2suY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2suY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELGdIQUEwRjtBQUMxRiw0Q0FBc0I7QUFFdEIsa0JBQWUsQ0FBTyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FDL0IsR0FBRyxTQUFTLCtCQUErQixFQUMzQyxNQUFNLENBQ1AsQ0FBQztJQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxNQUFNLFFBQVEsR0FBRyxJQUFJLCtCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXJELE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFBLENBQUMifQ==