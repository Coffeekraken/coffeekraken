var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __downloadRepository from '../downloadRepository';
import __tmpDir from '../../path/systemTmpDir';
describe('sugar.node.github.downloadRepository', () => {
    it('Should download a repository successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield __downloadRepository('Coffeekraken/download-test-repo', {
            branch: 'main',
        });
        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-download-test-repo-main.zip`,
        });
    }), 999999);
    it('Should download a repository and unzip it successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield __downloadRepository('Coffeekraken/download-test-repo', {
            branch: 'main',
            unzip: true,
        });
        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-download-test-repo-main`,
        });
    }), 999999);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsT0FBTyxRQUFRLE1BQU0seUJBQXlCLENBQUM7QUFFL0MsUUFBUSxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsRUFBRTtJQUNsRCxFQUFFLENBQUMsMkNBQTJDLEVBQUUsR0FBUyxFQUFFO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sb0JBQW9CLENBQ25DLGlDQUFpQyxFQUNqQztZQUNJLE1BQU0sRUFBRSxNQUFNO1NBQ2pCLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDakIsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLHFEQUFxRDtTQUMzRSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVYLEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxHQUFTLEVBQUU7UUFDcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxvQkFBb0IsQ0FDbkMsaUNBQWlDLEVBQ2pDO1lBQ0ksTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDakIsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLGlEQUFpRDtTQUN2RSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIn0=