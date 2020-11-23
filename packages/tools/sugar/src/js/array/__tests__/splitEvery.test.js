var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __splitEvery = require('../splitEvery');
test('sugar.js.array.splitEvery: Make a simple split on an custom array', (done) => __awaiter(this, void 0, void 0, function* () {
    const array = __splitEvery([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    expect(array).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    done();
}));
