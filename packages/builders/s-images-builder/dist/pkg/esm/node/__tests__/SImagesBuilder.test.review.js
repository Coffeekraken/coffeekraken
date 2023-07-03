var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SImagesBuilder from '../SImagesBuilder';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('@coffeekraken.s-images-builder.SImagesBuilder', () => {
    it('Should compress simple jpg files correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const outDir = `${__packageTmpDir()}/SImagesBuilder/tests`;
        const builder = new __SImagesBuilder({
            resolveGlob: {
                defaultExcludes: false,
            },
        });
        const promise = builder.build({
            glob: '**/*.jpg',
            inDir: `${__dirname}/__data__/`,
            outDir,
            quality: 20,
            width: 100,
            webp: false,
        });
        promise.on('log', (log) => {
            console.log(log.value);
        });
        yield promise;
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELFFBQVEsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7SUFDM0QsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQVMsRUFBRTtRQUN4RCxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLE1BQU0sR0FBRyxHQUFHLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQztRQUUzRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDVCxlQUFlLEVBQUUsS0FBSzthQUN6QjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSyxFQUFFLEdBQUcsU0FBUyxZQUFZO1lBQy9CLE1BQU07WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=