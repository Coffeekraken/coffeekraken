var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __loadConfigFile } from '@coffeekraken/sugar/load';
describe('sugar.node.config.loadConfigFile', () => {
    it('Should load a simple js file correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield __loadConfigFile('config.js', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.js',
        });
    }));
    it('Should load a simple yaml file correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield __loadConfigFile('config.yml', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.yml',
        });
    }));
    it('Should load a file that exists against others that not correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield __loadConfigFile(['support.js', 'something.ts', 'config.yml'], {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.yml',
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQVMsRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUMvQyxPQUFPLEVBQUUsR0FBRyxTQUFTLE9BQU87U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixJQUFJLEVBQUUsV0FBVztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQVMsRUFBRTtRQUN0RCxNQUFNLE1BQU0sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFlBQVksRUFBRTtZQUNoRCxPQUFPLEVBQUUsR0FBRyxTQUFTLE9BQU87U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLEdBQVMsRUFBRTtRQUM5RSxNQUFNLE1BQU0sR0FBRyxNQUFNLGdCQUFnQixDQUNqQyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLEVBQzVDO1lBQ0ksT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO1NBQy9CLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=