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
            param1: 'World'
        }, {});
        const result = yield pro.run({
            param2: false
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'World',
            param2: false,
            help: false,
            crash: false,
            crashTimeout: 100,
            isChildProcess: false
        });
        done();
    }));
    it('Should start a simple process as child correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new __MyProcess({
            param1: 'World'
        }, {
            process: {
                runAsChild: true
            }
        });
        const result = yield pro.run({
            param2: false
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'World',
            param2: false,
            help: false,
            crash: false,
            crashTimeout: 100,
            isChildProcess: true
        });
        done();
    }));
    it('Should initiate correctly a command based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = __SProcess.from('ls -la');
        const res = yield pro.run();
        expect(res.state).toBe('success');
        done();
    }));
    it('Should initiate correctly a file path based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = __SProcess.from(`${__dirname}/functionBasedProcess`);
        const res = yield pro.run({
            something: 'cool'
        });
        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');
        const res1 = yield pro.run({
            something: 'else'
        });
        expect(res1.state).toBe('success');
        expect(res1.value.something).toBe('else');
        expect(res1.value.state).toBe('success');
        done();
    }));
    it('Should initiate correctly a file path based process as a child process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = __SProcess.from(`${__dirname}/functionBasedProcess`, {
            process: {
                runAsChild: true
            }
        });
        const res = yield pro.run({
            something: 'cool'
        });
        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');
        expect(res.value.isChildProcess).toBe(true);
        done();
    }));
    it('Should initiate correctly a promise based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = __SProcess.from(new Promise((resolve, reject) => {
            resolve({
                hello: 'world'
            });
        }));
        const res = yield pro.run();
        expect(res.state).toBe('success');
        expect(res.value.hello).toBe('world');
        done();
    }));
    it('Should initiate correctly a Promise based process and reject it', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = __SProcess.from(new Promise((resolve, reject) => {
            reject({
                hello: 'world'
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
                hello: 'world'
            });
        });
        const pro = __SProcess.from(promise);
        const res = yield pro.run();
        expect(res.state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0sYUFBYSxDQUFDO0FBR3JDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUN6QjtZQUNFLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLEVBQ0QsRUFBRSxDQUNILENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDM0IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUMzQixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxHQUFHO1lBQ2pCLGNBQWMsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUN6QjtZQUNFLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLEVBQ0Q7WUFDRSxPQUFPLEVBQUU7Z0JB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