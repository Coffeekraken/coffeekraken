"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyProcess_1 = __importDefault(require("./MyProcess"));
const SProcessManager_1 = __importDefault(require("../SProcessManager"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
jest.setTimeout(30000);
describe('s-process.SProcessManager', () => {
    it('Should handle a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default();
        manager.attachProcess('main', pro);
        const res = yield manager.run('main');
        yield wait_1.default(10);
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
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({
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
        yield wait_1.default(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
        done();
    }));
    it('Should handle a simple process with a maxTimes to 2 and that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({
            crash: true
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxTimes: 2,
                delay: 10
            }
        });
        const res = yield manager.run('main');
        yield wait_1.default(10);
        expect(res.length).toBe(2);
        expect(res[0].state).toBe('error');
        done();
    }));
    it('Should handle a simple process with a maxEvery to 500 and that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({
            crash: true
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxEvery: 500,
                delay: 10
            }
        });
        const res = yield manager.run('main');
        yield wait_1.default(10);
        expect(res.length).toBe(1);
        expect(res[0].state).toBe('error');
        done();
    }));
    it('Should handle a simple child process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({}, {
            process: {
                runAsChild: true
            }
        });
        manager.attachProcess('child', pro);
        const res = yield manager.run('child');
        yield wait_1.default(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            help: false,
            crash: false,
            crashTimeout: 100
        });
    }));
    it('Should handle a simple process child that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({
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
        yield wait_1.default(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDREQUFzQztBQUN0Qyx5RUFBbUQ7QUFDbkQsZ0ZBQTBEO0FBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkIsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUM1RCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixFQUFFLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sY0FBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLEdBQUc7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVcsQ0FBQztZQUMxQixLQUFLLEVBQUUsSUFBSTtTQUNa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