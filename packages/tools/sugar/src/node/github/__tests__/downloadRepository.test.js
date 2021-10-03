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
    it('Should download a repository successfully', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield __downloadRepository('Coffeekraken/coffeekraken', {});
        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-coffeekraken-master.zip`,
        });
        done();
    }), 999999);
    it('Should download a repository and unzip it successfully', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = yield __downloadRepository('Coffeekraken/coffeekraken', {
            unzip: true,
        });
        expect(repo).toEqual({
            dest: `${__tmpDir()}/downloads/coffeekraken-coffeekraken-master`,
        });
        done();
    }), 999999);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRSZXBvc2l0b3J5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb3dubG9hZFJlcG9zaXRvcnkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE9BQU8sUUFBUSxNQUFNLHlCQUF5QixDQUFDO0FBRS9DLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxvQkFBb0IsQ0FDbkMsMkJBQTJCLEVBQzNCLEVBQUUsQ0FDTCxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNqQixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsaURBQWlEO1NBQ3ZFLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFWCxFQUFFLENBQUMsd0RBQXdELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUN4RSxNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFvQixDQUFDLDJCQUEyQixFQUFFO1lBQ2pFLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNqQixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsNkNBQTZDO1NBQ25FLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyJ9