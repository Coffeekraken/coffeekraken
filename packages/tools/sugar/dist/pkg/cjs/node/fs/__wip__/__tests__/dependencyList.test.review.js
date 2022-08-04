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
const dependencyList_1 = __importDefault(require("../../dependencyList"));
describe('sugar.node.fs.dependencyList', () => {
    it('Should get correctly the dependencies from the passed file', () => __awaiter(void 0, void 0, void 0, function* () {
        const deps = yield (0, dependencyList_1.default)(`${__dirname}/data/index.js`);
        expect(deps.list[0]).toBe(`${__dirname}/data/dependency.js`);
    }));
    it('Should watch correctly an update on the dependencies files', () => __awaiter(void 0, void 0, void 0, function* () {
        const deps = (0, dependencyList_1.default)(`${__dirname}/data/index.js`, {
            watch: true,
        });
        deps.on('update');
        expect(deps.list[0]).toBe(`${__dirname}/data/dependency.js`);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQXlDO0FBQ3pDLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsRUFBRSxDQUFDLDREQUE0RCxFQUFFLEdBQVMsRUFBRTtRQUN4RSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsd0JBQUssRUFBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMscUJBQXFCLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDREQUE0RCxFQUFFLEdBQVMsRUFBRTtRQUN4RSxNQUFNLElBQUksR0FBRyxJQUFBLHdCQUFLLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFO1lBQzdDLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMscUJBQXFCLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==