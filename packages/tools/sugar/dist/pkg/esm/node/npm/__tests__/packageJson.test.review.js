var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageJson from '../packageJson';
import __packageRoot from '../../path/packageRoot';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
describe('sugar.node.npm.utils.packageJson', () => {
    it('Should fetch the "chokidar" package.json correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const json = __packageJson('chokidar', {
            rootDir: __packageRoot(__dirname),
        });
        expect(json.name).toBe('chokidar');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDO1NBQ3BDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9