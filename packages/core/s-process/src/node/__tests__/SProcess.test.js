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
jest.setTimeout(30000);
describe('s-process', () => {
    it('Should start a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
            help: false,
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
            help: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0sYUFBYSxDQUFDO0FBR3JDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3pELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUN2QjtZQUNJLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLEVBQ0QsRUFBRSxDQUNMLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDekIsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztZQUNqQixjQUFjLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsa0RBQWtELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNsRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FDdkI7WUFDSSxNQUFNLEVBQUUsT0FBTztTQUNsQixFQUNEO1lBQ0ksT0FBTyxFQUFFO2dC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