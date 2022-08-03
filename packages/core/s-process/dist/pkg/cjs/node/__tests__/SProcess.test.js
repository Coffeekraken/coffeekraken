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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
jest.setTimeout(30000);
describe('s-process', () => {
    it('Should start a simple process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const pro = new MyProcess_1.default({
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
            isChildProcess: true,
        });
    }));
    it('Should start a simple process as child correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new MyProcess_1.default({
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
    }));
    it('Should initiate correctly a command based process', () => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield SProcess_1.default.from('ls -la');
        const res = yield pro.run();
        expect(res.state).toBe('success');
    }));
    it('Should initiate correctly a file path based process', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const pro = yield SProcess_1.default.from(`${__dirname}/functionBasedProcess`);
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
    }));
    it('Should initiate correctly a file path based process as a child process', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const pro = yield SProcess_1.default.from(`${__dirname}/functionBasedProcess`, {
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
    }));
    //
    // it('Should initiate correctly a promise based process', async () => {
    //     const pro = await __SProcess.from(
    //         new Promise((resolve, reject) => {
    //             resolve({
    //                 hello: 'world',
    //             });
    //         }),
    //     );
    //     const res = await pro.run();
    //     expect(res.state).toBe('success');
    //     expect(res.value.hello).toBe('world');
    // });
    // it('Should initiate correctly a Promise based process and reject it', async () => {
    //     const pro = await __SProcess.from(
    //         new Promise((resolve, reject) => {
    //             reject({
    //                 hello: 'world',
    //             });
    //         }),
    //     );
    //     const res = await pro.run();
    //     expect(res.state).toBe('error');
    //     expect(res.error.hello).toBe('world');
    // });
    // it('Should initiate correctly a Promise based process and throw an error from', async () => {
    //     const promise = new Promise((resolve, reject) => {
    //         // @ts-ignore
    //         throw new Error({
    //             hello: 'world',
    //         });
    //     });
    //     const pro = await __SProcess.from(promise);
    //     const res = await pro.run();
    //     expect(res.state).toBe('error');
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXFDO0FBR3JDLDREQUFzQztBQUN0QyxrRkFBMEQ7QUFFMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV2QixRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN2QixFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBUyxFQUFFO1FBQ3JELE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFXLENBQ3ZCO1lBQ0ksTUFBTSxFQUFFLE9BQU87U0FDbEIsRUFDRCxFQUFFLENBQ0wsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN6QixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztZQUNqQixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQVMsRUFBRTtRQUM5RCxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFXLENBQ3ZCO1lBQ0ksTUFBTSxFQUFFLE9BQU87U0FDbEIsRUFDRDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxVQUFVLEVBQUUsSUFBSTthQUNuQjtTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sTUFB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