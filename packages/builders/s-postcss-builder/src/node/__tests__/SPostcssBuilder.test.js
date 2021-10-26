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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('@coffeekraken.s-postcss-builder', () => {
    it('Should build a pretty complexe postcss file', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const builder = new __SPostcssBuilder({
            postcssBuilder: {
                purgecss: {
                    content: [`${__dirname}/__data__/index.html`],
                },
            },
        });
        const promise = builder.build({
            input: `${__dirname}/__data__/index.css`,
            purge: true,
            minify: true,
        });
        const res = yield promise;
        expect(res.map).toEqual(null);
        expect(res.css).not.toBeNull();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUG9zdGNzc0J1aWxkZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDN0MsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQVMsRUFBRTtRQUN6RCxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDO1lBQ2xDLGNBQWMsRUFBRTtnQkFDWixRQUFRLEVBQUU7b0JBQ04sT0FBTyxFQUFFLENBQUMsR0FBRyxTQUFTLHNCQUFzQixDQUFDO2lCQUNoRDthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMxQixLQUFLLEVBQUUsR0FBRyxTQUFTLHFCQUFxQjtZQUN4QyxLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFFMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=