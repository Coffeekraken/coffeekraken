var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __unzip from '../unzip';
import __tmpDir from '../../path/systemTmpDir';
describe('sugar.node.zip.unzip', () => {
    it('Should unzip a simple file correctly at the same destination folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield __unzip(`${__dirname}/data/coffeekraken-new-logo.zip`, {
            dest: __tmpDir() + '/downloads',
        });
        expect(result.dest).toBe(`${__tmpDir()}/downloads/coffeekraken-new-logo`);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQztBQUUvQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRSxHQUFTLEVBQUU7UUFDakYsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQ3hCLEdBQUcsU0FBUyxpQ0FBaUMsRUFDN0M7WUFDSSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWTtTQUNsQyxDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDcEIsR0FBRyxRQUFRLEVBQUUsa0NBQWtDLENBQ2xELENBQUM7SUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==