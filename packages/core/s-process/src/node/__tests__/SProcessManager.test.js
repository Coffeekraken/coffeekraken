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
    it('Should handle a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const manager = new __SProcessManager();
        const pro = new __MyProcess();
        manager.attachProcess('main', pro);
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            isChildProcess: false,
            crash: false,
            crashTimeout: 100,
        });
        done();
    }));
    it('Should handle a simple process that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
        done();
    }));
    it('Should handle a simple process with a maxTimes to 2 and that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
        done();
    }));
    it('Should handle a simple process with a maxEvery to 500 and that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
        done();
    }));
    it('Should handle a simple child process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        const manager = new __SProcessManager();
        const pro = new __MyProcess({}, {
            process: {
                runAsChild: true,
            },
        });
        manager.attachProcess('child', pro);
        const res = yield manager.run('child');
        yield __wait(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            crash: false,
            isChildProcess: true,
            crashTimeout: 100,
        });
    }));
    it('Should handle a simple process child that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true,
        }, {
            process: {
                runAsChild: true,
            },
        });
        let restarted = 0;
        manager.attachProcess('child', pro, {
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
        const res = yield manager.run('child');
        yield __wait(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDMUQsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixjQUFjLEVBQUUsS0FBSztZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxHQUFHO1NBQ3BCLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxD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