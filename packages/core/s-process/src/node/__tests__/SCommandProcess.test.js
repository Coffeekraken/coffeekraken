var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SCommandProcess from '../SCommandProcess';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('s-process.SCommandProcess', () => {
    it('Should execute a simple command correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const pro = new __SCommandProcess();
        const res = yield pro.run({
            command: 'ls -la',
        });
        expect(res.state).toBe('success');
        expect(res.duration > 0).toBe(true);
        expect(res.value.length && res.value.length > 0).toBe(true);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29tbWFuZFByb2Nlc3MudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBRXBDLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUN0QixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9