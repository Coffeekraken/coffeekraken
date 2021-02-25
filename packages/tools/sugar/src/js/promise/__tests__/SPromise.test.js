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
import __wait from '../../time/wait';
import __SPromise from '../SPromise';
describe('sugar.js.promise', () => {
    it('Should create and resolve a promise using API', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new __SPromise({
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
        const promise = new __SPromise(({ resolve }) => __awaiter(void 0, void 0, void 0, function* () {
            yield __wait(100);
            resolve('Hello');
        }));
        const promiseRes = yield promise;
        expect(promiseRes).toBe('Hello');
        done();
    }));
    it('Should create and emit an event that will be catched correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new __SPromise(({ resolve, emit }) => __awaiter(void 0, void 0, void 0, function* () {
            yield __wait(100);
            emit('update', 'World');
            yield __wait(200);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9taXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE1BQU0sTUFBTSxpQkFBaUIsQ0FBQztBQUNyQyxPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFFckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNqRSxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUM3QixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNSLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDbkYsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkQsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ2xGLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN6RCxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssS0FBSyxPQUFPO2dCQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==