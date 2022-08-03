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
            isChildProcess: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkIsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLHNCQUFzQjtRQUV0QixNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsMkJBQTJCO1FBRTNCLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsSUFBSTtZQUNwQixLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxHQUFHO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscURBQXFELEVBQUUsR0FBUyxFQUFFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLElB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