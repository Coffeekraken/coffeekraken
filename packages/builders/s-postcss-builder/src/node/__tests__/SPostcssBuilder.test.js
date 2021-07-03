var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPostcssBuilder from '../SPostcssBuilder';
describe('@coffeekraken.s-postcss-builder', () => {
    it('Should build a pretty complexe postcss file', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const builder = new __SPostcssBuilder();
        const promise = builder.build({
            input: `${__dirname}/__data__/index.css`,
            purge: true
        });
        promise.on('log', (log) => {
            console.log(log.value);
        });
        const res = yield promise;
        console.log(res);
        expect(res.map).toEqual(null);
        expect(res.css).not.toBeNull();
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUG9zdGNzc0J1aWxkZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBRW5ELFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFFN0MsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBRXhDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDMUIsS0FBSyxFQUFFLEdBQUcsU0FBUyxxQkFBcUI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUvQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyJ9