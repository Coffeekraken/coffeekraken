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
import __packageRoot from '../../../path/packageRoot';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VKc29uLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUM5QyxFQUFFLENBQUMsb0RBQW9ELEVBQUUsR0FBUyxFQUFFO1FBQ2hFLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDbkMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUM7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=