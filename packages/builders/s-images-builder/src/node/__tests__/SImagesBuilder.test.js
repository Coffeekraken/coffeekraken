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
describe('@coffeekraken.s-images-builder.SImagesBuilder', () => {
    it('Should compress simple jpg files correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const outDir = `${__packageTmpDir()}/SImagesBuilder/tests`;
        const builder = new __SImagesBuilder({
            imagesBuilder: {
                resolveGlob: {
                    defaultExcludes: false
                }
            }
        });
        const promise = builder.build({
            glob: '**/*.jpg',
            inDir: `${__dirname}/__data__/`,
            outDir,
            quality: 20,
            width: 100,
            webp: false
        });
        promise.on('log', log => {
            console.log(log.value);
        });
        yield promise;
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSw2Q0FBNkMsQ0FBQztBQUUxRSxRQUFRLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO0lBRTNELEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBRTVELE1BQU0sTUFBTSxHQUFHLEdBQUcsZUFBZSxFQUFFLHVCQUF1QixDQUFDO1FBRTNELE1BQU0sT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUM7WUFDakMsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRTtvQkFDVCxlQUFlLEVBQUUsS0FBSztpQkFDekI7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSyxFQUFFLEdBQUcsU0FBUyxZQUFZO1lBQy9CLE1BQU07WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxDQUFDO1FBRWQsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==