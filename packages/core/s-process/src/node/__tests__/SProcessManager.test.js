var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __MyProcess from './MyProcess';
import __SProcessManager from '../SProcessManager';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
jest.setTimeout(30000);
describe('s-process.SProcessManager', () => {
    it('Should handle a simple process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const manager = new __SProcessManager();
        const pro = new __MyProcess();
        manager.attachProcess('main', pro);
        // console.log('DDD');
        const res = yield manager.run('main');
        // console.log('RES', res);
        yield __wait(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            isChildProcess: false,
            crash: false,
            crashTimeout: 100,
        });
    }));
    it('Should handle a simple process that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true,
        });
        let restarted = 0;
        manager.attachProcess('main', pro, {
            restart: {
                delay: 10,
                before: (lastProcessObj) => {
                    restarted++;
                    if (restarted >= 3)
                        return false;
                    return lastProcessObj;
                },
            },
        });
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
    }));
    it('Should handle a simple process with a maxTimes to 2 and that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true,
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxTimes: 2,
                delay: 10,
            },
        });
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.length).toBe(2);
        expect(res[0].state).toBe('error');
    }));
    it('Should handle a simple process with a maxEvery to 500 and that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true,
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxEvery: 500,
                delay: 10,
            },
        });
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.length).toBe(1);
        expect(res[0].state).toBe('error');
    }));
    // @TODO            make child process returned value work correctly
    // it('Should handle a simple child process correctly', async () => {
    //     await __SSugarConfig.load();
    //     const manager = new __SProcessManager();
    //     const pro = new __MyProcess(
    //         {},
    //         {
    //             process: {
    //                 runAsChild: true,
    //             },
    //         },
    //     );
    //     manager.attachProcess('child', pro);
    //     // console.log('S?');
    //     const res = await manager.run('child');
    //     // console.log('AAA', res);
    //     await __wait(10);
    //     expect(res.value).toEqual({
    //         param1: 'Hello',
    //         param2: true,
    //         crash: false,
    //         isChildProcess: true,
    //         crashTimeout: 100,
    //     });
    // });
    // it('Should handle a simple process child that crash correctly', async () => {
    //     const manager = new __SProcessManager();
    //     const pro = new __MyProcess(
    //         {
    //             crash: true,
    //         },
    //         {
    //             process: {
    //                 runAsChild: true,
    //             },
    //         },
    //     );
    //     let restarted = 0;
    //     manager.attachProcess('child', pro, {
    //         restart: {
    //             delay: 10,
    //             before: (lastProcessObj) => {
    //                 restarted++;
    //                 if (restarted >= 3) return false;
    //                 return lastProcessObj;
    //             },
    //         },
    //     });
    //     const res = await manager.run('child');
    //     await __wait(10);
    //     expect(res.length).toBe(3);
    //     expect(res[0].state).toBe('error');
    //
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQVMsRUFBRTtRQUN0RCxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuQyxzQkFBc0I7UUFFdEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLDJCQUEyQjtRQUUzQixNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN0QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxJQUFJO1lBQ1osY0FBYyxFQUFFLEtBQUs7WUFDckIsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQVMs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