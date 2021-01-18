"use strict";
// @shared
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
const SPromise_1 = __importDefault(require("../SPromise"));
describe('sugar.js.promise', () => {
    it('Should', (done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('NEW PROMISE');
        const promise = new SPromise_1.default({
            coco: 'yyy'
        });
        setTimeout(() => {
            promise.resolve('Hello');
        }, 2000);
        const promiseRes = yield promise;
        console.log(promise._settings);
        expect(promiseRes).toBe('Hello');
        done();
    }));
});
//# sourceMappingURL=SPromise.test.js.map