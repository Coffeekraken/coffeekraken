var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __loadConfigFile from '../loadConfigFile';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUM5QyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBUyxFQUFFO1FBQ3BELE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsV0FBVyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxHQUFHLFNBQVMsT0FBTztTQUMvQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25CLElBQUksRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsWUFBWSxFQUFFO1lBQ2hELE9BQU8sRUFBRSxHQUFHLFNBQVMsT0FBTztTQUMvQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25CLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsa0VBQWtFLEVBQUUsR0FBUyxFQUFFO1FBQzlFLE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQWdCLENBQ2pDLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsRUFDNUM7WUFDSSxPQUFPLEVBQUUsR0FBRyxTQUFTLE9BQU87U0FDL0IsQ0FDSixDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQixJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==