import __MyProcess from './MyProcess';
import __SProcessManager from '../SProcessManager';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

jest.setTimeout(30000);

describe('s-process.SProcessManager', () => {
    it('Should handle a simple process correctly', async () => {
        await __SSugarConfig.load();

        const manager = new __SProcessManager();
        const pro = new __MyProcess();
        manager.attachProcess('main', pro);

        // console.log('DDD');

        const res = await manager.run('main');

        // console.log('RES', res);

        await __wait(10);

        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            isChildProcess: true,
            crash: false,
            crashTimeout: 100,
        });
    });

    it('Should handle a simple process that crash correctly', async () => {
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
                    if (restarted >= 3) return false;
                    return lastProcessObj;
                },
            },
        });

        const res = await manager.run('main');

        await __wait(10);

        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
    });

    it('Should handle a simple process with a maxTimes to 2 and that crash correctly', async () => {
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

        const res = await manager.run('main');

        await __wait(10);

        expect(res.length).toBe(2);
        expect(res[0].state).toBe('error');
    });

    it('Should handle a simple process with a maxEvery to 500 and that crash correctly', async () => {
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

        const res = await manager.run('main');

        await __wait(10);

        expect(res.length).toBe(1);
        expect(res[0].state).toBe('error');
    });

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
