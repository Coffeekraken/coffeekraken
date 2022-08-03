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
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsUUFBUSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtJQUMzRCxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sTUFBTSxHQUFHLEdBQUcsZUFBZSxFQUFFLHVCQUF1QixDQUFDO1FBRTNELE1BQU0sT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUM7WUFDakMsV0FBVyxFQUFFO2dCQUNULGVBQWUsRUFBRSxLQUFLO2FBQ3pCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMxQixJQUFJLEVBQUUsVUFBVTtZQUNoQixLQUFLLEVBQUUsR0FBRyxTQUFTLFlBQVk7WUFDL0IsTUFBTTtZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEdBQUc7WUFDVixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==