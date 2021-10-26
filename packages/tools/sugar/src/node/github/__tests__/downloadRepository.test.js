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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRSZXBvc2l0b3J5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb3dubG9hZFJlcG9zaXRvcnkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE9BQU8sUUFBUSxNQUFNLHlCQUF5QixDQUFDO0FBRS9DLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQVMsRUFBRTtRQUN2RCxNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFvQixDQUNuQyxpQ0FBaUMsRUFDakM7WUFDSSxNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxxREFBcUQ7U0FDM0UsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFWCxFQUFFLENBQUMsd0RBQXdELEVBQUUsR0FBUyxFQUFFO1FBQ3BFLE1BQU0sSUFBSSxHQUFHLE1BQU0sb0JBQW9CLENBQ25DLGlDQUFpQyxFQUNqQztZQUNJLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pCLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxpREFBaUQ7U0FDdkUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyJ9