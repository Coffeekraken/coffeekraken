describe('SEventEmitter.shared.SEventEmitter', () => {
    // it('Should emit an event correctly', async () => {
    //     const emitter1 = new __SEventEmitter(),
    //         emitter2 = new __SEventEmitter(),
    //         emitter3 = new __SEventEmitter(),
    //         emitter4 = new __SEventEmitter();
    //     emitter4.on('*', (value, metas) => {
    //         console.log('rr', value);
    //     });
    //     emitter2.pipe(emitter1);
    //     emitter3.pipe(emitter2);
    //     emitter4.pipe(emitter3);
    //     emitter1.emit('log', {
    //         value: 'Hello world',
    //     });
    // });
    // it('Should emit an event correctly', async () => {
    //     const promise = new __SPromise(({ resolve: resolve1, pipe: pipe1 }) => {
    //         pipe1(
    //             new __SPromise(({ pipe: pipe2 }) => {
    //                 pipe2(
    //                     new __SPromise(({ emit: emit3 }) => {
    //                         console.log('FEFEF');
    //                         emit3('log', {
    //                             value: 'hello world',
    //                         });
    //                     }),
    //                 );
    //             }),
    //         );
    //         setTimeout(() => {
    //             resolve1();
    //         }, 200);
    //     });
    //     promise.on('log', (value, metas) => {
    //         console.log('fff', metas);
    //     });
    //     await promise;
    // });
    // it('Should emit an event correctly', async () => {
    //     const promise = new __SPromise(
    //         async ({ resolve: resolve1, pipe: pipe1 }) => {
    //             const pro = await __SProcess.from(`sugard test.promise`, {});
    //             const runPromise = pro.run({});
    //             pipe1(runPromise);
    //             setTimeout(() => {
    //                 resolve1();
    //             }, 10020);
    //             // pipe1();
    //         },
    //     );
    //     promise.on('log', (value, metas) => {
    //         console.log('fff', metas, value);
    //     });
    //     await promise;
    // });
});
