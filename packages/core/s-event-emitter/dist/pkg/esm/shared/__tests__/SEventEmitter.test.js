"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFRLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO0lBQ2hELHFEQUFxRDtJQUNyRCw4Q0FBOEM7SUFDOUMsNENBQTRDO0lBQzVDLDRDQUE0QztJQUM1Qyw0Q0FBNEM7SUFDNUMsMkNBQTJDO0lBQzNDLG9DQUFvQztJQUNwQyxVQUFVO0lBQ1YsK0JBQStCO0lBQy9CLCtCQUErQjtJQUMvQiwrQkFBK0I7SUFDL0IsNkJBQTZCO0lBQzdCLGdDQUFnQztJQUNoQyxVQUFVO0lBQ1YsTUFBTTtJQUNOLHFEQUFxRDtJQUNyRCwrRUFBK0U7SUFDL0UsaUJBQWlCO0lBQ2pCLG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFDekIsNERBQTREO0lBQzVELGdEQUFnRDtJQUNoRCx5Q0FBeUM7SUFDekMsb0RBQW9EO0lBQ3BELDhCQUE4QjtJQUM5QiwwQkFBMEI7SUFDMUIscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLDRDQUE0QztJQUM1QyxxQ0FBcUM7SUFDckMsVUFBVTtJQUNWLHFCQUFxQjtJQUNyQixNQUFNO0lBQ04scURBQXFEO0lBQ3JELHNDQUFzQztJQUN0QywwREFBMEQ7SUFDMUQsNEVBQTRFO0lBQzVFLDhDQUE4QztJQUM5QyxpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQ2pDLDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLGFBQWE7SUFDYixTQUFTO0lBQ1QsNENBQTRDO0lBQzVDLDRDQUE0QztJQUM1QyxVQUFVO0lBQ1YscUJBQXFCO0lBQ3JCLE1BQU07QUFDVixDQUFDLENBQUMsQ0FBQyJ9