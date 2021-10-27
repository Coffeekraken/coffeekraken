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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZENvbmZpZ0ZpbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWRDb25maWdGaWxlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFTLEVBQUU7UUFDcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU7WUFDL0MsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO1NBQy9CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsSUFBSSxFQUFFLFdBQVc7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFTLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7WUFDaEQsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO1NBQy9CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxHQUFTLEVBQUU7UUFDOUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBZ0IsQ0FDakMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQyxFQUM1QztZQUNJLE9BQU8sRUFBRSxHQUFHLFNBQVMsT0FBTztTQUMvQixDQUNKLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25CLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9