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
jest.setTimeout(30000);
describe('s-process.SProcessManager', () => {
    it('Should handle a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess();
        manager.attachProcess('main', pro);
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            help: false,
            crash: false,
            crashTimeout: 100
        });
        done();
    }));
    it('Should handle a simple process that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true
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
                }
            }
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
            crash: true
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxTimes: 2,
                delay: 10
            }
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
            crash: true
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxEvery: 500,
                delay: 10
            }
        });
        const res = yield manager.run('main');
        yield __wait(10);
        expect(res.length).toBe(1);
        expect(res[0].state).toBe('error');
        done();
    }));
    it('Should handle a simple child process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({}, {
            process: {
                runAsChild: true
            }
        });
        manager.attachProcess('child', pro);
        const res = yield manager.run('child');
        yield __wait(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            help: false,
            crash: false,
            crashTimeout: 100
        });
    }));
    it('Should handle a simple process child that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new __SProcessManager();
        const pro = new __MyProcess({
            crash: true
        }, {
            process: {
                runAsChild: true
            }
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
                }
            }
        });
        const res = yield manager.run('child');
        yield __wait(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLEdBQUc7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1B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