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
    it('Should start a simple process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    it('Should start a simple process as child correctly', () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    it('Should initiate correctly a command based process', () => __awaiter(void 0, void 0, void 0, function* () {
        const pro = yield __SProcess.from('ls -la');
        const res = yield pro.run();
        expect(res.state).toBe('success');
    }));
    it('Should initiate correctly a file path based process', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
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
    }));
    it('Should initiate correctly a file path based process as a child process', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
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
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0sYUFBYSxDQUFDO0FBR3JDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFTLEVBQUU7UUFDckQsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQ3ZCO1lBQ0ksTUFBTSxFQUFFLE9BQU87U0FDbEIsRUFDRCxFQUFFLENBQ0wsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN6QixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztZQUNqQixjQUFjLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQVMsRUFBRTtRQUM5RCxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FDdkI7WUFDSSxNQUFNLEVBQUUsT0FBTztTQUNsQixFQUNEO1lBQ0ksT0FB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