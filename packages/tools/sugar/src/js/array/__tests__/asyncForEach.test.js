var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __asyncForEach = require('../asyncForEach');
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
test('sugar.js.array.asyncForEach: Simple async foreach execution', (done) => __awaiter(this, void 0, void 0, function* () {
    let i = 0;
    yield __asyncForEach([1, 2, 3, 4], (idx) => __awaiter(this, void 0, void 0, function* () {
        yield waitFor(200);
        i += idx;
    }));
    expect(i).toBe(10);
    done();
}));
