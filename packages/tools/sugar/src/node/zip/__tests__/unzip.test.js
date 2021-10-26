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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW56aXAudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVuemlwLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sUUFBUSxNQUFNLHlCQUF5QixDQUFDO0FBRS9DLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsRUFBRSxDQUFDLHFFQUFxRSxFQUFFLEdBQVMsRUFBRTtRQUNqRixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FDeEIsR0FBRyxTQUFTLGlDQUFpQyxFQUM3QztZQUNJLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxZQUFZO1NBQ2xDLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNwQixHQUFHLFFBQVEsRUFBRSxrQ0FBa0MsQ0FDbEQsQ0FBQztJQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9