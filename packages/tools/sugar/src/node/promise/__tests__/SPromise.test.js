"use strict";
// @shared
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
const wait_1 = __importDefault(require("../../time/wait"));
const SPromise_1 = __importDefault(require("../SPromise"));
describe('sugar.js.promise', () => {
    it('Should create and resolve a promise using API', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new SPromise_1.default({
            coco: 'yyy'
        });
        setTimeout(() => {
            promise.resolve('Hello');
        }, 100);
        const promiseRes = yield promise;
        expect(promiseRes).toBe('Hello');
        done();
    }));
    it('Should create and resolve a promise using executor function API', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new SPromise_1.default(({ resolve }) => __awaiter(void 0, void 0, void 0, function* () {
            yield wait_1.default(100);
            resolve('Hello');
        }));
        const promiseRes = yield promise;
        expect(promiseRes).toBe('Hello');
        done();
    }));
    it('Should create and emit an event that will be catched correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new SPromise_1.default(({ resolve, emit }) => __awaiter(void 0, void 0, void 0, function* () {
            yield wait_1.default(100);
            emit('update', 'World');
            yield wait_1.default(200);
            resolve('Hello');
        }));
        let eventCatched = false;
        promise.on('update', (value, metas) => {
            console.log('UPDA', value, metas);
            if (value === 'World')
                eventCatched = true;
        });
        const promiseRes = yield promise;
        expect(eventCatched).toBe(true);
        expect(promiseRes).toBe('Hello');
        done();
    }));
});
//# sourceMappingURL=SPromise.test.js.map