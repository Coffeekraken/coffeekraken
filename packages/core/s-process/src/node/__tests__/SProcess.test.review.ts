import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SProcess from '../SProcess.js';
import __MyProcess from './MyProcess.js';

jest.setTimeout(30000);

describe('s-process', () => {
    it('Should start a simple process correctly', async () => {
        await __SSugarConfig.load();

        const pro = new __MyProcess(
            {
                param1: 'World',
            },
            {},
        );
        const result = await pro.run({
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
    });
    it('Should start a simple process as child correctly', async () => {
        const pro = new __MyProcess(
            {
                param1: 'World',
            },
            {
                process: {
                    runAsChild: true,
                },
            },
        );
        const result = await pro.run({
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
    });

    it('Should initiate correctly a command based process', async () => {
        const pro = await __SProcess.from('ls -la');
        const res = await pro.run();
        expect(res.state).toBe('success');
    });

    it('Should initiate correctly a file path based process', async () => {
        await __SSugarConfig.load();

        const pro = await __SProcess.from(`${__dirname}/functionBasedProcess`);

        const res = await pro.run({
            something: 'cool',
        });

        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');

        const res1 = await pro.run({
            something: 'else',
        });
        expect(res1.state).toBe('success');
        expect(res1.value.something).toBe('else');
        expect(res1.value.state).toBe('success');
    });

    it('Should initiate correctly a file path based process as a child process', async () => {
        await __SSugarConfig.load();

        const pro = await __SProcess.from(`${__dirname}/functionBasedProcess`, {
            process: {
                runAsChild: true,
            },
        });
        const res = await pro.run({
            something: 'cool',
        });

        expect(res.state).toBe('success');
        expect(res.value.something).toBe('cool');
        expect(res.value.state).toBe('success');
        expect(res.value.isChildProcess).toBe(true);
    });

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
