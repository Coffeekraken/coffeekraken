var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SPostcssBuilder from '../SPostcssBuilder.js';
describe('@coffeekraken.s-postcss-builder', () => {
    it('Should build a pretty complexe postcss file', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const builder = new __SPostcssBuilder({
            purgecss: {
                content: [`${__dirname}/__data__/index.html`],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtJQUM3QyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsR0FBUyxFQUFFO1FBQ3pELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUM7WUFDbEMsUUFBUSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxDQUFDLEdBQUcsU0FBUyxzQkFBc0IsQ0FBQzthQUNoRDtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDMUIsS0FBSyxFQUFFLEdBQUcsU0FBUyxxQkFBcUI7WUFDeEMsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9