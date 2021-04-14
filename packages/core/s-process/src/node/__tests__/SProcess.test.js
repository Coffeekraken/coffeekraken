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
const SProcess_1 = __importDefault(require("../SProcess"));
const MyProcess_1 = __importDefault(require("./MyProcess"));
jest.setTimeout(30000);
describe('s-process', () => {
    it('Should start a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new MyProcess_1.default({
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
        const pro = new MyProcess_1.default({
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
        const pro = SProcess_1.default.from('ls -la');
        const res = yield pro.run();
        expect(res.state).toBe('success');
        done();
    }));
    it('Should initiate correctly a file path based process', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = SProcess_1.default.from(`${__dirname}/functionBasedProcess`);
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
        const pro = SProcess_1.default.from(`${__dirname}/functionBasedProcess`, {
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
        const pro = SProcess_1.default.from(new Promise((resolve, reject) => {
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
        const pro = SProcess_1.default.from(new Promise((resolve, reject) => {
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
        const pro = SProcess_1.default.from(promise);
        const res = yield pro.run();
        expect(res.state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUM7QUFHckMsNERBQXNDO0FBRXRDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkIsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVyxDQUN6QjtZQUNFLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLEVBQ0QsRUFBRSxDQUNILENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDM0IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUMzQixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxHQUFHO1lBQ2pCLGNBQWMsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVcsQ0FDekI7WUFDRSxNQUFNLEVBQUUsT0FBTztTQUNoQixFQUNEO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0Ys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