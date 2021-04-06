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
    it('Should handle a simple process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default();
        manager.attachProcess('main', pro);
        const res = yield manager.run('main');
        yield wait_1.default(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            help: false,
            crash: false
        });
    }));
    it('Should handle a simple process that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
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
            crash: false
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDREQUFzQztBQUN0Qyx5RUFBbUQ7QUFDbkQsZ0ZBQTBEO0FBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkIsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQWlCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsTUFBTSxjQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDeEIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQVMsRUFBRTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixFQUFFLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVyxDQUFDO1lBQzFCLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxhQUFh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