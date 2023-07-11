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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const SProcessManager_js_1 = __importDefault(require("../SProcessManager.js"));
const MyProcess_js_1 = __importDefault(require("./MyProcess.js"));
jest.setTimeout(30000);
describe('s-process.SProcessManager', () => {
    it('Should handle a simple process correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const manager = new SProcessManager_js_1.default();
        const pro = new MyProcess_js_1.default();
        manager.attachProcess('main', pro);
        // console.log('DDD');
        const res = yield manager.run('main');
        // console.log('RES', res);
        yield (0, datetime_1.__wait)(10);
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            isChildProcess: true,
            crash: false,
            crashTimeout: 100,
        });
    }));
    it('Should handle a simple process that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_js_1.default();
        const pro = new MyProcess_js_1.default({
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
        yield (0, datetime_1.__wait)(10);
        expect(res.length).toBe(3);
        expect(res[0].state).toBe('error');
    }));
    it('Should handle a simple process with a maxTimes to 2 and that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_js_1.default();
        const pro = new MyProcess_js_1.default({
            crash: true,
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxTimes: 2,
                delay: 10,
            },
        });
        const res = yield manager.run('main');
        yield (0, datetime_1.__wait)(10);
        expect(res.length).toBe(2);
        expect(res[0].state).toBe('error');
    }));
    it('Should handle a simple process with a maxEvery to 500 and that crash correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_js_1.default();
        const pro = new MyProcess_js_1.default({
            crash: true,
        });
        manager.attachProcess('main', pro, {
            restart: {
                maxEvery: 500,
                delay: 10,
            },
        });
        const res = yield manager.run('main');
        yield (0, datetime_1.__wait)(10);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCwrRUFBc0Q7QUFDdEQsa0VBQXlDO0FBRXpDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkIsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFpQixFQUFFLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxzQkFBVyxFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsc0JBQXNCO1FBRXRCLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QywyQkFBMkI7UUFFM0IsTUFBTSxJQUFBLGlCQUFNLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdEIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLEdBQUc7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxHQUFTLEVBQUU7UUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksc0JBQVcsQ0FBQztZQUN4QixLQUFL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