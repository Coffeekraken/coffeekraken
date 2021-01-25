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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9taXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7QUFDVixjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDJEQUFxQztBQUNyQywyREFBcUM7QUFFckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNqRSxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLENBQUM7WUFDN0IsSUFBSSxFQUFFLEtBQUs7U0FDWixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDUixNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ25GLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuRCxNQUFNLGNBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDbEYsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN6RCxNQUFNLGNBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sY0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssS0FBSyxPQUFPO2dCQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==