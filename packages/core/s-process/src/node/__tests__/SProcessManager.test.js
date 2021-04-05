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
describe('s-process.SProcessManager', () => {
    //   it('Should handle a simple process correctly', async (done) => {
    //     const manager = new __SProcessManager();
    //     const pro = new __MyProcess();
    //     manager.attachProcess('main', pro);
    //     const res = await manager.run('main');
    //     expect(res.value).toEqual({
    //       param1: 'Hello',
    //       param2: true,
    //       help: false,
    //       crash: false
    //     });
    //     done();
    //   });
    it('Should handle a simple process that crash correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const manager = new SProcessManager_1.default();
        const pro = new MyProcess_1.default({
            crash: true
        });
        let restarted = 0;
        manager.attachProcess('main', pro, {
            restart: {
                delay: 500,
                before: (lastProcessObj) => {
                    restarted++;
                    if (restarted >= 3)
                        return false;
                    return lastProcessObj;
                }
            }
        });
        const res = yield manager.run('main');
        expect(res.value).toEqual({
            param1: 'Hello',
            param2: true,
            crash: true,
            help: false
        });
        setTimeout(() => {
            done();
        }, 20000);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDREQUFzQztBQUN0Qyx5RUFBbUQ7QUFFbkQsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxxRUFBcUU7SUFDckUsK0NBQStDO0lBQy9DLHFDQUFxQztJQUNyQywwQ0FBMEM7SUFFMUMsNkNBQTZDO0lBRTdDLGtDQUFrQztJQUNsQyx5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsVUFBVTtJQUVWLGNBQWM7SUFDZCxRQUFRO0lBRVIsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBaUIsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVcsQ0FBQztZQUMxQixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDakMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFO29CQUN6QixTQUFTLEVBQUUsQ0FBQztvQkFDWixJQUFJLFNBQVMsSUFBSSxDQUFDO3dCQUFFLE9BQU8sS0FBSyxDQUFDO29CQUNqQyxPQUFPLGNBQWMsQ0FBQztnQkFDeEIsQ0FBQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=