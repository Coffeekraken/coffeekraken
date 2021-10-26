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
            imagesBuilder: {
                resolveGlob: {
                    defaultExcludes: false,
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxRQUFRLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO0lBQzNELEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFTLEVBQUU7UUFDeEQsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxNQUFNLEdBQUcsR0FBRyxlQUFlLEVBQUUsdUJBQXVCLENBQUM7UUFFM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztZQUNqQyxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFO29CQUNULGVBQWUsRUFBRSxLQUFLO2lCQUN6QjthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMxQixJQUFJLEVBQUUsVUFBVTtZQUNoQixLQUFLLEVBQUUsR0FBRyxTQUFTLFlBQVk7WUFDL0IsTUFBTTtZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLEdBQUc7WUFDVixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==