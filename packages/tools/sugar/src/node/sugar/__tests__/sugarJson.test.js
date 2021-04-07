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
const sugarJson_1 = __importDefault(require("../sugarJson"));
describe('sugar.node.sugar.sugarJson', () => {
    it('Should retreive correctly a specific package sugar.json file', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const value = yield sugarJson_1.default('@coffeekraken/s-js-compiler');
        expect(Object.keys(value).length > 0).toBe(true);
        done();
    }));
    it('Should retreive correctly some sugar.json file', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const value = yield sugarJson_1.default('*');
        expect(Object.keys(value).length > 0).toBe(true);
        done();
    }));
    it('Should retreive correctly some specifics packages sugar.json file', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const value = yield sugarJson_1.default('@coffeekraken/s-js-compiler,@coffeekraken/s-frontstack');
        expect(Object.keys(value).length > 0).toBe(true);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckpzb24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUF1QztBQUV2QyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ2hGLE1BQU0sS0FBSyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDbEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDckYsTUFBTSxLQUFLLEdBQUcsTUFBTSxtQkFBVyxDQUM3Qix3REFBd0QsQ0FDekQsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==