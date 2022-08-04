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
            isChildProcess: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUdyQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV2QixRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUN2QixFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBUyxFQUFFO1FBQ3JELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUN2QjtZQUNJLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLEVBQ0QsRUFBRSxDQUNMLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDekIsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDekIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLEdBQUc7WUFDakIsY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFTLEVBQUU7UUFDOUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQ3ZCO1lBQ0ksTUFBTSxFQUFFLE9BQU87U0FDbEIsRUFDRDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxVQUFVLEVBQUUsSUFBSTthQUNuQjtTQUNKLENBQ0osQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN6QixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsR0FBRztZQUNqQixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLEdBQVMsRUFBRTtRQUMvRCxNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxHQUFTLEVBQUU7UUFDakUsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXZFLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN0QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN2QixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBUyxFQUFFO1FBQ3BGLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsdUJBQXVCLEVBQUU7WUFDbkUsT0FBTyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxJQUFJO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFO0lBRUYsd0VBQXdFO0lBQ3hFLHlDQUF5QztJQUN6Qyw2Q0FBNkM7SUFDN0Msd0JBQXdCO0lBQ3hCLGtDQUFrQztJQUNsQyxrQkFBa0I7SUFDbEIsY0FBYztJQUNkLFNBQVM7SUFDVCxtQ0FBbUM7SUFFbkMseUNBQXlDO0lBQ3pDLDZDQUE2QztJQUU3QyxNQUFNO0lBRU4sc0ZBQXNGO0lBQ3RGLHlDQUF5QztJQUN6Qyw2Q0FBNkM7SUFDN0MsdUJBQXVCO0lBQ3ZCLGtDQUFrQztJQUNsQyxrQkFBa0I7SUFDbEIsY0FBYztJQUNkLFNBQVM7SUFDVCxtQ0FBbUM7SUFFbkMsdUNBQXVDO0lBQ3ZDLDZDQUE2QztJQUU3QyxNQUFNO0lBRU4sZ0dBQWdHO0lBQ2hHLHlEQUF5RDtJQUN6RCx3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLDhCQUE4QjtJQUM5QixjQUFjO0lBQ2QsVUFBVTtJQUVWLGtEQUFrRDtJQUNsRCxtQ0FBbUM7SUFFbkMsdUNBQXVDO0lBRXZDLE1BQU07QUFDVixDQUFDLENBQUMsQ0FBQyJ9