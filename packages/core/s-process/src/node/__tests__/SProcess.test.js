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
describe('s-process', () => {
    // it('Should start a simple process correctly', async (done) => {
    //   const pro = new __MyProcess(
    //     {
    //       param1: 'World'
    //     },
    //     {}
    //   );
    //   const result = await pro.run({
    //     param2: false
    //   });
    //   expect(result.state).toBe('success');
    //   expect(result.value).toEqual({
    //     param1: 'Hello',
    //     param2: false,
    //     help: false
    //   });
    //   done();
    // });
    // it('Should start a simple process as child correctly', async (done) => {
    //   const pro = new __MyProcess(
    //     {
    //       param1: 'World'
    //     },
    //     {
    //       process: {
    //         runAsChild: true
    //       }
    //     }
    //   );
    //   const result = await pro.run({
    //     param2: false
    //   });
    //   expect(result.state).toBe('success');
    //   expect(result.value).toEqual({
    //     param1: 'Hello',
    //     param2: false,
    //     help: false
    //   });
    //   done();
    // });
    it('Should restart a simple process 3 times correctly after a crash', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const pro = new MyProcess_1.default({
            param1: 'World',
            crash: true
        });
        const resultPromise = pro.run({
            param2: false
        });
        const result = yield resultPromise;
        console.log('RES', result);
        expect(result.state).toBe('error');
        expect(result.value).toEqual({
            param1: 'Hello',
            param2: false,
            crash: true,
            help: false
        });
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3MudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw0REFBc0M7QUFFdEMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsa0VBQWtFO0lBQ2xFLGlDQUFpQztJQUNqQyxRQUFRO0lBQ1Isd0JBQXdCO0lBQ3hCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsT0FBTztJQUNQLG1DQUFtQztJQUNuQyxvQkFBb0I7SUFDcEIsUUFBUTtJQUVSLDBDQUEwQztJQUMxQyxtQ0FBbUM7SUFDbkMsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFlBQVk7SUFDWixNQUFNO0lBQ04sMkVBQTJFO0lBQzNFLGlDQUFpQztJQUNqQyxRQUFRO0lBQ1Isd0JBQXdCO0lBQ3hCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsbUJBQW1CO0lBQ25CLDJCQUEyQjtJQUMzQixVQUFVO0lBQ1YsUUFBUTtJQUNSLE9BQU87SUFDUCxtQ0FBbUM7SUFDbkMsb0JBQW9CO0lBQ3BCLFFBQVE7SUFFUiwwQ0FBMEM7SUFDMUMsbUNBQW1DO0lBQ25DLHVCQUF1QjtJQUN2QixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixZQUFZO0lBQ1osTUFBTTtJQUVOLEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ25GLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVcsQ0FBQztZQUMxQixNQUFNLEVBQUUsT0FBTztZQUNmLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUM1QixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDO1FBRW5DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==