var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SImagesCompressor from '../SImagesCompressor';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
describe('@coffeekraken.s-images-compressor.SImagesCompressor', () => {
    it('Should compress simple jpg files correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const outDir = `${__packageTmpDir()}/SImagesCompressor/tests`;
        const compressor = new __SImagesCompressor({
            imagesCompressor: {
                outDir,
                resolveGlob: {
                    defaultExcludes: false
                }
            }
        });
        const result = yield compressor.compress([
            `${__dirname}/__data__/**/*.jpg`
        ]);
        console.log(result);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0NvbXByZXNzb3IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNDb21wcmVzc29yLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxtQkFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLGVBQWUsTUFBTSw2Q0FBNkMsQ0FBQztBQUUxRSxRQUFRLENBQUMscURBQXFELEVBQUUsR0FBRyxFQUFFO0lBRWpFLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBRTVELE1BQU0sTUFBTSxHQUFHLEdBQUcsZUFBZSxFQUFFLDBCQUEwQixDQUFDO1FBRTlELE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDdkMsZ0JBQWdCLEVBQUU7Z0JBQ2QsTUFBTTtnQkFDTixXQUFXLEVBQUU7b0JBQ1QsZUFBZSxFQUFFLEtBQUs7aUJBQ3pCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDckMsR0FBRyxTQUFTLG9CQUFvQjtTQUNuQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIn0=