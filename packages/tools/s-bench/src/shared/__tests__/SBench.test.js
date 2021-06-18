var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from "../exports";
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
describe('s-bench', () => {
    it('Should handle a basic time benchmark correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const bench = new __SBench('testing');
        bench.on('log', (log) => {
            console.log(__parseHtml(log.value));
        });
        bench.start();
        bench.step('compilation');
        bench.end();
        done();
    }));
    it('Should handle a basic time benchmark using static methods correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        __SBench.start('testing').on('log', (log) => {
            console.log(__parseHtml(log.value));
        });
        __SBench.start('testing');
        __SBench.step('testing', 'compilation');
        __SBench.end('testing');
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JlbmNoLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmVuY2gudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFHdkUsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7SUFFckIsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFFaEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVosSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFFQUFxRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFFckYsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==