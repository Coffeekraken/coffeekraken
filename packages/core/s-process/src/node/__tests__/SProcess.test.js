var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '../SProcess';
import __MyProcess from './MyProcess';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
jest.setTimeout(30000);
describe('s-process', () => {
    it('Should start a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const pro = new __MyProcess({
            param1: 'World',
        }, {});
        const result = yield pro.run({
            param2: false,
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'World',
            param2: false,
            crash: false,
            crashTimeout: 100,
            isChildProcess: false,
        });
        done();
    }));
    it('Should start a simple process as child correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new __MyProcess({
            param1: 'World',
        }, {
            process: {
                runAsChild: true,
            },
        });
        const result = yield pro.run({
            param2: false,
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'World',
            param2: false,
            crash: false,
            crashTimeout: 100,
            isChildProcess: true,
        });
        done();
    }));
    it('Should initiate correctly a command based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from('ls -la');
        const res = yield pro.run();
        expect(res.state).toBe('success');
        done();
    }));
    it('Should initiate correctly a file path based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from(`${__dirname}/functionBasedProcess`);
        const res = yield pro.run({
            something: 'cool',
        });
        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');
        const res1 = yield pro.run({
            something: 'else',
        });
        expect(res1.state).toBe('success');
        expect(res1.value.something).toBe('else');
        expect(res1.value.state).toBe('success');
        done();
    }));
    it('Should initiate correctly a file path based process as a child process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from(`${__dirname}/functionBasedProcess`, {
            process: {
                runAsChild: true,
            },
        });
        const res = yield pro.run({
            something: 'cool',
        });
        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');
        expect(res.value.isChildProcess).toBe(true);
        done();
    }));
    it('Should initiate correctly a promise based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from(new Promise((resolve, reject) => {
            resolve({
                hello: 'world',
            });
        }));
        const res = yield pro.run();
        expect(res.state).toBe('success');
        expect(res.value.hello).toBe('world');
        done();
    }));
    it('Should initiate correctly a Promise based process and reject it', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from(new Promise((resolve, reject) => {
            reject({
                hello: 'world',
            });
        }));
        const res = yield pro.run();
        expect(res.state).toBe('error');
        expect(res.error.hello).toBe('world');
        done();
    }));
    it('Should initiate correctly a Promise based process and throw an error from', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const promise = new Promise((resolve, reject) => {
            // @ts-ignore
            throw new Error({
                hello: 'world',
            });
        });
        const pro = yield __SProcess.from(promise);
        const res = yield pro.run();
        expect(res.state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0sYUFBYSxDQUFDO0FBR3JDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3pELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUN2QjtZQUNJLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLEVBQ0QsRUFBRSxDQUNMLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDekIsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLEdBQUc7WUFDakIsY0FBYyxFQUFFLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDbEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQ3ZCO1lBQ0ksTUFBTSxFQUFFLE9BQU87U0FDbEIsRUFDRDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxVQUFVLEVBQUUsSUFBSTthQUNuQjtTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN6QixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztZQUNqQixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDckUsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN0QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN2QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3RUFBd0UsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3hGLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsdUJBQXVCLEVBQUU7WUFDbkUsT0FBTyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxJQUFJO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ25FLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDN0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUIsT0FBTyxDQUFDO2dCQUNKLEtBQUssRUFBRSxPQUFPO2FBQ2pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU1QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDakYsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUM3QixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QixNQUFNLENBQUM7Z0JBQ0gsS0FBSyxFQUFFLE9BQU87YUFDakIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkVBQTJFLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUMzRixNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QyxhQUFhO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNqQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU1QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9