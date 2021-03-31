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
const SProcess_1 = __importDefault(require("../SProcess"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class MyInterface extends s_interface_1.default {
}
MyInterface.definition = {
    param1: {
        type: 'String',
        default: 'Hello'
    },
    param2: {
        type: 'Boolean',
        default: true
    }
};
// @ts-ignore
class MyProcess extends SProcess_1.default {
    constructor(initialParams, settings = {}) {
        super(initialParams, settings);
    }
    process(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            setTimeout(() => {
                resolve(params);
            }, 100);
        });
    }
}
MyProcess.interfaces = {
    params: MyInterface
};
describe('s-process', () => {
    it('Should start a simple process correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new MyProcess({
            param1: 'World'
        });
        const result = yield pro.run({
            param2: false
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'Hello',
            param2: false,
            help: false
        });
        done();
    }));
    it('Should start a simple process as child correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new MyProcess({
            param1: 'World'
        }, {
            process: {
                runAsChild: true
            }
        });
        const result = yield pro.run({
            param2: false
        });
        expect(result.state).toBe('success');
        expect(result.value).toEqual({
            param1: 'Hello',
            param2: false,
            help: false
        });
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUM7QUFDckMsd0VBQWlEO0FBQ2pELDRFQUFxRDtBQUVyRCxNQUFNLFdBQVksU0FBUSxxQkFBWTs7QUFDN0Isc0JBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQUdKLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxrQkFBVTtJQUtoQyxZQUFZLGFBQWEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN0QyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQWRNLG9CQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFLFdBQVc7Q0FDcEIsQ0FBQztBQWVKLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMzQixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxDQUN2QjtZQUNFLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLEVBQ0Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLElBQUk7YUFDakI7U0FDRixDQUNGLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDM0IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUMzQixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLEtBQUs7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9