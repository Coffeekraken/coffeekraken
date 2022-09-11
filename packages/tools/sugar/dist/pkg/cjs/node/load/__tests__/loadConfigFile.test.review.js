"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = require("@coffeekraken/sugar/load");
describe('sugar.node.config.loadConfigFile', () => {
    it('Should load a simple js file correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield (0, load_1.__loadConfigFile)('config.js', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.js',
        });
    }));
    it('Should load a simple yaml file correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield (0, load_1.__loadConfigFile)('config.yml', {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.yml',
        });
    }));
    it('Should load a file that exists against others that not correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = yield (0, load_1.__loadConfigFile)(['support.js', 'something.ts', 'config.yml'], {
            rootDir: `${__dirname}/data`,
        });
        expect(config).toEqual({
            name: 'config.yml',
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQTREO0FBRTVELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQVMsRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsdUJBQWdCLEVBQUMsV0FBVyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxHQUFHLFNBQVMsT0FBTztTQUMvQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25CLElBQUksRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3RELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx1QkFBZ0IsRUFBQyxZQUFZLEVBQUU7WUFDaEQsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO1NBQy9CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxHQUFTLEVBQUU7UUFDOUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLHVCQUFnQixFQUNqQyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLEVBQzVDO1lBQ0ksT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPO1NBQy9CLENBQ0osQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=